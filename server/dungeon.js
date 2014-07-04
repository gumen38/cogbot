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
    if (_.isNumber(code)) result = {y: parseInt((code + "")[0]) - 1, x: parseInt((code + "")[1]) - 1};
    if (_.isString(code)) result = {y: parseInt(code[1]) - 1, x: parseInt(code[2]) - 1};
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
    if (!obj) return;
    p = new Cell(obj.point);
    _.each(_.keys(obj), function (key) {
        if (/p\d\d/.test(key)) {
            var cell = new Cell(key, obj[key]);
            grid[cell.x][cell.y] = cell;
        }
    })
}

function findBoss() {
    if (!grid) return null;
    for (var x = 0; x < 9; x++) {
        for (var y = 0; y < 9; y++) {
            if (grid[x] && grid[x][y] && grid[x][y].type == 'bs') {
                return grid[x][y].monsterId;
            }
        }
    }
    return null;
}

function get(point) {
    var pt = new Cell(point);
    return grid[pt.x][pt.y];
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
    status("Dungeon was restarted");
}

function getStrategyCode(monsterId) {
    return 'D' + monsterId;
}


var map = null;
var grid = [];
var p = null;
var stateMsg = '';
var started = false;
var autoOn = false;
var crawlPos = null;
var path = null;
function autoTillExit() {
    autoOn = true;
    var index;
    function findUnexplored() {
        var result = null, minLengthSqr = 1000;
        for (var x = 0; x < 9; x++) for (var y = 0; y < 9; y++) {
            if (grid[x][y] && grid[x][y].visited == 0) {
                var dx = p.x - x, dy = p.y - y;
                var lengthSqr = dx*dx + dy*dy;
                if( lengthSqr < minLengthSqr ) {
                    minLengthSqr = lengthSqr;
                    result = grid[x][y];
                }
            }
        }
        return result;
    }
    function findExit() { for (var x = 0; x < 9; x++) for (var y = 0; y < 9; y++) if (grid[x][y] && grid[x][y].type == 'ex') return grid[x][y]; return null; }

    function buildPathTo(to, avoidExit) {

        log.debug("Building path " + p.x + "," + p.y + " " + to.x + "," + to.y);

        var path = [];

        function continueStraightPath(pathObj, dest){
            log.debug("CALL: continueStraightPath(" + pathObj + ", " + dest + ") ");
            var lastPathElem = pathObj[pathObj.length-1];
            var t = { x: lastPathElem.x, y: lastPathElem.y };
            while(t.x != dest.x || t.y != dest.y){

                var dx = dest.x - t.x;
                var dy = dest.y - t.y;
                if( Math.abs(dx) > Math.abs(dy) ){
                    dx = dx > 0 ? 1 : -1;
                    dy = 0;
                } else {
                    dx = 0;
                    dy = dy > 0 ? 1 : -1;
                }

                t.x += dx;
                t.y += dy;
                pathObj.push({ x: t.x, y: t.y });
            }
            log.debug("RESULT: continueStraightPath: " + pathObj);
        }

        function straightenPath(fromIndex){
            log.debug("CALL: straightenPath(" + fromIndex + ") " + path);
            if( path.length >= fromIndex + 1) path = path.slice(0, fromIndex + 1);
            continueStraightPath(path, to);
            log.debug("RESULT: straightenPath(" + fromIndex + ") " + path);
        }

        //build straight path
        path.push({ x: p.x, y: p.y });
        straightenPath(0);

        //this will find first blocked cell in path
        function getBlockIndex(){
            log.debug("CALL: getBlockIndex()");
            for( var index in path ) {
                if( grid[path[index].x][path[index].y] == null ){
                    log.debug("RESULT: getBlockIndex() " + index);
                    return index;
                }
            }
            log.debug("RESULT: getBlockIndex() -1");
            return -1;
        }

        //remove blocked cells
        var limit = 0;
        while( true ){
            log.debug("Path search loop: " + path);

            //find next blocking cell
            var blockIndex = getBlockIndex();
            if( blockIndex == -1 ) break;//no more blocking cells - path complete
            if( limit++ > 1000 ) { status("Path search lock detected"); return null; }
            log.debug("Path blockcell: " + blockIndex + " , " + path[blockIndex]);


            var pathCell = path[blockIndex];//current blocking cell
            var radius = 1;//scan radius
            var minTestDistanceLengthSqr = 1000, nearestUnblockCandidate = null;//used to find best unblocked cell
            while( true ){
                log.debug("Path blockcell deblocking");
                for(var testDx = -radius; testDx == radius; testDx ++ ) {
                    for( var textDy = -radius; textDy == radius; textDy ++ ){

                        if( testDx == 0 && textDy == 0 ) continue; //blocked cell itself
                        if( Math.abs(testDx)!=radius || Math.abs(textDy)!=radius ) continue; //we scan only edge

                        var testCell = { x: pathCell.x + testDx, y: pathCell.y + textDy };//the test cell
                        log.debug("Path blockcell deblocking: testing cell " + testCell);

                        var isConnected = _.find(path, function(pathElem, index){
                            if( index >= blockIndex ) return false;
                            var connectionDelta = {
                                dx: Math.abs(pathElem.x - testCell.x),
                                dy: Math.abs(pathElem.y - testCell.y)
                            };
                            return connectionDelta.dx == 1 && connectionDelta.dy == 0 || connectionDelta.dx == 0 && connectionDelta.dy == 1;
                        }) == null;
                        log.debug("Path blockcell deblocking: testing cell connected to path: " + isConnected);
                        if( !isConnected ) continue;//if test cell is not connected with unblocked path elements, it can't be next path element

                        var indexOnPath = _.find(path, function(pathElem){ return pathElem.x == testCell.x && pathElem.y == testCell.y });
                        log.debug("Path blockcell deblocking: testing cell vs unblocked path: indexOnPath=" + indexOnPath + " blockIndex=" + blockIndex);
                        if( indexOnPath >=0 && indexOnPath <= blockIndex ) continue; // test cell is already on unblocked path

                        var isBlock = grid[testCell.x][testCell.y] == null;
                        log.debug("Path blockcell deblocking: testing cell is blocked? " + isBlock);
                        if( isBlock ) continue; // text cell is blocked

                        //for all unblocked cells, which are connected to the path (at any place at the unblocked path)
                        //we choose nearest to the destination on the given edge (i.e. radius)
                        //it may be worth to check on next radiuses too, but thats should be enough to find path
                        var testDistanceDelta = { dx: to.x - testCell.x, dy: to.y - testCell.y };
                        var testDistanceLengthSqr = testDistanceDelta.dx*testDistanceDelta.dx + testDistanceDelta.dy + testDistanceDelta.dy;
                        if( testDistanceLengthSqr < minTestDistanceLengthSqr ) {
                            minTestDistanceLengthSqr = testDistanceLengthSqr;
                            nearestUnblockCandidate = testCell;
                        }
                        log.debug("Path blockcell deblocking: testing cell distance sqr " + testDistanceLengthSqr + " is best = " + (nearestUnblockCandidate == testCell));
                    }
                }

                if( nearestUnblockCandidate ){
                    log.debug("Path blockcell unblock canditate found: " + nearestUnblockCandidate);
                    path[blockIndex] = nearestUnblockCandidate;
                    straightenPath(blockIndex);
                    deloop();
                    shortcuts();
                    break;
                }
                radius ++;
            }
        }

        function deloop(){
            log.debug("Path delooping, path: " + path);
            for( var i = 0; i < path.length; i++ ){
                for( var j = 0; j < path.length; j++ ){
                    if( j<=i ) continue;
                    if( path[i].x == path[j].x && path[i].y == path[j].y ){
                        log.debug("Path loop detected: path[" + i + "]=" + path[i] + " vs path[" + j + "]=" + path[j]);
                        path = _.union(path.slice(0, i), path.slice(j));
                    }
                }
            }
        }

        function shortcuts(){
            log.debug("Path shortcutting, path: " + path);
            var detectedShortcuts = false;
            for( var i = 0; i < path.length; i++ ){
                for( var j = 0; j < path.length; j++ ){
                    if( j<=i ) continue;

                    var shortcutTestPath = [ {x: path[i].x, y: path[i].y } ];
                    continueStraightPath(shortcutTestPath, {x: path[j].x, y: path[j].y });
                    for( var q = 0; q < shortcutTestPath.length; q++ ){
                        if( grid[shortcutTestPath[q].x][shortcutTestPath[q].y] == null ){
                            shortcutTestPath = null;
                            break;
                        }
                    }
                    log.debug("Path shortcut found: " + shortcutTestPath);

                    if( shortcutTestPath ){
                        detectedShortcuts = true;
                        path = _.union(path.slice(0, i), shortcutTestPath.slice(1, shortcutTestPath.length-1), path.slice(j));
                    }
                }
            }
            log.debug("Path shortcuts detected: " + detectedShortcuts);
            if( detectedShortcuts ){ shortcuts() }
        }

        return path.slice(1);
    }

    function doCrawl() {
        ui.update('dungeon');
        if (path) {
            var to = path[index];
            enter(to, function(){
                if( strategy.isDepleted() ) {
                    status('Soldiers depleted, stopping');
                    return;
                }
                doStep(path[index]);
            }, grid[to.x][to.y].type == 'bs');
        } else {
            var unexplored = findUnexplored();
            if (unexplored) {
                path = buildPathTo(unexplored, true);
                if( path.length == 0 ){
                    log.info("Found path of 0 length, stopping.");
                    autoOn = false;
                    return;
                }
                index = 0;
                doCrawl();
            } else {
                var exit = findExit();
                path = buildPathTo(exit, false);
                if( path.length == 0 ){
                    log.info("Found path of 0 length, stopping.");
                    autoOn = false;
                    return;
                }
                index = 0;
                doCrawl();
            }
        }
    }

    function doStep(to) {
        ui.update('dungeon');

        if( grid[to.x][to.y].type == 'mo' || grid[to.x][to.y].type == 'bs' ) {
            server.call({"Adventure_MapPreMove_Req": {"point": parseInt((to.y + 1) + "" + (to.x + 1)), "characterId": null}}, function (rs, msgs) {
                move();
            });
        } else {
            move();
        }

        function move() {
            server.call({"Adventure_MapMove_Req": {"point": parseInt((to.y + 1) + "" + (to.x + 1)), "characterId": null}}, function (rs, msgs) {

                if (rs.Adventure_MapMove_Res.retMsg != 'SUCCESS') {
                    autoOn = false;
                    status("BAD RESPONSE");
                    return;
                }

                if (rs.Adventure_MapMove_Res.result && rs.Adventure_MapMove_Res.result.record && rs.Adventure_MapMove_Res.result.record.winner != 'attacker') {
                    autoOn = false;
                    status("LOST FIGHT");
                    return;
                }

                update(msgs['Object_Change_Notify.characterAdventureMap']);

                if (index++ == path.length - 1) {
                    path = null;
                }

                if( rs.Adventure_MapMove_Res.result.record || rs.Adventure_MapMove_Res.result.innerResult) {
                    server.call({"Battle_Finish_Req": {"characterId": null}}, function(rs, msgs) {
                        doCrawl();
                    });
                } else {
                    doCrawl();
                }
            })
        }
    }

    doCrawl();
}

function enter(point, cb, early) {

    p = get(point);
    if (p.visited == 1) {
        cb();
        return;
    }

    if ((p.type == 'mo' || p.type == 'ev') && !early) {
        strategy.loadRecord('default', function () {
            strategy.maximizeSoldiers(cb);
        });
    } else if (p.type == 'bs' && early) {
        var code = getStrategyCode(p.monsterId);
        if (settings.get().load.enabled) {
            strategy.loadRecord(code, function () {
                strategy.maximizeSoldiers(cb);
            });
        } else {
            strategy.maximizeSoldiers(cb);
        }
    } else {
        cb();
    }
}


_.extend(module.exports, {
    reset: function () {
        map = null;
        reset();
        started = false;
    },
    init: init,
    update: update,
    enter: enter,
    model: function () {
        var boss = findBoss();
        return {
            haveStrategy: boss && strategy.haveStrategy(getStrategyCode(boss)),
            boss: boss,
            started: started && map != null && p != null,
            stateMsg: stateMsg,
            location: getLocation(),
            pos: p,
            grid: grid,
            crawlPos: crawlPos,
            autoOn: autoOn,
            path: path
        };
    },
    auto: function () {

    },
    control: function (opts) {
        if (opts.save && findBoss() != null && settings.get().save.enabled) {
            strategy.saveRecord(getStrategyCode(findBoss()));
            strategy.maximizeSoldiers(cb);
        }
        if (opts.auto) {
            autoTillExit();
        }
    }
});