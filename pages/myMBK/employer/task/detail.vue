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
                    <el-form-item  prop="taskname"  label="竞标结束时间" >
                      <span>{{task.bidEndTime}}</span>
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
                </el-form>
                <div>
                  <el-table id="server" :data="table" class="tabs"  v-loading="tableConfig.loading">
                    <el-table-column  prop="date" label="标注人" width="320">
                        <template slot-scope="props">
                            <div class="clearable"> 
                                <div class="category">{{props.row.bidUserName}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="投标日期" width="140">
                        <template slot-scope="props">
                            <div class="date">{{props.row.bidTime}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="price" label="报价">
                        <template slot-scope="props">
                            <div class="price">￥{{props.row.bidAmount}}元</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="工作周期">
                        <template slot-scope="props">
                            <div class="sort">{{props.row.bidWorkDay}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="竞标状态">
                        <template slot-scope="props">
                            <div class="sort">{{props.row.statusTitle}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="操作" width="180">
                        <template slot-scope="props">
                            <div style="margin-bottom:5px;">
                            <a :href="`/myMBK/employer/task/bidDetail.html?uId=${props.row.id}`"><el-button size="small" >查看</el-button></a>
                              <el-button size="small" v-if="props.row.status === 0" @click="handleWinBid(props.row.id,props.row.bidUserId)">中标</el-button>
                              <el-button size="small" v-if="props.row.status === 2" @click="getContract(props.row.taskId)">约请合作</el-button>
                            </div>
                        </template>
                    </el-table-column>
                  </el-table>
                  <el-dialog class="dialog dialog-detail"
                title="合约合同"
                :visible.sync="dialogDetail"
                width="1200px">
                <div v-html="contract.customerContractCon"></div>
                <span slot="footer" class="dialog-footer">
                  <div class="buttom-mask">
                    <el-button @click="qdContract(contract.id)" type="button" size="mini">同意</el-button>
                  </div>
                </span>
            </el-dialog>
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
import LeftMenu from "~/components/common/leftMenu.vue"; //引入菜单
import Footer from "~/components/common/footer.vue"; //引入公共底部
import Editor from "~/components/common/editor.vue"; //引入富文本
import { getEMTaskByTaskId,getBiddingListByTaskId,winBid,getContractDtoById,signContract} from '~/ajax/getData'
import {baseUrl} from '~/config/async/env'
import {BiddingStatus} from '~/config/enumerate'
export default {
  data() {
    return { 
      task:{},
      baseUrl,
      tableConfig:{
        total:0,
        loading:false
      },
      search:{
        status:-1,
        page:1, 
        pageSize:5,
        taskId:''
      },
      table: [],
      contract:{},
      dialogDetail:false
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
    this.search.taskId = this.$route.query.id
  },
  methods:{
    async init(){
      {
        let {status,model} = await getEMTaskByTaskId({id:this.$route.query.id});
        if(status === 1){
          this.task = Object.assign(model,{
            endTime:model.endTime.replace('T',' ').substr(0,10),
            bidEndTime:model.bidEndTime.replace('T',' ').substr(0,10)
          });
        }
      }
      {
        let params = this.getPamas();  //参数
        this.tableConfig.loading = true;
        let {status,list,total} = await getBiddingListByTaskId(params);
        this.tableConfig.loading = false;
        if(status == 1){
            this.table = list&&list.map(item=>{
              let statusTitle ;
                BiddingStatus.map(bid=>{
                  if(bid.value == item.status){
                    statusTitle = bid.label
                  }
                })
                return Object.assign(item,{
                    statusTitle,
                    bidTime:item.bidTime.substr(0,19).replace('T',' ')
                })
            });
            this.tableConfig.total = total;
        }
      }
    },
    getPamas(){
      return Object.assign(this.search)
    },
    handleWinBid(id,bidUserId){
        this.$confirm(`<div style="margin:30px 0;">确定中标该服务商吗？</div>`, '提示', {
        dangerouslyUseHTMLString: true,
        type:'warning',
        confirmButtonText: '确定',
        callback: async action => {
            if(action=='confirm'){
               let {status,returnmessage} = await winBid({id})
               if(status ===1){
                 this.$message.success(returnmessage);
                 this.init()
               }else{
                 this.$message.error(returnmessage);
               }
            }
        }
      });
    },
    async getContract(taskId){
      let {status,data} = await getContractDtoById({taskId,flag:0})
      if(status === 1){
        this.contract = data;
        this.dialogDetail = true
      }
    },
    async qdContract(contractId){
      let {status,returnmessage} = await signContract({status:1,contractId})
      if(status === 1){
        this.$message.success(returnmessage)
        this.dialogDetail = false;
        this.init();
      }else{
        this.$message.error(returnmessage)
      }
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
.dialog::-webkit-scrollbar{
  display: none;
}
.dialog{
  .el-dialog__header{
    padding: 5px;
    background-color: #e4e4e4;
    color: #565656;
    .el-dialog__title{
      color: #565656;
      font-size: 14px;
    }
  }
  .el-dialog__headerbtn{
    top: 15px;
    right: 20px;
  }
  
  .item{
    margin: 10px 0;
    .lists{
      margin: 0 3px;
      position: relative;
      display: inline-block;
      .pos{
        position: absolute;
        right: 10px;
        top: 10px;
      }
      i{
        position: absolute;
        top: -17px;
      }
    }
    .el-input{
      width: 120px;
    }
    .input-w{
      margin: 10px 0;
    }
    .show-detail{

    }
    .el-icon-plus{
      font-size: 24px;
      margin: 0 10px;
      cursor: pointer;
    }
  }
  .labels{
    display: inline-block;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    width: 100px;
    padding: 0px 10px;
    text-align: right;
    font-size: 12px;
  }
  .soft1{
    margin-top: 5px;
  }
  .soft2{
    margin-top: 15px;
  }
  .el-dialog__footer{
    padding: 10px;
    border-top: 1px solid #dadee5;
    background-color: #e4e4e4;
    .buttom-mask{
      el-bottom{
        border: 1px solid #dfdfdf;
      }
    }
  }
}
.dialog-detail {
  .el-dialog {
    padding: 10px;
    background: rgba(255,255,255,0.1);
  }
  .el-dialog__body{
    background: #fff;
  }
}
.dialog-detail{
  .show-message{
    margin-bottom: 30px;
    .ht{
      margin: 10px 0;
    }
    .item{
      background-color: #e4e4e4;
      height: 35px;
      line-height: 35px;
      margin: 0;
      padding: 0 10px;
      .tit{
        color: #272727;
      }
      img{
        padding: 0 5px;
      }
    }
    .contract-detail{
      line-height: 30px;
      width: 100%;
      border: 1px solid #ddd;
      padding: 30px;
    }
  }
  .show-message{
    .title{
      font-size: 18px;
      margin: 15px 0px;
      font-weight: 600;
    }
    p{
      font-size: 12px;
    }
    ul{
      li{
        display: block;
        line-height: 30px;
        font-size: 12px;
        width: 100%;
        a{
          color: #cc0001;
        }
      }
    }
  }
}
</style>





