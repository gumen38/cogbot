fs = require('fs');
mkdirp = require('mkdirp');
server = require('./server');
settings = require('./settings');
log = require('./log');
ui = require('./ui');

var ready = false;
var record = {};
var changed = false;
var loaded = false;
var heroDetails = {};
var strategyCode = "";
var depleted = null;
var inventoryFull = false;
var soldiersData = JSON.parse(fs.readFileSync("./server/soldiers.json", "utf8"));

var statusMsg = "";
function status(msg) {
    log.info(msg);
    statusMsg = msg;
    ui.update('strategy');
}

function recordDeploy(rs) {
    if (!ready) return;
    record.deploy = rs;
    status('Strategy updated.');
}

function recordAssign(rs) {
    if (!ready) return;
    normalizeDeploy();
    record.assigns[rs.Hero_DeploySoldier_Req.id] = rs;
    status('Strategy updated.');
}

function saveRecord(code) {
    if (!ready) return;
    mkdirp(__dirname + '/strategies/');
    if (fs.existsSync(__dirname + '/strategies/' + code)) status("Strategy " + code + " exists, it will be overwritten.");
    normalizeDeploy();
    fs.writeFileSync(__dirname + '/strategies/' + code, JSON.stringify(record), 'utf8');
    status("Current strategy was saved as \'" + code + "\' strategy");
}

function normalizeDeploy() {
    var newAssigns = {};
    _.each(_.keys(record.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy), function (key) {
        var heroId = record.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy[key];
        if (heroId != -1) {
            newAssigns[heroId] = record.assigns[heroId];
        }
    });
    record.assigns = newAssigns;

}

function loadRecord(code, cb) {
    if (!ready) return;
    cb = cb || function () {
    };
    strategyCode = code;

    var recordJson;
    try {
        recordJson = fs.readFileSync(__dirname + '/strategies/' + strategyCode, 'utf8');
    } catch (e) {
        if (strategyCode != 'default') {
            status('Strategy ' + code + ' was not found, loading default.');
            loadRecord('default', cb);
            return;
        } else {
            status('Strategy load FAILED: default strategy record not found.');
            cb();
            return;
        }
    }
    record = JSON.parse(recordJson);
    if (!record) {
        status('Strategy load FAILED: can\'t read strategy file record');
        cb();
        return;
    }

    apply(cb);
}

function apply(cb) {
    cb = cb || function () {
    };
    status('Applying strategy ' + strategyCode);

    var rq = [
        {"HeroSet_GetInfo_Req": {"characterId": null }},
        {"Hero_GetInfo_Req": {"characterId": null }}
    ];

    status('Synchronizing formation...');
    server.call(rq, function (rs) {
        if (!_.isEqual(record.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy, rs.HeroSet_GetInfo_Res.attackTroopStrategy)) {
            status('Deploy was changed, applying...');
            server.call(record.deploy, assign);
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
            _.each(_.keys(record.assigns), function (heroId, index) {

                if (assigns[heroId].Hero_DeploySoldier_Req.soldierId != record.assigns[heroId].Hero_DeploySoldier_Req.soldierId) {
                    status('Assign for hero ' + heroDetails[heroId].name + ' was changed, applying...');
                    var rsHero = _.find(rs.Hero_GetInfo_Res.heroes, function (hero) {
                        return hero.id == heroId
                    });

                    var soldierData = soldiersData[record.assigns[heroId].Hero_DeploySoldier_Req.soldierId];
                    if (!soldierData || !soldierData.size) {
                        log.info("WARNING: Soldier " + record.assigns[heroId].Hero_DeploySoldier_Req.soldierId + " size is not defined. Using size 3.");
                    }
                    var soldierSize = soldierData ? soldierData.size : 3;

                    record.assigns[heroId].Hero_DeploySoldier_Req.soldierCount = ~~(rsHero.soldierCount / soldierSize);
                    var rsHero = _.find(rs.Hero_GetInfo_Res.heroes, function (hero) {
                        return hero.id == heroId
                    });

                    record.assigns[heroId].Hero_DeploySoldier_Req.soldierCount = ~~(rsHero.soldierCount / soldierSize);

                    queue.push(record.assigns[heroId]);
                }
            });


            function execAssign(pos) {
                status("Executing assign " + pos);
                server.call(queue[pos], function (rs, msgs) {
                    if (rs && rs.Hero_DeploySoldier_Res.retMsg == "CHARACTER_SOLDIER_NOT_ENOUGH") {
                        depleted = 'x' + (soldiersData[rs.soldierId] ? soldiersData[rs.soldierId].name : rs.soldierId);
                        status('Not enough soldiers');
                        cb();
                    } else if (rs && msgs.characterHero && msgs.characterResource && msgs.characterHero.id == heroId) {
                        var soldierId = msgs.characterHero.attrs.soldierId;
                        var soldierInfo = _.find(msgs.characterResource.attrs.soldiers, function (soldier) {
                            return soldier.id == soldierId;
                        });
                        if (soldierInfo && soldierInfo.undeployed == 0 && soldier.deployed > 0) {
                            depleted = soldiersData[soldierId] ? soldiersData[soldierId].name : soldierId;
                            status('Soldiers depleted');
                            cb();
                        }
                    } else {
                        depleted = null;
                    }

                    if (pos == queue.length - 1) {
                        changed = false;
                        loaded = true;
                        status('Soldiers were assigned');
                        cb();
                    } else {
                        execAssign(pos + 1);
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
    if (ready) {
        status('Strategy module was already initialized.');
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

function maximizeSoldiers(cb) {
    if (!settings.get().maximize.enabled) {
        cb();
        return;
    }
    var rq = {"Hero_DeploySoldierAllMax_Req": {"characterId": null}};
    server.call(rq, function (rs) {
        log.info("Maximized soldiers");

        if (rs.Object_Change_Notify_characterHero) {
            var soldierId = rs.Object_Change_Notify_characterHero.attrs.soldierId;
            var soldierInfo = _.find(rs.Object_Change_Notify_characterResource.attrs.soldiers, function (soldier) {
                return soldier.id == soldierId;
            });
            if (soldierInfo && soldierInfo.undeployed == 0) {
                depleted = soldiersData[soldierId] ? soldiersData[soldierId].name : soldierId;
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
            depleted = soldiersData[soldier.id] ? soldiersData[soldier.id].name : soldier.id;
            status('Soldiers depleted: ' + depleted);
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
        return !!depleted;
    },
    haveStrategy: function (code) {
        try {
            fs.readFileSync(__dirname + '/strategies/' + code, 'utf8');
            return true;
        } catch (e) {
            return false;
        }
    },
    model: function () {
        return { statusMsg: statusMsg, record: record, heroDetails: heroDetails, soldierNames: soldiersData, ready: ready, depleted: depleted, loaded: loaded, changed: changed, strategyCode: strategyCode };
    },
    control: function (data) {
        if (data.save) {
            if (data.save == 'wboss') {
                saveRecord('wboss');
            }
            if (data.save == 'default') {
                saveRecord('default');
            }
        }
        if (data.load) {
            if (data.load == 'default') {
                loadRecord('default');
            }
        }
    },
    resetDepleted: function () {
        depleted = null;
    }
})