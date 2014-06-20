var assert = new (function(){

    return {
        success: function(val){
            if( val != 'SUCCESS' ){
                console.log('Assert failed');
                throw new Error('Assert failed');
            }
        }
    }

})();