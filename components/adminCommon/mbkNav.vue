<template>
    <div class="mbk-nav">
        <ul class="mbk-nav_tabbar w12 clearable">
          <li  class="current"><span>管理员中心</span></li>
          <li v-for="(nav,index) in navList" :key="index" :class="nav.active?'active':''"><a :href="nav.path"><span>{{nav.title}}</span></a></li>
        </ul>
      </div> 
</template>
<script>
     import {menus} from '~/static/js/adminMenu';
     export default{
        data(){
            return {
                navList : []
            }
        },
        mounted(){
          // console.log(this.$route)
          this.navList = menus.map(second=>{
            return Object.assign({},{
              id:second.id,
              title:second.title,
              path:second.path,
              active:second.moduleName == this.$route.name.split('-')[0]?true:false
            })
          })
          // console.log(this.navList)
        }
     }
</script>
<style lang="scss" scoped>
@import "~static/common/css.scss";
.mbk-nav { 
  background: $admin-theme-color;
  .mbk-nav_tabbar{
    display:flex;
    justify-content: space-between;
  }
  li {
    flex:1;
    text-align: center;
    line-height: 45px;
    font-size: 14px;
    color: #fff;
    position: relative;
    &.current {
      background: $admin-theme-fudarkred;
      width: 140px;
      flex:none;
    }
    &.active {
      &::after {
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -2px;
        content: "";
        width: 0;
        height: 0;
        border: 4px solid transparent;
        border-bottom: 4px solid $white-color;
      }
    }
    a {
      color: $white-color;
    }
  }
}
</style>

