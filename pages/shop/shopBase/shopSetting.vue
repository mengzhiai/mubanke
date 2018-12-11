<template>
    <transition name='index'>
        <div>
            <SiteNav></SiteNav>
            <HeaderWrap></HeaderWrap>
            <MbkNav></MbkNav>
            <MbkBreadcrumb></MbkBreadcrumb>
            <div class="screen-center clearable">
                <LeftMenu></LeftMenu>
                <div class="screen-main">
                    <div class="shop-set">
                        <div class="top">
                            商铺设置
                        </div>
                        <div class="body">
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="商铺名称" >
                                <el-input class="shop-name" v-model="form.name"></el-input>
                                <span class="tip">请正确填写商铺名称，4-40字</span>
                            </el-form-item>
                            <el-form-item label="商铺简介" >
                                <Editer></Editer>
                            </el-form-item>
                            <el-form-item class="server-opt" label="" >
                               <el-button class="red-btn">确认保存</el-button><el-button >预览商铺</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import SiteNav from "~/components/common/siteNav.vue";   //顶部登录
    import HeaderWrap from "~/components/common/headerWrap.vue";   //顶部搜索
    import MbkNav from "~/components/common/mbkNav.vue";   //顶部搜索
    import MbkBreadcrumb from "~/components/common/mbkBreadcrumb.vue";   //面包屑导航
    import LeftMenu from "~/components/common/leftMenu.vue"; //引入公共底部
    import Editer from "~/components/common/editor.vue"; //引入富文本
    export default { 
        data(){
            return { 
                form:{ 
                    name:'', 
                    priceType:'1',
                    imageUrl:''
                },
                editor:null
            }
        },
        mounted() {
            const _this = this;
            this.editor = UE.getEditor('editor',{ 
                BaseUrl: '', 
                UEDITOR_HOME_URL: '/utf8-jsp/', 
                toolbars:[ 
                    ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', '|','removeformat',
                     'simpleupload',  'link', 'unlink','emotion','formatmatch','|', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
                ]    
            }); 
            //this.editor.setContent('sres'); // 确保UE加载完成后，放入内容。
        },
        components:{
            SiteNav,
            HeaderWrap,
            MbkNav,
            MbkBreadcrumb,
            LeftMenu,
            Editer
        }
    }
</script>
<style lang="scss" scoped>
    @import "~static/common/css.scss";
    .shop-set{
        background:$white-color;
        .top{
            line-height: 90px;
            font-size: 16px;
            padding: 0 35px;
            font-weight: bold;
            color: #333333;
            border-bottom: 1px solid #f1f1f1;
        }
        .body{
            padding: 50px 30px;
            .shop-name{
                width: 340px;
            }
            .tip{
                color:#ec2828;
                font-size: 12px;
            }
        }
    }
</style>
<style lang="scss">
    .shop-set{
        .el-form-item__label{
            color:#000;
            font-weight:bold;
            font-size:14px;
        }
        .el-input__inner,.el-textarea__inner{
            border-radius:1px;
        }
        .el-button {
            border-radius: 1px;
            font-size: 12px;
            color: #666;
        }
        .el-button.red-btn{
            background:#ec2828;
            color: #fff;
            border-color: #ec2828;
        }
    }
    #editor{
        line-height:20px;
    }
</style>


