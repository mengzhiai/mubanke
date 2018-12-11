<template>
  <transition name="index">
    <div>
      <SiteNav></SiteNav>
      <HeaderWrap></HeaderWrap>
      <MbkNav></MbkNav>
      <MbkBreadcrumb></MbkBreadcrumb>
      <div class="screen-center clearable">
        <LeftMenu></LeftMenu>
        <div class="screen-main">
          <div class="top clearable">
            <div class="fl title-l">操作记录</div>
          </div>
          <div class="body">
            <el-table class="outTable"   v-loading="tableConfig.loading" id="server"  style="width: 100%"  :data="table">
              <el-table-column align="center" label="操作ID" prop="syslogId" width="140">
                <template slot-scope="props">
                  {{props.row.syslogId}}
                </template>
              </el-table-column>
              <el-table-column prop="operatorUser" label="操作人" align="center" width="140">
              </el-table-column>
              <el-table-column prop="operatorTypeTitle" label="行为" align="center" width="140">
                 <template slot-scope="props">
                   <div class="blue-font">{{props.row.operatorTypeTitle}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="logCon" label="描述" align="left">
              </el-table-column>
              <el-table-column label="操作时间" prop="logTime" align="center" width="180">
                <template slot-scope="props">
                   <div>{{props.row.logTime.substr(0,10)}}  {{props.row.logTime.substr(11,8)}}</div>
                   <!-- <div>{{props.row.logTime.substr(11,8)}}</div> -->
                </template>
              </el-table-column>
            </el-table>
            <PageModel
              :total="tableConfig.total"
              :pageSize="search.pageSize"
              :config="tableConfig"
              :search="search"
            ></PageModel>
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
import SearchBar from "~/components/adminCommon/searchBar.vue"; //引入检索组件
import Footer from "~/components/adminCommon/footer.vue"; //引入公共底部

import { getLogList } from "~/ajax/getData";
import { SystemLogOperatorType } from "~/config/enumerate"; //查询条件
export default {
  data() {
    return {
      tableConfig: {
        total: 0,
        loading: false
      },
      search: {
        logintype: 2,  //0:管理员 1：用户  2：全部
        page: 1,
        pageSize: 5
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
  created() {
    this.init();
  },
  watch: {
    search: {
      deep: true,
      handler: function(n, o) {
        // this.$router.push({ path: this.$route.path, query: this.getPamas() })
        this.init();
      }
    },
  },
  methods: {
    async init() {
      let params = this.getPamas(); //参数
      this.tableConfig.loading = true;
      let { status, list, total } = await getLogList(params);
      this.tableConfig.loading = false;
      if (status == 1) {
        this.table = list.map(item=>{
          let operatorTypeTitle;
          SystemLogOperatorType.map(sys=>{
            if(sys.value == item.operatorType){
              operatorTypeTitle = sys.label
            }
          })
          return Object.assign(item,{operatorTypeTitle})
        });
        this.tableConfig.total = total;
      }
    },
    getPamas() {
      return Object.assign(this.search);
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
        &:hover {
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
      .status {
        color: #009966;
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
  .outHead {
    th {
      font-weight: normal;
      font-size: 12px;
    }
  }
  .outTr {
    &:hover {
      & > td {
        background-color: #fff;
      }
    }
    & > td {
      border: none;
      font-size: 12px;
      & > .cell {
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
</style>



