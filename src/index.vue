<template>
    <div :class="{'mg-markdown-editor':true, 'open-preview':ops.preview}">
        <div class="menu-bar">
            <div :class="['menu-item','name-'+menuName]"
                 v-for="(menuOps, menuName) in ops.menus"
                 v-if="menuOps.visable!==false">
                <button :class="[menuOps.className?menuOps.className:'']"
                        :disabled="menuOps.enabled===false"
                        :title="menuOps.title"
                        @click="clickMenu($event, menuName, menuOps)"
                        type="button"></button>
            </div>
            <div class="custom-menu"
                 slot="menus"></div>
        </div>
        <div class="main-container">
            <div class="editor-container">
                <textarea ref="input"
                          v-model="content"
                          class="editor"></textarea>
            </div>
            <div v-if="ops.preview"
                 class="preview-container">
                <div class="preview-before"
                     slot="previewBefore"></div>
                <div class="preview-content"
                     v-html="renderResult"></div>
                <div class="preview-after"
                     slot="previewAfter"></div>
            </div>
            <div v-if="ops.resizeHorizontal && ops.preview"
                 class="resize-handle resize-horizontal">
                <div class="custom-horizontal"
                     slot="resizeHorizontal"></div>
            </div>
            <div v-if="ops.resizeVertical"
                 class="resize-handle resize-vertical">
                <div class="custom-vertical"
                     slot="resizeVertical"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as util from './util.js';
export default {
    name: 'mg-markdown-editor',
    props: {
        options: {
            type: Object
        }
    },
    data: function () {
        return {
            ops: {},
            content: ""
        }
    },
    watch: {
        options(val) {
            var ops = this.transformOptions(val);
            this.setOptions(ops);
        },
        'options.preview': function (val) {
            this.ops.preview = val;
        }
    },
    computed: {
        renderResult: function () {
            console.log('rending...');
            if (this.ops.preview) {
                return this.renderMarkdown();
            } else {
                return '';
            }
        }
    },
    methods: {
        setOptions(ops) {
            if (!ops.delay || ops.delay <= 0) {
                ops.delay = 0;
            }
            this.$set(this, "ops", ops);
        },
        transformOptions(ops) {
            var defaultOptions = Vue.MgMarkdownEditor.getDefaultOptions();
            Vue.util.extend(defaultOptions, ops || {});
            return defaultOptions;
        },
        renderMarkdown() {
            var parser = this.ops.parser;
            if (!parser || typeof parser !== 'function') {
                parser = Vue.MgMarkdownEditor.getDefaultOptions().parser;
            }
            var result = parser(this.content);
            return result;
        },
        execAction(actionName, args) {
            args = args || [];
            return Vue.MgMarkdownEditor.execAction(actionName, [this.$refs.input, util].concat(args), this);
        },
        clickMenu($event, menuName, menuOps) {
            if (!menuOps.action) {
                console.warn(`[MgMarkdownEditor warn]未找到与${menuName}菜单对应的功能`);
            } else {
                this.execAction(menuOps.action, menuOps);
            }

            this.$emit($event, menuName, menuOps)
        }
    },
    created() {
        this.setOptions(this.transformOptions(this.options));
    }
}
</script>

<style lang="less">
@clr-border: #ccc;
@size-radius: 4px;
.mg-markdown-editor {
    box-sizing: border-box;
    border: 1px solid @clr-border;
    border-radius: @size-radius;
    * {
        box-sizing: border-box;
    }
    &.open-preview {
        .editor-container {
            width: 50%;
        }
        .preview-container {
            display: block;
        }
        .editor {
            border-bottom-right-radius: 0;
        }
    }
    .main-container {
        position: relative;
        z-index: 50;
    }
    .editor-alert {
        padding: 15px;
        color: #8a6d3b;
        background-color: #fcf8e3;
        border-top: 1px solid #faebcc;
        border-bottom: 1px solid #faebcc;
        text-align: center;
        margin: 30px 0;
    }
    .menu-bar {
        background: #fff;
        height: 30px;
        border-bottom: 1px solid @clr-border;
        border-top-left-radius: @size-radius;
        border-top-right-radius: @size-radius;
        .menu-item {
            display: inline-block;
            margin-left: 5px;
            height: 100%;
            button {
                box-shadow: none;
                background: none;
                outline: none;
                border: none;
                border-radius: 0;
                height: 100%;
                padding: 2px 5px;
                cursor: pointer;
                &:hover {
                    background: #f6f6f6;
                }
                &[disabled] {
                    cursor: no-drop;
                }
            }
        }
    }
    .editor {
        border: none;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        background: #fff;
        padding: 6px 12px;
        resize: none;
        display: block;
        width: 100%;
        margin: 0;
        font-size: 14px;
        min-height: 500px;
        border-bottom-left-radius: @size-radius;
        border-bottom-right-radius: @size-radius;
        &:focus,
        &:active {
            outline: none;
        }
    }
    .editor-container {
        width: 100%;
    }
    .preview-container {
        width: 50%;
        overflow: auto;
        position: absolute;
        top: 0;
        left: 50%;
        bottom: 0;
        display: none;
    }
    .preview-content {
        padding: 6px 12px;
        word-wrap: break-word;
    }
    .resize-horizontal {
        cursor: e-resize;
        width: 1px;
        background: @clr-border;
        position: absolute;
        top: 0;
        left: 50%;
        bottom: 0;
        &:before,
        &:after {
            content: "";
            position: absolute;
            top: 50%;
            height: 50px;
            width: 1px;
            background: @clr-border;
            margin-top: -25px;
        }
        &:before {
            left: -2px;
        }
        &:after {
            right: -2px;
        }
    }
    .resize-vertical {
        cursor: n-resize;
        width: 100%;
        height: 1px;
        background: transparent;
    }
}
</style>