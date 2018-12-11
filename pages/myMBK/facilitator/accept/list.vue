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
                <div class="fl title-l">我竞标的任务</div>
                <div class="fr"><el-input placeholder="输入任务标题" clearable v-model="taskName" class="server-name-input">
                    <el-button @click="search.taskName = taskName" slot="append" icon="el-icon-search"></el-button>
                </el-input></div>
            </div>
            <div class="body">
              <div id="server-opt">
                    <a href="http://www.jjzhy.cn/channel-102/"><el-button >我要竞标</el-button></a>
                </div>
                <el-table v-loading="tableConfig.loading" id="server" :data="table" style="width: 100%">
                    <el-table-column  prop="date" label="任务标题" width="340">
                        <template slot-scope="props">
                            <div class="clearable"> 
                                <div class="title price-color">{{props.row.taskName}}</div>
                                <div class="category">{{props.row.serviceTypeTitle}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="投标数" >
                        <template slot-scope="props">
                            <span class="time num-color">{{props.row.subiminssion?props.row.subiminssion:0}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="price" label="任务金额">
                        <template slot-scope="props">
                            <div class="price">￥{{props.row.bidAmount}}元</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="任务状态">
                        <template slot-scope="props">
                            <div class="status">{{props.row.statusTitle}}</div> 
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="操作" width="180">
                        <template slot-scope="props">
                           <el-button>查看</el-button>
                           <el-button v-if="props.row.taskStatus == 4" @click="getContract(props.row.taskId)">合作</el-button>
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
                 <PageModel :total="tableConfig.total" :pageSize="search.pageSize" :config="tableConfig" :search="search"></PageModel>
            </div>
        </div>
      </div>
      <!-- <Footer></Footer>   -->
    </div>
    </transition>
</template>
<script>
import SiteNav from "~/components/common/siteNav.vue"; //顶部登录
import HeaderWrap from "~/components/common/headerWrap.vue"; //顶部搜索
import MbkNav from "~/components/common/mbkNav.vue"; //顶部搜索
import MbkBreadcrumb from "~/components/common/mbkBreadcrumb.vue"; //面包屑
import LeftMenu from "~/components/common/leftMenu.vue"; //引入公共底部
import PageModel from "~/components/common/pageModel.vue"; //引入公共底部
import Footer from "~/components/common/footer.vue"; //引入公共底部
import SearchBar from "~/components/common/searchBar.vue"; //引入检索组件

import {getBidInfoListByUser,signContract,getContractDtoById} from '~/ajax/getData'

import {BiddingStatus} from '~/config/enumerate'
export default {
  data() {
    return { 
      taskName:'',
      navLabelGroup:[
        {
          name:'订单类型',
          prop:'status',
          list:BiddingStatus
        }
      ],
      tableConfig:{
        total:0,
        loading:false
      },
      search:{
        taskName:'',
        status:-1,
        page:1,
        pageSize:5,
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
    PageModel,
    Footer,
    SearchBar
  },
  created(){
    this.init()
  },
  watch:{
    'search': {
      deep: true,
      handler: function(n,o) {
        this.init()
        // this.$router.push({ path: this.$route.path, query: this.getPamas() })
      }
    },
    taskName(newV){
      if(newV==''){
        this.search.taskName = newV;
      } 
    }
  },
  methods:{
    async init(){
      let params = this.getPamas();  //参数
      this.tableConfig.loading = true;
      let {status,list,total} = await getBidInfoListByUser(params);
      this.tableConfig.loading = false;
      if(status == 1){
        this.table = list && list.map(item=>{
          let statusTitle ;
          BiddingStatus.map(bid=>{
            if(bid.value == item.status){
              statusTitle = bid.label
            }
          })
          return Object.assign(item,{statusTitle})
        });  
        this.tableConfig.total = total;
      }
    },
    getPamas(){
      let data = {}
      for(let k of Object.keys(this.search)){
        if(this.search[k]!==''){
          data[k] = this.search[k]
        }
      }
      return data
    },
    async getContract(taskId){
      let {status,data,returnmessage} = await getContractDtoById({taskId,flag:1})
      if(status === 1){
        this.contract = data;
        this.dialogDetail = true
      }else{
        this.$message.error(returnmessage)
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
  .navbar {
    padding: 25px;
    border-bottom: 1px solid #ddd;
    .navlit {
      line-height: 25px;
      margin: 20px 0;
      .label {
        font-weight: bold;
        line-height: 25px;
        padding: 0px 10px;
      }
      li {
        float: left;
        padding: 0px 10px;
        margin: 0 5px;
        cursor: pointer;
        &:hover{
            background: $theme-color;
          color: $white-color;
        }
        &.active {
          background: $theme-color;
          color: $white-color;
        }
      }
    }
  }
  .body {
    padding: 25px;
    .el-table__row {
      .photo {
        max-width: 70px;
        max-height: 70px;
        margin-right: 20px;
      }
      .title {
        font-size: 12px;
      }
      .category {
        font-size: 12px;
        margin-top: 5px;
        color: #666666;
      }
      .date,
      .time {
        font-size: 12px;
      }
      .price {
        font-size: 12px;
        color: #666666;
        font-weight: bold;
      }
      .status{
          // color:#009966;
          font-size: 12px;
      }
    }
  }

  #server-page {
    float: right;
    margin: 20px 0;
    .el-pager li {
      font-size: 12px;
      font-weight: 400;
    }
  }
}
</style>
<style lang="scss">
.server-name-input {
  .el-input__inner {
    height: 30px;
  }
  .el-input-group__append {
    background: #f2f2f2;
    padding: 0 7px;
  }
}
#server-opt {
  margin-bottom: 20px;
  .el-button {
    padding: 8px 10px;
    border-radius: 1px;
    font-size: 12px;
    color: #666;
  }
}
#server {
  .el-table__header-wrapper {
    .is-leaf {
      background: #f4f4f4 !important;
      padding: 5px 0 !important;
    }
  }
  .el-table__row {
    .el-button {
      padding: 8px 10px;
      border-radius: 1px;
      font-size: 12px;
      color: #666;
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }
}
#server-page {
  .el-pager li {
    font-size: 12px;
    font-weight: 400;
    // color: #666;
    padding: 0 10px;
  }
  .btn-prev,
  .btn-next {
    padding: 0 16px;
    background-color: #cc0001;
    color: #fff;
  }
  .btn-prev:disabled,
  .btn-next:disabled {
    background: #f4f4f5;
    color: #c0c4cc;
  }
}
.start-time,
.end-time {
  &.el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100px;
    .el-input__inner {
      padding-left: 5px;
      padding-right: 5px;
      text-align: center;
    }
    .el-input__prefix,
    .el-input__suffix {
      display: none;
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
    top: 7px;
    right: 10px;
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



