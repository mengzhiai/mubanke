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
                <div class="fl title-l">会员管理</div>
                <!-- <div class="fr"><el-input ref="Noinput" placeholder="输入会员编号" clearable v-model="userId" class="server-name-input">
                    <el-button @click="search.userId = userId" slot="append" icon="el-icon-search"></el-button>
                </el-input></div> -->
            </div>
            <SearchBar :configData="navLabelGroup" :search="search"></SearchBar>
            <div class="body">
                <el-table class="outTable" row-key="id" :row-class-name="setClassName" v-loading="tableConfig.loading" id="server" :data="table" style="width: 100%" :span-method="arraySpanMethod"
                header-row-class-name="outHead" >
                    <el-table-column align="center"  prop="date" label="会员类型/用户名" width="260">
                        <template slot-scope="props">
                            <el-table  border :data="[props.row]" header-row-class-name="outHead" :header-cell-style="headerCellStyle"  >
                                <el-table-column prop="taskName" :render-header="renderHead" :label="`${props.row.userId}`" width="260" align="left">
                                    <template slot-scope="props">
                                        <span class="blue-font title-s">{{props.row.userName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="nickName" label="">
                                </el-table-column>
                                <el-table-column align="center" prop="mobile" label="">
                                  <template slot-scope="props">
                                        <span>{{props.row.mobile?`${props.row.mobile.substr(0,3)}****${props.row.mobile.substr(7,11)}`:props.row.mobile}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center"  header-align="right" label="开通时间："  >
                                    <template slot-scope="props">
                                        <span class="title-s price-color" >{{props.row.province}}</span>
                                    </template>
                                </el-table-column> 
                                <el-table-column align="center" header-align="left" prop="createTime" :label="`${props.row.createTime.replace('T',' ').substr(0,19)}`" width="140">
                                    <template slot-scope="props">
                                        <div>
                                            <el-button v-if="props.row.status==0"   @click="toggleEnable(props.row.userId,1)">启用</el-button>
                                            <el-button v-else @click="toggleEnable(props.row.userId,0)">禁用</el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table> 
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="昵称/企业昵称">
                    </el-table-column>
                    <el-table-column align="center" prop="price" label="电话">
                    </el-table-column>
                    <el-table-column align="center" label="所在地">
                    </el-table-column>
                    <el-table-column  align="center" label="操作">
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
import LeftMenu from "~/components/adminCommon/leftMenu.vue"; //引入侧边栏导航
import PageModel from "~/components/adminCommon/pageModel.vue"; //引入翻页组件
import SearchBar from "~/components/adminCommon/searchBar.vue"; //引入检索组件
import Footer from "~/components/adminCommon/footer.vue"; //引入公共底部

import { getAllUser,operateUser } from '~/ajax/getData'
import { UserIsService,UserStatus } from '~/config/enumerate'  //查询条件
export default {
  data() {
    return { 
      userId:'',
      navLabelGroup:[
          {
            name: '是否是服务商',
            prop:'isService',
            list: UserIsService
          },
          {
            name: '会员状态',
            prop:'status',
            list: UserStatus
          }
          
      ],
      tableConfig:{
        total:0,
        loading:false
      },
      search:{
        userId:'',
        status:-1,
        isService:-1,
        page:1, 
        pageSize:5,
      },
      table: [
      ],
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
    userId(newV){
      if(newV==''){
        this.search.userId = newV;
      } 
    }
  },
  methods:{
    async init(){
      let params = this.getPamas();  //参数
      this.tableConfig.loading = true;
      let {status,list,total} = await getAllUser(params);
      this.tableConfig.loading = false;
      if(status == 1){
          this.table = list.map(item=>{
              return item
          });
          this.tableConfig.total = total;
      }
    },
    toggleEnable(userId,v){
      this.$confirm(`<div style="margin:30px 0;">确定要执行此操作吗？</div>`, '提示', {
           dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {status,returnmessage} = await operateUser({
            userId,status:v
          });
          if(status == 1){
            this.$message.success(returnmessage)
            this.init()
          }else{
            this.$message.error(returnmessage)
          }
        }).catch(() => {});
      
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
          h('span','会员编号/用户名:'),
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
        return 'outTr';
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

</style>



