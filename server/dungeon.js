var lib = require('./lib');
var strategy = require('./strategy');
var settings = require("./settings");
var server = require("./server");
var log = require('./log');

function Cell(code, obj) {
    var result;
    if (_.isNumber(code)) result = {y: parseInt((code + "")[0]) - 1,x: parseInt((code + "")[1]) - 1};
    if (_.isString(code)) result = {y: parseInt(code[1]) - 1,x: parseInt(code[2]) - 1};
    if (_.isObject(code)) result = { x: code.x, y: code.y };
    if (_.isArray(code)) result = { x: code[0], y: code[1] };
    if (obj) {
        result = {
            type: obj.a && obj.a.t || obj.t,
            visited: obj.a && obj.a.p || obj.p,
            monsterId: obj.a && obj.a.mId,
            mapId: obj.a && obj.a.mapId,
            x: result.x, y: result.y
        }
    }
    return result;
}

function loadChanges(obj) {
    _.each(_.keys(obj), function (key) { if (/p\d\d/.test(key)) { grid[mapPos.x][mapPos.y] = new Cell(key, obj[key]); } })
}

function get(point) {
    var pt = new Cell(point); return grid[pt.x][pt.y];
}

function getLocation() {
    if (!map) return "unknown";
    var city = {
        909: "Shrine of Elements (lvl 90)"
    }[map.cityId];
    var difficulty = {
        1: 'Normal',
        2: 'Nightmare',
        3: 'Hell',
        4: 'Fantasy'
    }[map.difficulty];
    var room = map.mapId.toString().substr(map.cityId.toString().length);
    return {
        city: city,
        difficulty: difficulty,
        room: room
    }
}


function update(updatedMap) {
    if (!map) {
        stateMsg = "Dungeon map was not loaded, reloading dungeon map...";
        server.call({"Adventure_QuitProgress_Req": {"characterId": null, "save": 1}}, function (rs) {
            if (!rs.Adventure_GetInfo_Res.retMsg == "SUCCESS") {
                stateMsg = "Unable to reload dungeon map, probably dungeon was not started.";
            } else {
                server.call({"Adventure_ContinueProgress_Req": {"characterId": null}}, function (rs2) {
                    if (!rs.Adventure_ContinueProgress_Res.retMsg == "SUCCESS") {
                        stateMsg = "Unable to reload dungeon map, probably dungeon was not started.";
                    } else {
                        stateMsg = "Dungeon map was reloaded.";
                        init(rs2.Adventure_ContinueProgress_Res.map);
                    }
                })
            }
        });
    } else {
        loadChanges(updatedMap);
    }
}

function init(newMap) {
    map = newMap;
    reset();
    loadChanges(map)
}

function reset() {
    for (var x = 0; x < 9; x++) {
        grid[x] = [];
        for (var y = 0; y < 9; y++) grid[x][y] = null;
    }
    stateMsg = "Dungeon was reset";
}

function getStrategyCode(isDungeon, monsterId) {
    return 'D' + monsterId;
}


var map = null;
var grid = [];
var p = null;
var stateMsg = '';
var saveScheduled = false;

module.exports = {

    init: init,
    update: update,
    enter: function (point, cb, early) {

        p = get(point);
        if (p.visited == 1) { cb(); return; }

        if ( (p.type == 'mo' || p.type == 'ev') && !early) {
            strategy.loadRecord('default', function () {lib.maximizeSoldiers(cb);});
        } else if (p.type == 'bs' && early) {
            var code = getStrategyCode(p.monsterId);
            if (!settings.get().save.disabled && saveScheduled) {
                strategy.saveRecord(code);
                lib.maximizeSoldiers(cb);
            } else {
                if (settings.get().load.dungeon) {
                    strategy.loadRecord(code, function () {
                        lib.maximizeSoldiers(cb);
                    });
                } else {
                    lib.maximizeSoldiers(cb);
                }
            }
        } else {
            cb();
        }
    },
    model: function(){
        return { stateMsg: stateMsg, location: getLocation(), pos: p, grid: grid };
    }
};