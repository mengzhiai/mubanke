
<template>
  <transition name='index'>
    <div class="admin-home">
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
                <nuxt-link to="/account/base/baseInfo.html"><span class="change-photo">更换我的头像</span></nuxt-link>
              </div>
              <div class="fl base">
                <div class="memId">{{accountInfo.userName}}</div> 
                <div class="auth">
                  <span v-if="accountInfo.isNameAuthentication" class="select">实名</span>
                  <nuxt-link v-else to="/account/authentication/realnameAuth.html"><span >实名</span></nuxt-link>
                  <span v-if="accountInfo.isMobileAuthentication" class="select">手机</span>
                  <nuxt-link v-else to="/account/authentication/mobileAuth.html"><span >手机</span></nuxt-link>
                  <span v-if="accountInfo.isEmailAuthentication" class="select">邮箱</span>
                  <nuxt-link v-else to="/account/authentication/mailAuth.html"><span >邮箱</span></nuxt-link>
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
                <li>
                  <span class="fl">
                    <span class="fl">消费金：</span>
                    <span class="price-color fr">￥{{accountInfo.consumerMoney}}</span>
                  </span>
                  <span class="fl blue-font">充值</span>
                </li>
                <li>
                  <span class="fl">
                    <span class="fl">余额账户：</span>
                    <span class="price-color fr">￥{{accountInfo.balance}}</span>
                  </span>
                  <span class="fl blue-font">提现</span>
                </li>
                <li>
                  <span class="fl">
                    <span class="fl">积分：</span>
                    <span class="price-color fr">{{accountInfo.integral}}</span>
                  </span>
                </li>
               
              </ul>
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
import SiteNav from "~/components/adminCommon/siteNav.vue";   //顶部登录
import HeaderWrap from "~/components/adminCommon/headerWrap.vue";   //顶部搜索
import MbkNav from "~/components/adminCommon/mbkNav.vue";   //顶部搜索
import MbkBreadcrumb from "~/components/adminCommon/mbkBreadcrumb.vue";   //顶部搜索
import LeftMenu from "~/components/adminCommon/leftMenu.vue"; //引入菜单
import Footer from "~/components/adminCommon/footer.vue";   //引入公共底部
import {baseUrl} from '~/config/async/env'
import {getMyTaskListByPage,getMyFollowedTaskListByPage,getMyFollowedUserListByPage,} from '~/ajax/getData'
export default {
  data(){
    return {
      baseUrl
    }
  },
  head: {
    bodyAttrs: {
      class: 'admin-page'
    }
  },
  computed: {
    ...mapState(["accountInfo"])
  },
  async mounted() {
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
.mbk-diamonds {
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
    &:hover{
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
      &:hover{
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
    margin-top: 10px;
    img{
      width: 100%;
      height: 85px;
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
