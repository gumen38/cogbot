dungeon = require("./dungeon");
abyss = require("./abyss");
strategy = require("./strategy");
settings = require("./settings");
task = require("./task");
server = require("./server");
module.exports = {

    'characterAdventureMap': function(msg, cb){
        dungeon.update(msg.attrs);
        cb();
    },

    'characterPurgatoryAbyss': function(msg, cb){
        abyss.onRoomChange(msg.attrs);
        cb();
    },

    'characterResource': function(msg, cb){

    }
}