fs = require('fs');
events = require('./events');

var settings = JSON.parse(fs.readFileSync(__dirname+'/currentSettings.json', 'utf8'));
var template = _.template(fs.readFileSync(__dirname + '/ui/settings.html').toString());

function update(newSettings){
    var result = merge(settings, newSettings);
    fs.writeFileSync(__dirname+'/currentSettings.json', JSON.stringify(result, undefined, 4), 'utf8');
    refreshUi();
}

events.on('server-ready', function(){
    refreshUi();
});
events.on('reconnect', function(){
    refreshUi();
});

function refreshUi(){
    events.emit('settings-update', template({ _model: settings }));
}


module.exports = {

    get: function(){
        var result = {};
        _.extend(result, settings);
        return result;
    },

    update: update
};

function merge(old, neu) {
    for (var prop in neu)
        if (_.isObject(neu[prop]) ){
            if( prop in old ) {
                merge(old[prop], neu[prop])
            } else {
                old[prop] = neu[prop];
            }
        } else {
            old[prop] = neu[prop];
        }
    return old;
}