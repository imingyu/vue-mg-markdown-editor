var path = require('path'),
    compiler = require('./build'),
    colors = require('colors'),
    watch = require("watch");

//开启browser-sync 监听
var bs = require("browser-sync").create();
bs.init({
    server: path.resolve(__dirname, '../'),
    port: "5320"
}, function () {
    console.log(`[browser-sync:start]\r\n`.green);
});

watch.watchTree(path.resolve(__dirname, '../src'), function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
    } else {
        compiler('production').then(() => {
            bs.reload();
            var dt = new Date();
            console.log(`\r\n[build:success] ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`.success);
        }).catch(() => {
            var dt = new Date();
            console.log(`\r\n[build:error] ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}\r\n`.yellow + `${err}`.red);
        });
    }
});