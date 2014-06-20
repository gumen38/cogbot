fs = require('fs');
mkdirp = require('mkdirp');
server = require('./server');
settings = require('./settings');
log = require('./log');
events = require('./events');

var template = _.template(fs.readFileSync(__dirname + '/ui/strategy.html').toString());
var ready = false;
var record = {};
var changed = false;
var loaded = false;
var scheduled = false;
var heroDetails = {};
var strategyCode = "";
var soldiersNames = JSON.parse(fs.readFileSync("./server/soldiers.json", "utf8"));

function getStrategyCode(isDungeon, monsterId, isAbyss, roomId, storeyId) {
    return (isDungeon ? 'D' + monsterId : '') + (isAbyss ? 'A' + storeyId + '-' + roomId : '');
}

function recordDeploy(rs) {
    if (!ready) return;
    log.main('Strategy updated.');
    record.deploy = rs;
    changed = true;
    refreshUi();
}

function recordAssign(rs) {
    if (!ready) return;
    log.main('Strategy  updated.');
    _.reject(record.assigns, function (assign) {
        assign.Hero_DeploySoldier_Req.id == rs.Hero_DeploySoldier_Req.id
    });
    record.assigns.push(rs);
    changed = true;
    refreshUi();
}

function saveRecord(code, target) {
    if (!ready) return;
    if( settings.get().save.disabled ) { log.main('Strategy was NOT saved: all saving was disabled'); return; }
    if( scheduled != target ) { log.debug('Strategy was NOT saved: target is ' + target + ' but save was scheduled for ' + scheduled); return; }

    mkdirp(__dirname + '/strategies/');

    var exists = fs.existsSync(__dirname + '/strategies/' + code);
    if( exists ) log.main("Strategy " + code + " exists, it will be overwritten.");

    cleanup();
    fs.writeFileSync(__dirname + '/strategies/' + code, JSON.stringify(record), 'utf8');
    saveInfo = "Current strategy was saved as \'" + code + "\' strategy";
    log.main(saveInfo);
}

function cleanup() {

    var deployedHeroes = {};
    _.each(_.keys(record.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy), function(key) {
        if( record.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy[key]!=-1 ) {
            deployedHeroes[record.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy[key]] = true;
        }
    });

    var newAssigns = [];
    _.each(record.assigns, function(assign){
        if( deployedHeroes[assign.Hero_DeploySoldier_Req.id] ){
            newAssigns.push(assign);
            if( assign.Hero_DeploySoldier_Req.soldierId!=0 && !assign.Hero_DeploySoldier_Req.soldierCount ){
                log.main("Soldiers number is ?");
            }
            if( assign.Hero_DeploySoldier_Req.soldierId!=0 && assign.Hero_DeploySoldier_Req.soldierCount==0 ){
                log.main("Soldiers number is 0");
            }
        }
    });

}

function loadRecord(code, cb) {
    cb = cb || function() {};
    strategyCode = code;

    if (!ready) return;
    if (settings.get().load.disabled) { log.main('Strategy was NOT loaded: all loading was disabled'); cb(); return; }

    var recordJson;
    try { recordJson = fs.readFileSync(__dirname + '/strategies/' + code, 'utf8'); } catch (e) {
        log.main('Strategy ' + code + ' was not found, loading will be cancelled.'); cb(); return;
    }

    var previousRecord = record;
    record = JSON.parse(recordJson);
    if( !record ) { log.main('Strategy was NOT loaded: can\'t read strategy record from file'); cb(); return; }

    if (_.isEqual(previousRecord, record) ) { log.main('Strategy ' + code + 'was loaded but not applied: current strategy is same.'); cb(); return; }

    log.main('Applying strategy ' + code);
    apply(cb);
}

function apply(cb) {
    cb = cb || function() {};

    if (record.deploy) {
        server.call(record.deploy, function () {
            applyAssigns();
        })
    } else {
        applyAssigns();
    }

    function applyAssigns() {
        var count = 0;
        _.each(record.assigns, function (assign) {
//            if( assign.Hero_DeploySoldier_Req.soldierId!=0 ) assign.Hero_DeploySoldier_Req.soldierCount = 1;
            server.call(assign, function () {
                if (++count == record.assigns.length) {
                    log.main('Strategy was applied');
                    changed = false;
                    loaded = true;
                    refreshUi();
                    cb();
                }
            })
        });
    }
}

function init() {
    log.main('Strategy initialization: loading current deploy and soldier assigments...');
    if (ready) { log.main('Strategy was already initialized.'); return; }
    var rq = [
        {"HeroSet_GetInfo_Req": {"characterId": null }},
        {"Hero_GetInfo_Req": {"characterId": null }}
    ];
    server.call(rq, function (rs) {
        record.deploy = {"HeroSet_SetTroopStrategy_Req": {"attackTroopStrategy": rs.HeroSet_GetInfo_Res.attackTroopStrategy}};
        record.assigns = [];
        _.each(rs.Hero_GetInfo_Res.heroes, function (hero) {
            record.assigns.push({"Hero_DeploySoldier_Req": {"id": hero.id, "soldierId": hero.soldierId, "soldierCount": hero.soldierCount }});
            var soldierName = hero.soldierId == 0 ? 'none' : (soldiersNames[hero.soldierId] ? soldiersNames[hero.soldierId] : hero.soldierId);
            heroDetails[hero.id] = { name: hero.name, soldier: soldierName };
        });
        ready = true;
        refreshUi();
    })
}


events.on('server-ready', init);
function refreshUi(){
    events.emit('strategy-update', template({ saveInfo: saveInfo, record: record, heroDetails: heroDetails, ready: ready, loaded: loaded, changed: changed, strategyCode: strategyCode }));
}
events.on('reconnect', function(){
    refreshUi();
});


var saveInfo;
function scheduleSave(type) {
    scheduled = type;
    if( type == 'default' || type == 'wboss' ){
        saveRecord(type, type);
        refreshUi();
    } else {
        saveInfo = "Current strategy will be saved on next " + (type=='boss'?'dungeon boss':'abyss room') + " battle";
        refreshUi();
    }
}

module.exports = {
    getCode: getStrategyCode,
    recordAssign: recordAssign,
    recordDeploy: recordDeploy,
    saveRecord: saveRecord,
    loadRecord: loadRecord,
    scheduleSave: scheduleSave
}