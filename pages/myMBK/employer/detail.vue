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
                <div class="fl title-l">任务详情</div>
            </div>
            <div class="navbar ">
                <div class="navlit clearable">
                    <span class="fl label">我发布的任务</span>
                    <ul class="fl">
                        <li ><span>APP设计|UI主界面设计</span></li>
                    </ul>
                </div>
                <div class="navlit clearable">
                    <span class="fl label">任务详情</span>
                    <ul class="fl">
                        <li ><span></span></li>
                    </ul>
                </div>
            </div>
            <div class="body">
                <div class="task-detail">
                    <div class="task-head clearable">
                        <div class="fl thumb"><img src="/img/mbk/header-logo.png" alt=""></div>
                        <div class="fl">
                            <div class="title">公司 | 火鹰科技-广东领先移动应用开发服务商</div>
                            <div class="info clearable">
                                <div class="fl">
                                    <span>保证：</span>
                                    <span class="tag">完成</span>
                                    <span class="tag">完成</span>
                                    <span class="tag">完成</span>
                                </div>
                                <div class="fl">
                                    <span>保证金：</span>
                                    <span class="price-color">￥7000</span>
                                </div>
                                <div class="fl clearable">
                                    <span class="fl">信用：</span>
                                    <el-rate class="fl" v-model="detail.rate" :colors="['#ED292B', '#ED292B', '#ED292B']">
                                    </el-rate>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="task-body">
 
                    </div> 
                    <div class="task-footer">

                    </div>
                </div>
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

import { GetTasksByUserId,GetAllServerList } from '~/ajax/getData'
export default {
  data() {
    return { 
      detail:{
          rate:5
      }
    };
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    PageModel,
    Footer
  },
  created(){
    // this.init()
  },
  watch:{
    'search': {
      deep: true,
      handler: function(n,o) {
        this.init()
        // router.push({ path: this.$route.path, query: this.getCondition() })
      }
    }
  },
  methods:{
    async init(){
      let params = this.getPamas();  //参数
      this.tableConfig.loading = true;
      let serverList = await GetAllServerList();
      let json = await GetTasksByUserId(params);
      this.tableConfig.loading = false;
      this.table = json.list.map(item=>{
        let  serviceTypeTitle = '',statusTitle = '';
        serverList.list.map(server=>{
          if(server.id==item.serviceTypeId){
            serviceTypeTitle = server.serviceTypeName
          }
        })
        this.statusList.map(state=>{
          if(state.value==item.status){
            statusTitle = state.label
          }
        })
        return Object.assign(item,{
          serviceTypeTitle,statusTitle
        })
      });
      this.tableConfig.total = json.total;
    },
    getPamas(){
      return Object.assign(this.search)
    },
    selectStatus(n){
      this.search.status = n;
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
    .task-head{
        border: 1px solid #f1f1f1;
        padding: 10px 20px 30px;
        .thumb{
            width:70px;
            height:70px;
            margin-right:15px;
            img{
                width:100%;
                height:100%;
                border: 1px solid #f1f1f1;
            }
        }
        .title{
            font-size:17px;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:30px;
            margin-top:5px;
        }
        .info{
            margin-top:8px;
            .tag{
                padding: 2px 5px;
                color: #fff;
                &:nth-of-type(odd){
                    background:#a6afb5;
                }
                 &:nth-of-type(even){
                    background:#ffb40e;
                }
            }
        }
    }
  }

  
}
</style>




