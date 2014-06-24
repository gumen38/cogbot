var lib = require('./lib');
var server = require('./server');
var strategy = require('./strategy');

var currentRoom, currentStorey, nextRoom, nextStorey;

function updateLocation(rs){
        currentRoom = rs.roomId;
        currentStorey = rs.storeyRoom;
        nextRoom = rs.nextRoomId;
        nextStorey = rs.nextStorey;
}

module.exports = {

    updateLocation: updateLocation,

    prepareForFight: function(rq, cb){
        if( settings.get().load.atAbyss ) {
            var code = strategy.getCode(false, null, true, nextRoom, nextStorey);
            strategy.loadRecord(code, function(){
                lib.maximizeSoldiers(cb);
            });
        }
    },

    getCode: function(){
        return strategy.getCode(false, null, true, nextRoom, nextStorey);
    },

    getRoom: function(){
        return currentRoom;
    },

    startCurrentRoom: function(cb){
        var code = strategy.getCode(false, null, true, nextRoom, nextStorey);
        strategy.loadRecord(code, function(){
            lib.maximizeSoldiers(function(){
                server.call({"PurgatoryAbyss_Challenge_Req":{"auto":0,"speedUp":0,"characterId":null,"speedUpType":0}}, function(rs){
                    updateLocation(rs);
                    server.call({"Battle_Finish_Req":{"characterId":null}}, function(rs2){
                        cb(rs);
                    });
                })
            });
        });
    }

}

var hadSafe = false;