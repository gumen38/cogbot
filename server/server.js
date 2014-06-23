var requestInterceptors = require('./request-interceptors');
var responseInterceptors = require('./response-interceptors');
var http = require("http");
var url = require('url');
var log = require('./log');
var strategy = require('./strategy');
var events = require('./events');
var session = null;
var headers = null;

var parseRequest = function (rq) {
    rq = JSON.parse(rq);
    session = rq.session;
    var result = {};
    _.each(rq.body, function (el) {
        var name = _.keys(el)[0];
        result[name] = el[name];
    });
    return result;
};

var parseResponse = function (rs) {
    rs = JSON.parse(rs);
    var result = {};
    _.each(rs, function (el) {
        var name = _.keys(el)[0];
        result[name] = el[name];
        if (name == 'Notify' && el.Notify.msgs) {
            _.each(el.Notify.msgs, function (msgEl) {
                var msgName = _.keys(msgEl)[0];
                var saveName = msgName;
                if( msgName == 'Object_Change_Notify' ) {
                    saveName = msgName + '_' +  msgEl[msgName].className;
                }
                result[saveName] = msgEl[msgName];
            });
        }
    });
    return result;
};

var uuid = ~~(Math.random() * 5000);
var call = function (requestOrBatch, cb) {
    cb = cb || function() {};

    if( headers == null ) {
        log.error("Session was not yet captured. Execute at least one game operation (for example, maximize soldiers) so CogBot can capture session from the request.");
        return;
    }

    var batch = _.isArray(requestOrBatch) ? requestOrBatch : [requestOrBatch];

    _.each(batch, function(request){
        _.each(_.keys(request), function(key){
            request[key].serialNo = uuid; uuid = (uuid+1)%10000;
        });
    });

    var wrapper = {
        body: batch,
        session: session
    };

    var body = JSON.stringify(wrapper);
    log.debug(wrapper);

    headers['content-length'] = body.length + '';
    var opts = {
        path: 'http://m1-kongregate.callofgods.com/php/do.php',
        hostname: url.parse('http://m1-kongregate.callofgods.com/php/do.php').host,
        port: 80,
        method: 'POST',
        headers: headers
    };
    var httpRq = http.request(opts, function(rs){
        var body = "";
        rs.on('data', function(data){
            body += data;
        });
        rs.on('end', function(){
            log.debug(body);
            var response = parseResponse(body);
            cb(response);
        });
        rs.on('error', function(msg){
            log.debug(msg);
        })

    }).on('error', function(msg){
        log.debug(msg);
    });
    httpRq.write(body);
    httpRq.end();

};

var captureHeaders = function (_headers) {

    headers = {};
    _.each(_.keys(_headers), function(key){
        headers[key] = _headers[key];
    });
};


var interceptRequest = function (request, cb) {
    cb = cb || function() {};

    var sessionBefore = session;
    var rq = parseRequest(request);

    if( sessionBefore==null && session!=null ) events.emit('server-ready');
    if( sessionBefore!=null && session!=sessionBefore) events.emit('server-reset');

    var intercepts = [];
    _.each(_.keys(rq), function (name) {
        if (requestInterceptors[name]) {
            intercepts.push({
                interceptor: requestInterceptors[name],
                obj: rq[name]
            })
        }
    });
    if( intercepts.length == 0 ) { cb(); return; }
    var count = 0;
    _.each(intercepts, function (intercept) {
        intercept.interceptor(intercept.obj, function () {
            if (++count == intercepts.length) cb();
        }, rq)
    })
};

var interceptResponse = function (response, cb) {
    cb = cb || function() {};

    var rs = parseResponse(response);
    var intercepts = [];
    _.each(_.keys(rs), function (name) {
        if (responseInterceptors[name]) {
            intercepts.push({
                interceptor: responseInterceptors[name],
                obj: rs[name]
            })
        }
    });
    if( intercepts.length == 0 ) { cb(); return; }
    var count = 0;
    _.each(intercepts, function (intercept) {
        intercept.interceptor(intercept.obj, function () {
            if (++count == intercepts.length) cb();
        }, rs)
    })
};


module.exports = {
    parseRequest: parseRequest,
    parseResponse: parseResponse,
    call: call,
    captureHeaders: captureHeaders,
    interceptRequest: interceptRequest,
    interceptResponse: interceptResponse
}