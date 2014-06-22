var lastTactics = null;
var Strategy = function (tactics) {

    tactics = tactics || new Tactics();


    var setDeploy = function (cb) {
        if (lastTactics == tactics) {
            return;
        }
        var rq = {
            "body": [
                {"HeroSet_SetTroopStrategy_Req": {"characterId": null,
                    "defenceTroopStrategy": {"21": -1, "22": 0, "23": 0, "24": 0, "11": -1, "12": 0, "13": 0, "14": 0},
                    "serialNo": 3634,
                    "attackTroopStrategyId": tactics.deployment.code,
                    "defenceTroopStrategyId": 10000010,
                    "attackTroopStrategy": tactics.deployment.map
                }}
            ], "session": session.id
        };
        server.do(rq, cb);
    };

    var assignSoldiers = function (cb) {
        if (lastTactics == tactics) {
            return;
        }

        var rq = {
            "body": [
                {"Hero_DeploySoldier_Req": {"soldierId": tactics.hero[0].soldierId, "characterId": null, "soldierCount": 1, "serialNo": 3665, "id": tactics.hero[0].id}},
                {"Hero_DeploySoldier_Req": {"soldierId": tactics.hero[1].soldierId, "characterId": null, "soldierCount": 1, "serialNo": 3665, "id": tactics.hero[1].id}},
                {"Hero_DeploySoldier_Req": {"soldierId": tactics.hero[2].soldierId, "characterId": null, "soldierCount": 1, "serialNo": 3665, "id": tactics.hero[2].id}},
                {"Hero_DeploySoldier_Req": {"soldierId": tactics.hero[3].soldierId, "characterId": null, "soldierCount": 1, "serialNo": 3665, "id": tactics.hero[3].id}},
                {"Hero_DeploySoldier_Req": {"soldierId": tactics.hero[4].soldierId, "characterId": null, "soldierCount": 1, "serialNo": 3665, "id": tactics.hero[4].id}},
                {"Hero_DeploySoldier_Req": {"soldierId": tactics.hero[5].soldierId, "characterId": null, "soldierCount": 1, "serialNo": 3665, "id": tactics.hero[5].id}}
            ]
        };
        server.do(rq, function () {
            maximizeSoldiers(cb);
        })
    };


    var recruitSoldiers = function(cb){
        var haveTroopsCard = session.getItemInfo(3243497).count > 0;

        var requiredSoldiers = {};

        _.each(tactics.hero, function(hero){
            requiredSoldiers[hero.soldierId] = requiredSoldiers[hero.soldierId] || 0;
            var heroInfo = session.getHeroInfo(hero.id);
            requiredSoldiers[hero.soldierId] += heroInfo.leadershipBase + heroInfo.leadershipAdd;
        });


        server.do({"session": id, "body": [
            {"PreResource_GetAllSoldier_Req": {"serialNo": 9214, "characterId": null}}
        ]}, function () {

            var soldiersToRecruit = [];

            var soldierInfo = {};
            _.each(getRs('Resource_GetInfo_Res').soldier, function (soldier) {
                soldierInfo[soldier.id] = soldier;
                var count = soldier.undeployed + soldier.deployed;
                if( count < requiredSoldiers[soldier.id] ){
                    soldiersToRecruit.push({
                        id: soldier.id,
                        amount: requiredSoldiers[soldier.id] - count
                    });
                }
            });

            var needTSC = false;
            _.each(soldiersToRecruit, function(soldier){
                if( getSoldierIndex(soldier.id) <= 10 &&  requiredSoldiers[soldier.id] > soldier.amount ){
                    needTSC = true;
                }
            });

            if( needTSC ){
                server.do('{"session":"i0ensb93l1c55cjc4tm05r8p24","body":[{"Item_Use_Req":{"count":1,"characterId":38729,"serialNo":246,"id":3243497}}]}',
                function(){
                    actuallyRecruitSoldiers(_.pluck(requiredSoldiers, 'id'), cb);
                })
            } else {
                actuallyRecruitSoldiers(_.pluck(requiredSoldiers, 'id'), cb);
            }
        });
    }

    function actuallyRecruitSoldiers(soldierIds, cb){
        server.do('{"PreResource_GetAllSoldier_Req":{"serialNo":305,"characterId":null}', function(rs){
            /*
            [
                {"PreResource_GetAllSoldier_Res": {"soldier": [
                    {"id": 1, "count": 2600, "maxCount": 2600, "produceRate": 8800},
                    {"id": 2, "count": 2600, "maxCount": 2600, "produceRate": 7040},
                    {"id": 3, "count": 2600, "maxCount": 2600, "produceRate": 5500},
                    {"id": 4, "count": 2600, "maxCount": 2600, "produceRate": 3960},
                    {"id": 5, "count": 2600, "maxCount": 2600, "produceRate": 2860},
                    {"id": 6, "count": 2600, "maxCount": 2600, "produceRate": 4400},
                    {"id": 7, "count": 2600, "maxCount": 2600, "produceRate": 3300},
                    {"id": 8, "count": 2600, "maxCount": 2600, "produceRate": 2640},
                    {"id": 9, "count": 2600, "maxCount": 2600, "produceRate": 1980},
                    {"id": 10, "count": 2600, "maxCount": 2600, "produceRate": 1540}
                ], "ret": 0, "retMsg": "SUCCESS", "serialNo": 305}}
            ]*/

            var recruited = 0;
            _.each(soldierIds, function(soldierId){

                var soldierInfo = _.find(rs.PreResource_GetAllSoldier_Res.soldier, function(soldier) { getSoldierId(soldier.id) == soldierId });

                server.do({"PreResource_Recruit_Req":{"count":soldierInfo.count,"characterId":null,"serialNo":612,"id":soldierId}}, function(rs){
                    assert.success(rs.PreResource_Recruit_Res);
                    recruited++;
                    if( recruited == soldierIds.length ){
                        cb();
                    }
                });

            });
        })
    }





    return {
        setDeploy: _.bind(setDeploy, this),
        assignSoldiers: _.bind(assignSoldiers, this),
        maximizeSoldiers: _.bind(maximizeSoldiers, this)
    }
}


    var map = [
        { id: 11000306, index: 6 },
        { id: 11000308, index: 8 },
        { id: 11000307, index: 7 },
        { id: 11000424, index: 19 },
        { id: 11000426, index: 16 },
        { id: 11000423, index: 13 }
    ]

function getSoldierId(soldierIndex) {

    return _.find(map, function (soldier) {
        return soldier.index == soldierIndex
    });
}

function getSoldierIndex(soldierId){
    return _.find(map, function (soldier) {
        return soldier.id == soldierId
    });
}

