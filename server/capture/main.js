var http = require('http');
var through = require('through');
var url = require('url');
var fs = require('fs');
var vm = require('vm');

var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);
includeInThisContext(__dirname+"/logic/assert.js");
includeInThisContext(__dirname+"/logic/session.js");
includeInThisContext(__dirname+"/logic/strategy.js");
includeInThisContext(__dirname+"/logic/tactics.js");
includeInThisContext(__dirname+"/logic/dungeonCrawler.js");
includeInThisContext(__dirname+"/logic/abyss.js");
