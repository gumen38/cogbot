_ = require('underscore');
a = require('./a');

_.extend(module.exports, {
    do: function(){
        console.log('doing b');
        a.do();
    }
})
