vm = require('vm');
Module.prototype.expose = function(path) {
    vm.runInThisContext(fs.readFileSync(path));
};




