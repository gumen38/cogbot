server = require("./server");
settings = require("./settings");

module.exports = {
    getItemInfo: function(itemId, cb) {
        var rq = {"Item_GetInfo_Req": {"type": -1, "characterId": 38729}};
        server.call(rq, function(rs){
            var item = _.find(rs.Item_GetInfo_Res.items, function (item) {return item.itemId = itemId});
            cb(item);
        });
    },

    getHeroInfo: function(heroId, cb){
        var rq = {"Hero_GetInfo_Req": {"characterId": null}};
        server.call(rq, function(rs){
            var hero = _.find(session.getRs('Hero_GetInfo_Res').heroes, function(hero){ return hero.id == heroId; });
            cb(hero);
        }, true);
    },

    maximizeSoldiers: function(cb) {
        if( !settings.get().maximizeEnabled ) { cb(); return; }
        var rq = {"Hero_DeploySoldierAllMax_Req": {"characterId": null}};
        server.call(rq, function(rs){
            cb && cb();
        });
    }


}
