dungeon = require("./dungeon");
abyss = require("./abyss");
strategy = require("./strategy");
settings = require("./settings");
task = require("./task");
server = require("./server");
inventory = require("./inventory");
module.exports = {

    'Object_Change_Notify.characterAdventureMap': function(msg, cb){
        dungeon.update(msg);
        cb();
    },

    'Object_Change_Notify.characterPurgatoryAbyss': function(msg, cb){
        abyss.onRoomChange(msg);
        cb();
    },

    'Object_Change_Notify.characterResource': function(msg, cb){
        strategy.assertSoldiers(msg);
        cb();
    },

    'Object_Create_Notify.characterItem': function(msg, cb){
        inventory.itemAdded(msg);
        cb();
    },

    'Object_Delete_Notify.characterItem': function(msg, cb){
        inventory.reload();
        cb();
    }
}