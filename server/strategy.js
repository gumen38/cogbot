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
var soldierNames = JSON.parse(fs.readFileSync("./server/soldiers.json", "utf8"));

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
     cleanup();
    record.assigns[rs.Hero_DeploySoldier_Req.id] = rs;
    changed = true;
    refreshUi();
}

function saveRecord(code) {
    if (!ready) return;
    if( settings.get().save.disabled ) { log.main('Strategy was NOT saved: all saving was disabled'); return; }

    mkdirp(__dirname + '/strategies/');

    var exists = fs.existsSync(__dirname + '/strategies/' + code);
    if( exists ) log.main("Strategy " + code + " exists, it will be overwritten.");

    cleanup();
    fs.writeFileSync(__dirname + '/strategies/' + code, JSON.stringify(record), 'utf8');
    saveInfo = "Current strategy was saved as \'" + code + "\' strategy";
    log.main(saveInfo);
}

function cleanup() {

    var newAssigns = {};
    _.each(_.keys(record.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy), function(key) {
        var heroId = record.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy[key];
        if( heroId!=-1 ) {
            newAssigns[heroId] = record.assigns[heroId];
        }
    });
    record.assigns = newAssigns;

}

var previousRecordJson = null ;
function loadRecord(code, cb) {
    cb = cb || function() {};
    strategyCode = code;

    if (!ready) return;
    if (settings.get().load.disabled) { log.main('Strategy was NOT loaded: all loading was disabled'); cb(); return; }

    var recordJson;
    try { recordJson = fs.readFileSync(__dirname + '/strategies/' + code, 'utf8'); } catch (e) {
        log.main('Strategy ' + code + ' was not found, loading will be cancelled.'); cb(); return;
    }
    if( previousRecordJson && previousRecordJson == recordJson ) {
        if (previousRecordJson == recordJson) { log.main('Strategy ' + code + ' was loaded but not applied: current strategy is same.'); cb(); return; }
    }
    previousRecordJson = recordJson;

    record = JSON.parse(recordJson);
    if( !record ) { log.main('Strategy was NOT loaded: can\'t read strategy record from file'); cb(); return; }

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
        _.each(_.keys(record.assigns), function (heroId) {
            server.call(record.assigns[heroId], function (rs) {
                if (++count == _.keys(record.assigns).length) {
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
        record.deploy = {"HeroSet_SetTroopStrategy_Req": {
            attackTroopStrategy: rs.HeroSet_GetInfo_Res.attackTroopStrategy,
            defenceTroopStrategy: rs.HeroSet_GetInfo_Res.defenceTroopStrategy,
            attackTroopStrategyId: rs.HeroSet_GetInfo_Res.attackTroopStrategyId,
            defenceTroopStrategyId: rs.HeroSet_GetInfo_Res.defenceTroopStrategyId
        }};
        record.assigns = [];
        _.each(rs.Hero_GetInfo_Res.heroes, function (hero) {
            record.assigns[hero.id] = {"Hero_DeploySoldier_Req": {"id": hero.id, "soldierId": hero.soldierId, "soldierCount": hero.soldierCount }};
            heroDetails[hero.id] = { name: hero.name };
        });
        ready = true;
        refreshUi();
    })
}


events.on('server-ready', init);
function refreshUi(){
    events.emit('strategy-update', template({ saveInfo: saveInfo, record: record, heroDetails: heroDetails, soldierNames: soldierNames, ready: ready, loaded: loaded, changed: changed, strategyCode: strategyCode }));
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
    scheduleSave: scheduleSave,
    getSchedule: function(){ return scheduled; }
}