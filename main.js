fs = require('fs');
vm = require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+"/underscore-min.js"));

log = require('./server/log');
proxy = require('./server/proxy');

//log.main("Initializing CogBot server now..");

proxy.start();
require('./server/ui');