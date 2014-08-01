var app = require('http').createServer(function(rq, rs) {rs.writeHead(200);rs.end();});
var io = require('socket.io')(app);
var fs = require('fs');
var log = require('./log');
app.listen(3334);

var components = {
    utility: require('./utility.js'),
    strategy: require('./strategy.js'),
    abyss: require('./abyss'),
    dungeon: require('./dungeon'),
    log: require('./log.js'),
    inventory: require('./inventory.js'),
    fullauto: require('./fullauto.js')
};
var template = _.template(fs.readFileSync(__dirname + '/templates/template.html').toString());
var templates = {
    utility: _.template(fs.readFileSync(__dirname + '/templates/utility.html').toString()),
    strategy: _.template(fs.readFileSync(__dirname + '/templates/strategy.html').toString()),
    abyss: _.template(fs.readFileSync(__dirname + '/templates/abyss.html').toString()),
    dungeon: _.template(fs.readFileSync(__dirname + '/templates/dungeon.html').toString()),
    log: _.template(fs.readFileSync(__dirname + '/templates/log.html').toString()),
    inventory: _.template(fs.readFileSync(__dirname + '/templates/inventory.html').toString()),
    fullauto: _.template(fs.readFileSync(__dirname + '/templates/fullauto.html').toString())
};
var views = {
    utility: '',
    strategy: '',
    abyss: '',
    dungeon: '',
    log: '',
    inventory: '',
    fullauto: ''
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
            socket.on('error', function() {
                socket.destroy();
            });
            log.info("Connected to admin panel.");
        });
        io.on('disconnect', function() { log.debug("Disconnected from admin panel.");});


        log.info("Starting CogBot admin panel injector service at localhost:3334");
        _.each(_.keys(components), function(componentId){ update(componentId); })
    },
    update: update,
    getSocket: function() { return socket; }
});