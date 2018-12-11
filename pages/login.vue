<template>
  <div id="login-box">
    <div id="MemberTop">
      <div class="MemberMenu loginInfo" style="border:0px;">欢迎您光临本站！</div>
      <div class="MemberLogo">模板客 <img src="/img/mbk/member.png" alt="模板客" /></div>
    </div>
    <div id="MemberLoginCenter" >
      <div class="MemberKuan">
        <div class="MemberRight MemberLoginForm">
          <h2>登 录</h2>
          <el-form :model="form" :rules="rules" ref="form"  class="demo-ruleForm" >
            <el-form-item  prop="phone" >
              <el-input  v-model="form.phone" autocomplete="off" placeholder="请输入手机号">
              </el-input> 
            </el-form-item>
            <el-form-item  prop="code">
              <el-input style="width:170px;" v-model="form.code" autocomplete="off" placeholder="验证码"></el-input>
              <el-button  style="width:110px;" :disabled="!codeBtn" @click="handleSendMessage">{{codeMsg}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" style="width:100%" class="login" type="primary" @click="login">登录</el-button>
            </el-form-item> 
            <el-button :loading="loading" v-show="$route.query.quick" style="width:100%" class="login" type="primary" @click="quickLogin">一键登录</el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div id="MemberFoot">久九科技（天津）有限公司 联系人：付良福 联系电话：12345678</div>

  </div>
</template>
<script>
import { setStore } from '../config/common'
import { userLongin,sendMessage,loginTest } from '../ajax/getData'
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (!/^1[345789]\d{9}$/.test(value)){
              callback(new Error('手机号格式不正确'));
          }
          callback();
        }
      };
    return {
      loading:false,
      codeMsg:'获取验证码',
      codeBtn:true,
      rules:{
        phone: [
            { validator: validatePhone,trigger: 'submit' },
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'submit' },
          ],
      },
      form:{
        phone:this.$route.query.quick?'13121554252':'',
        code:''
      }
    }
  },
  head: {
    bodyAttrs: {
      class: 'login-page'
    }
  },
  computed:{
    ...mapState(["accountInfo","isLogin"])
  },
  methods: {
    async quickLogin(){
      this.loading = true;
      let {status} = await loginTest({phone:this.form.phone})
      this.loading = false;
      if(status == 1){
        location.href = '/'
      }else{
        this.$message.error('登录出错')
      }
    },
    login () {
      this.$refs.form.validate(async valid=>{
        if(valid){
          this.loading = true;
          let {status,returnmessage} = await userLongin(this.form);
          this.loading = false;
          if(status==0){
            this.$message.error(returnmessage);
            return;
          }
          if(this.$route.query.ReturnUrl){
            if(this.$route.query.ReturnUrl == 'index.html'){
              this.$router.push('/')
            }else{
              this.$router.push(this.$route.query.ReturnUrl)
            }
          }else{
              this.$router.push('/')
          }
        }
      })
      
    },
    handleSendMessage(){
       this.$refs.form.validateField('phone',valid=>{
        if(valid) return;
        //手机号验证通过以后发送验证码
        sendMessage({phone:this.form.phone}).then(json=>{
          if(json.status==1){
            //验证码发送成功以后读秒
            this.codeBtn = false;
            this.$message.success('验证码发送成功');
            var  time = 60;
            let t = setInterval(()=>{
              this.codeMsg = '剩'+time+'秒';
              time --;
              if(time<=0){
                clearInterval(t);
                this.codeMsg ='获取验证码';
                this.codeBtn = true;
              }
            },1000)
          }else{
             this.$message.error('验证码发送失败');
          }
        }).catch(err=>{
        })
        
      })
      
    },
  },
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
#login-box{
  background: #fff;
}
</style>
<style lang="scss">

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
