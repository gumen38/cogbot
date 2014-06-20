var lib = require('./lib');
var strategy = require('./strategy');
var settings = require("./settings");
var log = require('./log');

function Point(point) {
    if (isNumber(point)) return {
        y: parseInt((point + "")[0]) - 1,
        x: parseInt((point + "")[1]) - 1
    };
    if (_.isString(point)) return {
        y: parseInt(point[1]) - 1,
        x: parseInt(point[2]) - 1
    };
    if (_.isObject(point)) return point;
    if (_.isArray(point)) return { x: point[0], y: point[1] };
}

function PointInfo(obj, point) {
    return {
        type: obj.a && obj.a.t || obj.t,
        visited: obj.a && obj.a.p || obj.p,
        monsterId: obj.a && obj.a.mId,
        mapId: obj.a && obj.a.mapId,
        x: point.x,
        y: point.y
    }
}

var map = null;
var grid = [];

function loadChanges(obj) {
    _.each(_.keys(obj), function (key) {
        if (/p\d\d/.test(key)) {
            var mapPos = new Point(key);
            grid[mapPos.x][mapPos.y] = new PointInfo(obj[key], mapPos);
        }
    })
}

module.exports = {

    init: function (rs) {
        for (var x = 0; x < 9; x++) {
            grid[x] = [];
            for (var y = 0; y < 9; y++) grid[x][y] = null;
        }
        map = rs.map;
        loadChanges(map);
    },

    update: function (rs) {
        if (!rs.attrs) return;
        if (rs.map.id != rs.id) this.init(rs.attrs);
        loadChanges(rs.attrs);
    },

    point: function (point) {
        var pt = new Point(point);
        return grid[pt.x][pt.y];
    },

    prepareForPoint: function (point, cb, safe) {

        if( hadSafe ) { hadSafe = false; return; }

        if (!mapReady(cb)) return;

        var p = map.getPoint(point);
        if (p.visited == 1) return;

        if (p.type == 'mo' || p.type == 'ev') {
            strategy.loadRecord('default', function () {
                lib.maximizeSoldiers(cb);
            });
            return;
        } else if (p.type == 'bs') {
            if (settings.get().load.atBoss) {
                var code = strategy.getCode(true, p.monsterId, false);
                strategy.saveRecord(code);
                if (settings.get().load.defaultBoss) code = 'default';
                strategy.loadRecord(code, function () {
                    lib.maximizeSoldiers(cb);
                });
            } else {
                lib.maximizeSoldiers(cb);
            }
        }
    }
};

var hadSafe = false;

function mapReady(cb) {
    if (map == null) {
        log.error("Dungeon map was not loaded. Restart CogBot and re-enter dungeon.");
        cb();
        return false;
    } else return true;
}