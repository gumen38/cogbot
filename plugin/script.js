var iconTileIndex = 0;
var isOn = false;
var iconTimer = null;
chrome.browserAction.onClicked.addListener(function (tab) {

    if( tab.url.indexOf('http://www.kongregate.com/games/callofgods/call-of-gods')==-1 ){
        return;
    }

    function inj(){
        chrome.tabs.executeScript({file: 'jquery-2.1.1.min.js'});
        chrome.tabs.executeScript({file: 'underscore-min.js'});
        chrome.tabs.executeScript({file: 'socket.io-1.0.4.js'});
        chrome.tabs.executeScript({file: 'widget.js'});
    }
    inj();

    var config = {
        mode: "pac_script",
        pacScript: {}
    };

    isOn ? off(): on();

    function off(){
        isOn = false;
        if( iconTimer ) clearInterval(iconTimer);
        chrome.browserAction.setIcon({path: '/images/icon-off.png'});
        config.pacScript.data = "function FindProxyForURL(url, host) { return 'DIRECT'}";
    }
    function on(){
        isOn = true;
        iconTimer = setInterval(function () {
            chrome.browserAction.setIcon({path: '/images/icon-on' + (iconTileIndex + 1) + '.png'});
            iconTileIndex = (iconTileIndex + 1) % 8;
        }, 25);
        config.pacScript.data ="function FindProxyForURL(url, host) { return (url.match(/.*do\.php.*/))?'PROXY localhost:3333':'DIRECT'; }";
    }
    chrome.proxy.settings.set({ value: config, scope: 'regular'},
        function () { console.log(arguments) }
    );
    chrome.proxy.onProxyError.addListener(function(){
        console.log('proxy error');
        console.log(arguments);
    });
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
        if( tab.id == tabId ){
            inj();
        }
    });
});

