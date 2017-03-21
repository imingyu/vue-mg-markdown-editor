import Com from './index.vue';
import * as _util from './util';

var _defaultOptions = {
    resizeHorizontal: true,//水平方向是否放置修改编辑器宽度的句柄，此句柄在编辑器和预览器中央
    resizeVertical: true,//垂直方向是否放置修改编辑器高度的句柄，此句柄在编辑器和预览器容器下侧
    height: '400px',//编辑器总高度
    preview: true,//开启预览器
    delay: 400,//渲染延迟
    parser: function (markdownStr) {
        return '<div class="editor-alert">未指定markdown渲染器，无法进行渲染！</div>';
    },
    menus: {
        bold: {
            className: 'fontello-ic ic-bold',
            title: "粗体",
            action: "bold"
        },
        alignLeft: {
            className: "fontello-ic ic-align-left",
            title: "左对齐",
            action: "alignLeft"
        },
        alignRight: {
            className: "fontello-ic ic-align-right",
            title: "右对齐",
            action: "alignRight"
        },
        alignCenter: {
            className: "fontello-ic ic-align-center",
            title: "居中对齐",
            action: "alignCenter"
        }
    }
},
    _actions = {
        bold: function (editorElement, util) {
            if (!editorElement) return;
            util = util || _util;
            var text = util.getSelectRangeText(editorElement);
            if (text) {
                text = `**${text}**`;
                util.setRangeText(editorElement, text, editorElement.selectionStart, editorElement.selectionEnd);
            }
        }
    };

var plugin = {
    install: function (Vue, options) {
        //修改默认配置
        var orgOps = options ? options : {};
        Vue.util.extend(_defaultOptions, orgOps);

        //暴漏全局接口
        if (Vue.MgMarkdownEditor) return;
        var MgEditor = {};
        Vue.MgMarkdownEditor = MgEditor;

        MgEditor.getDefaultOptions = function () {
            return Vue.util.extend({}, _defaultOptions);
        }
        MgEditor.setDefaultOptions = function (ops) {
            ops = ops || {};
            Vue.util.extend(_defaultOptions, ops);
        }

        //向编辑器注册功能
        MgEditor.registerAction = function (name, handler) {
            _actions[name] = handler;
        }
        //注销注册的某个功能
        MgEditor.unRegisterAction = function (name) {
            delete _actions[name];
        }
        //执行一项功能
        MgEditor.execAction = function (name, args, context) {
            var action = _actions[name];
            if (!action) {
                console.warn(`[MgMarkdownEditor warn]无法找到${name}这项功能`);
                return;
            } else {
                return _actions[name].apply(context || null, args);
            }
        }

        //定义全局组件
        Vue.component('mg-markdown-editor', Com);
    }
}
if (typeof window === 'object' && window.Vue) {
    window.Vue.use(plugin);
}
export default plugin;