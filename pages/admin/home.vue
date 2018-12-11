
<template>
  <transition name='index'>
    <div class="admin-home">
      <SiteNav></SiteNav>
      <HeaderWrap></HeaderWrap>
      <MbkNav></MbkNav>
      <MbkBreadcrumb></MbkBreadcrumb>
      <div class="screen-center clearable">
        <LeftMenu></LeftMenu>
        <div class="screen-main">
          <div class="mbk-diamonds clearable">
            管理员待办事项
          </div>
          
        </div>
      </div>
      <Footer></Footer>
    </div>
  </transition> 
</template>
<script>
import { mapState, mapMutations } from "vuex";
import axios from "~/plugins/axios";
import SiteNav from "~/components/adminCommon/siteNav.vue";   //顶部登录
import HeaderWrap from "~/components/adminCommon/headerWrap.vue";   //顶部搜索
import MbkNav from "~/components/adminCommon/mbkNav.vue";   //顶部搜索
import MbkBreadcrumb from "~/components/adminCommon/mbkBreadcrumb.vue";   //顶部搜索
import LeftMenu from "~/components/adminCommon/leftMenu.vue"; //引入菜单
import Footer from "~/components/adminCommon/footer.vue";   //引入公共底部
import {baseUrl} from '~/config/async/env'
import {getMyTaskListByPage,getMyFollowedTaskListByPage,getMyFollowedUserListByPage,} from '~/ajax/getData'
export default {
  data(){
    return {
      baseUrl
    }
  },
  head: {
    bodyAttrs: {
      class: 'admin-page'
    }
  },
  computed: {
    ...mapState(["accountInfo"])
  },
  async mounted() {
  }, 
  methods: {
    // ...mapMutations(["COURSE_TYPE"])
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    Footer,
    axios
  }
};
</script>
<style lang="scss" scoped>
@import "~static/common/css.scss";
$login-nav-bg: #252324;
.screen-aside {
  .el-submenu__title {
    line-height: 65px;
    height: 65px !important;
  }
  .el-submenu .el-menu-item {
    line-height: 65px;
    height: 65px;
    padding: 0 45px 0 77px !important;
  }
  .el-card__header {
    font-size: 16px;
  }
  .el-card {
    .el-card__body {
      padding: 0 !important;
    }
  }
}
.my-mbk {
  .mbk-top {
    background: $white-color;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    padding: 20px;
    margin-bottom: 2px;
    .person-home {
      color: #0057fb;
      font-size: 12px;
      margin-top: 3px;
      font-weight: normal;
    }
  }
}
.mbk-diamonds {
  background: #fff;
  min-height: 400px;
}

</style>
