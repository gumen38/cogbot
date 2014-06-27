lib = require("./lib");
dungeon = require("./dungeon");
abyss = require("./abyss");
strategy = require("./strategy");
settings = require("./settings");
task = require("./task");

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
    'City_NpcTaskAccept_Req': function(rq, cb, fullRq){
        //task.saveAccept(rq);
        cb();
    },
    'City_NpcTaskFinish_Req': function(rq, cb, fullRq){
        //task.saveFinish(rq);
        cb();
    },
    global: function(rq, cb, fullRq){
        task.saveRq(rq, fullRq);
        cb();
    }

}