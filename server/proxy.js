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

            if (clientRequest.url != "http://m1-kongregate.callofgods.com/php/do.php") {
                log.info("FoxyProxy is misconfigured. Wrong url: " + clientRequest.url);
            }

            clientRequest.headers['accept-encoding'] = 'utf-8';
            server.captureHeaders(clientRequest.headers);
            var opts = { hostname: url.parse(clientRequest.url).host, port: 80, path: clientRequest.url, method: clientRequest.method, headers: clientRequest.headers };


            var proxy = http.request(opts, function (serverResponse) {
                var responseData = "";
                var arrivalProcessor = through(function write(data) {
                    responseData += data;
                }, function end() {
                    log.debug(responseData);
                    var _this = this;
                    server.interceptResponse(responseData, function(){
                        _this.queue(responseData);
                        _this.emit('end');
                    });
                });

                serverResponse.pipe(arrivalProcessor, {end: true});
                arrivalProcessor.pipe(clientResponse, {end: true});
            });

            var requestData = "";
            var departureProcessor = through(function write(data) {
                requestData += data;
            }, function end() {
                log.debug(requestData);
                var _this = this;
                server.interceptRequest(requestData, function(){


//                    if( requestData.indexOf('Arena_ChallengeFight_Req')>0 ) {
//                        var js = JSON.parse(requestData);
//                        js.body[0].Arena_ChallengeFight_Req.characterId = 131297;
//                        requestData = JSON.stringify(js);
//                        console.log("LALALA");
//                        console.log(requestData);
//                    }

                    _this.queue(requestData);
                    _this.emit('end');
                })
            });
            clientRequest.pipe(departureProcessor, {end: true});
            departureProcessor.pipe(proxy, {end: true});
        }).listen(3333);
    }
});
