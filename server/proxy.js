http = require('http');
through = require('through');
url = require('url');
log = require('./log');
server = require("./server");

_.extend(module.exports, {

    start: function () {

        log.info("Starting action proxy on localhost:3333...");
        log.info("Warning: FoxyProxy should be configured to proxy only *do.php* requests to localhost:3333");

        http.createServer(function (clientRequest, clientResponse) {

            if (clientRequest.url != server.getActionUrl() ) {
                log.info("FoxyProxy is misconfigured. Wrong url: " + clientRequest.url);
            }

            clientRequest.headers['accept-encoding'] = 'utf-8';
            var opts = { hostname: url.parse(clientRequest.url).host, port: 80, path: clientRequest.url, method: clientRequest.method, headers: clientRequest.headers };


            var proxy;
            var attempts = 0;
            function proxyCall() {
                proxy = http.request(opts, function (serverResponse) {
                    var responseData = "";
                    var arrivalProcessor = through(function write(data) {
                        responseData += data;
                    }, function end() {
                        log.debug(responseData);
                        var _this = this;
                        server.interceptResponse(responseData, function () {
                            server.interceptMessages(responseData, function () {
                                _this.queue(responseData);
                                _this.emit('end');
                            });
                        });
                    });

                    serverResponse.pipe(arrivalProcessor, {end: true});
                    arrivalProcessor.pipe(clientResponse, {end: true});
                });
                proxy.on('error', function(e) {
                    console.log("Proxy connect error");
                    attempts++;
                    if( attempts>5 ){
                        console.log("Stopped retrying connect");
                        throw "Proxy error";
                    }
                    proxyCall();
                });
            }

            proxyCall();

            var requestData = "";
            var departureProcessor = through(function write(data) {
                requestData += data;
            }, function end() {
                log.debug(requestData);
                var _this = this;
                server.interceptRequest(requestData, function () {
                    if( server.getBlock() ){
                        clientResponse.writeHead(200, {'Content-Type': 'text/plain'});
                        clientResponse.end(server.getBlock());
                        server.setBlock(null);
                        _this.queue('[]');
                        _this.emit('end');
                    } else {
                        _this.queue(requestData);
                        _this.emit('end');
                    }
                })
            });
            clientRequest.pipe(departureProcessor, {end: true});
            departureProcessor.pipe(proxy, {end: true});
        }).on('error', function (e) {
            if (e.code == 'EADDRINUSE') {
                console.log('Address in use, retrying...');
            }
        }).listen(3333);
    }
});

