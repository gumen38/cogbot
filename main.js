fs = require('fs');
vm = require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+"/underscore-min.js"));

var settingsPath = fs.readFileSync(__dirname+"/server/userSettingsPath.txt");
vm.runInThisContext(fs.readFileSync(settingsPath.toString()));

log = require('./server/log');
proxy = require('./server/proxy');
proxy.start();
require('./server/ui').init();

require('./server/fullauto');