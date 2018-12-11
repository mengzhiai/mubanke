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
                <div class="fl title-l">身份认证</div>
            </div>
                <div class="body">  
                        <div class="progres"> 
                            <span class="progres_bg"></span>
                            <span :style="{left:step*33.3333+'%'}" class="progres_des"></span>
                            <span class="progres_tip"> 
                            <span :class="step==0?'select':''"><i></i><font>提交信息</font></span> 
                            <span :class="step==1?'select':''"><i></i><font>审核资料</font></span> 
                            <span :class="step==2?'select success':'success'" ><i></i><font>认证成功</font></span><!--红色打钩successon--> 
                            </span> 
                        </div>
                    <el-form :readonly="disabled" :disabled="disabled"  ref="form" inline-message :model="form"  :rules="rules" label-width="120px">
                        <el-form-item  prop="region" label="区域选择" >
                            <div  @click = "toggleArea(area.value)" v-for="(area,index) in areaList" :key="index" class="area" :class="area.value==form.region?'active':''">
                                <div class="zh">{{area.label}}</div>
                                <!-- <span class="en">China</span> -->
                            </div>
                        </el-form-item>
                        <el-form-item prop="identitySelect" label="身份选择" >
                            <el-radio-group v-model="form.identitySelect">
                                <el-radio v-for="(identity,index) in identityList" :key="index" :label="identity.value">{{identity.label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="realName" label="真实姓名" >
                            <el-input class="w-270" v-model.trim="form.realName"></el-input>
                            <div class="tip">务必正确填写您的真实姓名,一经认证将无法修改，姓名为4-20个字符。</div>
                        </el-form-item>
                        <el-form-item prop="licenseNumber"  label="证件号" >
                            <el-input class="w-270" v-model="form.licenseNumber"></el-input>
                            <div class="tip">请填写与真实姓名对应的证件号码</div>
                        </el-form-item>
                        <el-form-item prop="limitDate" label="身份证到期时间" >
                            <el-radio-group v-model="form.limitType">
                                <el-radio v-for="(limit,index) in limitTypeList" :key="index" :label="limit.value">
                                    <el-date-picker :readonly="!!form.limitType"  :picker-options="pickerOptions" v-if="limit.value === 0" v-model="form.limitDate" type="date" placeholder="选择有效到期时间"></el-date-picker>
                                    <span v-else>{{limit.label}}</span>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="" >
                            <div class="uptip">请保证所传证件照对应示例红色框内文字清晰可识别！上传单个附件大小限制为1M，格式限定为jpeg/jpg/png。</div>
                        </el-form-item>
                        <el-form-item prop="idCardPersonPhoto" label="身份证人像面" >
                           <el-upload 
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.GIF,.BMP.PNG" :http-request="handleUpload('idCardPersonPhoto')"  action="" class="avatar-uploader fl" :show-file-list="false">
                            <img v-if="form.idCardPersonPhoto" :src="baseUrl+form.idCardPersonPhoto" class="avatar">
                            <div class="uploader-tip" v-else>
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                <div>点击上传</div>
                            </div>
                            </el-upload>
                            <div class="fl">
                                <img style="margin:50px 30px" src="/img/mbk/upload_arrow.png" alt="">
                            </div>
                            <img src="/img/mbk/iden_01.jpg" alt="">
                        </el-form-item>
                        <el-form-item prop="idCardNationalEmblemPhoto" label="身份证国徽面" >
                            <el-upload 
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.GIF,.BMP.PNG" :http-request="handleUpload('idCardNationalEmblemPhoto')"  action="" class="avatar-uploader fl" :show-file-list="false">
                            <img v-if="form.idCardNationalEmblemPhoto" :src="baseUrl+form.idCardNationalEmblemPhoto" class="avatar">
                            <div class="uploader-tip" v-else>
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                <div>点击上传</div>
                            </div>
                            </el-upload>
                            <div class="fl">
                                <img style="margin:50px 30px" src="/img/mbk/upload_arrow.png" alt="">
                            </div>
                            <img src="/img/mbk/iden_02.jpg" alt="">
                        </el-form-item>
                        <el-form-item label="" >
                            <div class="uptip">上传的手持身份证照必须满足：a.持件人与证件必须是同一人；b.照片中证件人像面信息清晰可见；c.单手或双手持证，持件人面部不能有任何遮挡且保持清晰；上传单个附件大小限制为1M，格式限定为jpeg/jpg/png。</div>
                        </el-form-item>
                        <el-form-item prop="idCardAndPersonPhoto" label="手持证件照" >
                            <el-upload 
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.GIF,.BMP.PNG" :http-request="handleUpload('idCardAndPersonPhoto')"  action="" class="avatar-uploader fl" :show-file-list="false">
                            <img v-if="form.idCardAndPersonPhoto" :src="baseUrl+form.idCardAndPersonPhoto" class="avatar">
                            <div class="uploader-tip" v-else>
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                <div>点击上传</div>
                            </div>
                            </el-upload>
                            <div class="fl">
                                <img style="margin:50px 30px" src="/img/mbk/upload_arrow.png" alt="">
                            </div>
                            <img src="/img/mbk/iden_03.png" alt="">
                        </el-form-item>
                        <el-form-item  v-if="!disabled">
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

import {baseUrl} from '~/config/async/env'
import {Upfile,addUserNameCheckInfo,getMyNameAuthenInfo} from '~/ajax/getData'
import {UserAuthenInfoRegion,UserAuthenInfoIdentitySelect,UserAuthenInfoLimitType} from '~/config/enumerate'
export default {
  data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入真实姓名'));
        } else {
          if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(value)){
              callback(new Error('真实姓名格式不正确'));
          }
          callback();
        }
      }
      var validateIDcard = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入证件号'));
        } else {
          if (! /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)){
              callback(new Error('证件号格式不正确'));
          }
          callback();
        }
      }
      var validateDate = (rule, value, callback) => {
          if(this.form.limitType == 1){
              callback();
          }else{
              if (!value) {
                callback(new Error('请选择身份证到期时间'));
                } else {
                callback();
                }
          }
      }
    return { 
        baseUrl:baseUrl,
        form:{
            priceType:'1',
            imageUrl:'',
            gender:'',
            region:0,
            identitySelect:0,
            realName:'',
            licenseNumber:'',
            limitType:0,
            limitDate:'',
            idCardPersonPhoto:'',
            idCardNationalEmblemPhoto:'',
            idCardAndPersonPhoto:''
        },
        rules: {
          region:[
              {required:true,message:'请选择区域',trigger:'blur'}
          ],
          identitySelect:[
              {required:true,message:'请选择身份',trigger:'blur'}
          ],
          realName:[
              {required:true,validator: validateName,trigger:'blur'}
          ],
          licenseNumber:[
              {required:true,validator:validateIDcard,trigger:'blur'}
          ],
          limitType:[
              {required:true,message:'请选择身份证到期时间',trigger:'blur'}
          ],
          limitDate:[
              {required:true,validator:validateDate,trigger:'blur'}
          ],
          idCardPersonPhoto:[
              {required:true,message:'请上传身份证人像面',trigger:'blur'}
          ],
          idCardNationalEmblemPhoto:[
              {required:true,message:'请上传身份证国徽面',trigger:'blur'}
          ],
          idCardAndPersonPhoto:[
              {required:true,message:'请上传手持证件照',trigger:'blur'}
          ],
        },
        areaList:UserAuthenInfoRegion.filter(item=>{
            if(item.value!=-1) return item
        }),
        identityList:UserAuthenInfoIdentitySelect.filter(item=>{
            if(item.value!=-1) return item
        }),
        limitTypeList:UserAuthenInfoLimitType.filter(item=>{
            if(item.value!=-1) return item
        }),
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        disabled:false,
        step:0
    };
  },
  created(){
      this.init()
  },
  watch:{
      'form.limitType':function(newVal){
          if(newVal){
              this.form.limitDate = ''
          }
      }
  },
  methods:{
      async init(){
          let {status,data} = await getMyNameAuthenInfo();
          if(status === 1 ){
              this.form = data 
              if(data.nameAuthenticationType==0){
                  this.disabled = true
                  this.step = 1
              }else if(data.nameAuthenticationType==1){
                  this.disabled = true
                  this.step = 2
              }
          }else{
              this.disabled = false
          }
      },
      toggleArea(v){
          if(this.disabled) return ;
          this.form.region = v
      },
        handleUpload(type){
            return (async function (item) {
                let formData = new FormData()
                formData.append('file', item.file)
                let {state ,url} = await Upfile(formData);
                if(state == "SUCCESS"){
                    this.form[type] = url;
                    this.$message.success('上传成功')
                }else{
                    this.$message.error('上传失败')
                }
            }).bind(this)
        },
        commit(){
            let _this = this;
            this.$refs.form.validate(async valid=>{
                if(valid){
                    let {status,returnmessage} = await addUserNameCheckInfo(this.form);
                    if(status == 1){
                        this.$message.success(returnmessage)
                        location.href = '/myMBK/employer/home.html'
                    }else{
                        this.$message.error(returnmessage)
                    }
                }
            })
        }
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
.progres span.progres_tip > span.success.select > i {
    background-position: -50px -330px;
}
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
  .area{
      border: 1px solid #e9e9e9;
      float: left;
      margin-right: 10px;
      padding: 10px 20px;
      text-align: center;
      color: #999;
      line-height: 25px;
      position: relative;
      cursor: pointer;
      &.active{
          color: #F02828;
          border-color: #F02828;
          &::after{
              content:'√';
              width:20px;
              height:18px;
              background:#F02828;
              position: absolute;
              right: 0;
              top:0;
              color: #fff;
                line-height:18px;
          }
      }
      .zh{
          font-size: 18px;
      }
      .en{
          font-size: 13px;
      }
  }
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 45px;
    color: #8c939d;
    text-align: center;
    margin-top:40px;
  }
  
  .uploader-tip{
      border: 1px solid #d1d1d1d1;
      border-radius: 4px;
      width: 220px;
      height: 160px;
  }
  .avatar {
    width: 220px;
    height: 160px;
    display: block;
  }
  .uptip{
      font-size:12px;
    color:rgba(51,51,51,1);
    line-height:30px;
    background: #fef8ee;
    padding: 5px 20px;
  }
}
</style>




