

var Tactics = function(mId){
    return parseTs(TACTICS_LIB.default);
};

var parseTs = function(ts){

    var rows = ts.split("/");
    var row1 = rows[0].replace(/^ /, '').replace(/ $/, '').split(' ');
    var row2 = rows[1].replace(/^ /, '').replace(/ $/, '').split(' ');

    var soldiers = {};
    function parseUnit(unit){
        var present = unit != "N", hero, soldier, soldierIndex;

        if( present ){
            var unitInfo = unit.split("*");
            hero = settings.hero[unitInfo[0]];
            soldierIndex = settings.soldier[unitInfo[1]];
            soldiers[unitInfo[0]] = soldierIndex;
        }


        return {
            hero: present ? hero : -1,
            soldier: soldierIndex
        }

    }

    var deploy = {
        '11': parseUnit(row1[0]),
        '12': parseUnit(row1[1]),
        '13': parseUnit(row1[2]),
        '14': parseUnit(row1[3]),
        '21': parseUnit(row2[0]),
        '22': parseUnit(row2[1]),
        '23': parseUnit(row2[2]),
        '24': parseUnit(row2[3])
    }

    var code;
    if( deploy['11'].hero == -1 && deploy['21'].hero == -1 ) code = 10000010; //Right guard

    _.each(_.values(deploy), function(unit){ soldiers[unit.hero] = unit.soldier; });

    return {
        deployment: {
            map: {
                "21": deploy['21'].hero,
                "22": deploy['22'].hero,
                "23": deploy['23'].hero,
                "24": deploy['24'].hero,
                "11": deploy['11'].hero,
                "12": deploy['12'].hero,
                "13": deploy['13'].hero,
                "14": deploy['14'].hero
            },
            code: code
        },
        hero: [
            {id: settings.heroes.T1, soldierId: session.getSoldierId(soldiers.T1) },
            {id: settings.heroes.T2, soldierId: session.getSoldierId(soldiers.T2) },
            {id: settings.heroes.T3, soldierId: session.getSoldierId(soldiers.T3) },
            {id: settings.heroes.D1, soldierId: session.getSoldierId(soldiers.D1) },
            {id: settings.heroes.D2, soldierId: session.getSoldierId(soldiers.D2) },
            {id: settings.heroes.D3, soldierId: session.getSoldierId(soldiers.D3) }
        ]
    };


}

var TACTICS_LIB = {
    'default': 'N T1M1 T2A1 T3A1 / N D3C1 D2C1 D1C1',
    'A2-5':    'D2C1 T1M1 T2M1 N / D1C1 D3C1 T3C1 N',
    'A2-10':   'T3A1 T2A1 T1M1 N / D3C1 D2C1 D1C1 N',
    'A2-15':   'D2C1 T2M1 T1M1 N / D3C1 D1C1 T3A1 N',
    'a2-20':   'n t2a1 d1c1 t1m1 / n d3C1 d2C1 t3a1',
    'a2-25':   't1m2 n t3f1 d2C1 / t2m2 n d3C1 d1C1',
    'a3-2':    'n t1m3 d3c2 T3a2 / n t2m3 d2c1 d1c3',
    'a3-5':    'n t1m1 t3c3 d3c2 / n t2m2 d2c1 d1c3',
    'a3-6':    'n t1m1 t3c3 d3c2 / n t2m2 d2c1 d1c3',
    'a3-7':    'n t1m1 t3c3 d3c2 / n t2m2 d2c1 d1c3',
    'a3-8':    'd2c2 t3c2 n t1m2 / d1c3 d3c1 n t2m2',
    'a3-9':    'd2c2 t3c2 n n / d1c3 d3c1 t1m2 t2m2',
    'a3-10':   'n t1m3 t3c1 d2c1 / n t2m3 d3c1 d1c1'

}

