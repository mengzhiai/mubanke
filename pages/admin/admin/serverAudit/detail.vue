<template>
<transition name='index'>
    <div>
        <SiteNav></SiteNav>
         <HeaderWrap></HeaderWrap>
      <MbkNav></MbkNav>
     <MbkBreadcrumb></MbkBreadcrumb>
     <div class="screen-center clearable">
        <LeftMenu></LeftMenu>
        <div class="screen-main admin">
            <div class="top clearable">
                <div class="title-l">任务详情</div>
            </div>
            <div class="body new-task">
                <el-form ref="form"  label-width="140px" >
                    <el-form-item  label="选择需求所在分类" prop="servicetypeid">
                      <span>{{task.serviceTypeName}}</span>
                    </el-form-item>
                    <el-form-item  prop="taskname"  label="需求标题" >
                     <span>{{task.taskName}}</span>
                    </el-form-item>
                    <el-form-item  prop="description"  label="需求内容" >
                      <span v-html="task.description"></span>
                    </el-form-item>
                    <el-form-item prop="description"  label="附件" >
                       <div v-if="task.uploadFile1">
                         <a target="blank" title="新窗口打开" :href="baseUrl+task.uploadFile1">{{task.uploadFile1}}</a>
                       </div>
                       <div v-if="task.uploadFile2">
                         <a target="blank" title="新窗口打开" :href="baseUrl+task.uploadFile2">{{task.uploadFile2}}</a>
                       </div>
                        <div v-if="task.uploadFile3">
                         <a target="blank" title="新窗口打开" :href="baseUrl+task.uploadFile3">{{task.uploadFile3}}</a>
                       </div>
                        <div v-if="task.uploadFile4">
                         <a target="blank" title="新窗口打开" :href="baseUrl+task.uploadFile4">{{task.uploadFile4}}</a>
                       </div>
                        <div v-if="task.uploadFile5">
                         <a target="blank" title="新窗口打开" :href="baseUrl+task.uploadFile5">{{task.uploadFile5}}</a>
                       </div>
                    </el-form-item>
                    <el-form-item  prop="taskname"  label="任务工期" >
                      <span>{{task.endTime}}</span>
                    </el-form-item>
                    <el-form-item  prop="taskname"  label="任务费用" >
                      <span>￥{{task.amount}}元</span>
                    </el-form-item>
                    <el-form-item  prop="mobile"  label="手机号码" >
                      <span>{{task.mobile}}</span>
                    </el-form-item>
                    <el-form-item  prop="wechat"   label="微信号码" >
                      <span>{{task.wechat}}</span>
                    </el-form-item>
                    <el-form-item  >
                      <el-button @click="handleCheckTask(task.id,1)" class="el-button--primary">通过</el-button>
                      <el-button @click="dialogVisible = true" >驳回</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog custom-class="admin-message" :append-to-body="true"
                  title="新增子订单"  :visible.sync="dialogVisible" width="30%">
                  <el-form ref="form"  :model="form" label-width="100px" :rules="rules">
                    <el-form-item prop="money" label="钱">
                      <el-input   v-model="form.money"></el-input>
                    </el-form-item>
                    <el-form-item prop="decirption"  label="描述">
                      <el-input prop="decirption" v-model="form.decirption"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="small" class="el-button--primary" @click="handleAddChildOrder()">确 定</el-button>
                  </span>
                </el-dialog>

            </div>
        </div>
      </div>
      <Footer></Footer>  
    </div>
    </transition>
</template>
<script>
import SiteNav from "~/components/adminCommon/siteNav.vue"; //顶部登录
import HeaderWrap from "~/components/adminCommon/headerWrap.vue"; //顶部搜索
import MbkNav from "~/components/adminCommon/mbkNav.vue"; //顶部搜索
import MbkBreadcrumb from "~/components/adminCommon/mbkBreadcrumb.vue"; //面包屑
import LeftMenu from "~/components/adminCommon/leftMenu.vue"; //引入菜单
import Footer from "~/components/adminCommon/footer.vue"; //引入公共底部
import Editor from "~/components/adminCommon/editor.vue"; //引入富文本
import { getTaskByTaskId,checkTask ,addChildOrder} from '~/ajax/getData'
import {baseUrl} from '~/config/async/env'
export default {
  data() {
    return { 
      task:{},
      serverList:[
      ],
      form:{
        money:'',
        decirption:""
      },
      dialogVisible:false,
      rules:{
        money:[
          {
            required:true,message:'请输入钱',trigger:'blur'
          }
        ],
        decirption:[
          {
            required:true,message:'请输入描述',trigger:'blur'
          }
        ],
      },
      baseUrl
    };
  },
  head: {
    bodyAttrs: {
      class: 'admin-page'
    }
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    Footer,
    Editor
  },
  created(){
    this.init();
  },
  watch:{
    accountInfo(newV){
      this.form.mobile = newV.mobile;
      this.form.wechat = newV.weChat;
    }
  },
  methods:{
    async init(){
      let {status,model} = await getTaskByTaskId({id:this.$route.query.id});
      if(status==1){
        this.task = Object.assign(model,{
          endTime:model.endTime.replace('T',' ').substr(0,10),
          bidEndTime:model.bidEndTime.replace('T',' ').substr(0,10)
        });
      }
    },
    handleCheckTask(id,status){

       this.$confirm(`<div style="margin:30px 0;">确定执行该操作吗？</div>`, '提示', {
        dangerouslyUseHTMLString: true,
        type:'warning',
        confirmButtonText: '确定',
        customClass:'admin-message',
        callback: async action => {
            if(action=='confirm'){
              //服务审核
              let {status,returnmessage} = await checkTask({id,status})
              if(status ==1){
                this.$message.success(returnmessage);
                  location.href = '/admin/admin/serverAudit/list.html'
              }else{
                this.$message.success(returnmessage);
              }
            }
        }
      });
    },
    handleAddChildOrder(){
       this.$refs.form.validate(async valid=>{
         if(valid){
           let {status,returnmessage} = await addChildOrder({id:this.task.id,money:this.form.money,decirption:this.form.decirption})
           if(status==1){
             this.$message.success(returnmessage)
             this.dialogVisible = false;
             this.$router.push('/admin/admin/serverAudit/list.html')
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
}
</style>
<style lang="scss" >
.screen-main{
  .new-task {
    padding: 30px;
    .fs14 .el-form-item__label{
         font-size:14px;
         color:#333333;
    }
  }
}
</style>





