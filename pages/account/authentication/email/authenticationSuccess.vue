<template>
  <transition name="index">
    <div>
      <SiteNav></SiteNav>
      <HeaderWrap></HeaderWrap>
      <MbkNav></MbkNav>
      <MbkBreadcrumb></MbkBreadcrumb>
      <div class="screen-center clearable">
        <LeftMenu></LeftMenu>
        <div class="screen-main">
          <div class="top clearable">
            <div class="fl title-l">邮箱认证</div>
          </div>
          <div class="body">
            <div class="progres">
              <span class="progres_bg"></span>
              <span class="progres_des"></span>
              <span class="progres_tip">
                <span class="select">
                  <i></i>
                  <font>填写信息</font>
                </span>
                <span>
                  <i></i>
                  <font>验证邮箱</font>
                </span>
                <span class="success">
                  <i></i>
                  <font>认证成功</font>
                </span>
                <!--红色打钩successon-->
              </span>
            </div>
            <div class="validateSuccess">
              <p>认证成功!</p>
              <a href="/myMBK/employer/home.html"><el-button type="button" class="red-btn">点击返回</el-button></a>
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
import { sendCheckEmailMessage, checkEmailCode } from "~/ajax/getData";
export default {
  data() {
    //邮箱格式验证
    /* var validateEmail = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("邮箱为必填"));
      } else {
        if (value !== "") {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error("邮箱格式不正确"));
          }
        }
      }
      callback();
    };
    var validateCode = (rule, vaule, callback) =>{
          if(value == ''){
              callback(new Error('验证码不能为空'))
          }
          callback()
      }; */
    return {
      /* form: {
        userId: "",
        email: "",
        emailCode: ""
      },
      rules: {
        email: [{ require: true, validator: validateEmail, trigger: "blur" }],
      } */
    };
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    Footer
  },
  methods: {
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
      z-index: 1;
    }

    .progres span.progres_des {
      background: #ec2828;
      width: 33%;
      height: 2px;
      line-height: 0;
      font-size: 0;
      display: block;
      position: absolute;
      left: 470px;
      top: 11px;
      z-index: 2;
    }

    .progres span.progres_tip {
      height: 54px;
      width: 700px;
      display: block;
      position: absolute;
      left: 0;
      top: 0px;
      z-index: 3;
    }

    .progres span.progres_tip > span {
      width: 100px;
      margin: 0 66px;
      display: block;
      float: left;
      text-align: center;
    }

    .progres span.progres_tip > span > i {
      background: url(/img/mbk/ico_main.png) no-repeat 0 -280px;
      width: 24px;
      height: 24px;
      overflow: hidden;
      margin: 0 auto;
      display: block;
    }
    .progres span.progres_des > span > i {
      background: url(/img/mbk/ico_main.png) no-repeat 0 -280px;
      width: 24px;
      height: 24px;
      overflow: hidden;
      margin: 0 auto;
      display: block;
    }

    .progres span.progres_tip > span.select > i {
      background-position: 0 -280px;
    }

    .progres span.progres_tip > span.success > i {
      background-position: -50px -330px;
    }
    .progres span.progres_tip > span.success > font {
      color: #ec2828;
    }

    .progres span.progres_tip > span.successon > i {
      background-position: -50px -330px;
    }

    .progres span.progres_tip > span > font {
      height: 30px;
      line-height: 30px;
      color: #999;
      display: block;
      font-size: 12px;
    }

    .progres span.progres_des > span.select > font,
    .progres span.progres_des > span.successon > font {
      color: #ec2828;
    }

    .progres span.progres_tip > span.error > i {
      background-position: 0 -470px;
    }
    .tip {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }
  .des {
    line-height: 25px;
    font-size: 12px;
    dd {
      margin-left: 20px;
    }
  }
}

.validateSuccess{
  text-align: center;
  padding: 100px 0;
  line-height: 50px;
  width: 400px;
  margin: 0 auto;
  p{
    font-size: 24px;
  }
}
</style>




