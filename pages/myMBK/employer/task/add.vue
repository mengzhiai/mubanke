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
                <el-form ref="form" :disabled="!stationList.length" :model="form" label-width="140px" :rules="rules" >
                  <el-form-item  label="选择站点" prop="stationId">
                      <el-select placeholder="选择站点"  class="w-270" clearable v-model="form.stationId">
                         <el-option :key="index" :value="item.id" v-for="(item,index) in stationList" :label="item.stationName"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item  label="选择分类" prop="serviceTypeId">
                      <el-select placeholder="选择分类" class="w-270" clearable v-model="form.serviceTypeId">
                         <el-option :key="index" :value="item.id" v-for="(item,index) in serverList" :label="item.serviceTypeName"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item  prop="taskName"  label="需求标题" >
                      <el-input class="w-270" v-model.trim="form.taskName" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item  prop="description"  label="需求内容" >
                      <Editor id="editor"  :content="form.description" @input="handleInput"></Editor>
                    </el-form-item>
                    <el-form-item>
                      <el-upload  :before-upload="uploadBefore" :http-request="handleUpload"  action="" :on-change="uploadChange" ref="upload" :limit="5" :file-list="uploadList" :on-remove="handleRemove"
                       :on-exceed="handleExceed">
                        <el-button :loading="uploadLoading" size="small" >上传附件</el-button>
                        <div slot="tip" class="el-upload__tip">最多可添加<span class="price-color">5</span>个图片/文件，每个大小不超过<span class="price-color">5M</span>
                        <a href="/" class="blue-font">无法正常上传附件？</a></div>
                      </el-upload>
                    </el-form-item>
                    <el-form-item  prop="endTime"  label="任务工期" >
                      <el-date-picker v-model="form.endTime" align="center" prefix-icon="none"  type="date" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                    <el-form-item  prop="bidtime"  label="竞标截至时间" >
                      <el-input class="w-270" v-model.trim.number="form.bidtime" placeholder=""></el-input>
                      <!-- <el-date-picker v-model="form.bidEndTime" align="center" prefix-icon="none"  type="date" :picker-options="pickerOptions"></el-date-picker> -->
                    </el-form-item>
                    <el-form-item  prop="amount"  label="任务费用" >
                      <el-input class="w-270" v-model.number.trim="form.amount" placeholder=""></el-input>元
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
import { GetAllServerList,AddTask,JudgeUserMoney,PayTask,allpay,Upfile,getStationsByUserId } from '~/ajax/getData'
import { mapState, mapMutations } from "vuex";
export default {
  
    data() {
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (!/^1[123456789]\d{9}$/.test(value)){
              callback(new Error('手机号格式不正确'));
          }
          callback();
        }
      };
      var validateAmount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入费用'));
        } else {
          if (value<100 || value >100000){
              callback(new Error('费用超出范围'));
          }
          callback();
        }
      }
    return { 
      pickerOptions: {
        disabledDate(time) {
          let curDate = new Date();
          let year = curDate.getFullYear();
          let month = curDate.getMonth();
          let day   = curDate.getDate();
          return time.getTime() <  Date.now() || time.getTime() > new Date(`${year+3}/${month+1}/${day}`);
        },
      },
      payTypeVisible:false,
      form:{
        stationId:'',
        serviceTypeId:'',
        taskName:'',
        description:'',
        wechat:'',
        mobile:'',
        amount:'',
        uploadFile1:'',
        uploadFile2:'',
        uploadFile3:'',
        uploadFile4:'',
        uploadFile5:'',
        workDay:'',
        bidtime:''
      },
      rules:{
        stationId:[
          {
            required:true,message:'请选择站点',trigger:'blur'
          }
        ],
        taskName:[
          {
            required:true,message:'请输入任务名称',trigger:'blur'
          }
        ],
        description:[
          {
            required:true,message:'请输入任务内容',trigger:'blur'
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
        serviceTypeId:[
          {
            required:true,message:'请选择需求分类',trigger:'blur'
          }
        ],
        endTime:[
          {
            required:true,message:'请输入任务工期',trigger:'blur'
          } 
        ],
        amount:[
          {
            required:true,validator: validateAmount,trigger:'blur'
          }
        ],
        bidtime:[
          {
            required:true,message:'请输入竞标截至时间',trigger:'blur'
          }
        ]
      },
      serverList:[],
      stationList:[],
      uploadList:[],
      uploadLoading:false
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
    this.init();
  },
  computed:{
    ...mapState(["accountInfo"]) 
  },
  watch:{  
    accountInfo(newV){
      this.form.mobile = newV.mobile;
      this.form.wechat = newV.weChat; 
    }
  }, 
  methods:{
    //富文本输入内容改变事件
    handleInput(obj){
      this.form.description = obj.content
    },
    commitAdd(){
      
       var _this = this;
       this.$refs.form.validate(valid=>{
         if(valid){
           
           if(this.uploadList.length){
             for(let uk=0;uk<this.uploadList.length;uk++){
              this.form[`uploadFile${uk+1}`] = this.uploadList[uk].url
            }
           }
           
           //判断账户余额
            AddTask(this.form).then(res=>{
             if(res.status==1){ 
                _this.$router.push(`/myMBK/employer/order/detail.html?orderNo=${res.orderNo}`)
             }else{
               this.$message.error(res.returnmessage)
             }
           })
         }
       })
    },
    async init(){
      let json = await GetAllServerList();
      let station = await getStationsByUserId();
      if(station.status==1){
        this.stationList = station.list;
      }else{
         this.$alert(`<div style="margin:30px 0;">${station.returnmessage}</div>`, '提示', {
            dangerouslyUseHTMLString: true,
            type:'warning',
            confirmButtonText: '确定',
            callback: action => {
                if(action=='confirm'){
                    this.src = `http://mubanke.wx.qkk.cn/OrderPay/Allpay?OrderID=${id}`; 
                }
            }
        });
      }
      if(json.status==1){
        this.serverList = json.list;
      }
    },
    handleUpload(item){ 
      let formData = new FormData()
      formData.append('file', item.file)
      this.uploadLoading = true;
      Upfile(formData).then(res=>{
        this.uploadLoading = false;
        if(res.state === "SUCCESS"){
          item.onSuccess()
          this.uploadList.push({name:item.file.name,url:res.url})
        }else{
          item.onError()
          this.$message.error('上传失败，请重新上传')
          this.uploadList = this.uploadList
        }
      }).catch(err => {
        this.uploadLoading = false;
        item.onError()
        this.$message.error('上传失败，请重新上传')
      })
    },
    handleExceed(files, fileList){
      this.$message.error('最多上传5个文件')
    },
    handleRemove(file, fileList){
      this.uploadList = fileList
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
  .el-upload-list__item.is-ready{
    display: none;
  }
}
</style>





