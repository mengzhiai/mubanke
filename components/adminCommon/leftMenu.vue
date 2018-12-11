<template>
    <div class="screen-aside">
          <div class="my-mbk">
            <div class="mbk-top clearable">
              <span class="fl">{{leftMenu.title}}</span> 
              <a href="/admin/home.html"><span class="fr person-home">管理员主页</span></a>
            </div>
            <el-menu :default-active="activeMenu" :default-openeds="openeds" class="el-menu-vertical-demo" >
              <el-submenu v-for="menu in leftMenu.children" :index="menu.id" :key="menu.id">
                <template slot="title">
                  <img :src="menu.icon" alt="">
                  <span>{{menu.title}}</span>
                </template>
                <el-menu-item v-if="item.show!=false"  v-for="item in menu.children" :index="item.id" :key="item.id">
                  <nuxt-link :to="item.path">{{item.title}}</nuxt-link>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
            
        </div>
</template>
<script>
    import {menus} from '~/static/js/adminMenu'
    export default{
        data () {
            return {
                openeds: [], //默认打开的带单
                leftMenu:{},
                activeMenu:''
            }
        },
        mounted() {
          menus.map(child=>{
            if(child.moduleName==this.$route.name.split('-')[0]){
              this.leftMenu = child
              child.children.map(thirdChild=>{
                this.openeds.push(thirdChild.id);
                thirdChild.children.map(fourChild=>{
                  if(fourChild.path.split('/')[3]==this.$route.path.split('/')[3]){
                    this.activeMenu = fourChild.id;
                  }
                })
              })   
            }
          })
        }, 
    }
</script>
<style lang="scss">
@import "~static/common/css.scss";
.screen-aside {
  .el-menu{
    border-right: none;
  }
  .el-menu-item:hover, .el-menu-item:focus{
    background: #c5e9fd;
  }
  .el-submenu__title:hover{
    background: #c5e9fd;
  }
  .el-submenu__title {
    line-height: 65px;
    height: 65px !important;
  }
  .el-submenu .el-menu-item {
    line-height: 53px;
    height: 53px;
    padding: 0 !important;
    margin: 6px 0;
    border-left: 7px solid transparent;
  }
  .el-card__header {
    font-size: 16px;
  }
  .el-card {
    .el-card__body {
      padding: 0 !important;
    }
  }
  .el-menu-item.is-active{
    border-left:7px solid $admin-theme-color;
    background:#f2f2f2;
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
    &+.el-menu{
      padding-bottom: 50px;
      a{
        display: block;
        padding: 0 45px 0 55px !important;
      }
    }
  }
}
</style>

