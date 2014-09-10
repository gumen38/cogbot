CogBot - a Call of Gods game bot
=====================

What is it?
----------

It is an assistance tool to CoG players.

Features:

* Save/load deploy/formations and soldier assigns on dungeon boss and abyss room.

* Automatically do dungeon and abyss using saved by player strategies.

* Bunch of utilites.



Version history
------------

_hotfixes_

-Fixed issue with partial settings file. Check end of this file to see example of full settings file

_Version 0.11a_

1. New donation account. Previous was not able to accept donation (Paypal, doh..). New account was tested and seems working.
2. Auto box opener is slightly better now. Opens III, IV silver/bronze and V gold chests.
3. Monster island auto clear (atm only lvl 100 - plan island100).
4. Ability to force schedule-able plans like island100, altroutine, reset (scheduler must be disabled).

_Version 0.10a_

1. Abyss auto UI now have button for each layer, not more laggy input
2. Inventory trash marking easier: press button to start marking, sell stuff, press button to stop marking
3. Added scheduling alts routine.
4. Removed 'Roll' button, it's now controlled by scheduler.

**ALTS ROUTINE IS BLOCKED ATM FOR COMPATIBILITY REASONS IF U NEED IT UNCOMMENT CODE IN WIDGET.JS**


_Version 0.9a_

1. Automated session id, character id, game server url management. No longer need to set it in settings file!
2. Individualized strategy files: now each alt will have own strategy folder!
3. A routine to automatically login all your alts and sign-in them and also roll free wheel.
4. Fixed PayPal account. Donations now should work!

*Important*: remove characterId and actionUrl from your private settings file - they are not longer needed (but you can leave them as is).

_Version 0.8a_

1. Fast mode in dungeon now is about acceptable efficiency. Still not optimal and sill laying path through the monsters, but to avoid it would require some work.
2. Improved readme.

_Version 0.7a_

1. Fixed dungeon bugs.
2. Added fullauto mode drafts (mode which doesn't require browser to run).
3. Moved settings file outside of the project (say thanks to some smartasses lurking on private data). Example of settings file is provided below. Path to settings file is specified in server/userSettingsPath.txt

_Version 0.6a_

1. Fixed numerous bugs with dungeon/strategy modules.
2. Added inventory utilites: autoopen bronze/silver/gold boxes (only tier 5 atm), autosell trash, trash learning button.
3. Found some crazy memory leaks (1GB/per day). Planning fix in next version.

_Version 0.5a_

1. Removed FoxyProxy due to installation difficulty. Added custom proxy within "CogBot Admin Panel" chrome plugin.
2. Added secondary -default, -per dungeon boss, -per abyss room strategies support. Handy to manage stuff like 'use barks when short on caterans'.

_Version 0.4a_

1. Dungeon crawler.
2. Depleted soldiers notification.

_Version 0.3a_

1. Automatic Abyss crawler
2. Better dungeon feedback
3. Removed some options

_Version 0.2a_

1. Automatic 'Maximize soldiers'.  
2. Automatic formation/soldiers loading.  
3. Manual formation/soldiers save.  
4. User interface to configure save/load/maximize options.  
5. User interface to show current formation/soldiers.  
6. User interface to save current formation/soldiers.  
7. User interface to show automatical formation/soldiers loading alerts.  
8. Supports save/load for: Specific Dungeon boss, Specific Abyss room, World boss, Default setup  

How it works
------------

1. It uses node.js server (http://nodejs.org/) which should be installed to run CogBot Server.
2. It uses CogBot chrome plugin to a) provide UI b) proxy game requests to CogBot Server.

Installation guide
------------------

*Installing CogBot server*

1. Install node.js
2. Download CogBot distrib as a zip from github.
3. Unpack zip somewhere, say c:/cogbot.
4. Create settings file somewhere. Edit c:/cogbot/server/userSettingsPath.txt - it should be path to your settings file.
5. Copy defaults to settings file (see below).
6. Run run.bat

*Installing CogBot Admin plugin*

1. Install the plugin: chrome extensions -> enable developer mode -> install unpacked extension -> point it to /plugin folder
2. Go to CogBot page
3. Press CogBot plugin button in chrome (a rusty cog icon).

*Important: settings file*

Put on your disc C file named

`cog_private_settings.json`

with content

    settings = {
        "minimize": {
            "settings": true,
            "log": true,
            "save": true,
            "load": false,
            "current": true
        },
        "dungeon": {
            "fastMode": false
        }
    }

Multi-acc bot guide
-------------------

Bot supports automatic switching of multiple alts and doing stuff on them (sigh-in, roll wheel, grab resources, grab alliance stuff).
To enable it, you need run chrome browser with --disable-web-security flag and add chars and schedule sections to private settings file.

    "chars": {
        "alts": "MyMainChar,MyAlt[1-50]",
        "password": "myPassword",
        "main": "MyMainChar"
    },
    "schedule": {
        "plan": {
          "00:20-03:00":   "altroutine",
            "03:01-03:10":   "clash",
            "05:01-05:59":   "superunits",
            "06:00-07:59":   "altroutine",
            "08:00-08:30":   "wboss",
            "10:00-10:05":   "reset",
            "12:00-13:00": "altroutine",
            "13:01-14:00": "altroutine",
            "14:01-15:00": "altroutine",
            "15:01-16:00": "altroutine",
            "16:01-17:00": "altroutine",
            "17:01-18:00": "altroutine",
            "18:01-19:00": "altroutine",
            "19:01-20:00": "altroutine",
            "20:01-20:59": "superunits",
            "21:00-21:30": "wboss",
            "23:01-23:10": "clash"
        },
        "enable": true
    }

`chars.alts` here is a list of all your chars (main and alts). Separate them by comma, use [] to specify number range, dont use spaces/
`chars.password` here is password (should be same for all)
`schedule.enable` enables or disables schedule
`schedule.plan` is list of timeranges (your local time) when specified plan should run. For alts rolling its 'altroutine' plan.

There are only 2 plans are supported now:
`altroutine`: iterate all characters and do some daily stuff on them
`reset`: specifies your local time of server reset time (0:00);

Planned
-------

Planned Features:
1. Auto-manage recruitment and resource gathering.
2. Scheduler.
3. Browserless mode.

Issues
-----------

1. Soldiers and formation in game will be displayed wrong (at battles you will see actual soldiers/formation). Same for inventory.
There is inventory assistance utilites and trash detector, which can help a bit. But anyway you'll need reload often.
2. Don't use my strategy files - it contains hardcode for my chars & heroes.
3. Memory leaks due to rather crude ui-refresh mechanism.
4. Dungeon crawler is sometimes (rarely) stuck. Fix: stop crawler, re-enter dungeon, make few steps out of stuck and continue crawler.

Support project
---------------

If you have found a bug or have a suggestion, write me about it to setec.by@gmail.com.
If you accompany it with a donation, it will be prioritized according to the donated amount.
Each bug have priority 2, each suggestion have priority 1.
Donation amount will multiply priority by formula (donation_in_USD+1)*priority, e.g. if you have submitted suggestion and donated 2 USD, it will have priority 3.

I will update suggestion/bugs and their priorities here:

**Request: Add ability to change CoG server**

Source: forum

Priority: Average

Status: DONE

Details: Server and other info loaded automatically

**Request: Simply FoxyProxy installation and setup**

Source: forum

Priority: Average

Status: DONE

Details: FoxyProxy removed. CogBot Admin Panel is proxy itself now.

**Request: Ability to manage dungeon boss strategies without visiting dungeon**

Source: in-game mail

Priority: Average

Status: will be done after UI rework

Details: At this moment strategies can be managed also manually, they are kept in /strategiesXXXX folder. One may backup and restore them. This is not handy, and
certain tool in cogbot is needed to improve strategy management.

Planned solution: replace 'Save Default Strategy' button with: button 'Save' and one/two selectors [Abyss * Abyss_Room, Dungeon * Dungeon_Name_and_Boss, Default, World Boss]

Settings file sample (C:\cog_private_settings.json) //thats not my passwords and accounts, do dont try using it :)
--------------------

settings = {
    "minimize": {
        "settings": true,
        "log": true,
        "save": true,
        "load": false,
        "current": true
    },
    "dungeon": {
        "fastMode": true
    },
    "chars": {
        "alts": "johndoe,johndoealt[1-10]",
        "password": "kinininigen",
        "main": "johndoe"
    },
    "schedule": {
        "plan": {
            "00:20-03:00": "altroutine",
            "03:01-03:10": "clash",
	        "04:01-04:59": "island100",
            "05:01-05:59": "superunits",
            "06:00-07:59": "altroutine",
            "08:00-08:30": "wboss",
            "10:00-10:05": "reset",
            "12:00-13:00": "altroutine",
            "13:01-14:00": "altroutine",
            "14:01-15:00": "altroutine",
            "15:01-16:00": "altroutine",
            "16:01-17:00": "altroutine",
            "17:01-18:00": "altroutine",
            "20:01-20:59": "superunits",
            "21:00-21:30": "wboss",
            "23:01-23:10": "clash"
        },
        "enable": false
    }
}