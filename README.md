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

_Version 0.8a_
1. Fast mode in dungeon now is about acceptable efficiency. Still laying path through the monsters, but to avoid it would require some work.
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
5. Copy defaults to settings file (see below). Modify actionUrl and characterId in settings file. See further for details on settings file.
6. Run run.bat

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

and replace characterId with yours. Also modify actionUrl if you are playing not on S1 server.

Planned
-------

Planned Features:

1. Auto-manage recruitment and resource gathering.
2. Alts quick switch. Alts routines, like sign-in.
3. Scheduler for daily events (World Boss/2x Super Soldiers recruit/Clash of gods).

Issues
-----------

1. Number of soldiers and formation in game client will be displayed wrong. But in battles you will see right soldiers/formation.  
I dont yet know how to fix it, because i don't know how to tell flash client to refresh its visual state without reloading itself. If i figure it out, it will be fixed.
Same for inventory. There is inventory assistance utilites and trash detector, which can help a bit. But anyway you'll need reload often.
2. Session capture can be done directly from chrome plugin, but it's unsafe to let plugin watch cookies. At this moment
CogBot captures session from proxied game requests, but it requires at least one game request.
3. Don't use my strategy files - it contains hardcode for my chars & heroes.
4. Installation guide maybe not very clear. But you can mail me with questions.
5. Memory leaks due to rather crude ui-refresh mechanism.

Support project
---------------

If you have found a bug or have a suggestion, write me about it to setec.by@gmail.com.  
If you accompany it with a donation, it will be prioritized according to the donated amount.  
Each bug have priority 2, each suggestion have priority 1.
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





