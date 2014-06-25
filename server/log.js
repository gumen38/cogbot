var fs = require("fs");
var ui = require("./events");
var template = _.template(fs.readFileSync(__dirname + '/ui/log.html').toString());

var info = [];
module.exports = _.extend(module.exports || (module.export = {}), {

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