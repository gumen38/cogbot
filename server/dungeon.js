var lib = require('./lib');
var strategy = require('./strategy');
var settings = require("./settings");
var server = require("./server");
var log = require('./log');
var ui = require('./ui');

var statusMsg = "";
function status(msg) {
    log.info(msg);
    statusMsg = msg;
    ui.update('dungeon');
}

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
            x: result.x,
            y: result.y
        }
    }
    return result;
}

function loadChanges(obj) {
    if( !obj ) return;
    p = new Cell(obj.point);
    _.each(_.keys(obj), function (key) { if (/p\d\d/.test(key)) { var cell = new Cell(key, obj[key]); grid[cell.x][cell.y] = cell;} })
}

function findBoss(){
    if( !grid ) return null;
    for (var x = 0; x < 9; x++) {
        for (var y = 0; y < 9; y++) {
            if( grid[x] && grid[x][y] && grid[x][y].type == 'bs' ){
                return grid[x][y].monsterId;
            }
        }
    }
    return null;
}

function get(point) {
    var pt = new Cell(point); return grid[pt.x][pt.y];
}

function getLocation() {
    if (!map) return null;
    var city = {
        909: "Shrine of Elements (lvl 90)"
    }[map.cityId];
    var difficulty = {
        1: 'Normal',
        2: 'Nightmare',
        3: 'Hell',
        4: 'Fantasy'
    }[map.difficulty];
    var level = map.mapId.toString().substr(map.cityId.toString().length);
    return {
        city: city,
        difficulty: difficulty,
        level: level
    }
}


function update(updatedMap) {
    if (!map) {
        status("Dungeon map was not loaded, reloading dungeon map...");
        server.call({"Adventure_QuitProgress_Req": {"characterId": null, "save": 1}}, function (rs) {
            if (!rs.Adventure_GetInfo_Res.retMsg == "SUCCESS") {
                status("Unable to reload dungeon map, probably dungeon was not started.");
            } else {
                server.call({"Adventure_ContinueProgress_Req": {"characterId": null}}, function (rs2) {
                    if (!rs.Adventure_ContinueProgress_Res.retMsg == "SUCCESS") {
                        status("Unable to reload dungeon map, probably dungeon was not started.");
                    } else {
                        status("Dungeon map was reloaded.");
                        init(rs2.Adventure_ContinueProgress_Res.map);
                    }
                })
            }
        });
    } else {
        loadChanges(updatedMap);
        status("Dungeon info updated.");
    }
}

function init(newMap) {
    map = newMap;
    reset();
    loadChanges(map);
    started = true;
    status("Entered a dungeon");
}

function reset() {
    for (var x = 0; x < 9; x++) {
        grid[x] = [];
        for (var y = 0; y < 9; y++) grid[x][y] = null;
    }
    status("Dungeon was reset");
}

function getStrategyCode(monsterId) {
    return 'D' + monsterId;
}


var map = null;
var grid = [];
var p = null;
var stateMsg = '';
var saveScheduled = false;
var started = false;

_.extend(module.exports, {
    reset: function(){ map = null; reset(); started = false;},
    init: init,
    update: update,
    enter: function (point, cb, early) {

        p = get(point);
        if (p.visited == 1) { cb(); return; }

        if ( (p.type == 'mo' || p.type == 'ev') && !early) {
            strategy.loadRecord('default', function () {lib.maximizeSoldiers(cb);});
        } else if (p.type == 'bs' && early) {
            var code = getStrategyCode(p.monsterId);
                if (settings.get().load.enabled) {
                    strategy.loadRecord(code, function () {
                        lib.maximizeSoldiers(cb);
                    });
                } else {
                    lib.maximizeSoldiers(cb);
                }
        } else {
            cb();
        }
    },
    model: function(){
        var boss = findBoss();
        return {
            haveStrategy: boss && strategy.haveStrategy(getStrategyCode(boss)),
            boss: boss,
            started: started && map!=null && p!=null,
            stateMsg: stateMsg,
            location: getLocation(),
            pos: p,
            grid: grid };
    },
    control: function(opts){
        if( opts.save && findBoss()!=null && settings.get().save.enabled ){
            strategy.saveRecord(getStrategyCode(findBoss()));
            lib.maximizeSoldiers(cb);
        }
    }
});