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
                <div class="fl title-l">任务投稿</div>
                <div class="fr"><el-input ref="Noinput" placeholder="输入投稿企业名称" clearable  class="server-name-input">
                    <el-button @click="search.orderNo = orderNo" slot="append" icon="el-icon-search"></el-button>
                </el-input></div>
            </div>
            <!-- <SearchBar :configData="navLabelGroup" :search="search"></SearchBar> -->
            <div class="body">
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
                    <el-table-column  align="center" label="操作" width="160">
                        <template slot-scope="props">
                            <div style="margin-bottom:5px;">
                            <a :href="`/myMBK/employer/task/bidDetail.html?uId=${props.row.id}`"><el-button>查看</el-button></a>
                              <el-button v-if="props.row.status === 0" @click="handleWinBid(props.row.id,props.row.bidUserId)">中标</el-button>
                               <el-button v-if="props.row.status === 2" @click="getContract(props.row.taskId)">约请合作</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <PageModel :total="tableConfig.total" :pageSize="search.pageSize" :config="tableConfig" :search="search"></PageModel>
            </div>
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

import { getBiddingListByTaskId,winBid ,getContractDtoById,signContract} from '~/ajax/getData'
import { BiddingStatus } from '~/config/enumerate'  //查询条件
export default {
  data() {
    return { 
      navLabelGroup:[
          {
              name:'竞标状态',
              prop:'status',
              list:BiddingStatus
          },
      ],
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
    SearchBar,
    PageModel,
    Footer
  },
  created(){
      this.search.taskId = this.$route.query.taskId
  },
  watch:{
    'search': {
      deep: true,
      handler: function(n,o) {
        // this.$router.push({ path: this.$route.path, query: this.getPamas() })
        this.init();
      }
    },
    orderNo(newV){
      if(newV==''){
        this.search.orderNo = newV;
      } 
    }
  },
  methods:{
    async init(){
      let params = this.getPamas();  //参数
      this.tableConfig.loading = true;
      let {status,list,total} = await getBiddingListByTaskId(params);
      this.tableConfig.loading = false;
      if(status == 1){
          this.table = list.map(item=>{
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
      .col{
          color: #f00;
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
          color:#009966;
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
.expand .el-table__expand-column .cell {
    display: none;
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
  .outHead{
      th{
          font-weight:normal;
          font-size:12px;
      }
  }
  .outTr{
      &:hover{
        &>td{
            background-color:#fff;
        }
      }
      &>td{
          border:none;
          font-size:12px;
          &>.cell{
              padding: 0;
          }
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



