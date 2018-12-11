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
                <div class="new-server">
                    <div class="top">
                        添加行业新闻
                    </div>
                    <div class="body">
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="新闻标题" >
                                <el-input class="server-name" v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="新闻内容" >
                                <Editer></Editer>
                            </el-form-item>
                            <el-form-item label="服务分类">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="请选择" value="shanghai"></el-option>
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="server-agree" label="发送至" >
                                <el-checkbox v-model="checked">http://225.sdfw.sdf.com</el-checkbox>
                            </el-form-item>
                            <el-form-item class="server-opt" label="" style="border-top: 1px solid #f1f1f1;padding-top: 30px;">
                               <el-button class="red-btn">确认发布</el-button><el-button >取消</el-button>
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
    import LeftMenu from "~/components/common/leftMenu.vue";   //引入公共底部
    import Editer from "~/components/common/editor.vue"; //引入富文本
    export default {
        data(){
            return {    
                checked:false,
                form:{
                    name:'',
                    priceType:'1',
                    imageUrl:''
                }
            }
        },
        components:{
            SiteNav,
            HeaderWrap,
            MbkNav,
            MbkBreadcrumb,
            LeftMenu,
            Editer
        },
        head () {
            return {
            title: 'haha',
                meta: [
                    { hid: 'description', name: 'description', content: 'My custom description' }
                ]
            }
        }
    }
</script>
<style lang="scss" scoped>
@import "~static/common/css.scss";
.new-server{
    background: $white-color;
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
    }
    .tip{
            font-size: 12px;
            color: $background-color;
            line-height: 20px;
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
</style>
<style lang="scss">
@import "~static/common/css.scss";
.new-server{
    .el-form-item__label{
        color:#000;
        font-weight:bold;
        font-size:14px;
    }
    .el-input__inner{
        border-radius:1px;
    }
    .server-name{
        width:530px;
    }
    .server-price{
        width: 150px;
    }
    .server-desc-btn{
        margin-bottom: 10px;
        .el-button {
            border-radius: 1px;
            font-size: 12px;
            color: #666;
            &.current {
                border-color: $theme-color;
                color: $theme-color;
            }
        }
    }
    .server-contact{
        margin-bottom: 10px;
        width: 354px;
        display:block;
        &:last-child{
            margin-bottom: 0px;
        }
        .el-input-group__prepend{
            width:80px;
            background:#f4f4f4;
            text-align:center;
            border-radius:0;
        }
    }
   
    
}

</style>


