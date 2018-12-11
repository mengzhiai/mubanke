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
                <div class="fl title-l">提现审核</div>
            </div>
            <SearchBar :configData="navLabelGroup" :search="search"></SearchBar>
            <div class="body">
                
                <el-table class="outTable"  v-loading="tableConfig.loading" id="server" :data="table" style="width: 100%" :span-method="arraySpanMethod"
                header-row-class-name="outHead" row-class-name='outTr'>
                    <el-table-column align="center"  prop="date" label="用户编号/发起人" width="180">
                        <template slot-scope="props">
                            <el-table   border :data="[props.row]" header-row-class-name="outHead">
                                <el-table-column prop="taskName" :label="`用户编号：${props.row.createUser}`" width="180">
                                    <template slot-scope="props">
                                        <span class="blue-font">{{props.row.createUser}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="createUser" label=""></el-table-column>
                                <el-table-column align="center" prop="amount" label="">
                                  <template slot-scope="props">
                                        <span>￥ {{props.row.amount.toFixed(2)}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="tradeStateTitle" label="">
                                  <template slot-scope="props">
                                        <span :class="props.row.tradeState==0?'price-color':'num-color'">{{props.row.tradeStateTitle}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="procesTime" label="">
                                  <template slot-scope="props">
                                        <div class="">{{props.row.procesTime.substr(0,10)}}</div>
                                        <div class="">{{props.row.procesTime.substr(11,8)}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center"  width="220" prop="taskName" :label="`开通时间：${props.row.createTime.replace('T',' ').substr(0,19)}`">
                                  <template slot-scope="props">
                                        <el-button>查看</el-button>
                                        <el-button @click="commit">审核</el-button>
                                        <el-button>删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="账户" >
                    </el-table-column>
                    <el-table-column align="center" prop="price" label="金额">
                    </el-table-column>
                    <el-table-column align="center" label="状态">
                    </el-table-column>
                    <el-table-column align="center" label="到账时间">
                    </el-table-column>
                    <el-table-column  align="center" label="操作" width="220">
                    </el-table-column>
                </el-table>
                
                 <PageModel :total="tableConfig.total" :pageSize="search.pageSize" :config="tableConfig" :search="search"></PageModel>
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
import LeftMenu from "~/components/adminCommon/leftMenu.vue"; //引入公共底部
import PageModel from "~/components/adminCommon/pageModel.vue"; //引入翻页组件
import SearchBar from "~/components/adminCommon/searchBar.vue"; //引入公共底部
import Footer from "~/components/adminCommon/footer.vue"; //引入公共底部

import { getAllToCheckCash } from '~/ajax/getData'
import { CostTradeState } from "~/config/enumerate"; //查询条件
export default {
  head: {
    bodyAttrs: {
      class: 'admin-page'
    }
  },
  data() {
    return { 
      navLabelGroup:[
          {
              name:'提现状态',
              prop:'tradeState',
              list:CostTradeState
          },
      ],
      tableConfig:{
        total:0,
        loading:false
      },
      search:{
        tradeState:'-1',
        page:1,
        pageSize:5,
      },
      table: []
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
    SearchBar,
    PageModel,
    Footer
  },
  created(){
    this.init();
  },
  watch:{
    'search': {
      deep: true,
      handler: function(n,o) {  
        this.$router.push({ path: this.$route.path, query: this.getPamas() })
        this.init();
      }
    }
  },
  methods:{
    async init(){
      let params = this.getPamas();  //参数
      this.tableConfig.loading = true;
      let {status,list,total} = await getAllToCheckCash(params);
      this.tableConfig.loading = false;
      if (status == 1) {
        this.table = list.map(item=>{
          let tradeStateTitle;
          CostTradeState.map(cost=>{
            if(cost.value == item.tradeState){
              tradeStateTitle = cost.label
            }
          })
          return Object.assign(item,{tradeStateTitle})
        });
        this.tableConfig.total = total;
      }
    },
    getPamas(){
      return Object.assign(this.search)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      return {
        rowspan: 1,
        colspan: 6
      };
    },
    commit(id){

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

.outTable{
  .cell{
      text-align: center;
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

</style>



