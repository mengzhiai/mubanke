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
                <div class="fl title-l">手机认证</div>
            </div>
                <div class="body" style="padding-bottom: 400px">
                        <div class="progres"> 
                            <span class="progres_bg"></span>
                            <span class="progres_des"></span>
                            <span class="progres_tip"> 
                            <span class="select"><i></i><font>验证身份</font></span> 
                            <span><i></i><font>认证新手机号码</font></span> 
                            <span class="success"><i></i><font>认证成功</font></span><!--红色打钩successon--> 
                            </span> 
                        </div>
                    <el-form ref="form"  :model="form" label-width="120px">
                        <el-form-item label="已认证手机号码" >
                            <span style="font-size:12px;">{{form.phone|hidphone}}</span>
                            <div class="tip">如果原手机号丢失，请联系客服（QQ/电话号码：500000）</div>
                        </el-form-item>
                        <el-form-item label="短信验证码" >
                            <el-input class="w-220" v-model="form.name"></el-input>
                            <el-button>获取验证码</el-button>
                        </el-form-item>
                        <el-form-item  >
                            <el-button @click="commit" class="red-btn">提交</el-button>
                        </el-form-item>
                    </el-form>
                
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
        phone:'13121555222',
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
  },
  filters:{
		hidphone:function(value){
			return value.substring(0,4)+'****'+value.substring(8,12)
		}
  },
  methods:{
    commit(){
      this.$router.push('/account/authentication/mobileAuthSec.html')
    }
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
    .progres {
        height: 60px;
        width: 700px;
        margin: 40px auto;
        position: relative;
        z-index: 1; 
    }

.progres span.progres_bg {
  background: #ccc;
  width: 700px;
  height: 2px;
  line-height: 0;
  font-size: 0;
  display: block;
  position: absolute;
  left: 0;
  top: 11px;
  z-index: 1; }

.progres span.progres_des {
  background: #ec2828;
  width: 33%;
  height: 2px;
  line-height: 0;
  font-size: 0;
  display: block;
  position: absolute;
  left: 0;
  top: 11px;
  z-index: 2; }

.progres span.progres_tip {
  height: 54px;
  width: 700px;
  display: block;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 3; }

.progres span.progres_tip > span {
  width: 100px;
  margin: 0 66px;
  display: block;
  float: left;
  text-align: center; }

.progres span.progres_tip > span > i {
  background: url(/img/mbk/ico_main.png) no-repeat 0 -280px;
  width: 24px;
  height: 24px;
  overflow: hidden;
  margin: 0 auto;
  display: block; }

.progres span.progres_tip > span.select > i {
  background-position: -50px -280px; }

.progres span.progres_tip > span.success > i {
  background-position: 0 -330px; }

.progres span.progres_tip > span.successon > i {
  background-position: -50px -330px; }

.progres span.progres_tip > span > font {
  height: 30px;
  line-height: 30px;
  color: #999;
  display: block;
  font-size: 12px; }

.progres span.progres_tip > span.select > font, .progres span.progres_tip > span.successon > font {
  color: #ec2828; }

.progres span.progres_tip > span.error > i {
  background-position: 0 -470px; }
    .tip{
        font-size:12px;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height: 20px;
    }
  }
  .des{
      line-height: 25px;
      font-size: 12px;
        dd{
            margin-left: 20px;
        }
  }
}
</style>




