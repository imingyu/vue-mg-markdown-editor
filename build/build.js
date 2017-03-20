var path = require('path')
var fs = require("fs")
var browserify = require('browserify')
var vueify = require('vueify')
var babelify = require('babelify')
var colors = require("colors")

function compile(env) {
    return new Promise((r, j) => {
        if (env) {
            process.env.NODE_ENV = env;
        }
        var dt = new Date();
        console.log(`\r\n\r\n[build:start] ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`.blue);
        browserify(path.resolve(__dirname, '../src/index.js'))
            .transform(vueify)
            .transform(babelify)
            .plugin('vueify/plugins/extract-css', {
                out: path.resolve(__dirname, '../dist/mg-markdown-editor.css')
            })
            .bundle()
            .pipe(fs.createWriteStream(path.resolve(__dirname, '../dist/mg-markdown-editor.js')))
            .on('error',j)
            .on('finish',r);
    });

}
compile('production').then(()=>{
    var dt = new Date();
    console.log(`\r\n[build:success] ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`.success);
}).catch(()=>{
    var dt = new Date();
    console.log(`\r\n[build:error] ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}\r\n`.yellow + `${err}`.red);
});
module.exports = compile;