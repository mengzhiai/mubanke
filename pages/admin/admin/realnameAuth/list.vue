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
                <div class="fl title-l">实名认证</div>
                <div class="fr"><el-input placeholder="输入用户编号" v-model="search.taskName" class="server-name-input">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input></div>
            </div>
            <SearchBar :configData="navLabelGroup" :search="search"></SearchBar>
            <div class="body">
                 
                <el-table class="outTable"  v-loading="tableConfig.loading" id="server" :data="table" style="width: 100%" :span-method="arraySpanMethod"
                header-row-class-name="outHead" row-class-name='outTr'>
                    <el-table-column align="left"  prop="date" label="用户编号/用户" width="200">
                        <template slot-scope="props">
                            <el-table align="center" border :data="[props.row]" header-row-class-name="outHead">
                                <el-table-column prop="taskName" :label="`用户编号：${props.row.userId}`" width="200">
                                    <template slot-scope="props">
                                        <span class="blue-font title-s">{{props.row.realName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="licenseNumber" label="" width="240"></el-table-column>
                                <el-table-column align="center" prop="identitySelectTitle" label="" width="100"></el-table-column>
                                <el-table-column align="center" prop="nameAuthenticationTypeTitle"  label=""></el-table-column>
                                <el-table-column align="center" prop="taskName"  :label="`认证时间：${props.row.createTime}`" width="220">
                                  <template slot-scope="props">
                                    <div>
                                        <nuxt-link :to="`/admin/admin/realnameAuth/detail.html?id=${props.row.id}`"><el-button >查看</el-button></nuxt-link>
                                        <el-button @click="handleCheckAuth(props.row.id,1)">通过</el-button>
                                        <el-button @click="handleCheckAuth(props.row.id,2)">驳回</el-button>
                                    </div>
                                </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="身份证号/营业执照号" width="240">
                        <template slot-scope="props">
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="price" label="类型">
                        <template slot-scope="props">
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="状态">
                        <template slot-scope="props">
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="操作" width="240">
                        <template slot-scope="props">
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
import SiteNav from "~/components/adminCommon/siteNav.vue"; //顶部登录
import HeaderWrap from "~/components/adminCommon/headerWrap.vue"; //顶部搜索
import MbkNav from "~/components/adminCommon/mbkNav.vue"; //顶部搜索
import MbkBreadcrumb from "~/components/adminCommon/mbkBreadcrumb.vue"; //面包屑
import LeftMenu from "~/components/adminCommon/leftMenu.vue"; //引入公共底部
import PageModel from "~/components/adminCommon/pageModel.vue"; //引入翻页组件
import SearchBar from "~/components/adminCommon/searchBar.vue"; //引入公共底部
import Footer from "~/components/adminCommon/footer.vue"; //引入公共底部

import {UserAuthenInfoIdentitySelect,UserAuthenInfoNameAuthenticationType} from '~/config/enumerate'
import { GetTasksByUserId,getAllToCheckUserInfo ,checkNameAuthentication} from '~/ajax/getData'
export default {
  data() {
    return { 
      navLabelGroup:[
          {
              name:'认证类型',
              prop:'type',
              list:UserAuthenInfoIdentitySelect
          },
          {
              name:'认证状态',
              prop:'NameAuthenStatus',
              list:UserAuthenInfoNameAuthenticationType
          },
      ],
      tableConfig:{
        total:0,
        loading:false
      },
      search:{
        taskName:'',
        type:-1,
        NameAuthenStatus:-1,
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
        
        this.$router.push({ path: this.$route.path, query: this.getPamas() })
        this.init();
      }
    }
  },
  methods:{
    async init(){
      let params = this.getPamas();  //参数
      this.tableConfig.loading = true;
      let {status,list,total} = await getAllToCheckUserInfo(params);
      this.tableConfig.loading = false;
      if(status == 1){
        this.table = list.map(item=>{
          let  identitySelectTitle = '',nameAuthenticationTypeTitle='';
          UserAuthenInfoIdentitySelect.map(Identity=>{
            if(Identity.value == item.identitySelect){
              identitySelectTitle = Identity.label
            }
          })
          UserAuthenInfoNameAuthenticationType.map(iType=>{
            if(iType.value == item.nameAuthenticationType){
              nameAuthenticationTypeTitle = iType.label
            }
          })
          return Object.assign(item,{
            identitySelectTitle,nameAuthenticationTypeTitle,
            createTime:item.createTime.replace('T',' ').substr(0,19)
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
    async handleCheckAuth(id,type){
      if(type ==1 ){
         this.$confirm(`<div style="margin:30px 0;">确定执行该操作吗？</div>`, '提示', {
           dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {status,returnmessage} = await checkNameAuthentication({id,nameAuthenticationType:type})
          if(status == 1){
            this.$message.success(returnmessage);
            this.init();
          }else{
            this.$message.error(returnmessage);
          }
        }).catch(() => {});
      }else{
         this.$prompt(`<div style="margin:30px 0 0;">确定执行该操作吗？</div>`, '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '请填写不通过原因'
        }).then(async ({ value }) => {
          let {status,returnmessage} = await checkNameAuthentication({id,nameAuthenticationType:type,reason:value})
          if(status == 1){
            this.$message.success(returnmessage);
            this.init();
          }else{
            this.$message.error(returnmessage);
          }
        }).catch(() => {});
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



