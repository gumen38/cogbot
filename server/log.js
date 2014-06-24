var fs = require("fs");
var events = require("./events");

var main = [];
var bot = [];

var template = _.template(fs.readFileSync(__dirname + '/ui/log.html').toString());
var logChanged = true;
setInterval(function(){
    if( !logChanged ) return;
    logChanged = false;
    events.emit('log-update', template({log: main}));
}, 1000);

events.on('reconnect', function(){
    events.emit('log-update', template({log: main}));
});

module.exports = {

    main: function (msg) {
        console.log(msg);
        main.unshift(msg);
        logChanged = true;
        if( main.length > 100 ) main = main.slice(0, 99);
    },

    bot: function () {
        console.log(msg);
        bot.unshift(msg);
        logChanged = true;
        if( bot.length > 100 ) bot = bot.slice(0, 99);
    },

    error: function (msg) {
        console.log(msg);
        main.unshift(msg);
        logChanged = true;
        if( main.length > 100 ) main = main.slice(0, 99);
    },

    debug: function (msg) {
        console.log(msg);
    },

    botlog: function(){
        return bot;
    }
};