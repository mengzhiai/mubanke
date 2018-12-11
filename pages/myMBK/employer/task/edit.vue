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
                <div class="title-l">发布任务</div>
            </div>
            <div class="body new-task">
                <el-form ref="form"  :model="form" label-width="140px" :rules="rules" >
                    <el-form-item  label="选择需求所在分类" prop="servicetypeid">
                      <el-select  class="w-270" clearable v-model="form.serviceTypeId">
                         <el-option :key="index" :value="item.id" v-for="(item,index) in serverList" :label="item.serviceTypeName"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item  prop="taskname"  label="需求标题" >
                      <el-input class="w-270" v-model="form.taskName" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item  prop="description"  label="需求内容" >
                      <el-input type="textarea" v-model="form.description" placeholder=""></el-input>
                      <Editor ></Editor>
                    </el-form-item>
                    <el-form-item>
                      <el-upload :before-upload="uploadBefore" :http-request="handleUpload"  action=""  multiple :limit="5" :file-list="uploadList" :on-remove="handleRemove"
                       :on-exceed="handleExceed">
                        <el-button size="small" >上传附件</el-button>
                        <div slot="tip" class="el-upload__tip">最多可添加<span class="price-color">5</span>个图片/文件，每个大小不超过<span class="price-color">5M</span>
                        <a href="/" class="blue-font">无法正常上传附件？</a></div>
                      </el-upload>
                    </el-form-item>
                    <el-form-item  prop="taskname"  label="任务工期" >
                      <el-input class="w-270" v-model.trim="form.workDay" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item  prop="taskname"  label="任务费用" >
                      <el-input class="w-270" v-model.trim="form.amount" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item  prop="mobile"  label="手机号码" >
                      <el-input class="w-270" v-model.trim="form.mobile" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item  prop="wechat"   label="微信号码" >
                      <el-input class="w-270" v-model.trim="form.wechat" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item >
                      <el-button @click="commitAdd" class="red-btn">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
             <el-dialog  class="payType"  title="" :visible.sync="payTypeVisible"  width="550px"> 
               <iframe src="" id="payIframe" frameborder="0" width="520px" height="620px">
               </iframe>
             </el-dialog>
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
import LeftMenu from "~/components/common/leftMenu.vue"; //引入菜单
import Footer from "~/components/common/footer.vue"; //引入公共底部
import Editor from "~/components/common/editor.vue"; //引入富文本
import { GetAllServerList,AddTask,JudgeUserMoney,PayTask,allpay,Upfile,getTaskByTaskId } from '~/ajax/getData'
export default {
  data() {
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
      payTypeVisible:false,
      form:{
        servicetypeid:'',
        taskname:'',
        wechat:'',
        mobile:'',
        amount:'',
        UploadFile:'',
        workDay:''
      },
      rules:{
        taskname:[
          {
            required:true,message:'请输入任务名称',trigger:'blur'
          }
        ],
        content:[
          {
            required:true,message:'请输入需求内容',trigger:'blur'
          }
        ],
        mobile:[
          {
            required:true,validator: validatePhone,trigger:'blur'
          }
        ],
        wechat:[
          {
            required:true,message:'请输入微信号码',trigger:'blur'
          }
        ],
        servicetypeid:[
          {
            required:true,message:'请选择需求分类',trigger:'blur'
          }
        ]
      },
      serverList:[
      ],
      uploadList:[]
    };
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
    this.handleServer();
    this.init();
  },
  methods:{
    async init(){
      let {status,model} = await getTaskByTaskId({id:this.$route.query.id});
      if(status==1){
        this.form = model;
      }
    },
    commitAdd(){
       var _this = this;
       this.$refs.form.validate(valid=>{
         if(valid){
           this.form.UploadFile = JSON.stringify(this.uploadList);
           //判断账户余额
            AddTask(this.form).then(res=>{
             if(res.status==1){ 
                _this.$router.push(`/myMBK/employer/orderDetail.html?orderNo=${res.orderNo}`)
             }else{
               this.$message.error(res.returnmessage)
             }
           })
         }
       })
    },
    async handleServer(){
      let json = await GetAllServerList();
      if(json.status==1){
        this.serverList = json.list;
      }
    },
    handleUpload(item){
      let formData = new FormData()
      formData.append('file', item.file)
      Upfile(formData).then(res=>{
        this.uploadList.push({name:item.file.name,url:res.url})
      }).catch(err => {
        if(err.response.status === 502){
          this.$message.error('数据格式有误，请重新上传')
        }
        
      })
    },
    handleExceed(files, fileList){
      this.$message.error('最多上传5个文件')
    },
    handleRemove(file, fileList){
      // this.uploadList = fileList
    },
   uploadBefore(file){
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return  isLt2M;
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
.el-upload-list__item.is-ready{
    display: none;
  }
</style>





