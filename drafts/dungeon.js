var lib = require('./lib');
var strategy = require('./strategy');
var settings = require("./settings");
function Map(mapObj) {

    mapObj = mapObj.map;

    function Point(point) {
        var x, y;
        if (typeof point == 'number') {
            y = parseInt((point + "")[0]) - 1;
            x = parseInt((point + "")[1]) - 1;
        }
        if (typeof point == 'string') {
            y = parseInt(point[1]) - 1;
            x = parseInt(point[2]) - 1;
        }
        return { x: x, y: y };
    }

    function PointInfo(obj, point) {
        return {
            t: obj.a && obj.a.t || obj.t,
            p: obj.a && obj.a.p || obj.p,
            mId: obj.a && obj.a.mId,
            mapId: obj.a && obj.a.mapId,
            x: point.x,
            y: point.y,
            visited: 0
        }
    }

    function loadChanges(obj) {
        _.each(_.keys(obj), function (key) {
            if (/p\d\d/.test(key)) {
                var mapPos = new Point(key);
                grid[mapPos.x][mapPos.y] = new PointInfo(obj[key], mapPos);
            }
        })
    }

    var grid = [];
    for (var x = 0; x < 9; x++) {
        grid[x] = [];
        for (var y = 0; y < 9; y++) grid[x][y] = null;
    }
    var pos = new Point(mapObj.point);

    loadChanges(mapObj);
    grid[pos.x][pos.y].visited = 1;

    var _this = this;

    var getPoint = function(point){
        var pt = new Point(point);
        return grid[pt.x][pt.y];
    }

    var logmap = function(){
        var str = "###########";
        for( var y = 0; y < 9; y++ ){
            str += "\n#";
            for( var x = 0; x < 9; x++ ){
                str += grid[x][y] == null ? '.' : grid[x][y].t[0];
            }
            str += "#";
        }
        str += "\n###########";
        console.log(str);
    }

    return {
        grid: function () { return grid; },
        update: function (mapObj) { loadChanges(mapObj);},
        getPoint: _.bind(getPoint, this),
        logmap: _.bind(logmap, this)
/*        ,findUnexplored: function () {
            for (var x = 0; x < 9; x++) for (var y = 0; y < 9; y++) if (grid[x][y].p == 0) return grid[x][y];
            return null;
        },
        findExit: function () {
            for (var x = 0; x < 9; x++) for (var y = 0; y < 9; y++) if (grid[x][y].t == 'ex') return grid[x][y];
            return null;
        },
        buildPathTo: function (to, avoidExit) {
            var leftPath = [];
            var rightPath = [];

            function dir(from, to, scroll) {
                var vector = { x: to.x - from.x, y: to.y - from.y };
                var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
                vector = { x: vector.x / length, y: vector.y / length };
                var xDir = (vector.x > 0 ? 1 : -1) * ( Math.abs(x) > Math.abs(y) ? 1 : 0 );
                var yDir = (vector.y > 0 ? 1 : -1) * ( Math.abs(y) > Math.abs(x) ? 1 : 0 );

                var xScrollMap = [ 1, 0, -1, 0];
                var yScrollMap = [ 0, -1, 0, 1];

                var i = 0;
                for (; i < 4; i++) if (xScrollMap[i] == xDir && yScrollMap[i] == yDir) break;
                i = ((i + scroll) + 4) % 4;
                xDir = xScrollMap[i];
                yDir = yScrollMap[i];

                return { x: from.x + xDir, y: from.y + yDir, dx: xDir, dy: yDir }
            }

            function find(pos, to, scroll, avoidExit) {
                for (var shift = 0; shift < 4; shift++) {
                    var next = dir(pos, to, scroll * shift);
                    var valid = next.x >= 0 && next.x < 9 && next.y >= 0 && next.y >= 0;
                    var exist = grid[next.x][next.y] != null;
                    var exit = (grid[next.x][next.y]).t && (grid[next.x][next.y]).t == 'ex';
                    if (valid && exist && !exit) return next;
                }
                console.log("LOCKED POINT DETECTED");
                server.stop();
                return null;
            }

            for (var lim = 0; lim < 9 * 9; lim++) {
                leftPath.push(find(pos, to, -1, avoidExit));
                leftPath.push(find(pos, to, +1, avoidExit));
                if (leftPath[leftPath.length - 1].x != to.x && leftPath[leftPath.length - 1].y != to.y) return leftPath;
                if (rightPath[rightPath.length - 1].x != to.x && rightPath[rightPath.length - 1].y != to.y) return rightPath;
            }
            console.log("NO PATH FOUND");
            server.stop();
            return null;
        }*/
    }
}

var map = null;

module.exports = {

    initMap: function(rs){
        map = new Map(rs);
        map.logmap();
    },

    updateMap: function(rs){
        if( !rs.attrs ) return;
        map.update(rs.attrs);
        map.logmap();
    },

    prepareForPoint: function(point, cb){
        if( map == null ){
            console.log("MAP WAS NOT LOADED!");
            cb();
            return;
        }

        var p = map.getPoint(point);
        if(p.p != 1 && p.t=='mo' || p.t=='ev' || p.t=='bs' ) {

            if( settings.get().dungeon.disableAutodeploy ){
                strategy.maximizeSoldiers(cb);
            } else {
                var code = strategy.getCode(true, p.mId, false);
                if(p.t != 'bs' && settings.get().dungeon.alwaysDefaultStrategyOnTrash ) {
                    code = 'default';
                } else {
                    strategy.saveRecord(code);
                }
                strategy.loadRecord(code, function(){
                    strategy.maximizeSoldiers(cb);
                });
            }
        } else {
            cb();
        }
    }
};