<template>
  <div id="login-box">
    <div id="MemberTop">
      <div class="MemberMenu loginInfo" style="border:0px;">欢迎您光临本站！【<a href="//www.jjzhy.cn/member/passport/login.aspx">登陆</a>】【<a href="//www.jjzhy.cn/member/passport/register.aspx">注册</a>】 </div>
      <div class="MemberLogo">模板客 <img src="/img/mbk/member.png" alt="模板客" /></div>
    </div>
    <div id="MemberLoginCenter" >
      <div class="MemberKuan">
        <div class="MemberRight MemberLoginForm">
          <h2>注 册</h2>
          <el-form :model="form" :rules="rules" ref="form"  class="demo-ruleForm" >
            <el-form-item  prop="phone">
              <el-input clearable v-model.trim="form.phone" autocomplete="off" placeholder="请输入手机号">
              </el-input>
            </el-form-item>
            <el-form-item  prop="code">
              <el-input clearable  style="width:170px;" v-model.trim="form.code" autocomplete="off" placeholder="验证码"></el-input>
              <el-button    @click="verifyCode">获取验证码</el-button>
            </el-form-item>
            <el-form-item>
              <el-button style="width:100px" class="login" type="primary" @click="register">立即注册</el-button>
              <a href="/login">登录</a>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div id="MemberFoot">久九科技（天津）有限公司 联系人：付良福 联系电话：12345678</div>

  </div>
</template>
<script>
import { setStore } from '../config/common'
import { userLongin } from '../ajax/getData'
export default {
  data () {
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请手机号'));
        } else {
          if (!/^1[345789]\d{9}$/.test(this.phone)){ 
              callback(new Error('手机号格式不正确'));
          }
          callback();
        }
      };
    return {
      phone: '',
      password: '',
      isLayer: false,
      rules:{
          phone: [
            { validator: validatePhone, trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
      },
      form:{
        phone:'',
        code:''
      }
    }
  },
  methods: {
    verifyCode(){

    },
  },
  components: {
    layerMsg
  }
}
</script>
<style lang="scss" scoped>

#MemberTop { width: 1000px; margin: 0 auto; overflow: hidden; font-family: "Microsoft Yahei", "宋体"; }
#MemberTop .MemberLogo { font-size: 36px; height: 90px; line-height: 90px; }
#MemberTop .MemberLogo img { vertical-align: middle; margin-bottom: 6px; }
#MemberTop .MemberMenu { font-size: 16px; float: right; margin-top: 45px; }
#MemberTop .MemberMenu a { text-decoration: none; color: #333; }
#MemberTop .MemberMenu a:hover { color: #f00; }
#MemberFoot { text-align: center; padding: 20px 0px; font-size: 14px; line-height: 18px; font-family: "Microsoft Yahei", "宋体"; }
/* 会员登录样式 */
#MemberLoginCenter { background-color: #FFF; background-image: url(/img/mbk/login_bg.jpg); background-repeat: no-repeat; background-position: center center; width: 100%; padding: 68px 0px; overflow: hidden; font-family: "Microsoft Yahei", "宋体"; }
#MemberLoginCenter .MemberLoginForm { float:right;width: 350px; padding: 30px; background-color: #000; opacity: 0.8; overflow: hidden; padding-bottom: 10px; }
#MemberLoginCenter .MemberLoginForm h2 { font-size: 24px; margin-bottom:30px; color: #fff; font-weight: normal; }
#MemberLoginCenter .MemberLoginForm a:hover { color: #ff0; }
#MemberLoginCenter .MemberLoginForm a{
  color: #ff8200;
}
.MemberKuan {
    width: 1000px;
    margin: 0 auto;
    overflow: hidden;
}
</style>
<style lang="scss">
html,body{
  background: #fff;
}
#MemberLoginCenter{
.el-input__inner{
  outline: none;
  border-radius:1px;
}
.el-input__inner:hover{
  border-color:#c0c4cc;;
}
.el-input__inner:visited{
  border-color:#c0c4cc;;
}
.el-input__inner:focus{
  border-color:#c0c4cc;;
}
.el-button {
  border-radius: 1px;
}
.login.el-button {
  border-radius: 1px;
  // background: #ff8200;
  // border: 1px solid #ff8200;
  margin-right: 30px;
}
}
</style>
