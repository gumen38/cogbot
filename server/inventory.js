fs = require('fs');
mkdirp = require('mkdirp');
server = require('./server');
log = require('./log');
ui = require('./ui');

var count = 0;
var max = 90;
var res = null;
var soldItem = null;
var trashSale = null;

var statusMsg = "";
function status(msg) {
    log.info(msg);
    statusMsg = msg;
    ui.update('inventory');
}

function reload(cb){
    server.call({"Item_GetInfo_Req":{"type":-1,"characterId": server.getCharacterId()}}, function(rs){
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
                var boxes = [ 5109020, 5109021, 5109085, 5109017, 5109018 ];
                var index = 0;
                function use(){
                    var itemId = boxes[index];
                    var item = findItem(itemId);
                    if( !item ){
                        index++;
                        if( index < boxes.length ) use();
                        return;
                    }
                    status("Use item " + item.id);
                    server.call({"Item_Use_Req":{"characterId":server.getCharacterId(),"id":item.id,"count":1}}, function(rs){
                        ui.update('inventory');
                        if( rs.Item_Use_Res.retMsg == 'SUCCESS' ) {
                            use();
                        } else {
                            index++;
                            if( index < boxes.length ) use();
                            return;
                        }
                    })
                }
                use();
            }
            if( opts.trash == 'sell' ){
                trash = JSON.parse(fs.readFileSync(__dirname + '/trashlist.json', 'utf8'));

                _.each(trash, function(itemId){
                    var item = findItem(itemId);
                    item && sell(item.id);
                });

                function sell(itemId){
                    ui.update('inventory');
                    status("Sell item " + itemId);
                    server.call({"Item_Sell_Req":{"characterId":server.getCharacterId(),"id":itemId,"count":1}}, function(rs){
                        if( rs.Item_Sell_Res.retMsg == 'SUCCESS' ) sell(itemId);
                    })
                }
            }
            if( opts.trash == 'start' ){
                reload(function(){
                    trashSale = [];
                    ui.update('inventory');
                });
            }
            if( opts.trash == 'stop' ){
                trash = JSON.parse(fs.readFileSync(__dirname + '/trashlist.json', 'utf8'));
                trash = _.union(trash, trashSale);
                trashSale = null;
                fs.writeFileSync(__dirname + '/trashlist.json', JSON.stringify(trash), 'utf8');
                ui.update('inventory');
            }

        });
    },
    model: function() { return { count: count, soldItem: soldItem, statusMsg: statusMsg, trashMode: !!trashSale }},
    onItemSold: function(id){

        if( !trashSale ) return;

        function cb(){
            var item = findItemId(id);
            if( item ){
                status('Item sale detected: ' + item.itemId);
                trash = JSON.parse(fs.readFileSync(__dirname + '/trashlist.json', 'utf8'));
                if( !_.contains(trash, item.itemId) ){
                    soldItem = item.itemId;
                    trashSale.push(parseInt(item.itemId));
                } else {
                    status('Sold item was trash');
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