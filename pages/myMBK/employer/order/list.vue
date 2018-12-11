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
                <div class="fl title-l">我的订单</div>
                <div class="fr"><el-input ref="Noinput" placeholder="输入订单编号" clearable v-model="orderNo" class="server-name-input">
                    <el-button @click="search.orderNo = orderNo" slot="append" icon="el-icon-search"></el-button>
                </el-input></div>
            </div>
            <SearchBar :configData="navLabelGroup" :search="search"></SearchBar>
            <div class="body">
                <el-table class="outTable" row-key="id" :row-class-name="setClassName" v-loading="tableConfig.loading" id="server" :data="table" style="width: 100%" :span-method="arraySpanMethod"
                header-row-class-name="outHead" >
                    
                    <el-table-column align="center"  prop="date" label="订单编号/标题" width="300">
                        <template slot-scope="props">
                            <el-table  border :data="[props.row]" header-row-class-name="outHead" :header-cell-style="headerCellStyle"  >
                                <el-table-column type="expand" >
                                  <el-table empty-text="暂无子订单" size="mini" border :data="props.row.orderList">
                                    <el-table-column align="center" prop="amount" label="金额">
                                      <template slot-scope="props">
                                          <span class="title-s">￥ {{props.row.amount}}元</span>
                                      </template>
                                    </el-table-column>
                                    <el-table-column align="center" prop="status"  label="状态"  >
                                        <template slot-scope="props">
                                            <span class="title-s"  :class="{'price-color':props.row.status==0,'num-color':props.row.status==2}">{{props.row.status==0?'未支付':'已支付'}}</span>
                                        </template>
                                    </el-table-column>
                                  </el-table>
                                </el-table-column>
                                <el-table-column prop="taskName" :render-header="renderHead" :label="`${props.row.orderNo}`" width="250">
                                    <template slot-scope="props">
                                        <span class="blue-font title-s">{{props.row.orderName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="orderType" label="" width="140">
                                    <template slot-scope="props">
                                        <span class="title-s">{{props.row.orderTypeTitle}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="amount" label="" width="140">
                                    <template slot-scope="props">
                                        <span class="title-s">￥ {{props.row.amount}}元</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="status" header-align="right" label="订单时间："  >
                                    <template slot-scope="props">
                                        <span class="title-s"  :class="{'price-color':props.row.status==0||props.row.status==2,'num-color':props.row.status==3}">{{props.row.statusTitle}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align="left" prop="createTime" :label="`${props.row.createTime.replace('T',' ').substr(0,19)}`" width="140">
                                    <template slot-scope="props">
                                        <div>
                                            <nuxt-link :to='`/myMBK/employer/order/detail.html?orderNo=${props.row.orderNo}`'><el-button>查看</el-button></nuxt-link>
                                            <el-button v-if="props.row.status==0" @click="handleCancelOrder(props.row.id)">取消</el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table> 
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="订单类型" width="140">
                    </el-table-column>
                    <el-table-column align="center" prop="price" label="订单金额" width="140">
                    </el-table-column>
                    <el-table-column align="center" label="订单状态" >
                    </el-table-column>
                    <el-table-column  align="center" label="编辑" width="140">
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
import SiteNav from "~/components/common/siteNav.vue"; //顶部登录
import HeaderWrap from "~/components/common/headerWrap.vue"; //顶部搜索
import MbkNav from "~/components/common/mbkNav.vue"; //顶部搜索
import MbkBreadcrumb from "~/components/common/mbkBreadcrumb.vue"; //面包屑
import LeftMenu from "~/components/common/leftMenu.vue"; //引入公共底部
import PageModel from "~/components/common/pageModel.vue"; //引入翻页组件
import SearchBar from "~/components/common/searchBar.vue"; //引入检索组件
import Footer from "~/components/common/footer.vue"; //引入公共底部

import { getOrderList,cancelOrder } from '~/ajax/getData'
import { OrderOrderType,OrderStatus } from '~/config/enumerate'  //查询条件
export default {
  data() {
    return { 
      orderNo:'',
      navLabelGroup:[
          {
              name:'订单类型',
              prop:'orderType',
              list:OrderOrderType
          },
          {
              name:'订单状态',
              prop:'status',
              list:OrderStatus
          },
      ],
      tableConfig:{
        total:0,
        loading:false
      },
      search:{
        orderNo:'',
        orderType:'-1',
        status:'-1',
        page:1, 
        pageSize:5,
      },
      table: [
      ],
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
    this.init()
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
      let {status,list,total} = await getOrderList(params);
      this.tableConfig.loading = false;
      if(status == 1){
          this.table = list.map(item=>{
              let orderTypeTitle,statusTitle;
              OrderOrderType.map(oType=>{
                if(oType.value == item.orderType){
                  orderTypeTitle = oType.label;
                }
              })
              OrderStatus.map(oStatus =>{
                if(oStatus.value == item.status){
                  statusTitle = oStatus.label;
                }
              })
              return Object.assign(item,{
                  orderTypeTitle,statusTitle
              })
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
        colspan: 5
      };
    },
    renderHead(h, { column, $index }){
        return h('span',[
          h('span','订单编号：'),
          h('span',{
            'class': {
                'blue-font': true,
            },
          },column.label)
        ])
         
    },
    headerCellStyle({row, column, rowIndex, columnIndex}){
      if(columnIndex==0||columnIndex==1||columnIndex==2||columnIndex==3){
         return {'border-right':'none' }
      }
      if(rowIndex ==0&&columnIndex==3){
        return {
        rowspan: 1,
        colspan: 2
      };
      }
    },
    handleCancelOrder(id){
      this.$confirm(`<div style="margin:30px 0;">确定取消该订单吗？</div>`, '提示', {
        dangerouslyUseHTMLString: true,
        type:'warning',
        confirmButtonText: '确定',
        callback: action => {
            if(action=='confirm'){
                cancelOrder({id}).then(res=>{
                  if(res.status ==1){
                    this.$message.success(res.returnmessage);
                    this.init();
                    this.search.orderNo = '';
                    this.search.orderType = '-1';
                    this.search.status = '-1';
                  }else{
                    this.$message.success(returnmessage);
                  }
                })
            }
        }
      });
    },
    setClassName({row, index}){
        return !row.orderList.length ? 'expand outTr' : 'outTr';
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
</style>



