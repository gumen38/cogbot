lib = require("./lib");
dungeon = require("./dungeon");
abyss = require("./abyss");
strategy = require("./strategy");
inventory = require("./inventory");
server = require("./server");
fullauto = require("./fullauto");

module.exports = {
    'Battle_AttackMonster_Req': function(rq, cb){
        strategy.loadRecord('default', function() {
            strategy.maximizeSoldiers(cb);
        });
    },
    'WorldBossBattle_Challenge_Req': function(rq, cb) {
        strategy.loadRecord('wboss', function(){
            strategy.maximizeSoldiers(cb);
        })
    },
    'Adventure_MapMove_Req': function(rq, cb){
        dungeon.enter(rq.point, cb);
    },
    'Adventure_MapPreMove_Req': function(rq, cb) {
        dungeon.enter(rq.point, cb, true);
    },
    'Adventure_QuitProgress_Res': function(rq, cb){
        dungeon.reset();
    },
    'HeroSet_SetTroopStrategy_Req': function(rq, cb, fullRq){
        strategy.recordDeploy(fullRq);
        cb();
    },
    'Hero_DeploySoldier_Req': function(rq, cb, fullRq){
        strategy.recordAssign(fullRq);
        cb();
    },
    'PurgatoryAbyss_Challenge_Req': function(rq, cb){
        abyss.prepare(function(){
            if( strategy.isDepleted() ){
                server.setBlock('[{"PurgatoryAbyss_Challenge_Res":{"result":[],"ret":10011,"retMsg":"CHARACTER_ENERGY_NOT_ENOUGH","serialNo":392}}]')
            }
            cb();
        });
    },

    'Item_Sell_Req': function(rq, cb){
        inventory.onItemSold(rq.id);
        cb();
    },

    'Character_GetInfo_Req': function(rq, cb) {
        fullauto.gameRequestDetected();
        cb();
    }
};