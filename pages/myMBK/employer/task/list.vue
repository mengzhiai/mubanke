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
                <div class="fl title-l">我发布的任务</div>
                <div class="fr"><el-input placeholder="输入任务标题" clearable v-model="taskName" class="server-name-input">
                    <el-button @click="search.taskName = taskName" slot="append" icon="el-icon-search"></el-button>
                </el-input></div>
            </div>
            <SearchBar :configData="navLabelGroup" :search="search"></SearchBar>
            <div class="body">
                <div id="server-opt">
                    <a href="/myMBK/employer/task/add.html"><el-button >发布新任务</el-button></a>
                </div>
                <el-table v-loading="tableConfig.loading" id="server" :data="table" style="width: 100%">
                    <el-table-column  prop="date" label="任务标题" width="250">
                        <template slot-scope="props">
                            <div class="clearable"> 
                                <div class="title price-color">{{props.row.taskName}}</div>
                                <div class="category">{{props.row.serviceTypeTitle}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="投稿数" >
                        <template slot-scope="props">
                            <a :href="`/myMBK/employer/task/bidList.html?taskId=${props.row.id}`" class="time price-color">{{props.row.submissionCount?props.row.submissionCount:0}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="price" label="任务金额">
                        <template slot-scope="props">
                            <div class="price">￥{{props.row.amount}}元</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="任务状态">
                        <template slot-scope="props">
                            <div class="status">{{props.row.statusTitle}}</div> 
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="操作" width="180">
                        <template slot-scope="props">
                           <nuxt-link :to="`/myMBK/employer/task/detail.html?id=${props.row.id}`"><el-button>查看</el-button></nuxt-link>
                                <!-- <nuxt-link :to="`/myMBK/employer/task/edit.html?id=${props.row.id}`"><el-button>编辑</el-button></nuxt-link> -->
                                <el-button v-if="props.row.status == 0"  @click="closeTask(props.row.id)">关闭</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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

import { GetTasksByUserId,GetAllServerList,revokeTask } from '~/ajax/getData'

import {TaskStatus} from '~/config/enumerate'
export default {
  data() {
    return { 
      taskName:'',
      navLabelGroup:[
        {
          name:'订单类型',
          prop:'status',
          list:TaskStatus
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
      table: [
      ]
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
      let serverList = await GetAllServerList();
      let {status,list,total} = await GetTasksByUserId(params);
      this.tableConfig.loading = false;
      if(status == 1){
        this.table = list && list.map(item=>{
          let  serviceTypeTitle = '',statusTitle = '';
          serverList.list.map(server=>{
            if(server.id==item.serviceTypeId){
              serviceTypeTitle = server.serviceTypeName
            }
          })
          TaskStatus.map(state=>{
            if(state.value==item.status){
              statusTitle = state.label
            }
          })
          return Object.assign(item,{
            serviceTypeTitle,statusTitle 
          })
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
    selectStatus(n){
      this.search.status = n;
    },
    //关闭订单
    closeTask(id){
      this.$confirm(`<div style="margin:30px 0;">确定执行该操作吗？</div>`, '提示', {
        dangerouslyUseHTMLString: true,
        type:'warning',
        confirmButtonText: '确定',
        callback: async action => {
            if(action=='confirm'){
              let {status,returnmessage} = await revokeTask({id});
              if(status == 1){
                this.$message.success(returnmessage)
                this.init()
              }else{
                this.$message.error(returnmessage)
              }
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
</style>



