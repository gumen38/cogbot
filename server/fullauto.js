server = require('./server');
log = require('./log');
ui = require('./ui');

var model = {
    currentState: '',
    currentAltName: '',
    running: false,
    currAlt: 0
}

function status(msg) {
    log.info(msg);
    model.currentState = msg;
    ui.update('fullauto');
}


function loginKong(name, password, cb) {

    server.callHttp('http://www.kongregate.com/games/callofgods/call-of-gods', { method: 'GET' }, function (rs1) {
        var authenticity_token = /<meta.*content="(.*)".*name="csrf-token" \/>/.exec(rs1.body)[1];
        var body = 'utf8=%E2%9C%93&authenticity_token=' + authenticity_token + '&game_id=117070&from_welcome_box=true&username=' + name + '&password=' + password + '&remember_me=true';
        server.callHttp('https://www.kongregate.com/session', { body: body, method: 'POST', headers: rs1.headers }, function (rs2) {
            server.callHttp('http://www.kongregate.com/games/callofgods/call-of-gods', { method: 'GET', headers: rs2.headers }, function (rs3) {
            });
        });
    });

    cb();
}

function loginCog(name, cb) {
    cb();
}

function signup(cb) {
    server.call({}, function () {
        cb();
    })
}

function switchalt() {

    var range;
    try {
        range = settings.alts.namepattern.split('[')[1].split(']')[0].split('-');
        range[0] = parseInt(range[0]);
        range[1] = parseInt(range[1]);
    } catch (e) {
        status('Bad name pattern');
    }

    if (model.currAlt < range[0] || model.currAlt > range[1]) {
        log.info('No such alt');
        rollingAlts = false;
        return;
    }


    function doAlt(index) {
        var name = settings.alts.namepattern.replace(/\[.*\]/, index);

        var socket = ui.getSocket();
        listeningAfterLoad = false;
        if (socket) socket.emit('loguser', { name: name, pwd: settings.alts.password});

    }

    doAlt(model.currAlt);
}

var listeningAfterLoad = false;
var rollingAlts = false;



function routine() {
    start();
}
_.extend(module.exports, {
    model: function () {
        return model;
    },
    control: function (data) {
        if (data.alts == 'next') {
            model.currAlt++;
            switchalt();
            status('Alt swiching...');
        }
        if (data.alts == 'prev') {
            model.currAlt--;
            switchalt();
            status('Alt swiching...');
        }
        if (data.alts == 'roll') {
            rollingAlts = true;
            model.currAlt++;
            switchalt();
            status('Alt swiching...');
        }
        if (data.loaded) {
            listeningAfterLoad = true;
        }
    },
    lookslikegameisactive: function () {
        if (listeningAfterLoad && rollingAlts) {
            listeningAfterLoad = false;
            server.call({"Character_SignIn_Req": {"characterId": null}},
                function () {
                    server.call({"FortuneWheel_GetInfo_Req":{"type":1,"characterId":null,"serialNo":208}}, function(){
                        server.call({"FortuneWheel_Stop_Req":{"type":1, "useItem":0, "characterId":null}}, function(){
                            model.currAlt++;
                            switchalt();
                        });
                    });
                }
            );
        }
    }
});