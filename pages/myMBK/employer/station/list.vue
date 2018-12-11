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
                <div class="fl title-l">开通的站点</div>
                <div class="fr"><el-input placeholder="输入站点名称搜索" clearable v-model="stationName" class="server-name-input">
                    <el-button @click="search.stationName = stationName" slot="append" icon="el-icon-search"></el-button>
                </el-input></div> 
            </div>
            <SearchBar :configData="navLabelGroup" :search="search"></SearchBar>
            <div class="body">
                <div id="server-opt">
                    <a href="http://www.jjzhy.cn/mbsc/"><el-button >开通新站点</el-button></a>
                </div>
                <el-table id="server" :data="table" style="width: 100%" v-loading="tableConfig.loading">
                    <el-table-column align="center" prop="date" label="网站名称" width="100">
                        <template slot-scope="props">
                            <div class="clearable"> 
                              <div class="category">{{props.row.stationName}}</div>
                            </div>
                        </template>    
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="默认域名" > 
                        <template slot-scope="props">
                            <div class="date">{{props.row.systemDomain}}</div> 
                            <div class="date" v-if="props.row.systemDomain">admin.{{props.row.systemDomain}}</div> 
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="price" label="开通时限">
                        <template slot-scope="props">
                          <div v-if="props.row.status == 3">
                              <div class="time"><span class="price-color">网站到期,请续费</span></div>
                              <div class="time">{{props.row.serviceOverTime.substr(0,10)}}<span class="price-color">到期</span></div>
                          </div>
                          <div v-else>
                             <div class="time"><span class="price-color">起 </span>{{props.row.createTime.substr(0,10)}}</div>
                              <div class="time"><span class="price-color">止 </span>{{props.row.serviceOverTime.substr(0,10)}}</div>
                          </div>
                           
                        </template>
                    </el-table-column>
                    <el-table-column  align="center" label="状态">
                        <template slot-scope="props">
                            <div class="status" :class="{ 'num-color': props.row.status == 1, 'price-color': props.row.status == 3}">{{props.row.statusTitle}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="购买时间" align="center">
                        <template slot-scope="props">
                          <div class="time">{{props.row.createTime.replace('T',' ').substr(0,19)}}</div>
                        </template>
                    </el-table-column> 
                    <el-table-column  align="center" label="操作" width="160">
                        <template slot-scope="props">
                            <nuxt-link  v-if="props.row.status==1"  :to="`/myMBK/employer/station/edit.html?out_trade_no=${props.row.id}`"><el-button>完善站点</el-button></nuxt-link>
                            <nuxt-link v-else :to="`/myMBK/employer/station/detail.html?out_trade_no=${props.row.id}`"><el-button>查看</el-button></nuxt-link>
                            <el-button>关闭</el-button>
                        </template>
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
import LeftMenu from "~/components/common/leftMenu.vue"; //引入公共菜单
import SearchBar from "~/components/common/searchBar.vue"; //引入检索组件
import Footer from "~/components/common/footer.vue"; //引入公共底部
import PageModel from "~/components/common/pageModel.vue"; //引入公共底部
import { stationList } from '~/ajax/getData'
import {StationStatus} from '~/config/enumerate'
export default {
  data() {
    return { 
      stationName: "",
      table: [],
      tableConfig:{
        total:0,
        loading:false
      },
      search:{
        stationName:'',
        status:-1,
        page:1, 
        pageSize:5,
      },
      navLabelGroup:[
          {
              name:'站点状态',
              prop:'status',
              list:StationStatus
          },
      ],
    };
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    Footer,
    PageModel,
    SearchBar
  },
  created(){
    this.init();
  },
  watch:{ 
   'search': {
      deep: true,
      handler: function(n,o) {
        // this.$router.push({ path: this.$route.path, query: this.getPamas() })
        this.init();
      }
    },
    stationName(newV){
      if(newV==''){
        this.search.stationName = newV;
      } 
    }
  },
  methods:{
    async init(){
      let params = this.getPamas();  //参数
      this.tableConfig.loading = true;
      let json = await stationList(params);
      this.tableConfig.loading = false;
      if(json.status == 1){
        this.table = json.list.map(item=>{
          var statusTitle = '';
          StationStatus.map(oStatus=>{
            if(oStatus.value == item.status){
              statusTitle = oStatus.label
            }
          })
          return Object.assign(item,{
            statusTitle
          })
        })
        this.tableConfig.total = json.total;
      }
    },
    getPamas(){
      return Object.assign(this.search)
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
        color: #000;
      }
      .status {
        font-size: 12px;
        color: #666666;
        &.num-color{
          color: #009966;
        }
        &.price-color{
          color: #ED292B;
        }
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
      text-align:center;
      font-weight: 400;
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

</style> 


 
