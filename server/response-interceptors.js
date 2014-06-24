dungeon = require("./dungeon");
abyss = require("./abyss");
strategy = require("./strategy");
settings = require("./settings");
module.exports = {

    'Adventure_MapMove_Res': function(rs, cb, fullRs){
        dungeon.update(fullRs.Object_Change_Notify_characterAdventureMap);
        cb();
    },

    'Adventure_GetMapInfo_Res': function(rs, cb){
        dungeon.init(rs);
        cb();
    },

    'Adventure_ContinueProgress_Res': function(rs, cb){
        dungeon.init(rs);
        cb();
    },

    'PurgatoryAbyss_GetInfo_Res': function(rs, cb){
        abyss.updateLocation(rs);
        abyss.prepareForFight(rs);
        cb();
    },

    'PurgatoryAbyss_Challenge_Res': function(rs, cb, fullRs){
        abyss.updateLocation(fullRs.Object_Change_Notify_characterPurgatoryAbyss.attrs);
        cb();
    }
}