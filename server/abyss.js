var lib = require('./lib');
var server = require('./server');
var strategy = require('./strategy');
var log = require('./log');
var ui = require('./ui');

var started = false;
var statusMsg = "";
function status(msg) {
    log.info(msg);
    statusMsg = msg;
    ui.update('abyss');
}

var nextRoom, nextStorey;
var endRoom;
function updateLocation(rs) {
    started = true;
    nextRoom = rs.nextRoomId;
    nextStorey = rs.nextStorey;
    status("Abyss location changed: storey/room are " + nextStorey + " / " + ((nextRoom - 1) % 25 + 1));
}

function getStrategyCode() {
    return 'A' + nextStorey + '-' + (1 + ((nextRoom - 1) % 25));
}

function doRoom(cb) {
    if (!nextRoom || !nextStorey) {
        status('Please reload abyss, no data');
        return;
    }
    status("Now doing auto-mode abyss room/storey: " + nextRoom + "/" + nextStorey);
    status("Preparing room formation/soldiers setup.");

    strategy.loadRecord(strategy.haveStrategy(getStrategyCode()) ? getStrategyCode() : "default", function () {
        status("Maximizing assigned soldiers stacks sizes");
        strategy.maximizeSoldiers(function () {
            status("Initiating challenge sequence");
            server.call({"PurgatoryAbyss_Challenge_Req": {"auto": 0, "speedUp": 0, "characterId": null, "speedUpType": 0}}, function (rs, msgs) {
                strategy.assertSoldiers(msgs['Object_Change_Notify.characterResource']);
                status("Finishing challenge sequence");
                updateLocation(msgs['Object_Change_Notify.characterPurgatoryAbyss']);
                server.call({"Battle_Finish_Req": {"characterId": null}}, function () {
                    status("Room is finished.");
                    cb(rs);
                });
            })
        });
    });
}

function auto() {


    status("Now starting auto-mode till the room " + endRoom);
    if (!endRoom) {
        status('Error: bad end room');
        return;
    }
    if (!nextRoom || !nextStorey) {
        status('Error: unknown abyss state - re-enter abyss please');
        return;
    }

    if (_.isString(endRoom)) endRoom = parseInt(endRoom);


    if (strategy.isDepleted()) {
        status("Not enough soldiers, stopping");
        return;
    }

    doRoom(function (rs) {

        if (rs.PurgatoryAbyss_Challenge_Res.result.record.winner != 'attacker') {
            status('Battle was lost. Stopping auto-abyss.');
            return;
        }
        if (nextRoom <= endRoom) {
            status('Battle was won. Continuing auto-abyss.');
            if (strategy.isDepleted()) {
                status("Not enough soldiers, stopping");
            } else {
                auto(endRoom)
            }
        } else {
            status('Abyss end room reached, stopping');
        }
    });
}

_.extend(module.exports, {
    reset: function () {
    },
    onRoomChange: function (rs, cb) {
        updateLocation(rs);
    },
    prepare: function (cb) {
        if (!nextRoom || !nextStorey) {
            status('Error: unknown abyss state - re-enter abyss please');
            cb();
            return;
        }
        strategy.loadRecord(getStrategyCode(), function () {
            strategy.maximizeSoldiers(cb);
        });
    },
    auto: function (_endRoom) {
        endRoom = _endRoom;
        auto()
    },
    model: function () {
        return {
            statusMsg: statusMsg,
            nextRoom: nextRoom,
            nextStorey: nextStorey,
            started: started,
            endRoom: endRoom ? endRoom : ""
        };
    },
    control: function (opts) {
        opts.save1 && strategy.saveRecord(getStrategyCode());
        opts.save2 && strategy.saveRecord(getStrategyCode() + 'alt');
        opts.auto && auto(opts.auto);
    }
});
