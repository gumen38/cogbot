fs = require('fs');
ui = require('./ui');
var settings = JSON.parse(fs.readFileSync(__dirname+'/currentSettings.json', 'utf8'));
var template = _.template(fs.readFileSync(__dirname + '/ui/settings.html').toString());

function update(newSettings){
    var result = merge(settings, newSettings);
    fs.writeFileSync(__dirname+'/currentSettings.json', JSON.stringify(result, undefined, 4), 'utf8');
    ui.update('settings');
}


_.extend(module.exports, {

    get: function(){
        var result = {};
        _.extend(result, settings);
        return result;
    },

    control: function(params){
        update(params);
    },
    model: function(){
        return { model: settings };
    }
});

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