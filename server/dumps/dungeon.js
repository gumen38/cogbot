//lvl80 hell
var enterDungeonRq = {
    "body": [
        {
            "Adventure_NewProgress_Req": {
                "characterId": null,
                "difficulty": 3,
                "serialNo": 132,
                "mapId": 9081,
                "isLimitedTime": 0,
                "cityId": 908
            }
        }
    ], "session": "i0ensb93l1c55cjc4tm05r8p24"
};

var enterDungeonRs =
    [
        {
            "Adventure_NewProgress_Res": {
                "map": {
                    "id": 537732,
                    "cityId": 908,
                    "mapId": 9081,
                    "difficulty": 3,
                    "point": 88,
                    "moveToPoint": 0,
                    "p78": {"t": "bl", "p": 0},
                    "p87": {"t": "bl", "p": 0},
                    "p88": {"t": "en", "p": 1}
                },
                "ret": 0,
                "retMsg": "SUCCESS",
                "serialNo": 132}
        },
        {
            "Notify": {"msgs": [
                {
                    "Object_Change_Notify": {
                        "className": "characterAdventure",
                        "id": 38729,
                        "attrs": {
                            "keyCount": 2,
                            "keyUseCount": 1,
                            "cityId": 908,
                            "difficulty": 3,
                            "mapId": 9081,
                            "maps": {
                                "9081": 537732
                            },
                            "createTime": 1401916559}}},
                {
                    "Object_Change_Notify": {
                        "className": "characterBase",
                        "id": 38729,
                        "attrs": {"state": 6}
                    }
                }
            ]}
        }
    ]


var dungRq2 = {"body": [
    {"Adventure_GetMapInfo_Req": {"characterId": null, "mapId": 9081, "serialNo": 135}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungRs2 = [
    {"Adventure_GetMapInfo_Res": {"map": {"id": 537732, "cityId": 908, "mapId": 9081, "difficulty": 3, "point": 88, "moveToPoint": 0, "p78": {"t": "bl", "p": 0}, "p87": {"t": "bl", "p": 0}, "p88": {"t": "en", "p": 1}}, "ret": 0, "retMsg": "SUCCESS", "serialNo": 135}}
]

var dungRq3 = {"body": [
    {"Adventure_GetRecordInfo_Req": {"difficulty": 3, "characterId": null, "serialNo": 139, "cityId": 908}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungRs3 = [
    {"Adventure_GetRecordInfo_Res": {"isLimitedTime": 0, "usedTime": 0, "speedRecord": 0, "cleanRecord": 0, "ret": 0, "retMsg": "SUCCESS", "serialNo": 139}}
]

var dungMoveWRq = {"body": [
    {"Adventure_MapMove_Req": {"optional": null, "point": 87, "characterId": null, "serialNo": 199}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungMoveWRs = [
    {"Adventure_MapMove_Res": {"point": 87, "type": "bl", "result": [], "ret": 0, "retMsg": "SUCCESS", "serialNo": 199}},
    {"Notify": {"msgs": [
        {"Object_Change_Notify": {"className": "characterAdventureMap", "id": 537732, "attrs": {"p87": {"t": "bl", "p": 1}, "p86": {"t": "bl", "p": 0}, "point": 87, "moveToPoint": 0}}}
    ]}}
]


var dungPreAttRq = {"body": [
    {"Adventure_MapPreMove_Req": {"point": 76, "characterId": null, "serialNo": 2827}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungPreAttRs = [
    {"Adventure_MapPreMove_Res": {"point": 76, "type": "mo", "result": [], "ret": 0, "retMsg": "SUCCESS", "serialNo": 2827}},
    {"Notify": {"msgs": [
        {"Object_Change_Notify": {"className": "characterAdventureMap", "id": 537732, "attrs": {"moveToPoint": 76}}}
    ]}}
]

var dungAttRq = {"body": [
    {"Adventure_MapMove_Req": {"point": 76, "characterId": null, "optional": {"method": "attack"}, "serialNo": 2844}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungAttRs = [
    {"Adventure_MapMove_Res": {"point": 76, "type": "mo", "result": {"record": {"scene": 31, "attacker": {"id": 38729, "type": 0, "raceId": 3, "name": "Rlock.s1", "level": 101, "vip": 0, "vipPhoto": 0, "photoId": 3101, "strategyId": 10000009, "strategyName": "Left Guard", "fightingPoint": 46040, "population": 8611, "soldiers": {"11": {"id": 11, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1438, "sVB": 792338, "sDCnt": 0, "sRCnt": 0, "hId": 103104, "hName": "Leonine", "hPId": 1025, "x": 1, "y": 2, "atk": 2943, "def": 408, "vit": 551, "agi": 176, "spd": 1, "aSpd": 226, "hit": 962, "ddg": 208, "couHit": 420, "cmbHit": 690, "criHit": 2184, "hl": 0, "exp": 3206, "hero": {"id": 103104, "name": "Leonine", "pId": 1025, "clr": 5, "lvl": 101, "ldrB": 1032, "atkB": 1171, "defB": 191, "agiB": 434, "vitB": 177, "ldrA": 406, "atkA": 3961, "defA": 1188, "agiA": 768, "vitA": 1279, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 340, "comHit": 410, "criHit": 1284, "hit": 607, "ddg": 120, "type": 1, "ptl": 73, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1438, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 10235, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "12": {"id": 12, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1413, "sVB": 758781, "sDCnt": 0, "sRCnt": 0, "hId": 105671, "hName": "Adara", "hPId": 3203, "x": 1, "y": 3, "atk": 2617, "def": 384, "vit": 537, "agi": 171, "spd": 1, "aSpd": 221, "hit": 1062, "ddg": 198.5, "couHit": 479, "cmbHit": 674, "criHit": 2114, "hl": 0, "exp": 4725, "hero": {"id": 105671, "name": "Adara", "pId": 3203, "clr": 5, "lvl": 100, "ldrB": 1025, "atkB": 1136, "defB": 168, "agiB": 432, "vitB": 168, "ldrA": 388, "atkA": 3326, "defA": 1040, "agiA": 699, "vitA": 1213, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 399, "comHit": 394, "criHit": 1274, "hit": 707, "ddg": 113, "type": 1, "ptl": 70, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1413, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 9473, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "13": {"id": 13, "sId": 11000306, "sName": "Deathbringer", "sCntB": 1354, "sVB": 2116302, "sDCnt": 133, "sRCnt": 79, "hId": 107729, "hName": "Helmi", "hPId": 2018, "x": 2, "y": 3, "atk": 553, "def": 1331, "vit": 1563, "agi": 354, "spd": 3, "aSpd": 504, "hit": 878, "ddg": 298, "couHit": 1249, "cmbHit": 514, "criHit": 931, "hl": 0, "exp": 6038, "hero": {"id": 107729, "name": "Helmi", "pId": 2018, "clr": 5, "lvl": 99, "ldrB": 1014, "atkB": 230, "defB": 967, "agiB": 171, "vitB": 570, "ldrA": 340, "atkA": 1566, "defA": 2539, "agiA": 983, "vitA": 1800, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 699, "comHit": 214, "criHit": 731, "hit": 593, "ddg": 115, "type": 2, "ptl": 71, "rebld": 0}, "soldier": {"id": 11000306, "name": "Deathbringer", "tId": 11, "lvl": 2, "pId": 306, "popl": 1354, "atkB": 180, "defB": 278, "agiB": 143, "vitB": 409, "spdB": 3, "couHitB": 550, "comHitB": 300, "criHitB": 200, "hitB": 285, "ddgB": 0, "fp": 4454, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "14": {"id": 14, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1728, "sVB": 1010880, "sDCnt": 0, "sRCnt": 0, "hId": 108268, "hName": "Bonatice", "hPId": 3411, "x": 1, "y": 1, "atk": 2983, "def": 405, "vit": 585, "agi": 175, "spd": 1, "aSpd": 225, "hit": 754, "ddg": 206.5, "couHit": 479, "cmbHit": 480, "criHit": 2310, "hl": 0, "exp": 3852, "hero": {"id": 108268, "name": "Bonatice", "pId": 3411, "clr": 6, "lvl": 101, "ldrB": 1150, "atkB": 1354, "defB": 217, "agiB": 505, "vitB": 227, "ldrA": 578, "atkA": 3858, "defA": 1020, "agiA": 657, "vitA": 1390, "atkE": 12, "defE": 20, "agiE": 28, "vitE": 23, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 399, "comHit": 200, "criHit": 1470, "hit": 364, "ddg": 119, "type": 1, "ptl": 85, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1728, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 12257, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 20, "": 0}, "effectIds": []}, "15": {"id": 15, "sId": 11000307, "sName": "Phantom Archer", "sCntB": 1353, "sVB": 1388178, "sDCnt": 0, "sRCnt": 0, "hId": 108622, "hName": "Lobo", "hPId": 3201, "x": 2, "y": 2, "atk": 597, "def": 789, "vit": 1026, "agi": 469, "spd": 2, "aSpd": 569, "hit": 830, "ddg": 369.5, "couHit": 358, "cmbHit": 864, "criHit": 1132, "hl": 0, "exp": 9050, "hero": {"id": 108622, "name": "Lobo", "pId": 3201, "clr": 5, "lvl": 97, "ldrB": 995, "atkB": 229, "defB": 954, "agiB": 169, "vitB": 549, "ldrA": 358, "atkA": 1427, "defA": 2113, "agiA": 1123, "vitA": 1769, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 208, "comHit": 214, "criHit": 932, "hit": 515, "ddg": 129, "type": 2, "ptl": 70, "rebld": 0}, "soldier": {"id": 11000307, "name": "Phantom Archer", "tId": 21, "lvl": 2, "pId": 307, "popl": 1353, "atkB": 203, "defB": 180, "agiB": 180, "vitB": 276, "spdB": 2, "couHitB": 150, "comHitB": 650, "criHitB": 200, "hitB": 315, "ddgB": 0, "fp": 4769, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "16": {"id": 16, "sId": 11000307, "sName": "Phantom Archer", "sCntB": 1325, "sVB": 1075900, "sDCnt": 322, "sRCnt": 193, "hId": 113355, "hName": "Abaddon", "hPId": 3410, "x": 2, "y": 1, "atk": 904, "def": 566, "vit": 812, "agi": 564, "spd": 2, "aSpd": 664, "hit": 1370, "ddg": 469, "couHit": 533, "cmbHit": 1108, "criHit": 1310, "hl": 0, "exp": 14771, "hero": {"id": 113355, "name": "Abaddon", "pId": 3410, "clr": 6, "lvl": 88, "ldrB": 1007, "atkB": 454, "defB": 351, "agiB": 874, "vitB": 346, "ldrA": 318, "atkA": 2821, "defA": 1401, "agiA": 910, "vitA": 1232, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 383, "comHit": 378, "criHit": 1110, "hit": 1055, "ddg": 184, "type": 3, "ptl": 85, "rebld": 0}, "soldier": {"id": 11000307, "name": "Phantom Archer", "tId": 21, "lvl": 2, "pId": 307, "popl": 1325, "atkB": 203, "defB": 180, "agiB": 180, "vitB": 276, "spdB": 2, "couHitB": 150, "comHitB": 650, "criHitB": 200, "hitB": 315, "ddgB": 0, "fp": 4852, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 20, "": 0}, "effectIds": []}}, "winner": true, "attacker": true, "award": {"characterResource": {"currency3": 480}, "characterBase": {"experience": 19199}}, "characterBuff": null}, "defender": {"id": "4630813", "type": 1, "raceId": 0, "name": "Boneskin Crocodile", "level": 88, "vip": 0, "vipPhoto": 0, "photoId": 955, "strategyId": 10000007, "strategyName": "Left Feint", "fightingPoint": 20000, "population": 49500, "soldiers": {"21": {"id": 21, "sId": 11000955, "sName": "Boneskin Crocodile", "sCntB": 2500, "sVB": 1725000, "sDCnt": 2500, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 14, "y": 4, "atk": 190, "def": 450, "vit": 690, "agi": 160, "spd": 3, "aSpd": 310, "hit": 1225, "ddg": 68, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000955, "name": "Boneskin Crocodile", "tId": 13, "lvl": 3, "pId": 955, "popl": 7500, "atkB": 190, "defB": 450, "agiB": 160, "vitB": 690, "spdB": 3, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"dodge": 50}, "effectIds": []}, "22": {"id": 22, "sId": 11000953, "sName": "Wandering Corpse", "sCntB": 3000, "sVB": 2070000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 14, "y": 2, "atk": 205, "def": 450, "vit": 690, "agi": 160, "spd": 3, "aSpd": 310, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000953, "name": "Wandering Corpse", "tId": 13, "lvl": 3, "pId": 953, "popl": 9000, "atkB": 190, "defB": 450, "agiB": 160, "vitB": 690, "spdB": 3, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 15}, "effectIds": []}, "23": {"id": 23, "sId": 11000954, "sName": "Tribal Lynx", "sCntB": 2000, "sVB": 1760000, "sDCnt": 2000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 14, "y": 1, "atk": 465, "def": 400, "vit": 880, "agi": 190, "spd": 4, "aSpd": 390, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000954, "name": "Tribal Lynx", "tId": 33, "lvl": 3, "pId": 954, "popl": 6000, "atkB": 450, "defB": 400, "agiB": 190, "vitB": 880, "spdB": 4, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 15}, "effectIds": []}, "24": {"id": 24, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 4, "atk": 320, "def": 180, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 68, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"dodge": 50}, "effectIds": []}, "25": {"id": 25, "sId": 11000953, "sName": "Wandering Corpse", "sCntB": 3000, "sVB": 2070000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 2, "atk": 205, "def": 450, "vit": 690, "agi": 160, "spd": 3, "aSpd": 310, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000953, "name": "Wandering Corpse", "tId": 13, "lvl": 3, "pId": 953, "popl": 9000, "atkB": 190, "defB": 450, "agiB": 160, "vitB": 690, "spdB": 3, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 15}, "effectIds": []}, "26": {"id": 26, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 1, "atk": 335, "def": 180, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 15}, "effectIds": []}}, "winner": false, "attacker": false, "award": null, "characterBuff": null}, "actions": [
        {"s": 16, "t": 1, "a": {"sId": 16, "aT": 1, "aS": 0, "tId": 23, "tHC": 802, "tHV": 705819, "tRC": 1198, "tRV": 1054181}},
        {"s": 15, "t": 1, "a": {"sId": 15, "aT": 1, "aS": 0, "tId": 22, "tHC": 333, "tHV": 230287, "tRC": 2667, "tRV": 1839713}},
        {"s": 13, "t": 1, "a": {"sId": 13, "x": 5, "aT": 0}},
        {"s": 23, "t": 1, "a": {"sId": 23, "x": 10, "aT": 0}},
        {"s": 21, "t": 1, "a": {"sId": 21, "x": 11, "aT": 0}},
        {"s": 22, "t": 1, "a": {"sId": 22, "x": 11, "aT": 0}},
        {"s": 25, "t": 1, "a": {"sId": 25, "x": 12, "aT": 0}},
        {"s": 11, "t": 1, "a": {"sId": 11, "aT": 1, "aS": 0, "tId": 22, "tHC": 2667, "tHV": 2936604, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 14, "t": 1, "a": {"sId": 14, "aT": 1, "aS": 0, "tId": 23, "tHC": 1198, "tHV": 4545150, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 12, "t": 1, "a": {"sId": 12, "aT": 1, "aS": 0, "tId": 25, "tHC": 3000, "tHV": 2524211, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 24, "t": 1, "a": {"sId": 24, "aT": 1, "aS": 0, "tId": 13, "tHC": 95, "tHV": 148855, "tRC": 1259, "tRV": 1967447}},
        {"s": 26, "t": 1, "a": {"sId": 26, "aT": 1, "aS": 0, "tId": 16, "tHC": 322, "tHV": 261567, "tRC": 1003, "tRV": 814333}},
        {"s": 16, "t": 1, "a": {"sId": 16, "aT": 1, "aS": 0, "tId": 26, "tHC": 1890, "tHV": 529305, "tRC": 1110, "tRV": 310695}},
        {"s": 15, "t": 1, "a": {"sId": 15, "aT": 1, "aS": 0, "tId": 26, "tHC": 1110, "tHV": 434433, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 13, "t": 1, "a": {"sId": 13, "x": 8, "aT": 0}},
        {"s": 21, "t": 1, "a": {"sId": 21, "x": 9, "aT": 1, "aS": 0, "tId": 13, "tHC": 38, "tHV": 59335, "tRC": 1221, "tRV": 1908112}},
        {"s": 11, "t": 1, "a": {"sId": 11, "aT": 1, "aS": 0, "tId": 21, "tHC": 2500, "tHV": 4037831, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 14, "t": 1, "a": {"sId": 14, "aT": 1, "aS": 0, "tId": 24, "tHC": 3000, "tHV": 3402898, "tRC": 0, "tRV": 0, "tD": 1}}
    ], "winner": "attacker", "lastingTime": 18, "version": 2}}, "ret": 0, "retMsg": "SUCCESS", "serialNo": 2844}},
    {"Notify": {"msgs": [
        {"UserMsg_Resource_Currency_Notify": {"currency": "currency3", "count": 480}},
        {"Object_Change_Notify": {"className": "characterResource", "id": 38729, "attrs": {"currency3": 201530}}},
        {"UserMsg_Base_Exp_Notify": {"experience": 19199, "oldLevel": 101, "nowLevel": 101}},
        {"Object_Create_Notify": {"className": "characterTimeEffect", "id": 11415337, "attrs": {"id": 11415337, "proxyName": "characterBase", "objectId": 38729, "attribute": "state", "op": 2, "opValue": 3, "nowValue": 3, "deadline": 1401996978, "remainTime": 18, "nextValue": 6}}},
        {"Object_Change_Notify": {"className": "characterBase", "id": 38729, "attrs": {"experience": 348216507, "state": 3, "energyMax": 300, "energy": 286}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 103104, "heroName": "Leonine", "experience": 3206, "oldLevel": 101, "nowLevel": 101, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 103104, "attrs": {"experience": 30093563, "fightingPoint": 10235}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 105671, "heroName": "Adara", "experience": 4725, "oldLevel": 100, "nowLevel": 100, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 105671, "attrs": {"experience": 15341823, "fightingPoint": 9473}}},
        {"Object_Change_Notify": {"className": "characterResource", "id": 38729, "attrs": {"soldiers": [
            {"id": 11000424, "undeployed": 605, "deployed": 4579},
            {"id": 11000426, "undeployed": 2615, "deployed": 0},
            {"id": 11000307, "undeployed": 4029, "deployed": 2678},
            {"id": 11000306, "undeployed": 1942, "deployed": 1300},
            {"id": 11000423, "undeployed": 974, "deployed": 0},
            {"id": 11000429, "undeployed": 68, "deployed": 0},
            {"id": 11000430, "undeployed": 571, "deployed": 0},
            {"id": 11000428, "undeployed": 1149, "deployed": 0},
            {"id": 11000422, "undeployed": 2646, "deployed": 0},
            {"id": 11000308, "undeployed": 4498, "deployed": 0},
            {"id": 11000452, "undeployed": 205, "deployed": 0},
            {"id": 11000451, "undeployed": 325, "deployed": 0},
            {"id": 11000455, "undeployed": 280, "deployed": 0},
            {"id": 11000421, "undeployed": 1333, "deployed": 0},
            {"id": 11000453, "undeployed": 40, "deployed": 0}
        ], "population": 38200}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 107729, "heroName": "Helmi", "experience": 6038, "oldLevel": 99, "nowLevel": 99, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 107729, "attrs": {"soldierCount": 1300, "experience": 14021298, "fightingPoint": 4277}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 108268, "heroName": "Bonatice", "experience": 3852, "oldLevel": 101, "nowLevel": 101, "heroColorId": 6}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 108268, "attrs": {"experience": 8649113, "fightingPoint": 12257}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 108622, "heroName": "Lobo", "experience": 9050, "oldLevel": 97, "nowLevel": 97, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 108622, "attrs": {"experience": 29387720, "fightingPoint": 4769}}},
        {"Object_Change_Notify": {"className": "characterResource", "id": 38729, "attrs": {"soldiers": [
            {"id": 11000424, "undeployed": 605, "deployed": 4579},
            {"id": 11000426, "undeployed": 2615, "deployed": 0},
            {"id": 11000307, "undeployed": 4029, "deployed": 2549},
            {"id": 11000306, "undeployed": 1942, "deployed": 1300},
            {"id": 11000423, "undeployed": 974, "deployed": 0},
            {"id": 11000429, "undeployed": 68, "deployed": 0},
            {"id": 11000430, "undeployed": 571, "deployed": 0},
            {"id": 11000428, "undeployed": 1149, "deployed": 0},
            {"id": 11000422, "undeployed": 2646, "deployed": 0},
            {"id": 11000308, "undeployed": 4498, "deployed": 0},
            {"id": 11000452, "undeployed": 205, "deployed": 0},
            {"id": 11000451, "undeployed": 325, "deployed": 0},
            {"id": 11000455, "undeployed": 280, "deployed": 0},
            {"id": 11000421, "undeployed": 1333, "deployed": 0},
            {"id": 11000453, "undeployed": 40, "deployed": 0}
        ], "population": 38071}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 113355, "heroName": "Abaddon", "experience": 14771, "oldLevel": 88, "nowLevel": 88, "heroColorId": 6}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 113355, "attrs": {"soldierCount": 1196, "experience": 3769087, "fightingPoint": 4380}}},
        {"Object_Change_Notify": {"className": "characterAdventureMap", "id": 537732, "attrs": {"p76": {"t": "mo", "p": 1, "a": {"mId": "4630813"}}, "p66": {"t": "ev", "p": 0}, "p75": {"t": "it", "p": 0, "a": {"rId": "80248"}}, "point": 76, "moveToPoint": 0}}}
    ]}}
]

var dungPickChestRq = {"body": [
    {"Adventure_MapMove_Req": {"point": 75, "characterId": null, "optional": null, "serialNo": 2859}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungPickChestRs = [
    {"Adventure_MapMove_Res": {"point": 75, "type": "it", "result": {"awardRet": true, "award": {"item": {"5109019": 1}}}, "ret": 0, "retMsg": "SUCCESS", "serialNo": 2859}},
    {"Notify": {"msgs": [
        {"Object_Create_Notify": {"className": "characterItem", "id": 9851878, "attrs": {"id": 9851878, "itemId": 5109019, "type": 1, "place": 0, "characterHeroId": 0, "count": 1, "obtainTime": 1401997012, "placeTime": 1401997012, "deadline": 0, "bind": 0, "slotCount": 0, "slotItemIds": [], "triggerSkillCount": 0, "levelEnhanced": 0, "runeId": 0}}},
        {"UserMsg_Item_Add_Notify": {"itemId": 5109019, "itemName": "Golden Treasure Chest III", "count": 1}},
        {"Object_Change_Notify": {"className": "characterAdventureMap", "id": 537732, "attrs": {"p75": {"t": "it", "p": 1, "a": {"rId": "80248"}}, "p65": {"t": "mo", "p": 0, "a": {"mId": "4630813"}}, "p74": {"t": "re", "p": 0, "a": {"rId": "89049"}}, "point": 75, "moveToPoint": 0}}}
    ]}}
]

var dungPickResRq = {"body": [
    {"Adventure_MapMove_Req": {"point": 74, "characterId": null, "optional": null, "serialNo": 2868}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungPickResRs = [
    {"Adventure_MapMove_Res": {"point": 74, "type": "re", "result": {"award": {"characterResource": {"wood": 120000}}}, "ret": 0, "retMsg": "SUCCESS", "serialNo": 2868}},
    {"Notify": {"msgs": [
        {"UserMsg_Resource_Notify": {"resource": "wood", "count": 120000, "realCount": 120000}},
        {"Object_Change_Notify": {"className": "characterResource", "id": 38729, "attrs": {"wood": 3444459}}},
        {"Object_Change_Notify": {"className": "characterAdventureMap", "id": 537732, "attrs": {"p74": {"t": "re", "p": 1, "a": {"rId": "89049"}}, "p64": {"t": "it", "p": 0, "a": {"rId": "80248"}}, "p73": {"t": "it", "p": 0, "a": {"rId": "80248"}}, "point": 74, "moveToPoint": 0}}}
    ]}}
]

var dungUnknAttRq = {"body": [
    {"Adventure_MapMove_Req": {"point": 43, "characterId": null, "optional": null, "serialNo": 2919}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungUnknAttRs = [
    {"Adventure_MapMove_Res": {"point": 43, "type": "ev", "result": {"innerType": "mo", "innerResult": {"record": {"scene": 31, "attacker": {"id": 38729, "type": 0, "raceId": 3, "name": "Rlock.s1", "level": 101, "vip": 0, "vipPhoto": 0, "photoId": 3101, "strategyId": 10000009, "strategyName": "Left Guard", "fightingPoint": 46040, "population": 8611, "soldiers": {"11": {"id": 11, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1438, "sVB": 792338, "sDCnt": 0, "sRCnt": 0, "hId": 103104, "hName": "Leonine", "hPId": 1025, "x": 1, "y": 2, "atk": 2943, "def": 408, "vit": 551, "agi": 176, "spd": 1, "aSpd": 226, "hit": 962, "ddg": 208, "couHit": 420, "cmbHit": 690, "criHit": 2184, "hl": 0, "exp": 3206, "hero": {"id": 103104, "name": "Leonine", "pId": 1025, "clr": 5, "lvl": 101, "ldrB": 1032, "atkB": 1171, "defB": 191, "agiB": 434, "vitB": 177, "ldrA": 406, "atkA": 3961, "defA": 1188, "agiA": 768, "vitA": 1279, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 340, "comHit": 410, "criHit": 1284, "hit": 607, "ddg": 120, "type": 1, "ptl": 73, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1438, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 10235, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "12": {"id": 12, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1413, "sVB": 758781, "sDCnt": 0, "sRCnt": 0, "hId": 105671, "hName": "Adara", "hPId": 3203, "x": 1, "y": 3, "atk": 2617, "def": 384, "vit": 537, "agi": 171, "spd": 1, "aSpd": 221, "hit": 1062, "ddg": 198.5, "couHit": 479, "cmbHit": 674, "criHit": 2114, "hl": 0, "exp": 4725, "hero": {"id": 105671, "name": "Adara", "pId": 3203, "clr": 5, "lvl": 100, "ldrB": 1025, "atkB": 1136, "defB": 168, "agiB": 432, "vitB": 168, "ldrA": 388, "atkA": 3326, "defA": 1040, "agiA": 699, "vitA": 1213, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 399, "comHit": 394, "criHit": 1274, "hit": 707, "ddg": 113, "type": 1, "ptl": 70, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1413, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 9473, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "13": {"id": 13, "sId": 11000306, "sName": "Deathbringer", "sCntB": 1354, "sVB": 2116302, "sDCnt": 95, "sRCnt": 57, "hId": 107729, "hName": "Helmi", "hPId": 2018, "x": 2, "y": 3, "atk": 553, "def": 1331, "vit": 1563, "agi": 354, "spd": 3, "aSpd": 504, "hit": 878, "ddg": 298, "couHit": 1249, "cmbHit": 514, "criHit": 931, "hl": 0, "exp": 6038, "hero": {"id": 107729, "name": "Helmi", "pId": 2018, "clr": 5, "lvl": 99, "ldrB": 1014, "atkB": 230, "defB": 967, "agiB": 171, "vitB": 570, "ldrA": 340, "atkA": 1566, "defA": 2539, "agiA": 983, "vitA": 1800, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 699, "comHit": 214, "criHit": 731, "hit": 593, "ddg": 115, "type": 2, "ptl": 71, "rebld": 0}, "soldier": {"id": 11000306, "name": "Deathbringer", "tId": 11, "lvl": 2, "pId": 306, "popl": 1354, "atkB": 180, "defB": 278, "agiB": 143, "vitB": 409, "spdB": 3, "couHitB": 550, "comHitB": 300, "criHitB": 200, "hitB": 285, "ddgB": 0, "fp": 4454, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "14": {"id": 14, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1728, "sVB": 1010880, "sDCnt": 0, "sRCnt": 0, "hId": 108268, "hName": "Bonatice", "hPId": 3411, "x": 1, "y": 1, "atk": 2983, "def": 405, "vit": 585, "agi": 175, "spd": 1, "aSpd": 225, "hit": 754, "ddg": 206.5, "couHit": 479, "cmbHit": 480, "criHit": 2310, "hl": 0, "exp": 3852, "hero": {"id": 108268, "name": "Bonatice", "pId": 3411, "clr": 6, "lvl": 101, "ldrB": 1150, "atkB": 1354, "defB": 217, "agiB": 505, "vitB": 227, "ldrA": 578, "atkA": 3858, "defA": 1020, "agiA": 657, "vitA": 1390, "atkE": 12, "defE": 20, "agiE": 28, "vitE": 23, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 399, "comHit": 200, "criHit": 1470, "hit": 364, "ddg": 119, "type": 1, "ptl": 85, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1728, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 12257, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 20, "": 0}, "effectIds": []}, "15": {"id": 15, "sId": 11000307, "sName": "Phantom Archer", "sCntB": 1353, "sVB": 1388178, "sDCnt": 199, "sRCnt": 119, "hId": 108622, "hName": "Lobo", "hPId": 3201, "x": 2, "y": 2, "atk": 597, "def": 789, "vit": 1026, "agi": 469, "spd": 2, "aSpd": 569, "hit": 830, "ddg": 369.5, "couHit": 358, "cmbHit": 864, "criHit": 1132, "hl": 0, "exp": 9050, "hero": {"id": 108622, "name": "Lobo", "pId": 3201, "clr": 5, "lvl": 97, "ldrB": 995, "atkB": 229, "defB": 954, "agiB": 169, "vitB": 549, "ldrA": 358, "atkA": 1427, "defA": 2113, "agiA": 1123, "vitA": 1769, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 208, "comHit": 214, "criHit": 932, "hit": 515, "ddg": 129, "type": 2, "ptl": 70, "rebld": 0}, "soldier": {"id": 11000307, "name": "Phantom Archer", "tId": 21, "lvl": 2, "pId": 307, "popl": 1353, "atkB": 203, "defB": 180, "agiB": 180, "vitB": 276, "spdB": 2, "couHitB": 150, "comHitB": 650, "criHitB": 200, "hitB": 315, "ddgB": 0, "fp": 4769, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "16": {"id": 16, "sId": 11000307, "sName": "Phantom Archer", "sCntB": 1325, "sVB": 1075900, "sDCnt": 0, "sRCnt": 0, "hId": 113355, "hName": "Abaddon", "hPId": 3410, "x": 2, "y": 1, "atk": 904, "def": 566, "vit": 812, "agi": 564, "spd": 2, "aSpd": 664, "hit": 1370, "ddg": 469, "couHit": 533, "cmbHit": 1108, "criHit": 1310, "hl": 0, "exp": 14771, "hero": {"id": 113355, "name": "Abaddon", "pId": 3410, "clr": 6, "lvl": 88, "ldrB": 1007, "atkB": 454, "defB": 351, "agiB": 874, "vitB": 346, "ldrA": 318, "atkA": 2821, "defA": 1401, "agiA": 910, "vitA": 1232, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 383, "comHit": 378, "criHit": 1110, "hit": 1055, "ddg": 184, "type": 3, "ptl": 85, "rebld": 0}, "soldier": {"id": 11000307, "name": "Phantom Archer", "tId": 21, "lvl": 2, "pId": 307, "popl": 1325, "atkB": 203, "defB": 180, "agiB": 180, "vitB": 276, "spdB": 2, "couHitB": 150, "comHitB": 650, "criHitB": 200, "hitB": 315, "ddgB": 0, "fp": 4852, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 20, "": 0}, "effectIds": []}}, "winner": true, "attacker": true, "award": {"item": {"5111015": 1}, "characterBase": {"experience": 19199}}, "characterBuff": null}, "defender": {"id": "4630811", "type": 1, "raceId": 0, "name": "Wandering Corpse", "level": 88, "vip": 0, "vipPhoto": 0, "photoId": 953, "strategyId": 10000006, "strategyName": "Right Hammerhead", "fightingPoint": 20000, "population": 54000, "soldiers": {"21": {"id": 21, "sId": 11000953, "sName": "Wandering Corpse", "sCntB": 3000, "sVB": 2070000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 14, "y": 2, "atk": 200, "def": 450, "vit": 690, "agi": 160, "spd": 3, "aSpd": 310, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 950, "hl": 0, "exp": 0, "soldier": {"id": 11000953, "name": "Wandering Corpse", "tId": 13, "lvl": 3, "pId": 953, "popl": 9000, "atkB": 190, "defB": 450, "agiB": 160, "vitB": 690, "spdB": 3, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 10, "criticalHit": 200}, "effectIds": []}, "22": {"id": 22, "sId": 11000956, "sName": "Deadeye Imp", "sCntB": 3000, "sVB": 2070000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 14, "y": 1, "atk": 200, "def": 450, "vit": 690, "agi": 160, "spd": 3, "aSpd": 310, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 950, "hl": 0, "exp": 0, "soldier": {"id": 11000956, "name": "Deadeye Imp", "tId": 13, "lvl": 3, "pId": 956, "popl": 9000, "atkB": 190, "defB": 450, "agiB": 160, "vitB": 690, "spdB": 3, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 10, "criticalHit": 200}, "effectIds": []}, "23": {"id": 23, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 4, "atk": 320, "def": 180, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": [], "effectIds": []}, "24": {"id": 24, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 3, "atk": 320, "def": 180, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": [], "effectIds": []}, "25": {"id": 25, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 2, "atk": 330, "def": 180, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 950, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 10, "criticalHit": 200}, "effectIds": []}, "26": {"id": 26, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 1, "atk": 330, "def": 180, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 950, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 10, "criticalHit": 200}, "effectIds": []}}, "winner": false, "attacker": false, "award": null, "characterBuff": null}, "actions": [
        {"s": 16, "t": 1, "a": {"sId": 16, "aT": 1, "aS": 0, "tId": 22, "tHC": 579, "tHV": 399856, "tRC": 2421, "tRV": 1670144}},
        {"s": 15, "t": 1, "a": {"sId": 15, "aT": 1, "aS": 0, "tId": 21, "tHC": 333, "tHV": 230287, "tRC": 2667, "tRV": 1839713}},
        {"s": 13, "t": 1, "a": {"sId": 13, "x": 5, "aT": 0}},
        {"s": 21, "t": 1, "a": {"sId": 21, "x": 11, "aT": 0}},
        {"s": 22, "t": 1, "a": {"sId": 22, "x": 11, "aT": 0}},
        {"s": 11, "t": 1, "a": {"sId": 11, "aT": 2, "aS": 0, "tId": 21, "tHC": 2667, "tHV": 4404906, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 14, "t": 1, "a": {"sId": 14, "aT": 1, "aS": 0, "tId": 22, "tHC": 2421, "tHV": 3583161, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 12, "t": 1, "a": {"sId": 12, "aT": 1, "aS": 0, "tId": 24, "tHC": 3000, "tHV": 2421893, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 23, "t": 1, "a": {"sId": 23, "aT": 1, "aS": 0, "tId": 13, "tHC": 95, "tHV": 148855, "tRC": 1259, "tRV": 1967447}},
        {"s": 25, "t": 1, "a": {"sId": 25, "aT": 1, "aS": 0, "tId": 15, "tHC": 199, "tHV": 204369, "tRC": 1154, "tRV": 1183809}},
        {"s": 26, "t": 1, "a": {"sId": 26, "aT": 1, "aS": 0, "tId": 16, "tDdg": 1}},
        {"s": 16, "t": 1, "a": {"sId": 16, "aT": 2, "aS": 0, "tId": 26, "tHC": 3000, "tHV": 1048848, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 15, "t": 1, "a": {"sId": 15, "aT": 1, "aS": 0, "tId": 25, "tDdg": 1}},
        {"s": 13, "t": 1, "a": {"sId": 13, "x": 8, "aT": 0}},
        {"s": 11, "t": 1, "a": {"sId": 11, "aT": 1, "aS": 0, "tId": 25, "tHC": 3000, "tHV": 2791678, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 14, "t": 1, "a": {"sId": 14, "aT": 1, "aS": 0, "tId": 23, "tHC": 3000, "tHV": 3402898, "tRC": 0, "tRV": 0, "tD": 1}}
    ], "winner": "attacker", "lastingTime": 16, "version": 2}}}, "ret": 0, "retMsg": "SUCCESS", "serialNo": 2919}},
    {"Notify": {"msgs": [
        {"Object_Create_Notify": {"className": "characterItem", "id": 9851885, "attrs": {"id": 9851885, "itemId": 5111015, "type": 1, "place": 0, "characterHeroId": 0, "count": 1, "obtainTime": 1401997145, "placeTime": 1401997145, "deadline": 0, "bind": 0, "slotCount": 0, "slotItemIds": [], "triggerSkillCount": 0, "levelEnhanced": 0, "runeId": 0}}},
        {"UserMsg_Item_Add_Notify": {"itemId": 5111015, "itemName": "Moonlight Topaz", "count": 1}},
        {"UserMsg_Base_Exp_Notify": {"experience": 19199, "oldLevel": 101, "nowLevel": 101}},
        {"Object_Create_Notify": {"className": "characterTimeEffect", "id": 11415357, "attrs": {"id": 11415357, "proxyName": "characterBase", "objectId": 38729, "attribute": "state", "op": 2, "opValue": 3, "nowValue": 3, "deadline": 1401997161, "remainTime": 16, "nextValue": 6}}},
        {"Object_Change_Notify": {"className": "characterBase", "id": 38729, "attrs": {"experience": 348274104, "state": 3, "energyMax": 300, "energy": 283}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 103104, "heroName": "Leonine", "experience": 3206, "oldLevel": 101, "nowLevel": 101, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 103104, "attrs": {"experience": 30103181, "fightingPoint": 10235}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 105671, "heroName": "Adara", "experience": 4725, "oldLevel": 100, "nowLevel": 100, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 105671, "attrs": {"experience": 15355998, "fightingPoint": 9473}}},
        {"Object_Change_Notify": {"className": "characterResource", "id": 38729, "attrs": {"soldiers": [
            {"id": 11000424, "undeployed": 605, "deployed": 4579},
            {"id": 11000426, "undeployed": 2615, "deployed": 0},
            {"id": 11000307, "undeployed": 3824, "deployed": 2678},
            {"id": 11000306, "undeployed": 1850, "deployed": 1316},
            {"id": 11000423, "undeployed": 974, "deployed": 0},
            {"id": 11000429, "undeployed": 68, "deployed": 0},
            {"id": 11000430, "undeployed": 571, "deployed": 0},
            {"id": 11000428, "undeployed": 1149, "deployed": 0},
            {"id": 11000422, "undeployed": 2646, "deployed": 0},
            {"id": 11000308, "undeployed": 4498, "deployed": 0},
            {"id": 11000452, "undeployed": 205, "deployed": 0},
            {"id": 11000451, "undeployed": 325, "deployed": 0},
            {"id": 11000455, "undeployed": 280, "deployed": 0},
            {"id": 11000421, "undeployed": 1333, "deployed": 0},
            {"id": 11000453, "undeployed": 40, "deployed": 0}
        ], "population": 37919}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 107729, "heroName": "Helmi", "experience": 6038, "oldLevel": 99, "nowLevel": 99, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 107729, "attrs": {"soldierCount": 1316, "experience": 14039412, "fightingPoint": 4329}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 108268, "heroName": "Bonatice", "experience": 3852, "oldLevel": 101, "nowLevel": 101, "heroColorId": 6}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 108268, "attrs": {"experience": 8660669, "fightingPoint": 12257}}},
        {"Object_Change_Notify": {"className": "characterResource", "id": 38729, "attrs": {"soldiers": [
            {"id": 11000424, "undeployed": 605, "deployed": 4579},
            {"id": 11000426, "undeployed": 2615, "deployed": 0},
            {"id": 11000307, "undeployed": 3824, "deployed": 2598},
            {"id": 11000306, "undeployed": 1850, "deployed": 1316},
            {"id": 11000423, "undeployed": 974, "deployed": 0},
            {"id": 11000429, "undeployed": 68, "deployed": 0},
            {"id": 11000430, "undeployed": 571, "deployed": 0},
            {"id": 11000428, "undeployed": 1149, "deployed": 0},
            {"id": 11000422, "undeployed": 2646, "deployed": 0},
            {"id": 11000308, "undeployed": 4498, "deployed": 0},
            {"id": 11000452, "undeployed": 205, "deployed": 0},
            {"id": 11000451, "undeployed": 325, "deployed": 0},
            {"id": 11000455, "undeployed": 280, "deployed": 0},
            {"id": 11000421, "undeployed": 1333, "deployed": 0},
            {"id": 11000453, "undeployed": 40, "deployed": 0}
        ], "population": 37839}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 108622, "heroName": "Lobo", "experience": 9050, "oldLevel": 97, "nowLevel": 97, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 108622, "attrs": {"soldierCount": 1273, "experience": 29414870, "fightingPoint": 4487}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 113355, "heroName": "Abaddon", "experience": 14771, "oldLevel": 88, "nowLevel": 88, "heroColorId": 6}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 113355, "attrs": {"experience": 3813400, "fightingPoint": 4852}}},
        {"Object_Change_Notify": {"className": "characterAdventureMap", "id": 537732, "attrs": {"p43": {"t": "ev", "p": 1, "a": {"t": "mo", "p": 1, "a": {"mId": "4630811"}}}, "p33": {"t": "mo", "p": 0, "a": {"mId": "4630813"}}, "point": 43, "moveToPoint": 0}}}
    ]}}
]

var dungUnknResRq = {"body": [
    {"Adventure_MapMove_Req": {"point": 34, "characterId": null, "optional": null, "serialNo": 2969}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungUnknResRs = [
    {"Adventure_MapMove_Res": {"point": 34, "type": "ev", "result": {"innerType": "re", "innerResult": {"award": {"characterResource": {"wood": 120000}}}}, "ret": 0, "retMsg": "SUCCESS", "serialNo": 2969}},
    {"Notify": {"msgs": [
        {"UserMsg_Resource_Notify": {"resource": "wood", "count": 120000, "realCount": 120000}},
        {"Object_Change_Notify": {"className": "characterResource", "id": 38729, "attrs": {"wood": 3684459}}},
        {"Object_Change_Notify": {"className": "characterAdventureMap", "id": 537732, "attrs": {"p34": {"t": "ev", "p": 1, "a": {"t": "re", "p": 1, "a": {"rId": "89049"}}}, "p35": {"t": "mo", "p": 0, "a": {"mId": "4630812"}}, "point": 34, "moveToPoint": 0}}}
    ]}}
]

var dungNextLevRq = {"body": [
    {"Adventure_MapMove_Req": {"point": 22, "characterId": null, "optional": null, "serialNo": 2984}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungNextLevRs = [
    {"Adventure_MapMove_Res": {"point": 22, "type": "ex", "result": [], "ret": 0, "retMsg": "SUCCESS", "serialNo": 2984}},
    {"Notify": {"msgs": [
        {"Object_Change_Notify": {"className": "characterAdventureMap", "id": 537732, "attrs": {"p22": {"t": "ex", "p": 1, "a": {"mapId": 9083}}, "point": 22, "moveToPoint": 0}}},
        {"Object_Change_Notify": {"className": "characterAdventure", "id": 38729, "attrs": {"mapId": 9083, "maps": {"9081": 537732, "9083": 537940}}}}
    ]}}
]
var dungNextLev2Rq = {"body": [
    {"Adventure_GetMapInfo_Req": {"characterId": null, "mapId": 9083, "serialNo": 2987}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungNextLev2Rs = [
    {"Adventure_GetMapInfo_Res": {"map": {"id": 537940, "cityId": 908, "mapId": 9083, "difficulty": 3, "point": 22, "moveToPoint": 0, "p22": {"t": "en", "p": 1}, "p23": {"t": "mo", "p": 0, "a": {"mId": "4630811"}}, "p32": {"t": "bl", "p": 0}}, "ret": 0, "retMsg": "SUCCESS", "serialNo": 2987}}
]

var dungAttFBRq = {"body": [
    {"Adventure_MapMove_Req": {"point": 37, "characterId": null, "optional": {"method": "attack"}, "serialNo": 3050}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungAttFBRs = [
    {"Adventure_MapMove_Res": {"point": 37, "type": "mo", "result": {"record": {"scene": 31, "attacker": {"id": 38729, "type": 0, "raceId": 3, "name": "Rlock.s1", "level": 101, "vip": 0, "vipPhoto": 0, "photoId": 3101, "strategyId": 10000009, "strategyName": "Left Guard", "fightingPoint": 46040, "population": 8611, "soldiers": {"11": {"id": 11, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1438, "sVB": 792338, "sDCnt": 0, "sRCnt": 0, "hId": 103104, "hName": "Leonine", "hPId": 1025, "x": 1, "y": 2, "atk": 2943, "def": 408, "vit": 551, "agi": 176, "spd": 1, "aSpd": 226, "hit": 962, "ddg": 208, "couHit": 420, "cmbHit": 690, "criHit": 2184, "hl": 0, "exp": 3206, "hero": {"id": 103104, "name": "Leonine", "pId": 1025, "clr": 5, "lvl": 101, "ldrB": 1032, "atkB": 1171, "defB": 191, "agiB": 434, "vitB": 177, "ldrA": 406, "atkA": 3961, "defA": 1188, "agiA": 768, "vitA": 1279, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 340, "comHit": 410, "criHit": 1284, "hit": 607, "ddg": 120, "type": 1, "ptl": 73, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1438, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 10235, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "12": {"id": 12, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1413, "sVB": 758781, "sDCnt": 0, "sRCnt": 0, "hId": 105671, "hName": "Adara", "hPId": 3203, "x": 1, "y": 3, "atk": 2617, "def": 384, "vit": 537, "agi": 171, "spd": 1, "aSpd": 221, "hit": 1062, "ddg": 198.5, "couHit": 479, "cmbHit": 674, "criHit": 2114, "hl": 0, "exp": 4725, "hero": {"id": 105671, "name": "Adara", "pId": 3203, "clr": 5, "lvl": 100, "ldrB": 1025, "atkB": 1136, "defB": 168, "agiB": 432, "vitB": 168, "ldrA": 388, "atkA": 3326, "defA": 1040, "agiA": 699, "vitA": 1213, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 399, "comHit": 394, "criHit": 1274, "hit": 707, "ddg": 113, "type": 1, "ptl": 70, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1413, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 9473, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "13": {"id": 13, "sId": 11000306, "sName": "Deathbringer", "sCntB": 1354, "sVB": 2116302, "sDCnt": 0, "sRCnt": 0, "hId": 107729, "hName": "Helmi", "hPId": 2018, "x": 2, "y": 3, "atk": 553, "def": 1331, "vit": 1563, "agi": 354, "spd": 3, "aSpd": 504, "hit": 878, "ddg": 298, "couHit": 1249, "cmbHit": 514, "criHit": 931, "hl": 0, "exp": 6038, "hero": {"id": 107729, "name": "Helmi", "pId": 2018, "clr": 5, "lvl": 99, "ldrB": 1014, "atkB": 230, "defB": 967, "agiB": 171, "vitB": 570, "ldrA": 340, "atkA": 1566, "defA": 2539, "agiA": 983, "vitA": 1800, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 699, "comHit": 214, "criHit": 731, "hit": 593, "ddg": 115, "type": 2, "ptl": 71, "rebld": 0}, "soldier": {"id": 11000306, "name": "Deathbringer", "tId": 11, "lvl": 2, "pId": 306, "popl": 1354, "atkB": 180, "defB": 278, "agiB": 143, "vitB": 409, "spdB": 3, "couHitB": 550, "comHitB": 300, "criHitB": 200, "hitB": 285, "ddgB": 0, "fp": 4454, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "14": {"id": 14, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1728, "sVB": 1010880, "sDCnt": 0, "sRCnt": 0, "hId": 108268, "hName": "Bonatice", "hPId": 3411, "x": 1, "y": 1, "atk": 2983, "def": 405, "vit": 585, "agi": 175, "spd": 1, "aSpd": 225, "hit": 754, "ddg": 206.5, "couHit": 479, "cmbHit": 480, "criHit": 2310, "hl": 0, "exp": 3852, "hero": {"id": 108268, "name": "Bonatice", "pId": 3411, "clr": 6, "lvl": 101, "ldrB": 1150, "atkB": 1354, "defB": 217, "agiB": 505, "vitB": 227, "ldrA": 578, "atkA": 3858, "defA": 1020, "agiA": 657, "vitA": 1390, "atkE": 12, "defE": 20, "agiE": 28, "vitE": 23, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 399, "comHit": 200, "criHit": 1470, "hit": 364, "ddg": 119, "type": 1, "ptl": 85, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1728, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 12257, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 20, "": 0}, "effectIds": []}, "15": {"id": 15, "sId": 11000307, "sName": "Phantom Archer", "sCntB": 1353, "sVB": 1388178, "sDCnt": 0, "sRCnt": 0, "hId": 108622, "hName": "Lobo", "hPId": 3201, "x": 2, "y": 2, "atk": 597, "def": 789, "vit": 1026, "agi": 469, "spd": 2, "aSpd": 569, "hit": 830, "ddg": 369.5, "couHit": 358, "cmbHit": 864, "criHit": 1132, "hl": 0, "exp": 9050, "hero": {"id": 108622, "name": "Lobo", "pId": 3201, "clr": 5, "lvl": 97, "ldrB": 995, "atkB": 229, "defB": 954, "agiB": 169, "vitB": 549, "ldrA": 358, "atkA": 1427, "defA": 2113, "agiA": 1123, "vitA": 1769, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 208, "comHit": 214, "criHit": 932, "hit": 515, "ddg": 129, "type": 2, "ptl": 70, "rebld": 0}, "soldier": {"id": 11000307, "name": "Phantom Archer", "tId": 21, "lvl": 2, "pId": 307, "popl": 1353, "atkB": 203, "defB": 180, "agiB": 180, "vitB": 276, "spdB": 2, "couHitB": 150, "comHitB": 650, "criHitB": 200, "hitB": 315, "ddgB": 0, "fp": 4769, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "16": {"id": 16, "sId": 11000307, "sName": "Phantom Archer", "sCntB": 1325, "sVB": 1075900, "sDCnt": 0, "sRCnt": 0, "hId": 113355, "hName": "Abaddon", "hPId": 3410, "x": 2, "y": 1, "atk": 904, "def": 566, "vit": 812, "agi": 564, "spd": 2, "aSpd": 664, "hit": 1370, "ddg": 469, "couHit": 533, "cmbHit": 1108, "criHit": 1310, "hl": 0, "exp": 14771, "hero": {"id": 113355, "name": "Abaddon", "pId": 3410, "clr": 6, "lvl": 88, "ldrB": 1007, "atkB": 454, "defB": 351, "agiB": 874, "vitB": 346, "ldrA": 318, "atkA": 2821, "defA": 1401, "agiA": 910, "vitA": 1232, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 383, "comHit": 378, "criHit": 1110, "hit": 1055, "ddg": 184, "type": 3, "ptl": 85, "rebld": 0}, "soldier": {"id": 11000307, "name": "Phantom Archer", "tId": 21, "lvl": 2, "pId": 307, "popl": 1325, "atkB": 203, "defB": 180, "agiB": 180, "vitB": 276, "spdB": 2, "couHitB": 150, "comHitB": 650, "criHitB": 200, "hitB": 315, "ddgB": 0, "fp": 4852, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 20, "": 0}, "effectIds": []}}, "winner": true, "attacker": true, "award": {"item": {"5104011": 1}, "characterBase": {"experience": 19199}}, "characterBuff": null}, "defender": {"id": "4630812", "type": 1, "raceId": 0, "name": "Tribal Lynx", "level": 88, "vip": 0, "vipPhoto": 0, "photoId": 954, "strategyId": 10000005, "strategyName": "Left Hammerhead", "fightingPoint": 20000, "population": 51000, "soldiers": {"21": {"id": 21, "sId": 11000954, "sName": "Tribal Lynx", "sCntB": 2000, "sVB": 1760000, "sDCnt": 2000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 14, "y": 4, "atk": 460, "def": 400, "vit": 880, "agi": 190, "spd": 4, "aSpd": 390, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 950, "hl": 0, "exp": 0, "soldier": {"id": 11000954, "name": "Tribal Lynx", "tId": 33, "lvl": 3, "pId": 954, "popl": 6000, "atkB": 450, "defB": 400, "agiB": 190, "vitB": 880, "spdB": 4, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 10, "criticalHit": 200}, "effectIds": []}, "22": {"id": 22, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 14, "y": 3, "atk": 330, "def": 180, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 950, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 10, "criticalHit": 200}, "effectIds": []}, "23": {"id": 23, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 4, "atk": 330, "def": 180, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 950, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 10, "criticalHit": 200}, "effectIds": []}, "24": {"id": 24, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 3, "atk": 330, "def": 180, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 950, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": {"attack": 10, "criticalHit": 200}, "effectIds": []}, "25": {"id": 25, "sId": 11000953, "sName": "Wandering Corpse", "sCntB": 3000, "sVB": 2070000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 2, "atk": 190, "def": 450, "vit": 690, "agi": 160, "spd": 3, "aSpd": 310, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000953, "name": "Wandering Corpse", "tId": 13, "lvl": 3, "pId": 953, "popl": 9000, "atkB": 190, "defB": 450, "agiB": 160, "vitB": 690, "spdB": 3, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": [], "effectIds": []}, "26": {"id": 26, "sId": 11000953, "sName": "Wandering Corpse", "sCntB": 3000, "sVB": 2070000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 1, "atk": 190, "def": 450, "vit": 690, "agi": 160, "spd": 3, "aSpd": 310, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000953, "name": "Wandering Corpse", "tId": 13, "lvl": 3, "pId": 953, "popl": 9000, "atkB": 190, "defB": 450, "agiB": 160, "vitB": 690, "spdB": 3, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 3333.3333333333}, "strategyAdd": [], "effectIds": []}}, "winner": false, "attacker": false, "award": null, "characterBuff": null}, "actions": [
        {"s": 16, "t": 1, "a": {"sId": 16, "aT": 2, "aS": 0, "tId": 26, "tHC": 869, "tHV": 599784, "tRC": 2131, "tRV": 1470216}},
        {"s": 15, "t": 1, "a": {"sId": 15, "aT": 1, "aS": 0, "tId": 25, "tHC": 333, "tHV": 230287, "tRC": 2667, "tRV": 1839713}},
        {"s": 13, "t": 1, "a": {"sId": 13, "x": 5, "aT": 0}},
        {"s": 21, "t": 1, "a": {"sId": 21, "x": 10, "aT": 0}},
        {"s": 25, "t": 1, "a": {"sId": 25, "x": 12, "aT": 0}},
        {"s": 26, "t": 1, "a": {"sId": 26, "x": 12, "aT": 0}},
        {"s": 11, "t": 1, "a": {"sId": 11, "aT": 2, "aS": 0, "tId": 25, "tHC": 2667, "tHV": 4404906, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 14, "t": 1, "a": {"sId": 14, "aT": 1, "aS": 0, "tId": 26, "tHC": 2131, "tHV": 3583161, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 12, "t": 1, "a": {"sId": 12, "aT": 1, "aS": 0, "tId": 22, "tHC": 3000, "tHV": 2421893, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 23, "t": 1, "a": {"sId": 23, "aT": 1, "aS": 0, "tId": 13, "tDdg": 1}},
        {"s": 24, "t": 1, "a": {"sId": 24, "aT": 1, "aS": 0, "tId": 13, "tDdg": 1}},
        {"s": 16, "t": 1, "a": {"sId": 16, "aT": 1, "aS": 0, "tId": 24, "tHC": 2497, "tHV": 699232, "tRC": 503, "tRV": 140768}},
        {"s": 15, "t": 1, "a": {"sId": 15, "aT": 1, "aS": 0, "tId": 24, "tHC": 503, "tHV": 434433, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 13, "t": 1, "a": {"sId": 13, "x": 8, "aT": 0}},
        {"s": 21, "t": 1, "a": {"sId": 21, "x": 9, "aT": 1, "aS": 0, "tId": 13, "tDdg": 1}},
        {"s": 11, "t": 1, "a": {"sId": 11, "aT": 1, "aS": 0, "tId": 21, "tHC": 2000, "tHV": 3725658, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 14, "t": 1, "a": {"sId": 14, "aT": 1, "aS": 0, "tId": 23, "tHC": 3000, "tHV": 3402898, "tRC": 0, "tRV": 0, "tD": 1}}
    ], "winner": "attacker", "lastingTime": 17, "version": 2}}, "ret": 0, "retMsg": "SUCCESS", "serialNo": 3050}},
    {"Notify": {"msgs": [
        {"Object_Change_Notify": {"className": "characterItem", "id": 776720, "attrs": {"count": 91}}},
        {"UserMsg_Item_Add_Notify": {"itemId": 5104011, "itemName": "Bronze Key", "count": 1}},
        {"UserMsg_Base_Exp_Notify": {"experience": 19199, "oldLevel": 101, "nowLevel": 101}},
        {"Object_Create_Notify": {"className": "characterTimeEffect", "id": 11415415, "attrs": {"id": 11415415, "proxyName": "characterBase", "objectId": 38729, "attribute": "state", "op": 2, "opValue": 3, "nowValue": 3, "deadline": 1401997475, "remainTime": 17, "nextValue": 6}}},
        {"Object_Change_Notify": {"className": "characterBase", "id": 38729, "attrs": {"experience": 348350900, "state": 3, "energyMax": 300, "energy": 279}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 103104, "heroName": "Leonine", "experience": 3206, "oldLevel": 101, "nowLevel": 101, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 103104, "attrs": {"experience": 30116019, "fightingPoint": 10235}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 105671, "heroName": "Adara", "experience": 4725, "oldLevel": 100, "nowLevel": 100, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 105671, "attrs": {"experience": 15374919, "fightingPoint": 9473}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 107729, "heroName": "Helmi", "experience": 6038, "oldLevel": 99, "nowLevel": 99, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 107729, "attrs": {"experience": 14063420, "fightingPoint": 4454}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 108268, "heroName": "Bonatice", "experience": 3852, "oldLevel": 101, "nowLevel": 101, "heroColorId": 6}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 108268, "attrs": {"experience": 8676095, "fightingPoint": 12257}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 108622, "heroName": "Lobo", "experience": 9050, "oldLevel": 97, "nowLevel": 97, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 108622, "attrs": {"experience": 29451110, "fightingPoint": 4769}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 113355, "heroName": "Abaddon", "experience": 14771, "oldLevel": 88, "nowLevel": 88, "heroColorId": 6}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 113355, "attrs": {"experience": 3872550, "fightingPoint": 4852}}},
        {"Object_Change_Notify": {"className": "characterAdventureMap", "id": 537940, "attrs": {"p37": {"t": "mo", "p": 1, "a": {"mId": "4630812"}}, "p27": {"t": "bs", "p": 0, "a": {"mId": "4630802"}}, "p47": {"t": "it", "p": 0, "a": {"rId": "80248"}}, "p38": {"t": "mo", "p": 0, "a": {"mId": "4630815"}}, "point": 37, "moveToPoint": 0}}}
    ]}}
]

var dungBossPreAttRq = {"body": [
    {"Adventure_MapPreMove_Req": {"point": 27, "characterId": null, "serialNo": 3068}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungBossPreAttRs = [
    {"Adventure_MapPreMove_Res": {"point": 27, "type": "bs", "result": [], "ret": 0, "retMsg": "SUCCESS", "serialNo": 3068}},
    {"Notify": {"msgs": [
        {"Object_Change_Notify": {"className": "characterAdventureMap", "id": 537940, "attrs": {"moveToPoint": 27}}}
    ]}}
]
var dungBossAttRq = {"body": [
    {"Adventure_MapMove_Req": {"point": 27, "characterId": null, "optional": {"method": "attack"}, "serialNo": 3089}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var dungBossAttRs = [
    {"Adventure_MapMove_Res": {"point": 27, "type": "bs", "result": {"record": {"scene": 31, "attacker": {"id": 38729, "type": 0, "raceId": 3, "name": "Rlock.s1", "level": 101, "vip": 0, "vipPhoto": 0, "photoId": 3101, "strategyId": 10000009, "strategyName": "Left Guard", "fightingPoint": 46040, "population": 8611, "soldiers": {"11": {"id": 11, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1438, "sVB": 792338, "sDCnt": 0, "sRCnt": 0, "hId": 103104, "hName": "Leonine", "hPId": 1025, "x": 1, "y": 2, "atk": 2943, "def": 408, "vit": 551, "agi": 176, "spd": 1, "aSpd": 226, "hit": 962, "ddg": 208, "couHit": 420, "cmbHit": 690, "criHit": 2184, "hl": 0, "exp": 105207, "hero": {"id": 103104, "name": "Leonine", "pId": 1025, "clr": 5, "lvl": 101, "ldrB": 1032, "atkB": 1171, "defB": 191, "agiB": 434, "vitB": 177, "ldrA": 406, "atkA": 3961, "defA": 1188, "agiA": 768, "vitA": 1279, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 340, "comHit": 410, "criHit": 1284, "hit": 607, "ddg": 120, "type": 1, "ptl": 73, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1438, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 10235, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "12": {"id": 12, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1413, "sVB": 758781, "sDCnt": 0, "sRCnt": 0, "hId": 105671, "hName": "Adara", "hPId": 3203, "x": 1, "y": 3, "atk": 2617, "def": 384, "vit": 537, "agi": 171, "spd": 1, "aSpd": 221, "hit": 1062, "ddg": 198.5, "couHit": 479, "cmbHit": 674, "criHit": 2114, "hl": 0, "exp": 118146, "hero": {"id": 105671, "name": "Adara", "pId": 3203, "clr": 5, "lvl": 100, "ldrB": 1025, "atkB": 1136, "defB": 168, "agiB": 432, "vitB": 168, "ldrA": 388, "atkA": 3326, "defA": 1040, "agiA": 699, "vitA": 1213, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 399, "comHit": 394, "criHit": 1274, "hit": 707, "ddg": 113, "type": 1, "ptl": 70, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1413, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 9473, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "13": {"id": 13, "sId": 11000306, "sName": "Deathbringer", "sCntB": 1354, "sVB": 2116302, "sDCnt": 765, "sRCnt": 459, "hId": 107729, "hName": "Helmi", "hPId": 2018, "x": 2, "y": 3, "atk": 553, "def": 1331, "vit": 1563, "agi": 354, "spd": 3, "aSpd": 504, "hit": 878, "ddg": 298, "couHit": 1249, "cmbHit": 514, "criHit": 931, "hl": 0, "exp": 127364, "hero": {"id": 107729, "name": "Helmi", "pId": 2018, "clr": 5, "lvl": 99, "ldrB": 1014, "atkB": 230, "defB": 967, "agiB": 171, "vitB": 570, "ldrA": 340, "atkA": 1566, "defA": 2539, "agiA": 983, "vitA": 1800, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 699, "comHit": 214, "criHit": 731, "hit": 593, "ddg": 115, "type": 2, "ptl": 71, "rebld": 0}, "soldier": {"id": 11000306, "name": "Deathbringer", "tId": 11, "lvl": 2, "pId": 306, "popl": 1354, "atkB": 180, "defB": 278, "agiB": 143, "vitB": 409, "spdB": 3, "couHitB": 550, "comHitB": 300, "criHitB": 200, "hitB": 285, "ddgB": 0, "fp": 4454, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "14": {"id": 14, "sId": 11000424, "sName": "Tramp masters", "sCntB": 1728, "sVB": 1010880, "sDCnt": 0, "sRCnt": 0, "hId": 108268, "hName": "Bonatice", "hPId": 3411, "x": 1, "y": 1, "atk": 2983, "def": 405, "vit": 585, "agi": 175, "spd": 1, "aSpd": 225, "hit": 754, "ddg": 206.5, "couHit": 479, "cmbHit": 480, "criHit": 2310, "hl": 0, "exp": 126424, "hero": {"id": 108268, "name": "Bonatice", "pId": 3411, "clr": 6, "lvl": 101, "ldrB": 1150, "atkB": 1354, "defB": 217, "agiB": 505, "vitB": 227, "ldrA": 578, "atkA": 3858, "defA": 1020, "agiA": 657, "vitA": 1390, "atkE": 12, "defE": 20, "agiE": 28, "vitE": 23, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 399, "comHit": 200, "criHit": 1470, "hit": 364, "ddg": 119, "type": 1, "ptl": 85, "rebld": 0}, "soldier": {"id": 11000424, "name": "Tramp masters", "tId": 41, "lvl": 3, "pId": 424, "popl": 1728, "atkB": 460, "defB": 150, "agiB": 70, "vitB": 195, "spdB": 1, "couHitB": 80, "comHitB": 280, "criHitB": 720, "hitB": 300, "ddgB": 0, "fp": 12257, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 20, "": 0}, "effectIds": []}, "15": {"id": 15, "sId": 11000307, "sName": "Phantom Archer", "sCntB": 1353, "sVB": 1388178, "sDCnt": 0, "sRCnt": 0, "hId": 108622, "hName": "Lobo", "hPId": 3201, "x": 2, "y": 2, "atk": 597, "def": 789, "vit": 1026, "agi": 469, "spd": 2, "aSpd": 569, "hit": 830, "ddg": 369.5, "couHit": 358, "cmbHit": 864, "criHit": 1132, "hl": 0, "exp": 141412, "hero": {"id": 108622, "name": "Lobo", "pId": 3201, "clr": 5, "lvl": 97, "ldrB": 995, "atkB": 229, "defB": 954, "agiB": 169, "vitB": 549, "ldrA": 358, "atkA": 1427, "defA": 2113, "agiA": 1123, "vitA": 1769, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 208, "comHit": 214, "criHit": 932, "hit": 515, "ddg": 129, "type": 2, "ptl": 70, "rebld": 0}, "soldier": {"id": 11000307, "name": "Phantom Archer", "tId": 21, "lvl": 2, "pId": 307, "popl": 1353, "atkB": 203, "defB": 180, "agiB": 180, "vitB": 276, "spdB": 2, "couHitB": 150, "comHitB": 650, "criHitB": 200, "hitB": 315, "ddgB": 0, "fp": 4769, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 5, "": 0}, "effectIds": []}, "16": {"id": 16, "sId": 11000307, "sName": "Phantom Archer", "sCntB": 1325, "sVB": 1075900, "sDCnt": 0, "sRCnt": 0, "hId": 113355, "hName": "Abaddon", "hPId": 3410, "x": 2, "y": 1, "atk": 904, "def": 566, "vit": 812, "agi": 564, "spd": 2, "aSpd": 664, "hit": 1370, "ddg": 469, "couHit": 533, "cmbHit": 1108, "criHit": 1310, "hl": 0, "exp": 138485, "hero": {"id": 113355, "name": "Abaddon", "pId": 3410, "clr": 6, "lvl": 88, "ldrB": 1007, "atkB": 454, "defB": 351, "agiB": 874, "vitB": 346, "ldrA": 318, "atkA": 2821, "defA": 1401, "agiA": 910, "vitA": 1232, "atkE": 0, "defE": 0, "agiE": 0, "vitE": 0, "atkP": 0, "defP": 0, "agiP": 0, "vitP": 0, "petId": 0, "petPDId": 0, "couHit": 383, "comHit": 378, "criHit": 1110, "hit": 1055, "ddg": 184, "type": 3, "ptl": 85, "rebld": 0}, "soldier": {"id": 11000307, "name": "Phantom Archer", "tId": 21, "lvl": 2, "pId": 307, "popl": 1325, "atkB": 203, "defB": 180, "agiB": 180, "vitB": 276, "spdB": 2, "couHitB": 150, "comHitB": 650, "criHitB": 200, "hitB": 315, "ddgB": 0, "fp": 4852, "atkA": 40, "defA": 40, "agiA": 40, "vitA": 40, "spdA": 0, "couHitA": 0, "comHitA": 0, "criHitA": 0, "hitA": 0, "ddgA": 0}, "strategyAdd": {"defence": 20, "": 0}, "effectIds": []}}, "winner": true, "attacker": true, "award": {"characterResource": {"currency3": 5000}, "item": {"5113006": 1}, "characterBase": {"experience": 630000}}, "characterBuff": null}, "defender": {"id": "4630802", "type": 1, "raceId": 0, "name": "Morbidus Banebringer", "level": 93, "vip": 0, "vipPhoto": 0, "photoId": 951, "strategyId": 10000009, "strategyName": "Left Guard", "fightingPoint": 72000, "population": 45003, "soldiers": {"21": {"id": 21, "sId": 11000951, "sName": "Morbidus Banebringer", "sCntB": 1, "sVB": 5400000, "sDCnt": 1, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 14, "y": 4, "atk": 900000, "def": 1060, "vit": 5400000, "agi": 450, "spd": 6, "aSpd": 750, "hit": 4900, "ddg": 20, "couHit": 1500, "cmbHit": 1500, "criHit": 1500, "hl": 64002, "exp": 0, "soldier": {"id": 11000951, "name": "Morbidus Banebringer", "tId": 53, "lvl": 3, "pId": 951, "popl": 3, "atkB": 900000, "defB": 1040, "agiB": 450, "vitB": 5400000, "spdB": 6, "couHitB": 1500, "comHitB": 1500, "criHitB": 1500, "hitB": 4900, "ddgB": 20, "fp": 12000}, "strategyAdd": {"defence": 20}, "effectIds": []}, "22": {"id": 22, "sId": 11000953, "sName": "Wandering Corpse", "sCntB": 3000, "sVB": 2070000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 14, "y": 3, "atk": 190, "def": 455, "vit": 690, "agi": 160, "spd": 3, "aSpd": 310, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000953, "name": "Wandering Corpse", "tId": 13, "lvl": 3, "pId": 953, "popl": 9000, "atkB": 190, "defB": 450, "agiB": 160, "vitB": 690, "spdB": 3, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 12000}, "strategyAdd": {"defence": 5}, "effectIds": []}, "23": {"id": 23, "sId": 11000953, "sName": "Wandering Corpse", "sCntB": 3000, "sVB": 2070000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 14, "y": 2, "atk": 190, "def": 455, "vit": 690, "agi": 160, "spd": 3, "aSpd": 310, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000953, "name": "Wandering Corpse", "tId": 13, "lvl": 3, "pId": 953, "popl": 9000, "atkB": 190, "defB": 450, "agiB": 160, "vitB": 690, "spdB": 3, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 12000}, "strategyAdd": {"defence": 5}, "effectIds": []}, "24": {"id": 24, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 4, "atk": 320, "def": 200, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 12000}, "strategyAdd": {"defence": 20}, "effectIds": []}, "25": {"id": 25, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 3, "atk": 320, "def": 185, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 12000}, "strategyAdd": {"defence": 5}, "effectIds": []}, "26": {"id": 26, "sId": 11000978, "sName": "Corrupted Accolyte", "sCntB": 3000, "sVB": 840000, "sDCnt": 3000, "sRCnt": 0, "hId": 0, "hName": "", "hPId": 0, "x": 15, "y": 2, "atk": 320, "def": 185, "vit": 280, "agi": 145, "spd": 1, "aSpd": 195, "hit": 1225, "ddg": 18, "couHit": 750, "cmbHit": 750, "criHit": 750, "hl": 0, "exp": 0, "soldier": {"id": 11000978, "name": "Corrupted Accolyte", "tId": 43, "lvl": 3, "pId": 978, "popl": 9000, "atkB": 320, "defB": 180, "agiB": 145, "vitB": 280, "spdB": 1, "couHitB": 750, "comHitB": 750, "criHitB": 750, "hitB": 1225, "ddgB": 18, "fp": 12000}, "strategyAdd": {"defence": 5}, "effectIds": []}}, "winner": false, "attacker": false, "award": null, "characterBuff": null}, "actions": [
        {"s": 21, "t": 1, "a": {"sId": 21, "x": 8, "aT": 0}},
        {"s": 16, "t": 1, "a": {"sId": 16, "aT": 1, "aS": 0, "tId": 23, "tHC": 577, "tHV": 398385, "tRC": 2423, "tRV": 1671615}},
        {"s": 15, "t": 1, "a": {"sId": 15, "aT": 1, "aS": 0, "tId": 23, "tHC": 332, "tHV": 229192, "tRC": 2091, "tRV": 1442423}},
        {"s": 13, "t": 1, "a": {"sId": 13, "x": 5, "aT": 0}},
        {"s": 22, "t": 1, "a": {"sId": 22, "x": 11, "aT": 0}},
        {"s": 23, "t": 1, "a": {"sId": 23, "x": 11, "aT": 0}},
        {"s": 11, "t": 1, "a": {"sId": 11, "aT": 2, "aS": 0, "tId": 23, "tHC": 2091, "tHV": 4398424, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 14, "t": 1, "a": {"sId": 14, "aT": 2, "aS": 0, "tId": 26, "tHC": 3000, "tHV": 5096292, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 12, "t": 1, "a": {"sId": 12, "aT": 1, "aS": 0, "tId": 22, "tHC": 3000, "tHV": 2520103, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 24, "t": 1, "a": {"sId": 24, "aT": 1, "aS": 0, "tId": 13, "tHC": 95, "tHV": 148855, "tRC": 1259, "tRV": 1967447}},
        {"s": 25, "t": 1, "a": {"sId": 25, "aT": 1, "aS": 0, "tId": 13, "tHC": 95, "tHV": 148855, "tRC": 1164, "tRV": 1818592}},
        {"s": 25, "t": 1, "a": {"sId": 25, "aT": 1, "aS": 1, "tId": 13, "tDdg": 1}},
        {"s": 21, "t": 1, "a": {"sId": 21, "x": 6, "aT": 1, "aS": 0, "tId": 13, "tHC": 575, "tHV": 898670, "tRC": 589, "tRV": 919922}},
        {"s": 16, "t": 1, "a": {"sId": 16, "aT": 2, "aS": 0, "tId": 25, "tHC": 3000, "tHV": 1044031, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 15, "t": 1, "a": {"sId": 15, "aT": 1, "aS": 0, "tId": 21, "tHC": 0, "tHV": 291020, "tRC": 1, "tRV": 5108980}},
        {"s": 13, "t": 1, "a": {"sId": 13, "aT": 1, "aS": 0, "tId": 21, "tHC": 0, "tHV": 111668, "tRC": 1, "tRV": 4997312}},
        {"s": 11, "t": 1, "a": {"sId": 11, "aT": 1, "aS": 0, "tId": 21, "tHC": 0, "tHV": 2800246, "tRC": 1, "tRV": 2197066}},
        {"s": 14, "t": 1, "a": {"sId": 14, "aT": 1, "aS": 0, "tId": 21, "tHC": 1, "tHV": 3422858, "tRC": 0, "tRV": 0, "tD": 1}},
        {"s": 12, "t": 1, "a": {"sId": 12, "aT": 1, "aS": 0, "tId": 24, "tHC": 3000, "tHV": 2404698, "tRC": 0, "tRV": 0, "tD": 1}}
    ], "winner": "attacker", "lastingTime": 19, "version": 2}}, "ret": 0, "retMsg": "SUCCESS", "serialNo": 3089}},
    {"Notify": {"msgs": [
        {"UserMsg_Resource_Currency_Notify": {"currency": "currency3", "count": 5000}},
        {"Object_Change_Notify": {"className": "characterResource", "id": 38729, "attrs": {"currency3": 207370}}},
        {"Object_Create_Notify": {"className": "characterItem", "id": 9851917, "attrs": {"id": 9851917, "itemId": 5113006, "type": 1, "place": 0, "characterHeroId": 0, "count": 1, "obtainTime": 1401997607, "placeTime": 1401997607, "deadline": 0, "bind": 0, "slotCount": 0, "slotItemIds": [], "triggerSkillCount": 0, "levelEnhanced": 0, "runeId": 0}}},
        {"UserMsg_Item_Add_Notify": {"itemId": 5113006, "itemName": "Totem of the Void", "count": 1}},
        {"UserMsg_Base_Exp_Notify": {"experience": 630000, "oldLevel": 101, "nowLevel": 101}},
        {"Object_Create_Notify": {"className": "characterTimeEffect", "id": 11415443, "attrs": {"id": 11415443, "proxyName": "characterBase", "objectId": 38729, "attribute": "state", "op": 2, "opValue": 3, "nowValue": 3, "deadline": 1401997626, "remainTime": 19, "nextValue": 6}}},
        {"Object_Change_Notify": {"className": "characterBase", "id": 38729, "attrs": {"experience": 348980900, "state": 3, "energyMax": 300, "energy": 278}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 103104, "heroName": "Leonine", "experience": 105207, "oldLevel": 101, "nowLevel": 101, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 103104, "attrs": {"experience": 30221226, "fightingPoint": 10235}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 105671, "heroName": "Adara", "experience": 118146, "oldLevel": 100, "nowLevel": 100, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 105671, "attrs": {"experience": 15493065, "fightingPoint": 9473}}},
        {"Object_Change_Notify": {"className": "characterResource", "id": 38729, "attrs": {"soldiers": [
            {"id": 11000424, "undeployed": 605, "deployed": 4579},
            {"id": 11000426, "undeployed": 2615, "deployed": 0},
            {"id": 11000307, "undeployed": 3664, "deployed": 2678},
            {"id": 11000306, "undeployed": 1741, "deployed": 1048},
            {"id": 11000423, "undeployed": 974, "deployed": 0},
            {"id": 11000429, "undeployed": 68, "deployed": 0},
            {"id": 11000430, "undeployed": 571, "deployed": 0},
            {"id": 11000428, "undeployed": 1149, "deployed": 0},
            {"id": 11000422, "undeployed": 2646, "deployed": 0},
            {"id": 11000308, "undeployed": 4498, "deployed": 0},
            {"id": 11000452, "undeployed": 205, "deployed": 0},
            {"id": 11000451, "undeployed": 325, "deployed": 0},
            {"id": 11000455, "undeployed": 280, "deployed": 0},
            {"id": 11000421, "undeployed": 1333, "deployed": 0},
            {"id": 11000453, "undeployed": 40, "deployed": 0}
        ], "population": 37382}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 107729, "heroName": "Helmi", "experience": 127364, "oldLevel": 99, "nowLevel": 99, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 107729, "attrs": {"soldierCount": 1048, "experience": 14190784, "fightingPoint": 3448}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 108268, "heroName": "Bonatice", "experience": 126424, "oldLevel": 101, "nowLevel": 101, "heroColorId": 6}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 108268, "attrs": {"experience": 8802519, "fightingPoint": 12257}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 108622, "heroName": "Lobo", "experience": 141412, "oldLevel": 97, "nowLevel": 97, "heroColorId": 5}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 108622, "attrs": {"experience": 29592522, "fightingPoint": 4769}}},
        {"UserMsg_Hero_Exp_Notify": {"heroId": 113355, "heroName": "Abaddon", "experience": 138485, "oldLevel": 88, "nowLevel": 88, "heroColorId": 6}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 113355, "attrs": {"experience": 4011035, "fightingPoint": 4852}}},
        {"Object_Change_Notify": {"className": "characterActionStat", "id": 38729, "attrs": {"taskDailyAdventureKillBoss": 1}}},
        {"Object_Change_Notify": {"className": "characterAdventureMap", "id": 537940, "attrs": {"p27": {"t": "bs", "p": 1, "a": {"mId": "4630802"}}, "p28": {"t": "bl", "p": 0}, "point": 27, "moveToPoint": 0}}}
    ]}}
]

var dungNextLev = {"session": "l09nclqacpht2b2mb593h4f726", "body": [
    {"Adventure_GetMapInfo_Req": {"characterId": null, "serialNo": 694, "mapId": 10072}}
]}