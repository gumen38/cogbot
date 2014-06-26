var app = require('http').createServer(function(rq, rs) {rs.writeHead(200);rs.end();});
var io = require('socket.io')(app);
var fs = require('fs');
var log = require('./log');
app.listen(3334);

var components = {
    settings: require('./settings.js'),
    strategy: require('./strategy.js'),
    abyss: require('./abyss'),
    dungeon: require('./dungeon'),
    log: require('./log.js')
};
var template = _.template(fs.readFileSync(__dirname + '/ui/template.html').toString());
var templates = {
    settings: _.template(fs.readFileSync(__dirname + '/ui/settings.html').toString()),
    strategy: _.template(fs.readFileSync(__dirname + '/ui/strategy.html').toString()),
    abyss: _.template(fs.readFileSync(__dirname + '/ui/abyss.html').toString()),
    dungeon: _.template(fs.readFileSync(__dirname + '/ui/dungeon.html').toString()),
    log: _.template(fs.readFileSync(__dirname + '/ui/log.html').toString())
};
var views = {
    settings: '',
    strategy: '',
    abyss: '',
    dungeon: '',
    log: ''
};
var socket = null;

function update(componentId){
    views[componentId] = templates[componentId](components[componentId].model());
    if (socket) socket.emit('update-view', template(views));
}

_.extend(module.exports, {
    init: function(){
        io.on('connection', function () {
            socket = arguments[0];
            socket.on('ui-action', function (data) {
                components[data.code].control(data.data);
            });
            log.info("Connected to admin panel.");
        });
        io.on('disconnect', function() { log.debug("Disconnected from admin panel.");});
        log.info("Starting CogBot admin panel injector service at localhost:3334");
        _.each(_.keys(components), function(componentId){ update(componentId); })
    },
    update: update
});