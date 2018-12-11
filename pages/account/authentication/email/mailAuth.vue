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
            <el-form ref="form" :model="form" label-width="120px" :rules="rules">
              <!-- <el-form-item label="用户名" prop="userId">
                <el-input class="w-270" v-model="form.userId" placeholder="请输入用户名"></el-input>
              </el-form-item>-->
              <el-form-item label="邮箱地址" prop="email">
                <el-input class="w-270" v-model="form.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="red-btn" @click="postCommit">发送验证码</el-button>
              </el-form-item>
              <el-form-item>
                <em class="title-m">认证说明</em>
                <dl class="des">
                  <dt>邮箱认证成功以后，您可以享有以下服务：</dt>
                  <dd>1.邮箱地址登录：可直接使用“邮箱地址”登录到一品威客</dd>
                  <dd>2.重要事件提醒：进行（支付/提现/选稿/中标）时，可及时收到邮件提醒</dd>
                  <dd>3.找回账号密码：忘记密码时，可使用邮件找回密码。</dd>
                </dl>
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
import { sendCheckEmailMessage, checkEmailCode } from "~/ajax/getData";
import { mapState } from 'vuex';
export default {
  data() {
    //邮箱格式验证
    var validateEmail = (rule, value, callback) => {
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
    return {
      form: {
        email: ""
      },
      rules: {
        email: [{ require: true, validator: validateEmail, trigger: "blur" }]
      }
    };
  },
  computed:{
    ...mapState(['accountInfo'])
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    Footer
  },
  mounted() {
    this.form.email = this.accountInfo.email
  },
  methods: {
    postCommit() {
      /* this.$refs.form.validate(async valid => {
        if (valid) {
          let status = await sendCheckEmailMessage(this.form);
          if (res.status == 1) {
            this.$message.success(res.returnmessage);
          } else {
            this.$message.error(res.returnmessage);
          }
        }
      }); */
      this.$refs.form.validate(async valid => {
        if (valid) {
          let status = await sendCheckEmailMessage(this.form).then(res => {
            if (res.status == 1) {
              this.$message.success(res.returnmessage);
              // this.src = `http://mubanke.wx.qkk.cn/account/authentication/email/emailValidate.html`;
              this.$router.push(`/account/authentication/email/emailValidate.html`)
            } else {
              this.$message.error(res.returnmessage);
            }
          });
        }
      });
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
      left: 0;
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

    .progres span.progres_tip > span.select > i {
      background-position: -50px -280px;
    }

    .progres span.progres_tip > span.success > i {
      background-position: 0 -330px;
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

    .progres span.progres_tip > span.select > font,
    .progres span.progres_tip > span.successon > font {
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
</style>




