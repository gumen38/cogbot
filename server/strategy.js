fs = require('fs');
mkdirp = require('mkdirp');
server = require('./server');
log = require('./log');
ui = require('./ui');

var model = {
    folder: __dirname + '/strategies' + settings.player.characterId + '/',
    sync: false,
    record: {},
    changed: false,
    loaded: false,
    heroDetails: {},
    strategyCode: "",
    depleted: null,
    soldiersData: JSON.parse(fs.readFileSync("./server/soldiers.json", "utf8")),
    status: ""
};

function status(msg) { log.info(msg); model.status = msg; ui.update('strategy'); }

function assertSync() { if (!model.sync) status('Strategy data is not synchronized yet'); return model.sync; }

function recordDeploy(response) {
    if( !assertSync() ) return;
    model.record.deploy = response;
    status('Current formation updated.');
}

function recordAssign(response) {
    if( !assertSync() ) return;
    normalizeDeploy();
    model.record.assigns[response.Hero_DeploySoldier_Req.id] = response;
    status('Soldier assigns updated.');
}

function saveRecord(code) {
    if( !assertSync() ) return;
    mkdirp(model.folder);
    if (fs.existsSync(model.folder + code)) status("Strategy " + code + " exists, it will be overwritten.");
    normalizeDeploy();
    fs.writeFileSync(model.folder + code, JSON.stringify(model.record), 'utf8');
    status("Current strategy was saved as \'" + code + "\' strategy");
}

function normalizeDeploy() {
    if( !assertSync() ) return;
    var newAssigns = {};
    _.each(_.keys(model.record.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy), function (key) {
        var heroId = model.record.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy[key];
        if (heroId != -1) {
            newAssigns[heroId] = model.record.assigns[heroId];
        }
    });
    model.record.assigns = newAssigns;

}

function loadRecord(code, cb) {
    if( !assertSync() ) return;
    cb = cb || function () {};
    model.strategyCode = code;

    if( !fs.existsSync(model.folder  + code) ) {

        if( code == 'default' ){
            status('Strategy default must be saved');
            cb();return;
        }

        if( code == 'defaultalt' ){
            status('Secondary default strategy must be saved');
            cb();return;
        }

        status('Strategy ' + code + ' was not found, loading default.');
        loadRecord('default', cb);
    } else {
        model.record = JSON.parse(fs.readFileSync(model.folder + code, 'utf8'));

        apply(cb, function(){
            status('Failed to apply strategy ' + code);
            if( !code.match(/.*alt$/) ) {
                status('Loading secondary strategy ' + code + 'alt');
                loadRecord(code + 'alt', cb);
            } else {
                status('Secondary strategy load failed');
                cb();
            }
        });
    }
}

function apply(cb, failCb) {
    cb = cb || function () {};
    status('Applying strategy ' + model.strategyCode);
    status('Synchronizing formation...');
    server.call([{"HeroSet_GetInfo_Req": {"characterId": null }},{"Hero_GetInfo_Req": {"characterId": null }}], function (rs) {

        if (!_.isEqual(model.record.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy, rs.HeroSet_GetInfo_Res.attackTroopStrategy)) {
            status('Deploy was changed, applying...');
            server.call(model.record.deploy, assign);
        } else {
            assign();
        }

        function assign() {
            status('Synchronizing assigns...');

            var assigns = {};
            _.each(rs.Hero_GetInfo_Res.heroes, function (hero) {
                assigns[hero.id] = {"Hero_DeploySoldier_Req": {"id": hero.id, "soldierId": hero.soldierId, "soldierCount": hero.soldierCount }};
            });

            var queue = [];
            _.each(_.keys(model.assigns), function (heroId, index) {

                if (assigns[heroId].Hero_DeploySoldier_Req.soldierId != model.record.assigns[heroId].Hero_DeploySoldier_Req.soldierId) {

                    status('Assign for hero ' + model.heroDetails[heroId].name + ' was changed, applying...');
                    var rsHero = _.find(rs.Hero_GetInfo_Res.heroes, function (hero) {return hero.id == heroId});

                    var soldierData = soldiersData[model.record.assigns[heroId].Hero_DeploySoldier_Req.soldierId];
                    if (!soldierData || !soldierData.size) {
                        log.info("WARNING: Soldier " + model.record.assigns[heroId].Hero_DeploySoldier_Req.soldierId + " size is not defined. Using size 3.");
                    }
                    var soldierSize = soldierData ? soldierData.size : 3;
                    model.record.assigns[heroId].Hero_DeploySoldier_Req.soldierCount = ~~(rsHero.soldierCount / soldierSize);

                    queue.push(model.record.assigns[heroId]);
                }
            });


            function execAssign(pos) {
                status("Executing assign " + pos);
                server.call(queue[pos], function (rs, msgs) {
                    if (rs && rs.Hero_DeploySoldier_Res.retMsg == "CHARACTER_SOLDIER_NOT_ENOUGH") {
                        model.depleted = model.soldiersData[queue[pos].soldierId] ? model.soldiersData[queue[pos].soldierId].name : queue[pos].soldierId;
                        status('Not enough soldiers');
                        failCb();
                    } else if (rs && msgs.characterHero && msgs.characterResource && msgs.characterHero.id == heroId) {
                        var soldierId = msgs.characterHero.attrs.soldierId;
                        var soldierInfo = _.find(msgs.characterResource.attrs.soldiers, function (soldier) {
                            return soldier.id == soldierId;
                        });
                        if (soldierInfo && soldierInfo.undeployed == 0 && soldier.deployed > 0) {
                            model.depleted = model.soldiersData[soldierId] ? model.soldiersData[soldierId].name : soldierId;
                            status('Soldiers depleted');
                            failCb();
                        }
                    } else {
                        model.depleted = null;
                        if (pos == queue.length - 1) {
                            model.changed = false;
                            model.loaded = true;
                            status('Soldiers were assigned');
                            cb();
                        } else {
                            execAssign(pos + 1);
                        }
                    }
                })
            }

            if( queue.length!=0 ) {
                status(queue.length + " assigns to do");
                execAssign(0);
            } else {
                changed = false;
                loaded = true;
                status('Assigns were not changed');
                cb();
            }

        }
    })
}

function init() {
    status('Strategy module initialization: loading current deploy and soldier assigments...');
    if (model.sync) {
        status('Strategy module was alsync initialized.');
        return;
    }
    reloadDeploy();
}

function reloadDeploy() {
    var rq = [
        {"HeroSet_GetInfo_Req": {"characterId": null }},
        {"Hero_GetInfo_Req": {"characterId": null }}
    ];
    server.call(rq, function (rs) {
        model.record.deploy = {"HeroSet_SetTroopStrategy_Req": {
            attackTroopStrategy: rs.HeroSet_GetInfo_Res.attackTroopStrategy,
            defenceTroopStrategy: rs.HeroSet_GetInfo_Res.defenceTroopStrategy,
            attackTroopStrategyId: rs.HeroSet_GetInfo_Res.attackTroopStrategyId,
            defenceTroopStrategyId: rs.HeroSet_GetInfo_Res.defenceTroopStrategyId
        }};
        model.record.assigns = [];
        _.each(rs.Hero_GetInfo_Res.heroes, function (hero) {
            model.record.assigns[hero.id] = {"Hero_DeploySoldier_Req": {"id": hero.id, "soldierId": hero.soldierId, "soldierCount": hero.soldierCount }};
            model.heroDetails[hero.id] = { name: hero.name };
        });
        model.sync = true;
        status('Strategy module initialized.');
    })
}

function maximizeSoldiers(cb) {
    var rq = {"Hero_DeploySoldierAllMax_Req": {"characterId": null}};
    server.call(rq, function (rs) {
        log.info("Maximized soldiers");

        if (rs.Object_Change_Notify_characterHero) {
            var soldierId = rs.Object_Change_Notify_characterHero.attrs.soldierId;
            var soldierInfo = _.find(rs.Object_Change_Notify_characterResource.attrs.soldiers, function (soldier) {
                return soldier.id == soldierId;
            });
            if (soldierInfo && soldierInfo.undeployed == 0 && soldier.deployed > 0) {
                model.depleted = model.soldiersData[soldierId] ? model.soldiersData[soldierId].name : soldierId;
                status('Soldiers depleted');
                cb && cb();
                return;
            }
        }

        cb && cb();
    });
}

function assertSoldiers(msg) {
    if (!msg) return;
    _.each(msg.soldiers, function (soldier) {
        if (soldier.undeployed == 0 && soldier.deployed > 0) {
            model.depleted = model.soldiersData[soldier.id] ? model.soldiersData[soldier.id].name : soldier.id;
            status('Soldiers depleted: ' + model.depleted);
        }
    })
}

_.extend(module.exports, {
    assertSoldiers: assertSoldiers,
    init: init,
    recordAssign: recordAssign,
    recordDeploy: recordDeploy,
    saveRecord: saveRecord,
    loadRecord: loadRecord,
    maximizeSoldiers: maximizeSoldiers,
    isDepleted: function () {
        return !!model.depleted;
    },
    haveStrategy: function (code) {
        try {
            fs.readFileSync(__dirname + '/' + STRATEGIES_FOLDER + '/' + code, 'utf8');
            return true;
        } catch (e) {
            return false;
        }
    },
    model: function () {
        return model;
    },
    control: function (data) {
        if (data.save) saveRecord(data.save);
        if (data.load) loadRecord(data.load);
        if (data.reset) model.depleted = null;
    },
    resetDepleted: function () {
        model.depleted = null;
    }
})