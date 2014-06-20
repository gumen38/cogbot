var Session = function () {

    var id = null;
    var rsHistory = {};



    function getRs(rsName) {
        return rsHistory[rsName];
    }

    return {
        id: id,
        getItemInfo: getItemInfo,
        getHeroInfo: getHeroInfo
    }
}

var session = new Session();