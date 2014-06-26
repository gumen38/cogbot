_ = require('underscore');
b = require('./b');

_.extend(module.exports, {
    do: function () {
        console.log('doing a');
    }
});

b.do();