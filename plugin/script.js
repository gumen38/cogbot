$(function () {

    chrome.tabs.executeScript({file: 'jquery-2.1.1.min.js'});
    chrome.tabs.executeScript({file: 'underscore-min.js'});
    chrome.tabs.executeScript({file: 'socket.io-1.0.4.js'});
    chrome.tabs.executeScript({file: 'widget.js'});

});