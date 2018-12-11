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
                <div class="fl title-l">服务审核</div>
                <div class="fr"><el-input ref="Noinput" placeholder="输入任务名称" clearable v-model="taskName" class="server-name-input">
                    <el-button @click="search.taskName = taskName" slot="append" icon="el-icon-search"></el-button>
                </el-input></div>
            </div>
            <SearchBar v-if="navLabelGroup&&navLabelGroup.length" :configData="navLabelGroup" :search="search"></SearchBar>
            <div class="body">
                <el-table class="outTable"  v-loading="tableConfig.loading" id="server" :data="table" style="width: 100%" :span-method="arraySpanMethod"
                header-row-class-name="outHead" row-class-name='outTr'>
                    <el-table-column align="left"  prop="date" label="订单编号/标题" width="300">
                        <template slot-scope="props">
                            <el-table border :data="[props.row]" header-row-class-name="outHead" :header-cell-style="headerCellStyle" :span-method="miniSpanMethod" >
                                <el-table-column prop="taskName" :render-header="renderHead" :label="`${props.row.orderNo}`" width="300">
                                    <template slot-scope="props">
                                        <span v-html="props.row.taskName" class="blue-font title-s"></span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="orderType" label="">
                                    <template slot-scope="props">
                                        <span class="title-s">{{props.row.customerName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="amount" label="">
                                    <template slot-scope="props">
                                        <span class="title-s">￥ {{props.row.amount}}元</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="status" header-align="right" label="订单时间："  >
                                    <template slot-scope="props">
                                        <span class="title-s"  :class="{'price-color':props.row.status==0,'num-color':props.row.status==2}">{{props.row.statusTitle}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align="left" prop="createTime" :label="`${props.row.createTime.replace('T',' ').substr(0,19)}`" width="140">
                                    <template slot-scope="props">
                                        <div>
                                            <nuxt-link :to='`/admin/admin/serverAudit/detail.html?id=${props.row.id}`'><el-button>查看</el-button></nuxt-link>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table> 
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="发起人" width="150">
                    </el-table-column>
                    <el-table-column align="center" prop="price" label="价格" width="150">
                    </el-table-column>
                    <el-table-column align="center" label="状态" width="150">
                    </el-table-column>
                    <el-table-column  align="center" label="操作" width="">
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

import { getAllToCheckTaskList } from '~/ajax/getData'
import { TaskStatus } from '~/config/enumerate.js'
export default {
  data() {
    return {   
      taskName:'',
      navLabelGroup:[
        {
          name:'审核状态',
          prop:'status',
          list:TaskStatus
        }
          
      ], 
      tableConfig:{
        total:0,
        loading:false
      },
      search:{ 
        status:-1 ,
        taskName:'',
        page:1, 
        pageSize:5,
      },
      table: [
      ]
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
      let {status,list,total} = await getAllToCheckTaskList(params);
      this.tableConfig.loading = false;
      if(status == 1){
          this.table = list&&list.map(item=>{
              let statusTitle;
              TaskStatus.map(status=>{
                if(item.status == status.value){
                  statusTitle = status.label
                }
              })
              return Object.assign(item,{
                  statusTitle
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
    miniSpanMethod({ row, column, rowIndex, columnIndex }){
      // console.log({ row, column, rowIndex, columnIndex })
      // if(rowIndex ==0&&columnIndex==3){
      //   return {
      //     rowspan: 1,
      //     colspan: 1
      //   };
      // }
    },
    async handleCancelOrder(id){
      let {status,returnmessage} = await cancelOrder({id})
      if(status ==1){
        this.$message.success(returnmessage);
        this.init();
        this.search.orderNo = '';
        this.search.orderType = '-1';
        this.search.status = '-1';
      }else{
         this.$message.success(returnmessage);
      }
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
@import "~static/common/css.scss";
.server-name-input {
  .el-input__inner {
    height: 30px;
    line-height: 30px;
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
      // color: #666;
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
.screen-main.admin .el-loading-spinner .path{
  stroke: $admin-theme-color;
}
</style>



