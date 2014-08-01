fs = require('fs');
ui = require('./ui');
server = require('./server');
strategy = require('./strategy');

_.extend(module.exports, {

    control: function (params) {
        if (params.wboss) {
            function rep() {
                log.info('Wboss attack attempt...');
                ui.update('settings');
                server.call({"WorldBossBattle_Challenge_Req": {"characterId": null}}, function (rs) {
                    if (rs.WorldBossBattle_Challenge_Res.retMsg == 'WORLD_BOSS_BATTLE_IS_NOT_BEGIN') {
                        rep();
                    }
                });
            }

            rep();
        }
        if (params.sunfire60) {
            function doit() {

                strategy.maximizeSoldiers(function () {
                    server.call({"BattleMonsterTeam_Enter_Req": {"characterId": null, "monsterId": 4938113}}, function (rs) {
                        server.call({"BattleMonsterTeam_CreateTeam_Req": {"characterId": null, "desc": "Let&#39;s beat monsters!"}}, function (rs2) {
                            server.call({"BattleMonsterTeam_Start_Req": {"characterId": null}}, function (rs3, msgs) {
                            });
                        });
                    });
                });

            }
        }
    },
    model: function () {
        return { model: {} };
    }
});

function merge(old, neu) {
    for (var prop in neu)
        if (_.isObject(neu[prop])) {
            if (prop in old) {
                merge(old[prop], neu[prop])
            } else {
                old[prop] = neu[prop];
            }
        } else {
            old[prop] = neu[prop];
        }
    return old;
}