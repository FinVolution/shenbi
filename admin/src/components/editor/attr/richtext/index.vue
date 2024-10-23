<template>
    <div class="example" style="background: white;">
        <quill-editor class="editor" ref="myTextEditor" :value="content" :options="editorOption"
            @change="onEditorChange" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)" />
        <!-- <div class="output code">
            <code class="hljs" v-html="contentCode"></code>
        </div> -->
        <!-- <div class="output ql-snow">
            <div class="ql-editor" v-html="content"></div>
        </div> -->
        <QuillEditorUploadImg @uploadSucc="uploadSucc"/>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import dedent from 'dedent'
import hljs from 'highlight.js'
import 'highlight.js/styles/dark.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import debounce from 'lodash/debounce'
import QuillEditorUploadImg from "./uploadImg";
export default {
  components: {QuillEditorUploadImg},
  data() {
        return {
            content: '<h2>I am Example</h2>',
            editorOption: {
                modules: {
                  toolbar: {
                    container: [
                      ['bold', 'italic', 'underline', 'strike'],
                      ['blockquote', 'code-block'],
                      [{ 'header': 1 }, { 'header': 2 }],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                      [{ 'script': 'sub' }, { 'script': 'super' }],
                      [{ 'indent': '-1' }, { 'indent': '+1' }],
                      [{ 'direction': 'rtl' }],
                      [{ 'size': ['small', false, 'large', 'huge'] }],
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      [{ 'font': [] }],
                      [{ 'color': [] }, { 'background': [] }],
                      [{ 'align': [] }],
                      ['clean'],
                      ['link', 'image', 'video']
                    ],
                    handlers: {
                      // 重写点击组件上的图片按钮要执行的代码
                      'image': function (value) {
                        document.querySelector('.quill-upload .el-icon-upload').click()
                      }
                    }
                    },
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    }
                }
            },
        }
    },
    watch: {
        componentProperty: {
            handler: function (property) {
                Object.assign(this, {
                    content: property['html'] || '',
                })
            },
            deep: true,
            immediate: true,
        },
    },
    computed: {
        ...mapGetters('editor', ['componentProperty']),
        ...mapState('editor', {
            activeComponent: state => state.activeComponent
        }),
        editor() {
            return this.$refs.myTextEditor.quill
        },
        contentCode() {
            return hljs.highlightAuto(this.content).value
        }
    },
    mounted() {
        console.log('this is current quill instance object', this.editor)
    },
    methods: {
        ...mapMutations('editor', ['changeComponentAttr']),
        handleChangeProperty(key, newValue) {
            this.changeComponentAttr({
                key: 'property',
                newConfig: {
                    [key]: newValue
                }
            });
        },
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        },
        onEditorChange: debounce(function (value) {
            this.content = value.html
            this.handleChangeProperty('html', dedent`${this.content}`)
        }, 466),
        uploadSucc(url) {
          const quill=this.$refs.myTextEditor.quill
          // 获取光标位置
          const pos=quill.getSelection().index
          // 插入图片到光标位置
          quill.insertEmbed(pos,'image',url)
        }
    }
}
</script>

<style lang="less" scoped>
// @import './bubble.css';
.example {
    color: #2c3e50
}
#editor-container {
    height: 350px;
}

.container {
    margin-bottom: 10px;
    text-align: right;
}
</style>
