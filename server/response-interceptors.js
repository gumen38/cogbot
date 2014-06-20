dungeon = require("./dungeon");
abyss = require("./abyss");
strategy = require("./strategy");
settings = require("./settings");
module.exports = {

    'Adventure_MapMove_Res': function(rs, cb, fullRs){
        dungeon.updateMap(fullRs.Object_Change_Notify_characterAdventureMap);
        cb();
    },

    'Adventure_GetMapInfo_Res': function(rs, cb){
        dungeon.initMap(rs);
        cb();
    },

    'Adventure_ContinueProgress_Res': function(rs, cb){
        dungeon.initMap(rs);
        cb();
    },

    'PurgatoryAbyss_GetInfo_Res': function(rs, cb){
        abyss.updateLocation(rs);
        settings.get().load.safeAbyss && abyss.prepareForFight(rs);
        cb();
    },

    'PurgatoryAbyss_Challenge_Res': function(rs, cb, fullRs){
        abyss.updateLocation(fullRs.Object_Change_Notify_characterPurgatoryAbyss.attrs);
        settings.get().load.safeAbyss && abyss.prepareForFight(rs);
        cb();
    },

    'Adventure_MapPreMove_Req': function(rs, cb){
        settings.get().load.safeBoss && dungeon.prepareForPoint(rs.point);
    }
}