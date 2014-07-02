CogBot - a Call of Gods game bot
=====================

What it does
------------

_Version 0.3_
1. Automatic Abyss crawler
2. Better dungeon feedback
3. Removed some options

_Version 0.2_  
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
2. It uses CogBot Chrome Plugin to provide user interface (it works as viewport to CogBot Server).
3. It uses FoxyProxy Chrome Plugin which should proxy \*do.php\* calls to CogBot Server (localhost:3333).  
It catches internal game requests/responses in order to watch/operate game actions. 

Installation guide
------------------

1. Install node.js
2. Run run.bat
3. Install chrome plugin: chrome extensions -> enable developer mode -> install unpacked extension -> point it to /plugin folder
4. Go to CogBot page
5. Press CogBot plugin button in chrome
6. Login and start the game

If it works, you will see you current deploy.

Planned
-------

Installation comfort:

1. Add runnable built-in Node.js server to make it not neccessary for user to install it.  
2. Get rid of FoxyProxy (make proxy functionality inside of CogBot Chrome Plugin.  

Planned Important features:

1. Alert when need recruit more soldiers  
2. Handle situation when CogServer is on maintenance.  

Planned Features:

1. Dungeon auto-crawler (exploring same dungeon 6 times per day is boring).  
2. Abyss auto-crawler (exploring abyss becomes boring on 3rd day, with exception of when you can do new rooms).  
3. Auto-manage recruiting and keeping enough soldiers (it's boring micromanagement).  
4. Daily Auto-routine (typical daily boring must-do stuff like alliance quests and so on).  
5. Scheduler for timed events like Alliance War/World Boss/2x Super Soldiers recruit/Clash of gods. Should help european players which have totally unbearable AW/WB/CG/2xSS times.  


Bugs/Issues
-----------

1. Number of soldiers and formation in game client will be displayed wrong. But in battles you will see right soldiers/formation.  
I dont yet know how to fix it, because i don't know how to tell flash client to refresh its visual state without reloading itself.
If i figure it out, it will be fixed.
2. Session capture can be done directly from chrome plugin, but it's unsafe to let plugin watch cookies. At this moment
CogBot captures session from proxied game requests, but it requires at least one game request.
3. Don't use my strategy files - it contains hardcode for my chars & heroes.
4. CharacterId and server path are hardcoded in currentSettings.json now, need manual fix. Plan to put it to settings widget.
5. Installation guide is not very clear. I plan to make a screenshot series with installation steps and make installation easier.


Support project
---------------

If you have found a bug or have a suggestion, write me about it to setec.by@gmail.com.  
If you accompany it with a donation, it will be prioritized according to the donated amount.  
Each bug have priority 10, each suggestion have priority 1.
Donation amount will multiply priority by formula (donation_in_USD+1)*priority, e.g. if you have submitted suggestion and donated 2 USD, it will have priority 3.

I will update suggestion/bugs and their priorities here in the table:

-nothing here yet-


