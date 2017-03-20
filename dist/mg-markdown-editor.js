(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _index = require('./index.vue');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
    resizeHorizontal: true, //水平方向是否放置修改编辑器宽度的句柄，此句柄在编辑器和预览器中央
    resizeVertical: true, //垂直方向是否放置修改编辑器高度的句柄，此句柄在编辑器和预览器容器下侧
    height: '400px', //编辑器总高度
    preview: true, //开启预览器
    delay: 400, //渲染延迟
    parser: function parser(markdownStr) {
        return '<div class="editor-alert">未指定markdown渲染器，无法进行渲染！</div>';
    }
};

var actionList = {
    menu: {
        bold: {
            className: '',
            title: "粗体",
            handler: function handler(selectContent) {}
        },
        alignLeft: {
            className: "",
            title: "左对齐"
        },
        alignRight: {
            className: "",
            title: "右对齐"
        },
        alignCenter: {
            className: "",
            title: "居中对齐"
        }
    }
};

var plugin = {
    install: function install(Vue, options) {
        //修改默认配置
        var orgOps = options && options.defaultOptions ? options.defaultOptions : {};
        Vue.util.extend(defaultOptions, orgOps);

        //暴漏全局接口
        Vue.MgMarkdownEditor = Vue.MgMarkdownEditor || {};
        Vue.MgMarkdownEditor.getDefaultOptions = function () {
            return Vue.util.extend({}, defaultOptions);
        };
        Vue.MgMarkdownEditor.setDefaultOptions = function (ops) {
            ops = ops || {};
            Vue.util.extend(defaultOptions, ops);
        };

        //像编辑器注册功能
        Vue.MgMarkdownEditor.registerAction = function (actionOptions) {}
        //menu:handler($event, editor)


        //定义全局组件
        ;Vue.component('mg-markdown-editor', _index2.default);
    }
};
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.Vue) {
    window.Vue.use(plugin);
}
exports.default = plugin;

},{"./index.vue":2}],2:[function(require,module,exports){
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = require('./util.js');

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    name: 'mg-markdown-editor',
    props: {
        options: {
            type: Object
        }
    },
    data: function data() {
        return {
            ops: {},
            content: "",
            actions: {
                bold: {
                    className: '',
                    title: "粗体"
                },
                alignLeft: {
                    className: "",
                    title: "左对齐"
                },
                alignRight: {
                    className: "",
                    title: "右对齐"
                },
                alignCenter: {
                    className: "",
                    title: "居中对齐"
                }
            }
        };
    },
    watch: {
        options: function options(val) {
            var ops = this.transformOptions(val);
            this.setOptions(ops);
        },

        'options.preview': function optionsPreview(val) {
            this.ops.preview = val;
        }
    },
    computed: {
        renderResult: function renderResult() {
            console.log('rending...');
            if (this.ops.preview) {
                return this.renderMarkdown();
            } else {
                return '';
            }
        }
    },
    methods: {
        setOptions: function setOptions(ops) {
            if (!ops.delay || ops.delay <= 0) {
                ops.delay = 0;
            }
            this.$set(this, "ops", ops);
        },
        transformOptions: function transformOptions(ops) {
            var defaultOptions = Vue.MgMarkdownEditor.getDefaultOptions();
            Vue.util.extend(defaultOptions, ops || {});
            return defaultOptions;
        },
        renderMarkdown: function renderMarkdown() {
            var parser = this.ops.parser;
            if (!parser || typeof parser !== 'function') {
                parser = Vue.MgMarkdownEditor.getDefaultOptions().parser;
            }
            var result = parser(this.content);
            return result;
        }
    },
    created: function created() {
        this.setOptions(this.transformOptions(this.options));
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'mg-markdown-editor':true, 'open-preview':_vm.ops.preview}},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"main-container"},[_c('div',{staticClass:"editor-container"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.content),expression:"content"}],ref:"input",staticClass:"editor",domProps:{"value":(_vm.content)},on:{"input":function($event){if($event.target.composing){ return; }_vm.content=$event.target.value}}})]),_vm._v(" "),(_vm.ops.preview)?_c('div',{staticClass:"preview-container"},[_c('div',{staticClass:"preview-content",domProps:{"innerHTML":_vm._s(_vm.renderResult)}})]):_vm._e(),_vm._v(" "),(_vm.ops.resizeHorizontal && _vm.ops.preview)?_c('div',{staticClass:"resize-handle resize-horizontal"}):_vm._e(),_vm._v(" "),(_vm.ops.resizeVertical)?_c('div',{staticClass:"resize-handle resize-vertical"}):_vm._e()])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"menu-bar"},[_c('ul',{staticClass:"menu-list"},[_c('li',{staticClass:"menu-item"})])])}]

},{"./util.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.throttle = throttle;
function throttle(func, wait, context) {
    var timer;
    wait = wait || 0;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(context, args);
        }, wait);
    };
}

},{}]},{},[1]);
