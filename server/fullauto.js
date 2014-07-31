server = require('./server');
log = require('./log');
ui = require('./ui');

function state(msg) {
    model.currentState = msg;
    //ui.update('alts');
}

var model = {
    currentState: '',
    currentAltName: '',
    running: false
}

function loginKong(name, password, cb){

    server.callHttp('http://www.kongregate.com/games/callofgods/call-of-gods', { method: 'GET' }, function(rs1){
        var authenticity_token = /<meta.*content="(.*)".*name="csrf-token" \/>/.exec(rs1.body)[1];
        var body = 'utf8=%E2%9C%93&authenticity_token=' + authenticity_token + '&game_id=117070&from_welcome_box=true&username=' + name + '&password=' + password + '&remember_me=true';
        server.callHttp('https://www.kongregate.com/session', { body: body, method: 'POST', headers:rs1.headers }, function(rs2){
            server.callHttp('http://www.kongregate.com/games/callofgods/call-of-gods', { method: 'GET', headers:rs2.headers }, function(rs3){
                var x = 33;
            });
        });
    });

    cb();
}

function loginCog(name, cb){
    cb();
}

function signup(cb){
    server.call({}, function(){
        cb();
    })
}

function start() {

    var range;
    try {
        range = settings.alts.namepattern.split('[')[1].split(']')[0].split('-'); range[0] = parseInt(range[0]); range[1] = parseInt(range[1]);
    } catch (e) {
        state('Bad name pattern');
    }

    function doAlt(index){
        var name = settings.alts.namepattern.replace(/\[.*\]/, index);
        loginKong(name, settings.alts.password, function(){
            loginCog(name, function(){
                signup(function(){
                    if ( index != range[1] ) doAlt(index+1);
                })
            })
        })
    }

    doAlt(range[0]);
}


function routine(){
    start();
}

//setInterval(routine, 60);


//routine();

_.extend(module.exports, {

});