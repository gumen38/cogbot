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

var items = {
    9933887: { type: 'box',     name: 'Silver Box 5' },
    9933877: { type: 'box',     name: 'Bronze Box 5' },
    9935556: { type: 'silver',  name: 'Silver Card 2' },

    9935569: { type: 'junk',    name: 'Pandora Cuirass'},
    9935570: { type: 'junk',    name: 'Cloudsplitter Warboots'},
    9935567: { type: 'junk',    name: 'Abyss Greatsword'},
    9935565: { type: 'junk',    name: 'Bleak Helmet'},
    9935558: { type: 'junk',    name: 'Redbone Force'},
    9935568: { type: 'junk',    name: 'Pyrope'},
    9935566: { type: 'junk',    name: 'Uncut Ruby'},
    9935563: { type: 'junk',    name: 'Warscar Hammer'},
    9936567: { type: 'junk',    name: 'Forelorn Leggins'},
    9936597: { type: 'junk',    name: 'Lost Love Armor'},
    9936575: { type: 'junk',    name: 'Lost Love Armor'},
    9936576: { type: 'junk',    name: 'Lost Love Armor'},
    9936566: { type: 'junk',    name: 'Lost Love Armor'}
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

            var box = _.filter(_.keys(items), function(itemKey) { return items[itemKey].type == 'box' });
            _.each(box, function(key){ use(key); });

            var silver = _.filter(_.keys(items), function(itemKey) { return items[itemKey].type == 'silver' });
            _.each(silver, function(key){ use(key); });

            function use(itemId){
                log.info("Use item " + items[itemId].name);
                server.call({"Item_Use_Req":{"characterId":settings.get().characterId,"id":itemId,"count":1}}, function(rs){
                    if( rs.Item_Use_Res.retMsg == 'SUCCESS' ) use(itemId);
                })
            }

//            var junk = _.filter(_.keys(items), function(itemKey) { return items[itemKey].type == 'junk' });
//            _.each(junk, function(key){ copper(key); });


            function copper(itemId){
                log.info("Copper item" + items[itemId].name);
                server.call({"Item_Sell_Req":{"characterId":settings.get().characterId,"id":itemId,"count":1}}, function(rs){
                    if( rs.Item_Sell_Res.retMsg == 'SUCCESS' ) copper(itemId);
                })
            }
        }
    },
    model: function() { return { alerts: alerts, count: count }}
});