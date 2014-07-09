fs = require('fs');
mkdirp = require('mkdirp');
server = require('./server');
log = require('./log');
ui = require('./ui');

var count = 0;
var max = 90;
var res = null;
var soldItem = null;

var statusMsg = "";
function status(msg) {
    log.info(msg);
    statusMsg = msg;
    ui.update('inventory');
}

function reload(cb){
    server.call({"Item_GetInfo_Req":{"type":-1,"characterId":settings.player.characterId}}, function(rs){
        res = rs.Item_GetInfo_Res;
        max = res.backpackItemCountMax;
        count = 0;
        if( res.items ){
            _.each(res.items, function(item){
                if( item.place==0 ) {
                    count ++;
                }
            })
        }
        ui.update("inventory");
        cb && cb();
    })
}

function findItem(itemId){
    return _.find(res.items, function(item){return item.itemId == itemId;});
}

function findItemId(id){
    return _.find(res.items, function(item){return item.id == id;});
}
_.extend(module.exports, {
    reload: reload,
    control: function(opts){
        reload(function(){
            ui.update('inventory');
            if( opts.open ){
                boxes = [ 5109020, 5109021, 5109085 ];

                _.each(boxes, function(boxId){
                    var item = findItem(boxId);
                    item && use(item.id);
                });

                function use(itemId){
                    ui.update('inventory');
                    status("Use item " + itemId);
                    server.call({"Item_Use_Req":{"characterId":settings.player.characterId,"id":itemId,"count":1}}, function(rs){
                        if( rs.Item_Use_Res.retMsg == 'SUCCESS' ) use(itemId);
                    })
                }
            }
            if( opts.mark ){
                trash = JSON.parse(fs.readFileSync(__dirname + '/trashlist.json', 'utf8'));
                if( !_.contains(trash, opts.mark) ){
                    trash.push(parseInt(opts.mark));
                    fs.writeFileSync(__dirname + '/trashlist.json', JSON.stringify(trash), 'utf8');
                }
                soldItem = null;
                ui.update('inventory');
            }
            if( opts.trash ){
                trash = JSON.parse(fs.readFileSync(__dirname + '/trashlist.json', 'utf8'));

                _.each(trash, function(itemId){
                    var item = findItem(itemId);
                    item && sell(item.id);
                });

                function sell(itemId){
                    ui.update('inventory');
                    status("Sell item " + itemId);
                    server.call({"Item_Sell_Req":{"characterId":settings.player.characterId,"id":itemId,"count":1}}, function(rs){
                        if( rs.Item_Sell_Res.retMsg == 'SUCCESS' ) sell(itemId);
                    })
                }
            }
        });
    },
    model: function() { return { count: count, soldItem: soldItem, statusMsg: statusMsg }},
    onItemSold: function(id){

        function cb(){
            status('Item sale detected');
            var item = findItemId(id);
            if( item ){
                trash = JSON.parse(fs.readFileSync(__dirname + '/trashlist.json', 'utf8'));
                if( !_.contains(trash, item.itemId) ){
                    soldItem = item.itemId;
                } else {
                    status('Sold item is already marked as trash');
                }
            } else {
                status('Sold item is unknown');
            }
            ui.update('inventory');
        }

        if( res==null ){
            reload(cb);
        } else cb();
    }

});