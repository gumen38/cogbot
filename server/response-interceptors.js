dungeon = require("./dungeon");
abyss = require("./abyss");
strategy = require("./strategy");
inventory = require("./inventory");
server = require("./server");
module.exports = {


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

    'PurgatoryAbyss_Reset_Res': function(rs, cb, fullRs){
        abyss.reset();
        abyss.prepare(cb);
    },

    'PreResource_Recruit_Res': function(rs, cb){
        strategy.resetDepleted();
        cb();
    }
}