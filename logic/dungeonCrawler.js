function enterDungeon() {

    server.do({"body": [
        {"Adventure_GetInfo_Req": {"serialNo": 543, "characterId": null}}
    ], "session": session.id}, function (rs) {
        var freeKeysLeft = session.getRs("Adventure_GetInfo_Res").keyCount;
        var dungKeysLeft = session.getItemInfo("5104010").count;
        var keysUsed = session.getRs("Adventure_GetInfo_Res").keyUseCount;

        if (keysUsed >= 6 || (freeKeysLeft == 0 && dungKeysLeft == 0 )) {
            server.setStatus("active");
            console.log("CANT DO ANY MORE DUNGEONS TODAY");
            return;
        }

        var enterDungeonRq = {
            "body": [
                {
                    "Adventure_NewProgress_Req": {
                        "characterId": null,
                        "difficulty": settings.difficulty,
                        "serialNo": 132,
                        "mapId": settings.mapId,
                        "isLimitedTime": 0,
                        "cityId": settings.cityId
                    }
                }
            ], "session": session.id
        };
        server.do(enterDungeonRq, function (rs) {
            assert.success(rs[0].Adventure_NewProgress_Res.retMsg);
            map = new Map(rs[0].Adventure_NewProgress_Res.map);
            doCrawl();
        });
    });
}

var currentPath = null;
var currentPathIndex;

function doCrawl() {

    if (currentPath) {

        var to = currentPath[currentPathIndex];
        if (to.p == 0) {
            if (to.t == 'ev' || to.t == 'mo') {
                prepareStrategy().then(function () {
                    doStep(currentPath[currentPathIndex]);
                });
            } else if (to.t = 'bs') {
                prepareStrategy(to.mId).then(function () {
                    doStep(currentPath[currentPathIndex]);
                });
            }
        }


    }

    var unexplored = map.findUnexplored();
    if (unexplored) {
        currentPath = map.buildPathTo(unexplored, true);
        currentPathIndex = 0;
        doCrawl();
    } else {
        var exit = map.findExit();
        currentPath = map.buildPathTo(unexplored, false);
        currentPathIndex = 0;
        doCrawl();
    }
}

function doStep(to) {
    var moveRq = {
        "body": [
            {
                "Adventure_MapMove_Req": {
                    "optional": null,
                    "point": parseInt(to.y + "" + to.x),
                    "characterId": null,
                    "serialNo": 199
                }
            }
        ], "session": session.id
    };
    server.do(moveRq, function (rs) {
        assert.success(rs[0].Adventure_MapMove_Res.retMsg);

        if (rs[0].Adventure_MapMove_Res && rs[0].Adventure_MapMove_Res.result && rs[0].Adventure_MapMove_Res.result.winner != 'attacker') {
            console.log("LOST FIGHT");
            server.stop();
        }

        var mapMsg = _.find(rs[1].Notify.msgs, function (msg) {
            return msg.Object_Change_Notify && msg.Object_Change_Notify.className == 'characterAdventureMap';
        });

        map.update(mapMsg.attrs);

        if (currentPathIndex == (currentPath.length - 1)) {
            currentPath = null;
        } else {
            currentPathIndex++;
        }
        doCrawl();
    })
}
