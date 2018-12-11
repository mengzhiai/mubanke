<template>
   <div>
       <div class="editor" :id="id" type="text/plain" style="width:700px;height:360px;"></div>
   </div>
</template> 
<script>
    export default {
        props: {
            content: {
                type: String,
                default:''
            },
            config: {
                type: Object,
            },
            id: {
                type: String
            }
        },
        mounted() {
            const _this = this;
            const config = { 
                // serverUrl: 'http://localhost/php/controller.php',    //图片上传配置路径
                serverUrl: process.browser?`http://${window.location.host}/Upload/Config`:`http://mubanke.wx.qkk.cn/Upload/Config`,
                imageUrl:process.browser?`http://${window.location.host}/task/UpLoadPicture`:`http://mubanke.wx.qkk.cn/task/UpLoadPicture`,
                imageUrlPrefix:'/',
                UEDITOR_HOME_URL: '/js/utf8-ueditor/', 
                toolbars:[ 
                    ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', '|','removeformat',
                     'simpleupload',  'link', 'unlink','emotion','formatmatch','|', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
                ]    
            } 
            _this.editor = UE.getEditor(_this.id, Object.assign(config,_this.config)); // 初始化UE
            _this.editor.addListener("ready", function () {
                _this.editor.setContent(_this.content); // 确保UE加载完成后，放入内容。 
                _this.editor.addListener("contentChange", function () {
                        const wordCount = _this.editor.getContentLength(true)
                        const content = _this.editor.getContent()
                        const plainTxt = _this.editor.getPlainTxt()
                        const htmlCont = _this.editor.getAllHtml()

                        // _this.content = content
                        // 编辑器内容有变动,通知父组件
                        _this.$emit('input', { wordCount: wordCount, content: content, plainTxt: plainTxt ,htmlCont:htmlCont });
                    }.bind(_this))
                    // editor初始化后操作
                    _this.$emit('ready', _this.editor)
            });
        },
        methods: {
            getContent() { // 获取内容方法
                return this.editor.getContent();
            }
        },
        destroyed() {
            this.editor.destroy();
        }, 
    }
</script>
<style lang="scss" >
.editor{
        line-height:20px;
    } 
</style>

