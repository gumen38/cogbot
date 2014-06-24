lib = require("./lib");
dungeon = require("./dungeon");
abyss = require("./abyss");
strategy = require("./strategy");
settings = require("./settings");
module.exports = {
    'Battle_AttackMonster_Req': function(rq, cb){
        if( settings.get().load.atBattle ) {
            strategy.loadRecord('default', function() {
                lib.maximizeSoldiers(cb);
            });
        } else {
            lib.maximizeSoldiers(cb);
        }
    },
    'WorldBossBattle_Challenge_Req': function(rq, cb) {
        if( settings.get().load.atWboss ){
            strategy.loadRecord('wboss', function(){
                lib.maximizeSoldiers(cb);
            })
        } else {
            lib.maximizeSoldiers(cb);
        }
    },
    'Adventure_MapMove_Req': function(rq, cb){
        dungeon.prepareForPoint(rq.point, cb);
    },
    'Adventure_MapPreMove_Req': function(rq, cb) {
        dungeon.earlyPrepareForPoint(rq.point, cb);
    },
    'PurgatoryAbyss_Challenge_Req': function(rq, cb){
        abyss.prepareForFight(rq, cb);
    },
    'HeroSet_SetTroopStrategy_Req': function(rq, cb, fullRq){
        strategy.recordDeploy(fullRq);
        cb();
    },
    'Hero_DeploySoldier_Req': function(rq, cb, fullRq){
        strategy.recordAssign(fullRq);
        cb();
    }
}