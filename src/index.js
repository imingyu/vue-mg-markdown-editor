import MgMarkdownEditor from './index.vue';

var defaultOptions = {
    resizeHorizontal: true,//水平方向是否放置修改编辑器宽度的句柄，此句柄在编辑器和预览器中央
    resizeVertical: true,//垂直方向是否放置修改编辑器高度的句柄，此句柄在编辑器和预览器容器下侧
    height: '400px',//编辑器总高度
    preview: true,//开启预览器
    delay: 400,//渲染延迟
    parser: function (markdownStr) {
        return '<div class="editor-alert">未指定markdown渲染器，无法进行渲染！</div>';
    }
};

var actionList={
    menu:{
        bold:{
            className:'',
            title:"粗体",
            handler:function(selectContent){
            }
        },
        alignLeft:{
            className:"",
            title:"左对齐"
        },
        alignRight:{
            className:"",
            title:"右对齐"
        },
        alignCenter:{
            className:"",
            title:"居中对齐"
        }
    }
};

var plugin = {
    install: function (Vue, options) {
        //修改默认配置
        var orgOps = options && options.defaultOptions ? options.defaultOptions : {};
        Vue.util.extend(defaultOptions, orgOps);

        //暴漏全局接口
        Vue.MgMarkdownEditor = Vue.MgMarkdownEditor || {};
        Vue.MgMarkdownEditor.getDefaultOptions = function () {
            return Vue.util.extend({}, defaultOptions);
        }
        Vue.MgMarkdownEditor.setDefaultOptions = function (ops) {
            ops = ops || {};
            Vue.util.extend(defaultOptions, ops);
        }

        //像编辑器注册功能
        Vue.MgMarkdownEditor.registerAction = function (actionOptions) {
            //menu:handler($event, editor)
        }

        //定义全局组件
        Vue.component('mg-markdown-editor', MgMarkdownEditor);
    }
}
if (typeof window === 'object' && window.Vue) {
    window.Vue.use(plugin);
}
export default plugin;