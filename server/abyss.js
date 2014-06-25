var lib = require('./lib');
var server = require('./server');
var strategy = require('./strategy');
var settings = require('./strategy');
var log = require('./log');

var statusMsg = "";
function status(msg) {
    log.info(msg);
    statusMsg = msg;
}

var currentRoom, currentStorey, nextRoom, nextStorey;
function updateLocation(rs) {
    currentRoom = rs.roomId;
    currentStorey = rs.storeyRoom;
    nextRoom = rs.nextRoomId;
    nextStorey = rs.nextStorey;
    status("Abyss location changed: current/next room/storey are " + currentRoom + "/" + nextRoom + " " + currentStorey + "/" + nextStorey);
}

function getStrategyCode() {
    return 'A' + nextStorey + '-' + (1 + ((nextRoom - 1) % 25));
}

function doRoom(cb) {
    status("Now doing auto-mode abyss room/storey: " + nextRoom + "/" + nextStorey);
    status("Preparing room formation/soldiers setup.");
    strategy.loadRecord(getStrategyCode(), function () {
        status("Maximizing assigned soldiers stacks sizes");
        lib.maximizeSoldiers(function () {
            status("Initiating challenge sequence");
            server.call({"PurgatoryAbyss_Challenge_Req": {"auto": 0, "speedUp": 0, "characterId": null, "speedUpType": 0}}, function (rs) {
                status("Finishing challenge sequence");
                updateLocation(rs);
                server.call({"Battle_Finish_Req": {"characterId": null}}, function () {
                    status("Room is finished.");
                    cb(rs);
                });
            })
        });
    });
}

function auto(endRoom) {
    status("Now starting auto-mode till the room " + endRoom);
    if (!endRoom) {
        status('Error: bad end room');
        return;
    }

    doRoom(function (rs) {
        if (rs.PurgatoryAbyss_Challenge_Req.result.record.winner != 'attacker') {
            status('Battle was lost. Stopping auto-abyss.');
            return;
        }
        if (abyss.getRoom() < endRoom) {
            status('Battle was won. Continuing auto-abyss.');
            goAbyss(endRoom)
        } else {
            status('Abyss end room reached, stopping');
        }
    });
}

_.extend(module.exports || (module.exports = {}), {

    onRoomChange: function (rs, cb) {
        updateLocation(rs);
        settings.get().load.abyss && strategy.loadRecord(getStrategyCode(), function () {
            lib.maximizeSoldiers(cb);
        });
    },
    auto: auto,
    model: function () {
        return {
            statusMsg: statusMsg,
            nextRoom: nextRoom,
            nextStorey: nextStorey
        };
    }
});
