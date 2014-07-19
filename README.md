CogBot - a Call of Gods game bot
=====================

Disclaimer
----------

I've made this tool mostly for myself, but trying to make it usable by other people.
At this moment it's raw alpha, which means it is buggy and unstable.
It's OK for alpha version.
When it become stable, i.e. it will be able to do full daily routine without bugs, it is 'stable beta'.
When it will have all planned features and no bugs, it is 'release'.

What it does
------------

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
4. Modify actionUrl and characterId in c:/cogbot/server/currentSettings.js. See futher for details.
5. Run run.bat

*How to get your character id and server url*

1. Open http://www.kongregate.com/games/callofgods/call-of-gods in chrome
2. Press F12 to open Chrome Developer Tools and go to the network tab. Enable network log.
3. Reload page and type in filter do.php
4. Click on first entry.
5. Find there 'Request URL'. Copy it to your settings (player.actionUrl).
5. Inspect request details. There will be somewhere field 'characterId'. Copy it to your settings (player.characterId).

*Installing CogBot Admin plugin*

1. Install the plugin: chrome extensions -> enable developer mode -> install unpacked extension -> point it to /plugin folder
2. Go to CogBot page
3. Press CogBot plugin button in chrome (a rusty cog icon).

*Important: settings file*

Put on your disc C file named

cog_private_settings.json

with content

    settings = {
        "minimize": {
            "settings": true,
            "log": true,
            "save": true,
            "load": false,
            "current": true
        },
        "player": {
            "characterId": 12345,
            "actionUrl": "http://m1-kongregate.callofgods.com/php/do.php"
        },
        "dungeon": {
            "fastMode": false
        }
    }

and replace characterId with yours

Planned
-------

Installation comfort:

1. Add runnable built-in Node.js server to make it not neccessary for user to install it.  

Planned Important features:

1. Handle situation when CogServer is on maintenance.

Planned Features:

1. Auto-manage recruiting and keeping enough soldiers (it's boring micromanagement).
2. Daily Auto-routine (typical daily boring must-do stuff like alliance quests and so on).
3. Scheduler for timed events like Alliance War/World Boss/2x Super Soldiers recruit/Clash of gods. Should help european players which have totally unbearable AW/WB/CG/2xSS times.


Issues
-----------

1. Number of soldiers and formation in game client will be displayed wrong. But in battles you will see right soldiers/formation.  
I dont yet know how to fix it, because i don't know how to tell flash client to refresh its visual state without reloading itself.
If i figure it out, it will be fixed.
2. Session capture can be done directly from chrome plugin, but it's unsafe to let plugin watch cookies. At this moment
CogBot captures session from proxied game requests, but it requires at least one game request.
3. Don't use my strategy files - it contains hardcode for my chars & heroes.
4. Installation guide is not very clear. I plan to make a screenshot series with installation steps and make installation easier.
5. Memory leaks.
6. Admin panels sometimes stops responding after game reload. Browser reload is required.
7. Dungeon is not yet stable, sometimes it have strange error after recruiting. Server restart and dungeon re-enter required.

Support project
---------------

If you have found a bug or have a suggestion, write me about it to setec.by@gmail.com.  
If you accompany it with a donation, it will be prioritized according to the donated amount.  
Each bug have priority 10, each suggestion have priority 1.
Donation amount will multiply priority by formula (donation_in_USD+1)*priority, e.g. if you have submitted suggestion and donated 2 USD, it will have priority 3.

I will update suggestion/bugs and their priorities here:

Request: Add ability to change CoG server.
Priority: Average
Status: DONE
Details: Server can be changed in currentSettings.js

Request: Simply FoxyProxy installation and setup
Priority: Average
Status: DONE
Details: FoxyProxy removed. CogBot Admin Panel is proxy itself now.





