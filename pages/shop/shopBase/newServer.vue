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
                        添加服务
                    </div>
                    <div class="body">
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="服务名称" >
                                <el-input class="server-name" v-model="form.name"></el-input>
                                <div class="tip">2-50个文字</div>
                            </el-form-item>
                            <el-form-item label="服务分类">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="请选择" value="shanghai"></el-option>
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="服务定价">
                                <el-input class="server-price" v-model="form.name"></el-input>
                                元/
                                <el-select v-model="form.priceType" placeholder="请选择">
                                    <el-option label="一口价" value="1"></el-option>
                                    <el-option label="其他" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="服务配图">
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    >
                                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                                    <img v-else src="/img/mbk/upload.jpg" class="avatar">
                                </el-upload>
                                <div class="tip">
                                    最多5张，最佳尺寸300*300，每个大小不超过200MB，单张图片长宽建议880px以内，<span class="blue-font">无法正常上传？</span>
                                </div>
                            </el-form-item>
                            <el-form-item label="服务描述" >
                                <div class="server-desc-btn" >
                                    <el-button class="current">PC端描述</el-button><el-button >APP端描述</el-button>
                                </div>
                                <el-input type="textarea" :rows="5" class="server-name" v-model="form.name"></el-input>
                                <div class="tip">
                                    建议单张图片长宽均在880px以内，超过该尺寸将会等比压缩。
                                </div>
                            </el-form-item>
                            <el-form-item label="地理位置" >
                                <el-input class="server-name" v-model="form.name"></el-input>
                                <div class="tip">2-50个文字</div>
                            </el-form-item>
                            <el-form-item label="联系方式" >
                                <div class="server-contact">
                                    <el-input v-model="form.name">
                                        <template slot="prepend">手机</template>
                                    </el-input>
                                </div>
                                <div class="server-contact">
                                    <el-input v-model="form.name">
                                        <template slot="prepend">邮箱</template>
                                    </el-input>
                                </div>
                                <div class="server-contact">
                                    <el-input  v-model="form.name">
                                        <template slot="prepend">QQ</template>
                                    </el-input>
                                </div>
                            </el-form-item>
                            <el-form-item class="server-agree" label="" >
                                <el-checkbox v-model="checked">我已阅读并同意<span class="blue-font">《模板客网服务发布协议》</span></el-checkbox>
                            </el-form-item>
                            <el-form-item class="server-opt" label="" style="border-top: 1px solid #f1f1f1;padding-top: 30px;">
                               <el-button >确认上架</el-button><el-button >保存但不上架</el-button><el-button >上架并保存</el-button>
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
    import MbkBreadcrumb from "~/components/common/mbkBreadcrumb.vue";   //顶部搜索
    import LeftMenu from "~/components/common/leftMenu.vue";   //引入公共底部
    export default{
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
            LeftMenu
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
    .server-agree{
        .el-form-item__content{
            line-height: 20px;
            
            .el-checkbox__label{
                font-size: 12px;
            }
        }
    }
    .server-opt{
        .el-button {
            border-radius: 1px;
            font-size: 12px;
            color: #fff;
            &:first-child{
                background:#ec2828;
                border-color:#ec2828;
            }
            &:nth-child(2){
                background:#ec2828;
                border-color:#ec2828;
            }
            &:last-child{
                background:#009966;
                border-color:#009966;
            }
        }
    }
}

</style>


