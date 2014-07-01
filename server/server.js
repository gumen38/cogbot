var requestInterceptors = require('./request-interceptors');
var responseInterceptors = require('./response-interceptors');
var messageInterceptors = require('./message-interceptors');
var http = require("http");
var url = require('url');
var log = require('./log');
var strategy = require('./strategy');
var dungeon = require('./dungeon');
var abyss = require('./abyss');
var session = null;
var headers = null;

var parseRequest = function (requestJson) {
    var request = JSON.parse(requestJson);
    session = request.session;
    var result = {};
    _.each(request.body, function (requestEntry) {
        var requestEntryName = _.keys(requestEntry)[0];
        result[requestEntryName] = requestEntry[requestEntryName];
    });
    return result;
};

var parseResponse = function (responseJson) {
    var result = {
        data: {},
        msgs: {}
    };
    _.each(JSON.parse(responseJson), function (responseEntry) {
        var responseEntryName = _.keys(responseEntry)[0];
        result.data[responseEntryName] = responseEntry[responseEntryName];
        if (responseEntryName == 'Notify' && responseEntry.Notify.msgs) {
            _.each(responseEntry.Notify.msgs, function (message) {
                result.msgs[_.keys(message)[0]] = message;
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
    log.debug(body);

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

    if( sessionBefore==null && session!=null || sessionBefore!=null && session!=sessionBefore) {
        strategy.init();
        dungeon.reset();
        abyss.reset();
    }

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
    _.each(_.keys(rs.data), function (name) {
        if (responseInterceptors[name]) {
            intercepts.push({
                interceptor: responseInterceptors[name],
                obj: rs.data[name]
            })
        }
    });
    if( intercepts.length == 0 ) { cb(); return; }
    var count = 0;
    _.each(intercepts, function (intercept) {
        intercept.interceptor(intercept.obj, function () {
            if (++count == intercepts.length) cb();
        }, rs.data)
    });
};

var interceptMessages = function (response, cb) {
    cb = cb || function() {};

    var rs = parseResponse(response);
    var intercepts = [];
    _.each(_.keys(rs.msgs), function (name) {
        if (messageInterceptors[name]) {
            intercepts.push({
                interceptor: messageInterceptors[name],
                obj: rs.msgs[name]
            })
        }
    });
    if( intercepts.length == 0 ) { cb(); return; }
    var count = 0;
    _.each(intercepts, function (intercept) {
        intercept.interceptor(intercept.obj, function () {
            if (++count == intercepts.length) cb();
        })
    });
};


_.extend(module.exports, {
    parseRequest: parseRequest,
    parseResponse: parseResponse,
    call: call,
    captureHeaders: captureHeaders,
    interceptRequest: interceptRequest,
    interceptResponse: interceptResponse,
    interceptMessages: interceptMessages
})