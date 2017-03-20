<template>
    <div class="mg-markdown-editor">
        <div class="menu-bar"></div>
        <div class="main-container">
            <div class="editor-container">
                <textarea v-model="content"
                          class="editor"></textarea>
            </div>
            <div v-if="ops.preview"
                 class="preview-container">
                <div class="preview-content"
                     v-html="renderResult"></div>
            </div>
            <div v-if="ops.resizeHorizontal"
                 class="resize-handle resize-horizontal"></div>
            <div v-if="ops.resizeVertical"
                 class="resize-handle resize-vertical"></div>
        </div>
    </div>
</template>

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
        min-height: 30px;
        border-bottom: 1px solid @clr-border;
        border-top-left-radius: @size-radius;
        border-top-right-radius: @size-radius;
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
        &:focus,
        &:active {
            outline: none;
        }
    }
    .editor-container,
    .preview-container {
        width: 50%;
    }
    .preview-container {
        overflow: auto;
        position: absolute;
        top: 0;
        left: 50%;
        bottom: 0;
    }
    .preview-content{
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
    }
    .resize-vertical {
        cursor: n-resize;
        width: 100%;
        height: 1px;
        background: transparent;
    }
}
</style>

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
            this.setOptions(this.transformOptions(val));
        }
    },
    computed: {
        renderResult: function () {
            var parser = this.ops.parser;
            if (!parser || typeof parser !== 'function') {
                parser = Vue.MgMarkdownEditor.getDefaultOptions().parser;
            }
            var result = parser(this.content);
            console.log('rendering...');
            return result;
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
        }
    },
    created() {
        this.setOptions(this.transformOptions(this.options));
    }
}
</script>