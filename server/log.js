var fs = require("fs");
var ui = require("./ui");

var info = [];
_.extend(module.exports, {

    info: function (msg) {
        console.log(msg);
        info.unshift(msg);
        if( info.length > 20 ) info = info.slice(0, 19);
        ui.update('log');
    },

    debug: function (msg) {
        console.log(msg);
    },

    model: function() {
        return { info: info }
    }

});