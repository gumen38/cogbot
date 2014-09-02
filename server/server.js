var requestInterceptors = require('./request-interceptors');
var responseInterceptors = require('./response-interceptors');
var messageInterceptors = require('./message-interceptors');
var http = require("http");
var url = require('url');
var log = require('./log');
var strategy = require('./strategy');
var dungeon = require('./dungeon');
var abyss = require('./abyss');
var ui = require('./ui');
var sessionInfo = null;
var headers = null;
var uuid = ~~(Math.random() * 5000);

var parseRequest = function (requestJson) {
    var request = JSON.parse(requestJson);
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
                var notifyName = _.keys(message)[0];
                var entryName = notifyName + "." + message[notifyName].className;
                result.msgs[entryName] = message[notifyName].attrs;
            });
        }
    });
    return result;
};

var call = function (requestOrBatch, cb) {
    cb = cb || function () {
    };

    if (!headers) {
        return;
    }

    var batch = _.isArray(requestOrBatch) ? requestOrBatch : [requestOrBatch];

    _.each(batch, function (request) {
        _.each(_.keys(request), function (key) {
            request[key].serialNo = uuid;
            uuid = (uuid + 1) % 10000;
        });
    });

    var wrapper = {
        body: batch,
        session: sessionInfo[6].session
    };

    var body = JSON.stringify(wrapper);
    log.debug(body);

    headers['content-length'] = body.length + '';
    var opts = {
        path: getActionUrl(),
        hostname: url.parse(getActionUrl()).host,
        port: 80,
        method: 'POST',
        headers: headers
    };
    var httpRq = http.request(opts,function (rs) {
        var body = "";
        rs.on('data', function (data) {
            body += data;
        });
        rs.on('end', function () {
            log.debug(body);
            var response = parseResponse(body);
            cb(response.data, response.msgs);
        });
        rs.on('error', function (msg) {
            log.debug(msg);
        })

    }).on('error', function (msg) {
        log.debug(msg);
    });
    httpRq.write(body);
    httpRq.end();

};

var callHttp = function (_url, args, cb) {
    cb = cb || function () {
    };

    var body = args.body || '';
    var headers = args.headers;
    var method = args.method || 'GET';

    if (method == 'POST') headers['content-length'] = args.body.length + '';

    if (headers && headers['set-cookie']) {
        headers.cookie = headers['set-cookie'].join(';');
        headers['set-cookie'] = null;
    }


    var opts = {
        path: _url,
        hostname: url.parse(_url).host,
        port: 80,
        method: method
    };
    if (headers) opts.headers = headers;

    var httpRq = http.request(opts,function (rs) {
        var input = "";
        rs.on('data', function (data) {
            input += data;
        });
        rs.on('end', function (rs2) {
            var headers = [];

            cb({ rs: rs, headers: rs.headers, body: input });
        });
        rs.on('error', function (msg) {
            log.debug(msg);
        })

    }).on('error', function (msg) {
        log.debug(msg);
    });
    if (method == 'POST') httpRq.write(body);
    httpRq.end();
};

var buildHeaders = function () {
    if (!sessionInfo) return;
    var uri = url.parse(sessionInfo[6].httpConnectURL);
    headers = {
        "host": uri.host,
        "proxy-connection": "keep-alive",
        "content-length": "1492",
        "origin": uri.protocol + "//" + uri.host,
        "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36",
        "content-type": "text/xml",
        "accept": "*/*",
        "referer": sessionInfo[0],
        "accept-encoding": "utf-8",
        "accept-language": "ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4",
        "cookie": sessionInfo[8]
    }

}


var interceptRequest = function (request, cb) {
    cb = cb || function () {
    };

    var rq = parseRequest(request);

    var intercepts = [];
    _.each(_.keys(rq), function (name) {
        if (requestInterceptors[name]) {
            intercepts.push({
                interceptor: requestInterceptors[name],
                obj: rq[name]
            })
        }
    });
    if (intercepts.length == 0) {
        cb();
        return;
    }
    var count = 0;
    _.each(intercepts, function (intercept) {
        intercept.interceptor(intercept.obj, function () {
            if (++count == intercepts.length) cb();
        }, rq)
    })
};

var interceptResponse = function (response, cb) {
    cb = cb || function () {
    };

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
    if (intercepts.length == 0) {
        cb();
        return;
    }
    var count = 0;
    _.each(intercepts, function (intercept) {
        intercept.interceptor(intercept.obj, function () {
            if (++count == intercepts.length) cb();
        }, rs.data)
    });
};

var interceptMessages = function (response, cb) {
    cb = cb || function () {
    };

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
    if (intercepts.length == 0) {
        cb();
        return;
    }
    var count = 0;
    _.each(intercepts, function (intercept) {
        intercept.interceptor(intercept.obj, function () {
            if (++count == intercepts.length) cb();
        })
    });
};

var block = null;
function getBlock() {
    return block;
}
function setBlock(rs) {
    block = rs;
}

var getCharacterId = function () {
    return sessionInfo[6].id;
};

var loadSession = function () {
    var socket = ui.getSocket();
    if (socket) socket.emit('getSessionInfo');
}

var getActionUrl = function () {
    return sessionInfo[6].httpConnectURL;
};

_.extend(module.exports, {
    parseRequest: parseRequest,
    parseResponse: parseResponse,
    call: call,
    callHttp: callHttp,
    interceptRequest: interceptRequest,
    interceptResponse: interceptResponse,
    interceptMessages: interceptMessages,
    getBlock: getBlock,
    setBlock: setBlock,
    getCharacterId: getCharacterId,
    loadSession: loadSession,
    getActionUrl: getActionUrl,
    model: function () {
        return {};
    },
    control: function (data) {
        if (data.sessionInfo) {
            sessionInfo = data.sessionInfo;
            buildHeaders();
            strategy.init();
            dungeon.reset();
            abyss.reset();
        }
    }

});