fs = require('fs');
mkdirp = require('mkdirp');
server = require('./server');
settings = require('./settings');
log = require('./log');
ui = require('./ui');

var alerts = [];
var count = 0;
var max = 90;

function itemAdded(msg) {
    count++;
    if( count >= max ){
        alerts.push('Inventory limit reached.');
    }

    ui.update("inventory");
}

function read(rs){
    max = rs.backpackItemCountMax;
    count = 0;
    if( rs.items ){
        _.each(rs.items, function(item){
            if( item.place==0 ) {
                count ++;
            }
        })
    }
    ui.update("inventory");
}

function reload(cb){
    server.call({"Item_GetInfo_Req":{"type":-1,"characterId":settings.get().characterId}}, function(rs){
        read(rs.Item_GetInfo_Res);
        cb && cb();
    })
}

_.extend(module.exports, {
    itemAdded: itemAdded,
    read: read,
    reload: reload,
    control: function(opts){
        if( opts.reload ){
            reload();
        }
        if( opts.open ){
//            server.call({"Arena_ChallengeFight_Req":{"characterId":57055}}, function(rs){
//                console.log(rs);
//            });
        }
    },
    model: function() { return { alerts: alerts, count: count }}
});