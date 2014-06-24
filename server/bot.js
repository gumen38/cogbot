fs = require('fs');
mkdirp = require('mkdirp');
server = require('./server');
settings = require('./settings');
log = require('./log');
events = require('./events');
abyss =  require('./abyss');


var template = _.template(fs.readFileSync(__dirname + '/ui/bot.html').toString());
setInterval(function(){
    events.emit('bot-update', template({log: log.botlog()}));
}, 1000);
events.on('reconnect', function(){
    events.emit('bot-update', template({log: log.botlog()}));
});


function goAbyss(endRoom){
    if( !endRoom ) {
        log.bot('Bad end room');
        return;
    }

    log.bot('Abyss battle starting, room ' + abyss.getRoom());
    abyss.startCurrentRoom(function(rs){
        if( rs.PurgatoryAbyss_Challenge_Req.result.record.winner != 'attacker' ){
            log.bot('Abyss battle was lost, stopping.');
            return;
        }
        if( abyss.getRoom() < endRoom ){
            goAbyss(endRoom)
        } else {
            log.bot('Abyss end room reached, stopping');
        }
    })

}

module.exports = {

    autoAbyss: function(endRoom){
        log.bot('Abyss auto-battle started, end room is: ' + endRoom);
        goAbyss(endRoom);
    }

}