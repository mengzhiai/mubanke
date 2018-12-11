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
            <div class="title-l">我的站内信</div>
            <!-- <div class="fr"><el-input placeholder="输入任务标题" clearable v-model="taskName" class="server-name-input">
                    <el-button @click="search.taskName = taskName" slot="append" icon="el-icon-search"></el-button>
            </el-input></div>-->
            <SearchBar :configData="navLabelGroup" :search="search"></SearchBar>
            <div class="message-list">
              <div class="state clearfix">
                <div class="item check check fl">
                  <template>
                    <el-checkbox v-model="checked"></el-checkbox>
                  </template>
                </div>
                <div class="item read red-btn">标记为已读</div>
                <div class="item delete">删除所选</div>
                <div class="item empty-all">清空所有</div>
              </div>
            </div>
          </div>
          <div class="body">
            <div class="wrap">
              <div class="title">置顶</div>
              <div class="wrap-content">
                <template>
                  <el-table ref="table1" :data="tables" :show-header="false" @row-click="handlRowClick">
                    <el-table-column prop="date" type="expand">
                      <template slot-scope="props">
                        <span>{{ props.row.txt }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="txt" width="600">
                      <template slot-scope="props">
                        <i :class="{'ico': icoA, 'icos': icoB}"></i>
                        <span style="margin-left: 10px">{{ props.row.txt }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="date">
                      <template slot-scope="props">
                        <span>{{ props.row.date }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </div>
            <div class="read-more">
              <el-button type="button">查看更早记录</el-button>
            </div>
            <div class="message-list">
              <div class="state clearfix">
                <div class="item check fl">
                  <template>
                    <el-checkbox></el-checkbox>
                  </template>
                </div>
                <div class="item read">标记为已读</div>
                <div class="item delete">删除所选</div>
                <div class="item empty-all">清空所有</div>
              </div>
            </div>
            <PageModel
              :total="tableConfig.total"
              :pageSize="search.pageSize"
              :config="tableConfig"
              :search="search"
            ></PageModel>
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

import {
  GetTasksByUserId,
  GetAllServerList,
  revokeTask,
  getBidInfoListByUser
} from "~/ajax/getData";

import { TaskStatus } from "~/config/enumerate";
export default {
  data() {
    return {
      taskName: "",
      navLabelGroup: [
        {
          // name: "订单类型",
          prop: "status",
          list: TaskStatus
        }
      ],
      tableConfig: {
        total: 0,
        loading: false
      },
      search: {
        taskName: "",
        status: -1,
        page: 1,
        pageSize: 5
      },
      icoA: '',
      icoB: true,
      tables: [
        {
          txt: '开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦',
          date: '2018-11-11 11:11:11',
        },
        {
          txt: '开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦',
          date: '2018-11-11 11:11:11'
        },
        {
          txt: '开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦',
          date: '2018-11-11 11:11:11'
        },
        {
          txt: '开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦',
          date: '2018-11-11 11:11:11',
          
        },
        {
          txt: '开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦开奖啦',
          date: '2018-11-11 11:11:11'
        }
      ],
      checked: '',
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
  created() {
    // this.init();
  },
  watch: {

  },
  methods: {
    handlRowClick(row, event, column){
      console.log(row, event, column);
      
      console.log(this.$refs);
      this.$refs.table1.toggleRowExpansion(row)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~static/common/css.scss";
.red-btn {
  color: #fff;
  background-color: #ef4747;
}
.screen-main {
  background: $white-color;
  .top {
    padding: 0 15px 0 20px;
    border-bottom: 1px solid #ddd;
    .title-l {
      margin: 20px 0 0;
    }
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
        // color:#009966;
        font-size: 12px;
      }
    }
  }
}
.message-list {
  .option {
    margin: 15px 0;
  }
  li {
    float: left;
    padding: 0 15px;
    line-height: 30px;
    border-radius: 4px;
    margin-right: 5px;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #ef4747;
      span{
        color: #fff;
      }
    }
    .num {
      color: cornflowerblue;
    }
  }
  .red-btn{
      background-color: #ef4747; 
    }
  .active {
    color: #fff;
    background-color: #cc0001;
  }
  .state {
    margin: 20px 0;
    background-color: #f4f4f4;
    padding: 5px 0;
    .item {
      float: left;
      padding: 0 15px;
      line-height: 30px;
      border-radius: 4px;
      border: 1px solid #ddd;
      margin: 0 10px;
      // background-color: #fff;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        color: #fff;
        background-color: #ef4747;
      }
      &:nth-child(1) {
        background-color: none;
      }
    }
    .check {
      border: none;
      padding: 0;
      background-color: #f4f4f4;
      &:hover{
        background-color: #f4f4f4;
      }
    }
  }
}
.wrap {
  .title {
    font-size: 18px;
    padding: 0 10px;
    line-height: 40px;
    border-bottom: 3px solid #ddd;
  }
  .wrap-content {
    line-height: 50px;
      border-bottom: 1px solid #ddd;
      position: relative;
      .el-table__header-wrapper, .el-table__footer-wrapper{
        display: none!important;
      }
      .ico {
        position: absolute;
        left: -10px;
        top: 7px;
        background: url("/img/mbk/ico_main.png") no-repeat;
        background-position: -100px -320px;
        width: 30px;
        height: 24px;
        overflow: hidden;
        display: block;
      }
      .icos{
        position: absolute;
        left: -15px;
        top: 17px;
        background: url("/img/mbk/ico_main.png") no-repeat;
        background-position: -100px -429px;
        width: 30px;
        height: 14px;
        overflow: hidden;
        display: block;
      }
      .right {
        padding-right: 100px;
      }
    .item-lists{
      span{
        font-weight: 700;
      }
    }
  }
}
.read-more {
  text-align: center;
  margin: 15px 0;
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



