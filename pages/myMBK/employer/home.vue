
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
          <div class="mbk-diamonds clearable">
            <div class="my-info clearable">
              <div class="fl photo">
                <img :src="accountInfo.headPhotoUrl?baseUrl+accountInfo.headPhotoUrl:'/img/mbk/logo.png'" alt="用户头像">
                <nuxt-link to="/account/base/baseInfo.html"><span class="change-photo">修改我的信息</span></nuxt-link>
              </div>
              <div class="fl base">
                <div class="memId">{{accountInfo.userName}}</div> 
                <div class="auth">
                  <span v-if="accountInfo.isNameAuthentication" class="select">实名</span>
                  <nuxt-link v-else to="/account/authentication/realnameAuth.html"><span >实名</span></nuxt-link>
                  <span v-if="accountInfo.isMobileAuthentication" class="select">手机</span>
                  <nuxt-link v-else to="/account/authentication/mobileAuth.html"><span >手机</span></nuxt-link>
                  <span v-if="accountInfo.isEmailAuthentication" class="select">邮箱</span>
                  <nuxt-link v-else to="/account/authentication/email/mailAuth.html"><span >邮箱</span></nuxt-link>
                  <!-- <span :class="accountInfo.isNameAuthentication?'select':''">银行</span> -->
                </div> 
                <div class="news">
                  <span class="no-read">未读站内信（<span class="num">12</span>）</span>
                  <span class="entry">进入消息管理</span>
                </div>
              </div>
            </div>
            <div class="my-finance">
              <div class="finance-top clearable">
                <span class="title-m fl">我的财务</span>
                <span class="blue-font fr">查看明细</span>
              </div> 
              <ul class="finance-list">
                <!-- <li>
                  <span class="fl">
                    <span class="fl">消费金：</span>
                    <span class="price-color fr">￥{{accountInfo.consumerMoney}}</span>
                  </span>
                  <a href="/myMBK/employer/recharge.html" class="fl blue-font">充值</a>
                </li> -->
                <li>
                  <div class="clearable">
                    <div class="fl">余额：</div>
                    <div class="fr">
                      <span class="com cash">
                        <span class="price-color fl">￥{{accountInfo.balance}}</span>
                        <a href="/myMBK/employer/cash.html" class="fl blue-font">提现</a>
                      </span>
                      <span class="com recharge">
                        <!-- <span class="price-color fl">￥{{accountInfo.consumerMoney}}</span> -->
                        <a href="/myMBK/employer/recharge.html" class="fl blue-font">充值</a>
                    </span>
                    </div>
                  </div>
                </li>
                <li>
                  <span class="fl point">
                    <span class="fl">积分：</span>
                    <span class="price-color fr">{{accountInfo.integral}}</span>
                  </span>
                </li>
               
              </ul>
            </div>
          </div>
          <div class="mbk-diamonds my-shop clearable" style="display:none;">
            <div class="shop-type fl">
              <div class="mbk-user current">我是模板客</div>
              <div class=" mbk-develop">开发者</div>
            </div>
            <div class="shop-info">
              <div class="clearable title">
                <span class="title-l fl">中高端网站定制</span>
                <span class="fr blue-font">我的商铺</span>
              </div>
              <div class="income">
                <span>赚到的钱：</span>
                <span class="price-color">￥0.00</span>
              </div>
              <div class="onsale">
                <span>
                  出售中的服务<span class="price-color">￥0.00</span>
                </span>
                <span>
                  展示中的案例<span class="price-color">￥0.00</span>
                </span>
                <span>
                  访问人气值<span class="price-color">￥0.00</span>
                </span>
              </div>
              <div class="opt">
                <span>出售服务</span>
                <span>出售服务</span>
                <span>出售服务</span>
                <span>出售服务</span>
              </div>
            </div>
          </div>
          <div class="mbk-diamonds mgt-15 clearable">
            <div class="mbk-card fl">
              <div class="mbk-card-header clearable">
                <span class="title-l fl">我发布的站点</span>
                <a href="/myMBK/employer/station/list.html" class="blue-font fr">查看所有></a>
              </div>
              <div class="mbk-card-body">
                <ul class="already-sold">
                  <li class="clearable" v-for="(item,index) in stationList" :key="index">
                    <a :href="`/myMBK/employer/station/detail.html?out_trade_no=${item.id}`" class="fl title">{{item.stationName}}</a><span class="price-color fr">￥{{item.amount}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mbk-card fr">
              <div class="mbk-card-header clearable">
                <span class="title-l fl">我发布的任务</span>
                <a href="/myMBK/employer/task/list.html" class="blue-font fr">查看所有></a>
              </div>
              <div class="mbk-card-body">
                <ul class="task">
                  <li class="clearable" v-for="(item,index) in taskList " :key="index" >
                    <span class="fl title"><span class="price-color">￥{{item.amount}}</span>
                    <a :href="`/myMBK/employer/task/detail.html?id=${item.id}`">{{item.taskName}}</a></span>
                    <span class="fr"><span class="num-color">{{item.submissionCount}}</span>人投标</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mbk-diamonds mgt-15 clearable"> 
            <div class="mbk-card fl">
              <div class="mbk-card-header clearable">
                <span class="title-l fl">我收藏的任务</span>
                <a href="/myMBK/facilitator/accept/list.html" class="blue-font fr">查看所有></a>
              </div>
              <div class="mbk-card-body">
                <ul class="task">
                  <li class="clearable" v-for="(item,index) in sTaskList" :key="index">
                    <span class="fl title">
                      <span class="price-color">￥{{item.amount}}</span>
                        <a href="">{{item.taskName}}</a>
                    </span>
                    <span class="fr"><span class="num-color">{{item.bidders}}</span>人投标</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mbk-card fr">
              <div class="mbk-card-header clearable">
                <span class="title-l fl">我收藏的雇主</span>
                <span class="blue-font fr">查看所有></span>
              </div>
              <div class="mbk-card-body">
                <div class="my-employer">
                  <li v-for="(item,index) in shop" :key="index">
                    <a href="">
                      <img :src="baseUrl+item.headPhotoUrl" alt="">
                      <span>{{item.userName}}</span>
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div class="mbk-diamonds mgt-15 clearable">
            <div class="mbk-card fl">
              <div class="mbk-card-header clearable">
                <span class="title-l fl">模板客帮助</span>
                <span class="blue-font fr">查看所有></span>
              </div>
              <div class="mbk-card-body">
                <ul class="mbk-news">
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                </ul>
              </div>
            </div>
            <div class="mbk-card fr">
              <div class="mbk-card-header clearable">
                <span class="title-l fl">模板客消息</span>
                <span class="blue-font fr">查看所有></span>
              </div>
              <div class="mbk-card-body">
                <ul class="mbk-news">
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                  <li><a href=""><span>是的服务而闻风丧胆官方的手动阀而五色安讽德诵功</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </transition> 
</template>
<script>
import { mapState, mapMutations } from "vuex";
import axios from "~/plugins/axios";
import SiteNav from "~/components/common/siteNav.vue";   //顶部登录
import HeaderWrap from "~/components/common/headerWrap.vue";   //顶部搜索
import MbkNav from "~/components/common/mbkNav.vue";   //顶部搜索
import MbkBreadcrumb from "~/components/common/mbkBreadcrumb.vue";   //顶部搜索
import LeftMenu from "~/components/common/leftMenu.vue"; //引入菜单
import Footer from "~/components/common/footer.vue";   //引入公共底部
import {baseUrl} from '~/config/async/env'
import {stationList,GetTasksByUserId,getMyTaskListByPage,getMyFollowedTaskListByPage,getMyFollowedUserListByPage,} from '~/ajax/getData'
export default {
  data(){
    return {
      baseUrl,
      stationList:[],
      taskList:[],
      sTaskList:[],
      shop:[]
    }
  },
  middleware: 'auth',
  computed: {
    ...mapState(["accountInfo"])
  },
  created(){
  },
  async mounted() {
    //我发布的站点列表
    { 
      let {status,list} = await stationList({ pageSize:10, page:1,status: -1});
      if(status === 1){
        this.stationList = list;
      }
    }
     //我发布的任务列表
    {
      let {status,list} = await GetTasksByUserId({ pageSize:10, page:1,status: -1});
      if(status === 1){
        this.taskList = list
      }
    }
    //我收藏的任务列表
    {
      let {status,list} = await getMyFollowedTaskListByPage({ pageSize:10, page:1});
      if(status === 1){
        this.sTaskList = list;
      }
    }
    //我收藏的店铺列表
    {
      let {status,list} = await getMyFollowedUserListByPage({ pageSize:10, page:1});
      if(status === 1){
        this.shop = list;
      }
    }
  }, 
  methods: {
    // ...mapMutations(["COURSE_TYPE"])
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    Footer,
    axios
  }
};
</script>
<style lang="scss" scoped>
@import "~static/common/css.scss";
$login-nav-bg: #252324;
.screen-aside {
  .el-submenu__title {
    line-height: 65px;
    height: 65px !important;
  }
  .el-submenu .el-menu-item {
    line-height: 65px;
    height: 65px;
    padding: 0 45px 0 77px !important;
  }
  .el-card__header {
    font-size: 16px;
  }
  .el-card {
    .el-card__body {
      padding: 0 !important;
    }
  }
}
.screen-main {
  .mbk-card{
    height: 350px;
    overflow: hidden;
  }
}
.my-mbk {
  .mbk-top {
    background: $white-color;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    padding: 20px;
    margin-bottom: 2px;
    .person-home {
      color: #0057fb;
      font-size: 12px;
      margin-top: 3px;
      font-weight: normal;
    }
  }
}
.my-info {
  width: 470px;
  background: $white-color;
  padding: 35px 30px 30px 30px;
  float: left;
  .photo {
    width: 125px;
    height: 122px;
    border: 1px solid $border-color;
    position: relative;
    margin-right: 20px;
    img {
      width: 100%;
      height: 90px;
    }
    .change-photo {
      background: $background-color;
      color: $white-color;
      width: 100%;
      line-height: 30px;
      text-align: center;
      display: block;
      cursor: pointer;
      position: absolute;
      bottom:0;
    }
  }
  .base {
    padding: 10px 0;
    .memId {
      font-size: 16px;
      color: $font-color;
    }
    .auth {
      margin: 10px 0 20px;
      span {
        display: inline-block;
        border: 1px solid $border-color;
        padding: 8px 22px 8px 8px;
        position: relative;
        cursor: pointer;
        &.select {
          border-color: $green-color;
          cursor:default;
          &::after {
            position: absolute;
            bottom: 0;
            right: 0;
            content: "√";
            background: $green-color;
            color: $white-color;
            padding: 0 3px;
          }
        }
      }
    }
    .no-read {
      .num {
        color: $theme-color;
      }
    }
    .entry {
      color: $blue-color;
    }
  }
}
.my-finance {
  float: right;
  background: $white-color;
  width: 468px;
  padding: 30px 30px 10px 30px;
  height: 187px;
  .finance-top {
    margin-bottom: 8px;
  }
  .finance-list {
    margin-top:20px;
    li {
      line-height: 36px;
      &>span:first-child{
        overflow: hidden;
        display:inline-block;
        width: 270px;
        margin-right: 10px;
      }
      .com{
        a{
          margin-left: 10px;
        }
      }
      .cash{
        .price-color{
          margin-right: 15px;
        }
      }
      .recharge{
        .price-color{
          margin-left: 30px;
        }
      }
    }
    .point{
      width: 325px!important;
    }
  }
}
.my-shop{
  margin-top:2px;
  padding:30px;
  background: $white-color;
  .shop-type{
    width: 120px;
    text-align: center;
    font-size: 14px;
    margin-right: 30px;
    div{
      line-height: 60px;
      background: #f4f4f4;
      &.mbk-develop.current{
        background:$theme-color;
        color: $white-color;
        position: relative;
        &::before{
          content:'';
          width: 0;
          height: 0;
          border: 4px solid transparent;
          border-top: 4px solid #f4f4f4;
          position: absolute;
          top: 0;
          left: 50%;
          margin-left:-2px;
        }
      }
      &.mbk-user.current{
        background:$theme-color;
        color: $white-color;
        position: relative;
        &::before{
          content:'';
          width: 0;
          height: 0;
          border: 4px solid transparent;
          border-bottom: 4px solid #f4f4f4;
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left:-2px;
        }
      }
    }
  }
  .shop-info{
    overflow: hidden;
    .title{
      line-height: 30px;
    }
    .income,.onsale{
      line-height: 30px;
    }
    .opt{
      span{
        background:#f4f4f4;
        padding: 7px 20px;
        display: inline-block;
      }
    }
  }
}
.already-sold{
  margin: 10px 0;
  li{
    line-height: 30px;
    a:hover{
      color: #ED292B;
    }
    .title{
      width: 350px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.task{
  margin: 10px 0;
  li{
    line-height: 30px;
    .title{
      width: 350px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      a:hover{
        color: #ED292B;
      }
    }
  }
}
.my-employer{
  margin: 15px 0;
    overflow: hidden;
  li{
    float:left;
    width: 25%;
    padding: 10px;
    a{
      display: block;
      text-align: center;
    }
    img{
      width: 100%;
      height: 85px;
      margin-bottom: 5px;
      display: block;
      &:hover{
        box-shadow: 0 0 4px 3px #f1f1f1;
      }
    }
    span {
      width: 100%;
      display: block;
       overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.mbk-news{
  margin:20px 0 10px;
  li{
    line-height: 30px;
    overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    a{
      color:#333;
      &:hover{
        color:#ED292B;
      }
    }
  }
}
</style>
