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
                <div class="fr"><el-input placeholder="输入服务名称搜索" v-model="serverName" class="server-name-input">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input></div> 
            </div>
            <div class="navbar "> 
                <div class="navlit clearable">
                    <span class="fl label">站点年限</span>
                    <ul class="fl">
                        <li v-for="(item,index) in years" @click="selectYear(item.value)" :key="index" :class="item.selected?'active':''"><span>{{item.label}}</span></li>
                    </ul>
                </div>
                <div class="navlit clearable">
                    <span class="fl label">站点状态</span>
                    <ul class="fl">
                      <li v-for="(item,index) in status" @click="selectStatus(item.value)" :key="index" :class="item.selected?'active':''"><span>{{item.label}}</span></li>
                    </ul>
                </div> 
            </div>
            <div class="body">
                <div id="server-opt">
                    <a href="http://www.jjzhy.cn/mbsc/"><el-button >开通新站点</el-button></a>
                </div>
                <el-table id="server" :data="table" style="width: 100%">
                    <el-table-column align="center" prop="date" label="网站名称" width="300">
                        <template slot-scope="props">
                            <div class="clearable"> 
                              <div class="category">{{props.row.stationName}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="date" label="默认域名" > 
                        <template slot-scope="props">
                            <div class="date">{{props.row.systemDomain}}</div> 
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
                    <el-table-column  align="center" label="操作" width="140">
                        <template slot-scope="props">
                            <div style="margin-bottom:5px;"> <el-button>修改</el-button> <el-button>域名</el-button></div>
                            <div> <el-button>后台</el-button> <el-button>管理</el-button></div>
                        </template>
                    </el-table-column>
                </el-table>
                <PageModel :total="tableConfig.total" :pageSize="tableConfig.pageSize" :config="tableConfig" ></PageModel>
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
import Footer from "~/components/common/footer.vue"; //引入公共底部
import PageModel from "~/components/common/pageModel.vue"; //引入公共底部
import { stationList } from '~/ajax/getData'
export default {
  data() {
    return { 
      serverName: "",
      table: [
      ],
      tableConfig:{
        page:1,
        pageSize:5,
        total:0
      },
      search:{
        stationName:'',
        years:0,
        status:-1,
      },
      years:[
        {
          label:'所有',
          value:0,
          selected:true
        },
        {
          label:'1年',
          value:1,
          selected:false
        },
        {
          label:'3年',
          value:3,
          selected:false
        },
        {
          label:'5年',
          value:5,
          selected:false
        }
      ],
      status:[
        {
          label:'所有',
          value:-1,
          selected:true
        },
        {
          label:'运行中',
          value:1,
          selected:false
        },
        {
          label:'已暂停',
          value:2,
          selected:false
        },
        {
          label:'已到期',
          value:3,
          selected:false
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
    Footer,
    PageModel
  },
  created(){
    this.init();
  },
  watch:{ 
    // 'tableConfig': {
    //   deep: true,
    //   handler: function(n,o) {
    //     this.init()
    //     // router.push({ path: this.$route.path, query: this.getCondition() })
    //     // _g.openGlobalLoading()
    //     // this.tableData()
    //   }
    // }
  },
  methods:{
    async init(){
      let params = this.getPamas();  //参数
      let json = await stationList(params);
      if(json.status == 1){
        this.table = json.list.map(item=>{
          var statusTitle = '';
          switch(item.status){
            case 0:
            statusTitle = '网站未开通';
            break;
            case 1:
            statusTitle = '网站已发布';
            break;
            case 2:
            statusTitle = '网站已暂停';
            break;
            case 3:
            statusTitle = '网站已到期';
            break;
            default:
            break;
          }
          return Object.assign(item,{
            statusTitle
          })
          
        })
        this.tableConfig.total = json.total;
      }
    },
    getPamas(){
      return Object.assign(this.search,{
        page:this.tableConfig.page,
        pageSize:this.tableConfig.pageSize
      })
    },
    selectYear(n){
      this.years.map(year=>{
        if(year.value == n){
          return Object.assign(year,{
            selected:true
          })
        }else{
          return Object.assign(year,{
            selected:false 
          })
        }
      })
      this.search.years = n;
      this.init();
    },
    selectStatus(n){
      this.status.map(state=>{
        if(state.value == n){
          return Object.assign(state,{
            selected:true 
          })
        }else{
          return Object.assign(state,{
            selected:false
          })
        }
      })
      this.search.status = n;
      this.init();
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


 
