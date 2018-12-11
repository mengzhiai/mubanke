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
            <div class="fl title-l">我接的任务</div>
          </div>
          <div class="navbar">
            <el-form  ref="form" :model="form" label-width="140px" :rules="rules">
            <el-form-item    label="需求标题" >
              <span>{{task.taskName}}</span>
            </el-form-item>
            <el-form-item    label="需求内容" >
              <span v-html="task.description"></span>
            </el-form-item>
            <el-form-item prop="bidWorkDay" label="工期" >
              <el-input  class="w-270" v-model="form.bidWorkDay" placeholder="请输入工期"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="描述" >
              <editor :content="form.description" @input="handleInput" id="editor" ></editor>
            </el-form-item>
            <el-form-item prop="uploadFile" label="附件">
              <el-upload :before-upload="uploadBefore" :http-request="handleUpload"  action="" :on-change="uploadChange" ref="upload" :limit="1" :file-list="uploadList" :on-remove="handleRemove"
                :on-exceed="handleExceed">
                <el-button size="small" >上传附件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item  label="" >
              <el-button type="button" class="submit red-btn" @click="accpetSubmit">提交</el-button>
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
import PageModel from "~/components/common/pageModel.vue"; //引入翻页组件
import SearchBar from "~/components/common/searchBar.vue"; //引入检索组件
import Footer from "~/components/common/footer.vue"; //引入公共底部
import Editor from "~/components/common/editor.vue"; //引入富文本

import {  Upfile, bidTask,getEMTaskByTaskId } from "~/ajax/getData";
import { OrderOrderType, OrderStatus, } from "~/config/enumerate"; //查询条件
export default {
  data() {
    return {
      form:{ 
        taskId:'', 
         bidWorkDay:'',
         description:'',
         uploadFile:''
      },
      task:{

      },
      uploadList:[],
      rules:{
        bidWorkDay:[
          { required: true, message: "请输入工期", trigger: "blur"}
        ],
        description:[
          { required: true, message: "请输入描述", trigger: "blur"}
        ]
      }
    };
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    SearchBar,
    PageModel,
    Editor,
    Footer
  },
  created() {
    this.form.taskId = this.$route.query.taskId;
    this.init();
  },
  methods: {
    async init(){
      let {status,model} = await getEMTaskByTaskId({id:this.$route.query.taskId});
      if(status == 1){
        this.task = Object.assign(model,{
          endTime:model.endTime.replace('T',' ')
        });
      }
    },
     //富文本输入内容改变事件
    handleInput(obj){
      this.form.description = obj.content
    },
    handleUpload(item){ 
      let formData = new FormData()
      formData.append('file', item.file)
      Upfile(formData).then(res=>{
        if(res.state === "SUCCESS"){
          this.form.uploadFile = res.url
          this.uploadList.push({name:item.file.name,url:res.url})
        }else{
            this.$message.error('上传失败，请重新上传')
            this.uploadList = []
        }
        
      }).catch(err => {
        this.$message.error('上传失败，请重新上传')
      })
    },
    handleExceed(files, fileList){
      this.$message.error('最多上传1个文件')
    },
    handleRemove(file, fileList){
      this.form.uploadFile = '';
      this.uploadList = []
    },
    uploadChange(file, fileList){
    },
    uploadBefore(file){
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return  isLt2M;
    },
    //提交
    accpetSubmit(){
       this.$refs.form.validate(async valid=>{
         if(valid){
           let {status,returnmessage} = await bidTask(this.form)
          if(status === 1){
            this.$message.success(returnmessage)
            location.href = '/myMBK/facilitator/accept/list.html'
          }else{
            this.$message.error(returnmessage)
          }
         }
       })
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
  .navbar {
    padding: 0 25px;
    border-bottom: 1px solid #ddd;
    .navlit {
      line-height: 25px;
      margin: 20px 0;
      .labels {
        font-weight: bold;
        line-height: 25px;
        padding: 0px 10px;
        width: 120px;
        text-align: right;
      }
      .col {
        color: #f00;
      }
    }
  }
  .body {
    padding: 25px;
    
  }

}
</style>
<style lang="scss" >
.screen-main{
  .el-upload-list__item.is-ready{
    display: none;
  }
}
</style>




