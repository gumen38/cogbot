server = require('./server');
log = require('./log');
ui = require('./ui');


function state(msg) {
}
{
    model.currentState = msg;
    ui.update('alts');
}

var model = {
    currentState: '',
    currentAltName: '',
    running: false
}

function loginKong(name, password, cb){
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

function start(namepattern, password) {

    var range;
    try {
        range = namepattern.split('[')[1].split(']')[0].split('-'); range[0] = parseInt(range[0]); range[1] = parseInt(range[1]);
    } catch (e) {
        state('Bad name pattern');
    }

    function doAlt(index){
        var name = namepattern.replace(/\[.*\]/, index);
        loginKong(name, password, function(){
            loginCog(name, function(){
                signup(function(){
                    if ( index != range[1] ) doAlt(index+1);
                })
            })
        })
    }

    doAlt(range[0]);
}


_.extend(module.alts, {

    control: function (opts) {
        if (opts.start) {
            model.running = true;
            start(opts.namepattern, opts.password);
        }
        if (opts.stop) {
            model.running = false;
        }
    },


    model: function () {
        return {};
    }

});