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
            <div class="top clearable">
                <div class="fl title-l">经历证书</div>
            </div>
                <div class="body">
                    <div class="experience-box">
                        <div class="title">成长经历</div>
                        <div class="experience-list">
                            <div v-for="(exper,index) in experience" :key="index" class="experience-list-item">
                                <div class="time">{{exper.startTime}} 至 {{exper.startTime}}</div>
                                <p>{{exper.content}}</p>
                                <div class="clearable">
                                    <div class="fr">
                                        <i class="el-icon-edit blue-font">编辑</i>
                                        <i class="el-icon-delete blue-font">删除</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <el-form ref="form"  :model="form" label-width="120px">
                            <el-form-item label="开始时间" >
                                <el-date-picker v-model="form.name" type="date" placeholder="开始时间"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束时间" >
                                <el-date-picker v-model="form.name" type="date" placeholder="结束时间"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="经历描述" >
                                <el-input rows="5" cols="10" resize="none" type="textarea" v-model="form.name"></el-input>
                                <div class="tip">可输入字数范围20-180</div>
                            </el-form-item>
                            <el-form-item  >
                                <el-button class="red-btn">添加经历</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="experience-box">
                        <div class="title">荣誉资质</div>
                        <div class="experience-list">
                            <div v-for="(exper,index) in experience" :key="index" class="experience-list-item">
                                <div class="time">{{exper.startTime}} 至 {{exper.startTime}}</div>
                                <p>{{exper.content}}</p>
                                <div class="clearable">
                                    <div class="fr">
                                        <i class="el-icon-edit blue-font">编辑</i>
                                        <i class="el-icon-delete blue-font">删除</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <el-form ref="form"  :model="form" label-width="120px">
                            <el-form-item label="证书名称" >
                                <el-input class="w-220" v-model="form.name" placeholder="如：四级英语证书"></el-input>
                            </el-form-item>
                            <el-form-item label="上传证书" >
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    >
                                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                                    <img v-else src="/img/mbk/upload.jpg" class="avatar">
                                </el-upload>
                                <div class="tip">上传证书支持格式：gif,jpg,jpeg,png</div>
                            </el-form-item>
                            <el-form-item  >
                                <el-button class="red-btn">添加证书</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                
            </div>
        </div>
      </div>
      <Footer></Footer>  
    </div>
    </transition>
</template>
<script>
import SiteNav from "~/components/common/siteNav.vue"; //顶部登录
import HeaderWrap from "~/components/common/headerWrap.vue"; //顶部搜索
import MbkNav from "~/components/common/mbkNav.vue"; //顶部搜索
import MbkBreadcrumb from "~/components/common/mbkBreadcrumb.vue"; //面包屑
import LeftMenu from "~/components/common/leftMenu.vue"; //引入公共底部
import Footer from "~/components/common/footer.vue"; //引入公共底部
export default {
  data() {
    return { 
      form:{
        name:'',
        priceType:'1',
        imageUrl:'',
        gender:''
        },
        experience:[
            {
                startTime:'2012-12-12',
                endTime:'2012-12-12',
                content:'水电费水电费是否玩儿玩儿玩儿摄入沃尔夫士大夫撒是否'
            },
            {
                startTime:'2012-12-12',
                endTime:'2012-12-12',
                content:'水电费水电费是否玩儿玩儿玩儿摄入沃尔夫士大夫撒是否'
            }
        ]
    };
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    Footer,
  }
};
</script>
<style lang="scss" scoped>
@import "~static/common/css.scss";
.screen-main {
  background: $white-color;
  .top {
    line-height: 90px;
    padding: 0 15px 0 40px;
    border-bottom: 1px solid #ddd;
  }
  
  .body {
    padding: 25px 60px 25px 40px;
    .experience-box{
        .title{
            font-size: 14px;
        }
    }
    .experience-list{
        padding: 20px;
        .experience-list-item{
            background:#fafafa;
            border: 1px solid #e9e9e9;
            padding: 15px;
            margin-bottom: 20px;
            line-height: 30px;
            [class^="el-icon-"], [class*=" el-icon-"]{
                    padding: 0 5px;
                    cursor: pointer;
            }
        }
    }
    .el-form{
        margin: 10px 0 50px;
    }
    .tip{
        font-size:12px;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height: 20px;
    }
  }
}
</style>




