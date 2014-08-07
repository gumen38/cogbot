fs = require('fs');
mkdirp = require('mkdirp');
server = require('./server');
log = require('./log');
ui = require('./ui');

var model = {
    folder: __dirname + '/strategies' + settings.player.characterId + '/',
    sync: false,
    deploy: {},
    assigns: {},
    changed: false,
    loaded: false,
    heroDetails: {},
    strategyCode: "",
    depleted: [],
    soldiersData: JSON.parse(fs.readFileSync("./server/soldiers.json", "utf8")),
    status: ""
};

function status(msg) {
    log.info(msg);
    model.status = msg;
    ui.update('strategy');
}

function assertSync() {
    if (!model.sync) status('Strategy data is not synchronized yet');
    return model.sync;
}

function recordDeploy(response) {
    if (!assertSync()) return;
    model.deploy = response;
    status('Current formation updated.');
}

function recordAssign(response) {
    if (!assertSync()) return;
    normalizeDeploy();
    model.assigns[response.Hero_DeploySoldier_Req.id] = response;
    status('Soldier assigns updated.');
}

function saveRecord(code) {
    if (!assertSync()) return;
    mkdirp(model.folder);
    if (fs.existsSync(model.folder + code)) status("Strategy " + code + " exists, it will be overwritten.");
    normalizeDeploy();
    fs.writeFileSync(model.folder + code, JSON.stringify({ deploy: model.deploy, assigns: model.assigns }), 'utf8');
    status("Current strategy was saved as \'" + code + "\' strategy");
}

function normalizeDeploy() {
    if (!assertSync()) return;
    var newAssigns = {};
    _.each(_.keys(model.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy), function (key) {
        var heroId = model.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy[key];
        if (heroId != -1) {
            newAssigns[heroId] = model.assigns[heroId];
        }
    });
    model.assigns = newAssigns;

}

function loadRecord(code, cb) {
    if (!assertSync()) return;
    model.strategyCode = code;

    var strategyExists = fs.existsSync(model.folder + code);
    var isDefault = code == 'default';


    if (!strategyExists) {
        if (isDefault) {
            status('Primary default strategy is not defined. Loading cancelled.');
            cb && cb();
            return;
        } else {
            status('Primary strategy ' + code + ' is not defined. Will use default strategy.');
            loadRecord('default', cb);
            return;
        }
    }

    var record = JSON.parse(fs.readFileSync(model.folder + code, 'utf8'));
    model.deploy = record.deploy;
    model.assigns = record.assigns;
    model.depleted = [];
    apply(cb);
}

var heroInfo = null;
function apply(cb) {
    status('Applying strategy ' + model.strategyCode);
    status('Synchronizing formation...');

    if( heroInfo == null ){
        server.call([
            {"HeroSet_GetInfo_Req": {"characterId": null }},
            {"Hero_GetInfo_Req": {"characterId": null }}
        ], function(rs){
            heroInfo = rs;
            applyProc(rs);
        });
    } else {
        applyProc(heroInfo);
    }

    function applyProc(rs) {

        if (!_.isEqual(model.deploy.HeroSet_SetTroopStrategy_Req.attackTroopStrategy, rs.HeroSet_GetInfo_Res.attackTroopStrategy)) {
            status('Deploy was changed, applying...');
            heroInfo = null;
            server.call(model.deploy, function(rs) {
                if( rs.HeroSet_SetTroopStrategy_Res.ret != 0 ) {
                    status("Strategy setting error");
                    return;//todo - block call
                } else {
                    assign()
                }
            });
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

                if (assigns[heroId].Hero_DeploySoldier_Req.soldierId != model.assigns[heroId].Hero_DeploySoldier_Req.soldierId || model.depleted[assigns[heroId].Hero_DeploySoldier_Req.soldierId]) {

                    status('Assign for hero ' + model.heroDetails[heroId].name + ' was changed, applying...');
                    var rsHero = _.find(rs.Hero_GetInfo_Res.heroes, function (hero) {
                        return hero.id == heroId
                    });

                    var soldierData = model.soldiersData[model.assigns[heroId].Hero_DeploySoldier_Req.soldierId];
                    if (!soldierData || !soldierData.size) {
                        log.info("WARNING: Soldier " + model.assigns[heroId].Hero_DeploySoldier_Req.soldierId + " size is not defined. Using size 3.");
                    }
                    var soldierSize = soldierData ? soldierData.size : 3;
                    model.assigns[heroId].Hero_DeploySoldier_Req.soldierCount = ~~((rsHero.leadershipBase + rsHero.leadershipAdd) / soldierSize);

                    queue.push(model.assigns[heroId]);
                }
            });


            function execAssign(pos) {
                status("Executing assign " + pos);
                server.call(queue[pos], function (rs, msgs) {
                    if (rs && ( rs.Hero_DeploySoldier_Res.retMsg == "CHARACTER_SOLDIER_NOT_ENOUGH" || rs.Hero_DeploySoldier_Res.retMsg == "CHARACTER_SOLDIER_NOT_EXIST"))  {
                        model.depleted.push(queue[pos].Hero_DeploySoldier_Req.soldierId);
                        status('Not enough soldiers');
                    } else if (rs && msgs.characterHero && msgs.characterResource && msgs.characterHero.id == heroId) {
                        assertSoldiers(msgs.characterResource);
                    }

                    if (pos == queue.length - 1) {
                        model.changed = false;
                        model.loaded = true;
                        status('Soldiers were assigned');
                        cb && cb();
                    } else {
                        execAssign(pos + 1);
                    }
                })
            }

            if (queue.length != 0) {
                status(queue.length + " assigns to do");
                heroInfo = null;
                execAssign(0);
            } else {
                changed = false;
                loaded = true;
                status('Assigns were not changed');
                cb && cb();
            }

        }
    }
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
        model.deploy = {"HeroSet_SetTroopStrategy_Req": {
            attackTroopStrategy: rs.HeroSet_GetInfo_Res.attackTroopStrategy,
            defenceTroopStrategy: rs.HeroSet_GetInfo_Res.defenceTroopStrategy,
            attackTroopStrategyId: rs.HeroSet_GetInfo_Res.attackTroopStrategyId,
            defenceTroopStrategyId: rs.HeroSet_GetInfo_Res.defenceTroopStrategyId
        }};
        model.assigns = [];
        _.each(rs.Hero_GetInfo_Res.heroes, function (hero) {
            model.assigns[hero.id] = {"Hero_DeploySoldier_Req": {"id": hero.id, "soldierId": hero.soldierId, "soldierCount": hero.soldierCount }};
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
        assertSoldiers(rs.Object_Change_Notify_characterResource);
        cb && cb();
    });
}

function assertSoldiers(msg) {
    if (!msg) return;
    _.each(msg.soldiers, function (soldier) {
        if (soldier.undeployed == 0 && soldier.deployed > 0) {
            model.depleted.push(soldier.id);
            status('Soldier depleted: ' + soldierName(soldier.id));
        }
    })
}

function resetDepleted() {
    model.depleted = [];
    ui.update('strategy');
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
        return model.depleted.length > 0;
    },
    haveStrategy: function (code) {
        return fs.existsSync(model.folder + code);
    },
    model: function () {
        return model;
    },
    control: function (data) {
        if (data.save) saveRecord(data.save);
        if (data.load) loadRecord(data.load);
        if (data.reset) resetDepleted();
    },
    resetDepleted: resetDepleted
});

function soldierName(id) {
    if (model.soldiersData[id]) return model.soldiersData[id].name;
    else {
        return '(Unknown:' + id + ')';
    }
}