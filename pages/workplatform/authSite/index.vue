<template>
    <div>承接站点</div>
</template>
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
                <div class="fl title-l">出售服务管理</div>
                <div class="fr"><el-input placeholder="输入服务名称搜索" v-model="serverName" class="server-name-input">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input></div>
            </div>
            <div class="navbar ">
                <div class="navlit clearable">
                    <span class="fl label">出售状态</span>
                    <ul class="fl">
                        <li class="active"><span>所有</span></li>
                        <li><span>未上架</span></li>
                        <li><span>已上架</span></li>
                        <li><span>已推荐</span></li>
                    </ul>
                </div>
                <div class="navlit clearable">
                    <span class="fl label">出售状态</span>
                    <ul class="fl">
                        <li class="active"><span>所有</span></li>
                        <li><span>近一周</span></li>
                        <li><span>近一个月</span></li>
                        <li><span>近三个月</span></li>
                        <li><span>近半年</span></li>
                        <li style="padding: 0px 10px">
                            <el-date-picker align="center" class="start-time" v-model="start" type="date" size="small" prefix-icon=""></el-date-picker> -
                            <el-date-picker align="center" class="end-time" v-model="end"  type="date" size="small"></el-date-picker>
                        </li>   
                    </ul>
                </div>
            </div>
            <div class="body">
                <div id="server-opt">
                    <el-button >查看商家服务</el-button>
                    <el-button >查看推荐服务</el-button>
                    <a href="/shop/newServer"><el-button >添加新的服务</el-button></a>
                </div>
                <el-table id="server" :data="serverTable" style="width: 100%">
                    <el-table-column  prop="date" label="配图/标题/分类" width="340">
                        <template slot-scope="props">
                            <div class="clearable"> 
                                <img class="fl photo" :src="props.row.photo" alt="">
                                <div class="fl">
                                    <div class="title price-color">{{props.row.title}}</div>
                                    <div class="category">{{props.row.category}}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="最后编辑时间" >
                        <template slot-scope="props">
                            <div class="date">{{props.row.date.substr(0,10)}}</div>
                            <div class="time">{{props.row.date.substr(10)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="price" label="服务定价">
                        <template slot-scope="props">
                            <div class="price">{{props.row.price}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="排序">
                        <template slot-scope="props">
                            <div class="sort">{{props.row.sort}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="出售状态">
                        <template slot-scope="props">
                            <div class="status">{{props.row.status}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="操作" width="140">
                        <template slot-scope="props">
                            <div style="margin-bottom:5px;"> <el-button>下架</el-button> <el-button>推荐</el-button></div>
                            <div> <el-button>编辑</el-button> <el-button>删除</el-button></div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination id="server-page" class="" background prev-text="上一页" next-text="下一页" layout="prev, pager, next" :total="1000">
                </el-pagination>
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
import Footer from "~/components/common/footer.vue"; //引入公共底部
export default {
  data() {
    return { 
      serverName: "",
      start: "", 
      end: "",
      serverTable: [
        {
          photo: "/img/mbk/p1.png",
          title: "APP设计|UI主界面设计",
          category: "产品/UI设计 — 移动应用UI设计",
          date: "2018-10-16 09:50:21",
          price: "￥252.00/年",
          sort: "1",
          status: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          photo: "/img/mbk/p1.png",
          title: "APP设计|UI主界面设计",
          category: "产品/UI设计 — 移动应用UI设计",
          date: "2016-05-04",
          price: "￥252.00/年",
          sort: "1",
          status: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          photo: "/img/mbk/p1.png",
          title: "APP设计|UI主界面设计",
          category: "产品/UI设计 — 移动应用UI设计",
          date: "2016-05-01",
          price: "￥252.00/年",
          sort: "1",
          status: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          photo: "/img/mbk/p1.png",
          title: "APP设计|UI主界面设计",
          category: "产品/UI设计 — 移动应用UI设计",
          date: "2016-05-03",
          price: "￥252.00/年",
          sort: "1",
          status: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    Footer
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
      margin: 10px 0;
      .label {
        font-weight: bold;
        line-height: 25px;
        padding: 5px 10px;
      }
      li {
        float: left;
        padding: 5px 10px;
        margin: 0 5px;
        cursor: pointer;
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
        color: #666666;
      }
      .price {
        font-size: 12px;
        color: #666666;
        font-weight: bold;
      }
      .sort {
        border: 1px solid #ddd;
        font-size: 12px;
        color: #666666;
        display: inline;
        padding: 15px;
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



