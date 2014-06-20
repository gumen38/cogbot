function AbyssCrawler() {


    var currentRoom, currentStorey, nextRoom, nextStorey;

    server.do({"PurgatoryAbyss_GetInfo_Req": {"serialNo": 1598, "characterId": null}}, function (rs) {


        currentRoom = rs[0].PurgatoryAbyss_GetInfo_Res.roomId;
        currentStorey = rs[0].PurgatoryAbyss_GetInfo_Res.storeyRoom;
        nextRoom = rs[0].PurgatoryAbyss_GetInfo_Res.nextRoomId;
        nextStorey = rs[0].PurgatoryAbyss_GetInfo_Res.nextStorey;

        server.do({"PurgatoryAbyss_Challenge_Req": {"characterId": null, "auto": 0, "serialNo": 1672, "speedUp": 0, "speedUpType": 0}}, function (rs) {
            if( rs[0].PurgatoryAbyss_Challenge_Res.result.winner != 'attacker' ){
                log.main("LOST BATTLE");
                server.stop();
            }


            var msg = _.find(rs[1].Notify.msgs, function(msg){ return msg.Object_Change_Notify && msg.Object_Change_Notify.className == "characterPurgatoryAbyss" });
            currentRoom = msg.Object_Change_Notify.className.roomId;
            currentStorey = msg.Object_Change_Notify.className.storeyRoom;
            nextRoom = msg.Object_Change_Notify.className.nextRoomId;
            nextStorey = msg.Object_Change_Notify.className.nextStorey;

        });

    });


}

