var tasks = {};
var rqs = [];

_.extend(module.exports, {

    saveAccept: function(rq){
        tasks[rq.City_NpcTaskFinish_Req.taskId] = tasks[rq.City_NpcTaskFinish_Req.taskId] || {};
        tasks[rq.City_NpcTaskAccept_Req.taskId].accept = rq;
    },

    saveFinish: function(rq){
        tasks[rq.City_NpcTaskFinish_Req.taskId] = tasks[rq.City_NpcTaskFinish_Req.taskId] || {};
        tasks[rq.City_NpcTaskFinish_Req.taskId].finish = rq;
    },

    saveRq: function(rq, fullRq){
        rqs.push(rq);
    },

    detect: function(rs, fullRs){
        if( fullRs && fullRs.Object_Create_Notify_characterTaskMonster && fullRs.Object_Create_Notify_characterTaskMonster.attrs){
            var attrs = fullRs.Object_Create_Notify_characterTaskMonster.attrs;
            if( attrs.taskId && tasks[attrs.taskId] ){
                tasks[attrs.taskId].actions = tasks[attrs.taskId].actions || [];
                tasks[attrs.taskId].actions.push({rqs: rqs, rs: attrs });
                //ui.update('tasks');
            }
        } else {
            monsterAttackRq = null;
        }
    },

    model: function(){
        return {};
    }

});