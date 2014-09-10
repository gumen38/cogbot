server = require('./server');
log = require('./log');
ui = require('./ui');
strategy = require('./strategy');

function status(msg) { log.info(msg); model.currentState = msg; ui.update('fullauto');}

var model = {
    currentState: "",
    alts: [],
    manualAlt: 0,
    plan: [],
    waitingForGameStart: false
};

function init(){
    var altsList = settings.chars.alts.split(',');
    _.each(altsList, function(altName){
        if(altName.indexOf('[') != -1 ){
            var name = altName.replace(/\[.*\]/, '');
            var range = altName.split('[')[1].split(']')[0].split('-');
            range[0] = parseInt(range[0]);
            range[1] = parseInt(range[1]);

            for( var i = range[0]; i <= range[1]; i++ ){
                model.alts.push(name + i);
            }
        } else {
            model.alts.push(altName);
        }
    });

    _.each(_.keys(settings.schedule.plan), function(interval){
        var from = interval.split('-')[0];
        var to = interval.split('-')[1];
        from = { hour: parseInt(from.split(':')[0]), min: parseInt(from.split(':')[1]) };
        to = { hour: parseInt(to.split(':')[0]), min: parseInt(to.split(':')[1]) };
        model.plan.push({
            from: from,
            to: to,
            code: settings.schedule.plan[interval]
        });
    });

    setInterval(function(){
        checkSchedule();
    }, 10*1000);
}

init();


function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function checkSchedule(){
    if( settings.schedule.enable ){

        var time = new Date();
        var hour = time.getHours();
        var min = time.getMinutes();

        var activePlan = _.find(model.plan, function(plan){ 
            var planStart = plan.from.hour * 60 + plan.from.min;
            var planEnd = plan.to.hour * 60 + plan.to.min;
            var now = hour*60+min;
            return planStart <= now && planEnd >= now;
        });
        
        if( activePlan ) {
            model.activePlan = activePlan;
            proceedPlan();
        }
    }
}
function proceedPlan(){
    var plan = model.activePlan;

    if( !plan ) return;

    status("Proceeding plan " + plan.code);

    if( plan.code == 'altroutine' ){
        if( !plan.currAlt ) plan.currAlt = 0;
        if( plan.switchingStarted && (plan.switchingStarted - new Date().getTime() < 1000*60*5) ) {
            return;
        }
        switchalt(plan.currAlt);
    }
    if( plan.code == 'reset' ){
        _.each(model.plan, function(plan){
            if( plan.code == 'altroutine' ){
                plan.currAlt = 0;
                plan.switchingStarted = null;
            }
            if( plan.code == 'island100' ){
                plan.active = false;
            }
        });
    }
    if( plan.code == 'island100' ){
        if( plan.active ) return;
        plan.active = true;
        var mainIndex = _.indexOf(model.alts, settings.chars.main);
        switchalt(mainIndex);
    }
}
function forcePlan(planName){
    if( settings.schedule.enable ) {
        status("Scheduler is active, can't force plan manually");
    } else {
        model.activePlan = {
            code: planName
        };
        proceedPlan();
    }
}

function doMonsterIsland(level){
    var monsters = { 100: [
        4935001, 4935009, 4935003, 4935011,
        4935005, 4935006, 4935007, 4935008,
        4935002, 4935010, 4935004, 4935012
    ]};

    function doMonster(monId, cb){
        server.call({"PetIsland_AttackMonster_Req":{"characterId":null,"lose":null,"monsterId": monId}}, function(){
            server.call({"Battle_Finish_Req":{"characterId":null,"serialNo":1826}}, function(){
                strategy.maximizeSoldiers(cb);
            });
        });
    }

    var i = 0;
    var clears = 0;
    function rec(){
        status("Island " + i + "/" + (clears+1));
        if( i==0 ){
            server.call({"PetIsland_Enter_Req":{"level":level,"characterId":null}}, irec);
        } else {
            irec();
        }
        function irec(){
            doMonster(monsters[level][i], function(){
                i++;
                if( i<12 ) {
                    rec();
                } else {
                    clears++;
                    if( clears == 2 ) {
                        status("Island cleared 2 times");
                        return;
                    }
                    status("Island resetting");
                    server.call({"PetIsland_ResetCopy_Req":{"level":level,"characterId":null}}, function(){
                        i = 0;
                        rec();
                    });
                }
            })
        }

    }
    rec();
}

function onGameLoaded(){
    var plan = model.activePlan;
    if( plan && plan.code == 'altroutine' ){
        server.call({"Character_SignIn_Req": {"characterId": null}},
            function () {
                server.call({"FortuneWheel_GetInfo_Req":{"type":1,"characterId":null}}, function(){
                    server.call({"FortuneWheel_Stop_Req":{"type":1, "useItem":0, "characterId":null}}, function(){
                        server.call({"PreResource_HarvestAll_Req":{"characterId":server.getCharacterId()}}, function(){
                            server.call({"CashCow_ShakeCash_Req":{"characterId":null}}, function(){
                                server.call({"Group_GetCharacterGroupInfo_Req":{"characterId":null}}, function(allianceInfoRs){
                                    server.call({"Group_GroupDailyAward_Req":{"characterId":null, "groupId": allianceInfoRs.Group_GetCharacterGroupInfo_Res.id}}, function(){
                                        server.call({"Group_GroupColonyAward_Req":{"characterId":null, "groupId": allianceInfoRs.Group_GetCharacterGroupInfo_Res.id}}, function(){

                                            plan.currAlt++;
                                            if( plan.currAlt >= model.alts.length ){
                                                plan.currAlt = null;
                                                return;
                                            }
                                            switchalt(model.activePlan.currAlt);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        );
    }
    if( plan && plan.code == 'island100' ){
        setTimeout(function(){ doMonsterIsland(100) }, 5000);
    }
}

function switchalt(index) {

    var plan = model.activePlan;
    if( plan && plan.code == 'altroutine' ){
        plan.switchingStarted = new Date().getTime();
    }

    status('Switching to alt ' + model.alts[index] + "(" + index + ")");

    if (index < 0 || index >= model.alts.length ) { log.info('Alt does not exist'); return; }

    model.waitingForGameStart = false;
    if (ui.getSocket()) ui.getSocket().emit('loguser', { name: model.alts[index], pwd: settings.chars.password});
}

_.extend(module.exports, {
    model: function () {
        return model;
    },
    control: function (data) {
        if (data.alts == 'next') {
            if( model.activePlan ){
                status('Scheduler is active now, can`t force alt switch...');
                return;
            }
            if( model.manualAlt<=(model.alts.length-1)) model.manualAlt++;
            switchalt(model.manualAlt);
        }
        if (data.alts == 'prev') {
            if( model.activePlan ){
                status('Scheduler is active now, can`t force alt switch...');
                return;
            }
            if( model.manualAlt>0 ) model.manualAlt--;
            switchalt(model.manualAlt);
            status('Alt swiching...');
        }
        if( data.force ){
            forcePlan(data.force);
        }
        if (data.loaded) {
            model.waitingForGameStart = true;
        }
    },
    gameRequestDetected: function () {
        if (model.waitingForGameStart ) {
            model.waitingForGameStart = false;
            onGameLoaded();
        }
    }
});