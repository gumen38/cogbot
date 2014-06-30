dungeon = require("./dungeon");
abyss = require("./abyss");
strategy = require("./strategy");
settings = require("./settings");
task = require("./task");
server = require("./server");
module.exports = {

    'Adventure_MapMove_Res': function(rs, cb, fullRs){
        dungeon.update(fullRs.Object_Change_Notify_characterAdventureMap.attrs);
        cb();
    },

    'Adventure_GetMapInfo_Res': function(rs, cb){
        dungeon.init(rs.map);
        cb();
    },

    'Adventure_ContinueProgress_Res': function(rs, cb){
        dungeon.init(rs.map);
        cb();
    },

    'PurgatoryAbyss_GetInfo_Res': function(rs, cb){
        abyss.onRoomChange(rs);
        abyss.prepare();
        cb();
    },

    'PurgatoryAbyss_Challenge_Res': function(rs, cb, fullRs){
        abyss.onRoomChange(fullRs.Object_Change_Notify_characterPurgatoryAbyss.attrs);
        strategy.assertSoldiers(fullRs);
        cb();
    },

    'PurgatoryAbyss_Reset_Res': function(rs, cb, fullRs){
        abyss.reset();
        abyss.onRoomChange(fullRs.Object_Change_Notify_characterPurgatoryAbyss.attrs);
        abyss.prepare(cb);
    },

    'PreResource_Recruit_Res': function(rs, cb){
        strategy.resetDepleted();
        cb();
    },

    global: function(rs, cb, fullRs){
        task.detect(rs, fullRs);
        cb();
    }
}