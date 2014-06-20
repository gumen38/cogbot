var maximizeRq = {"body": [
    {"Hero_DeploySoldierAllMax_Req": {"characterId": null, "serialNo": 2928}}
], "session": "i0ensb93l1c55cjc4tm05r8p24"}
var maximizeRs = [
    {"Hero_DeploySoldierAllMax_Res": {"ret": 0, "retMsg": "SUCCESS", "serialNo": 2928}},
    {"Notify": {"msgs": [
        {"Object_Change_Notify": {"className": "characterHero", "id": 107729, "attrs": {"soldierId": 11000306, "soldierCount": 1354, "fightingPoint": 4454}}},
        {"Object_Change_Notify": {"className": "characterHero", "id": 108622, "attrs": {"soldierId": 11000307, "soldierCount": 1353, "fightingPoint": 4769}}},
        {"Object_Change_Notify": {"className": "characterResource", "id": 38729, "attrs": {"soldiers": [
            {"id": 11000424, "undeployed": 605, "deployed": 4579},
            {"id": 11000426, "undeployed": 2615, "deployed": 0},
            {"id": 11000307, "undeployed": 3744, "deployed": 2678},
            {"id": 11000306, "undeployed": 1812, "deployed": 1354},
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
        ]}}}
    ]}}
]


/*
 -, Helmi, Abaddon, Adara
 -, Lobo, Leonine, Bonatice
 */
var deployRG = [
    {"body": [
        {"HeroSet_SetTroopStrategy_Req":
        {"characterId": null,
            "defenceTroopStrategy": {"21": -1, "22": 0, "23": 0, "24": 0, "11": -1, "12": 379979, "13": 0, "14": 0},
            "serialNo": 3634,
            "attackTroopStrategyId": 10000010,
            "defenceTroopStrategyId": 10000010,
            "attackTroopStrategy": {"21": -1, "22": 108622, "23": 103104, "24": 108268, "11": -1, "12": 107729, "13": 113355, "14": 105671}
        }}
    ], "session": "i0ensb93l1c55cjc4tm05r8p24"},
    [
        {"HeroSet_SetTroopStrategy_Res": {"ret": 0, "retMsg": "SUCCESS", "serialNo": 3634}},
        {"Notify": {"msgs": [
            {"Object_Change_Notify": {"className": "characterHero", "id": 98459, "attrs": {"state": 2, "fightingPoint": 0}}},
            {"Object_Change_Notify": {"className": "characterHero", "id": 103104, "attrs": {"state": 0, "fightingPoint": 10235}}},
            {"Object_Change_Notify": {"className": "characterHero", "id": 105671, "attrs": {"state": 0, "fightingPoint": 9473}}},
            {"Object_Change_Notify": {"className": "characterHero", "id": 106054, "attrs": {"state": 2, "fightingPoint": 0}}},
            {"Object_Change_Notify": {"className": "characterHero", "id": 106588, "attrs": {"state": 2, "fightingPoint": 0}}},
            {"Object_Change_Notify": {"className": "characterHero", "id": 107076, "attrs": {"state": 2, "fightingPoint": 0}}},
            {"Object_Change_Notify": {"className": "characterHero", "id": 107729, "attrs": {"state": 0, "fightingPoint": 4454}}},
            {"Object_Change_Notify": {"className": "characterHero", "id": 108268, "attrs": {"state": 0, "fightingPoint": 12257}}},
            {"Object_Change_Notify": {"className": "characterHero", "id": 108622, "attrs": {"state": 0, "fightingPoint": 4769}}},
            {"Object_Change_Notify": {"className": "characterHero", "id": 113355, "attrs": {"state": 0, "fightingPoint": 4852}}},
            {"Object_Change_Notify": {"className": "characterHero", "id": 379979, "attrs": {"state": 1, "fightingPoint": 0}}},
            {"Object_Change_Notify": {"className": "characterHeroSet", "id": 38729, "attrs": {"attackTroopStrategyId": 10000010, "attackTroopStrategy": {"11": -1, "12": 107729, "13": 113355, "14": 105671, "21": -1, "22": 108622, "23": 103104, "24": 108268}, "defenceTroopStrategyId": 10000010, "defenceTroopStrategy": {"11": -1, "12": 379979, "13": 0, "14": 0, "21": -1, "22": 0, "23": 0, "24": 0}}}}
        ]}}
    ]
]

var assignDeathbringersToLobo = [
    {"body": [
        {"Hero_DeploySoldier_Req": {"soldierId": 11000306, "characterId": null, "soldierCount": 1353, "serialNo": 3665, "id": 108622}}
    ], "session": "i0ensb93l1c55cjc4tm05r8p24"},
    [
        {"Hero_DeploySoldier_Res": {"ret": 0, "retMsg": "SUCCESS", "serialNo": 3665}},
        {"Notify": {"msgs": [
            {"Object_Change_Notify": {"className": "characterResource", "id": 38729, "attrs": {"soldiers": [
                {"id": 11000424, "undeployed": 39, "deployed": 4579},
                {"id": 11000426, "undeployed": 2615, "deployed": 0},
                {"id": 11000307, "undeployed": 2070, "deployed": 1325},
                {"id": 11000306, "undeployed": 881, "deployed": 2707},
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
            ]}}},
            {"Object_Change_Notify": {"className": "characterHero", "id": 108622, "attrs": {"soldierId": 11000306, "soldierCount": 1353, "fightingPoint": 4292}}}
        ]}}
    ]
]