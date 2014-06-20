var repo = {};

module.exports = {
    on: function(eventName, method){
        repo[eventName] = repo[eventName] ? repo[eventName] : [];
        repo[eventName].push(method);
    },
    emit: function(eventName, data){
        console.log('EVENT:', eventName);
        _.each(repo[eventName], function(method){method(data);});
    }
}