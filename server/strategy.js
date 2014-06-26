fs = require('fs');
mkdirp = require('mkdirp');
server = require('./server');
settings = require('./settings');
log = require('./log');
ui = require('./ui');

var template = _.template(fs.readFileSync(__dirname + '/ui/strategy.html').toString());
var ready = false;
var record = {};
var changed = false;
var loaded = false;
var heroDetails = {};
var strategyCode = "";
var soldierNames = JSON.parse(fs.readFileSync("./server/soldiers.json", "utf8"));

var statusMsg = "";
function status(msg) {
    log.info(msg);
    statusMsg = msg;
    ui.update('strategy');
}


function recordDeploy(rs) {
    if (!ready) return;
    record.deploy = rs;
    changed = true;
    status('Strategy updated.');
}

function recordAssign(rs) {
    if (!ready) return;
    cleanup();
    record.assigns[rs.Hero_DeploySoldier_Req.id] = rs;
    changed = true;
    status('Strategy updated.');
}

function saveRecord(code) {
    if (!ready) return;
    if( settings.get().save.disabled ) { status('Strategy was NOT saved: all saving was disabled'); return; }
    mkdirp(__dirname + '/strategies/');
    var exists = fs.existsSync(__dirname + '/strategies/' + code);
    if( exists ) status("Strategy " + code + " exists, it will be overwritten.");
    cleanup();
    fs.writeFileSync(__dirname + '/strategies/' + code, JSON.stringify(record), 'utf8');
    previousRecordJson = null;
    status("Current strategy was saved as \'" + code + "\' strategy");
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
    if (settings.get().load.disabled) { status('Strategy was NOT loaded: all loading was disabled'); cb(); return; }

    var recordJson;
    try {
        recordJson = fs.readFileSync(__dirname + '/strategies/' + code, 'utf8');
    } catch (e) {
        status('Strategy ' + code + ' was not found, loading default.');
        try {
            recordJson = fs.readFileSync(__dirname + '/strategies/default', 'utf8');
            code = "default";
            strategyCode = code;
        } catch (e) {
            status('Strategy default was not found, loading cancelled.');
            cb(); return;
        }
    }
    if( previousRecordJson && previousRecordJson == recordJson ) {
        if (previousRecordJson == recordJson) { status('Strategy ' + code + ' was loaded but not applied: current strategy is same.'); cb(); return; }
    }
    previousRecordJson = recordJson;

    record = JSON.parse(recordJson);
    if( !record ) { status('Strategy was NOT loaded: can\'t read strategy record from file'); cb(); return; }

    status('Applying strategy ' + code);
    apply(cb);
}

function apply(cb) {
    cb = cb || function() {};

    server.call(record.deploy, function () {
        var count = 0;
        _.each(_.keys(record.assigns), function (heroId) {
            server.call(record.assigns[heroId], function (rs) {
                if (++count == _.keys(record.assigns).length) {
                    changed = false;
                    loaded = true;
                    status('Strategy was applied');
                    cb();
                }
            })
        });
    })
}

function init() {
    status('Strategy module initialization: loading current deploy and soldier assigments...');
    if (ready) { status('Strategy module was already initialized.'); return; }
    reloadDeploy();
}

function reloadDeploy() {
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
        status('Strategy module initialized.');
    })
}

_.extend(module.exports, {
    init: init,
    recordAssign: recordAssign,
    recordDeploy: recordDeploy,
    saveRecord: saveRecord,
    loadRecord: loadRecord,
    haveStrategy: function(code){
        try { fs.readFileSync(__dirname + '/strategies/' + code, 'utf8'); return true; } catch(e) { return false; }
    },
    model: function(){
        return { statusMsg: statusMsg, record: record, heroDetails: heroDetails, soldierNames: soldierNames, ready: ready, loaded: loaded, changed: changed, strategyCode: strategyCode };
    },
    control: function(data){
        if( data.save ){
            if( data.save == 'wboss' ) { saveRecord('wboss'); }
            if( data.save == 'default' ) { saveRecord('default'); }
        }
        if( data.load ){
            if( data.load == 'default' ) { loadRecord('default'); }
        }
    }
})