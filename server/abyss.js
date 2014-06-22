var lib = require('./lib');
var strategy = require('./strategy');

var currentRoom, currentStorey, nextRoom, nextStorey;

module.exports = {

    updateLocation: function(rs){
        currentRoom = rs.roomId;
        currentStorey = rs.storeyRoom;
        nextRoom = rs.nextRoomId;
        nextStorey = rs.nextStorey;
    },

    prepareForFight: function(rq, cb, safe){
        if( hadSafe ) { hadSafe = false; return }
        var code = strategy.getCode(false, null, true, nextRoom, nextStorey);

        if (settings.get().save.enabled && strategy.getSchedule() == 'abyss' ) {
            strategy.saveRecord(code);
         }

        strategy.saveRecord(code);
        strategy.loadRecord(code, function(){
            lib.maximizeSoldiers(cb);
        });
    }
}

var hadSafe = false;