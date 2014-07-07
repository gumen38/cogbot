server = require("./server");
log = require("./log");

_.extend(module.exports,{
    getItemInfo: function(itemId, cb) {
        var rq = {"Item_GetInfo_Req": {"type": -1, "characterId": settings.player.characterId}};
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
    }

})