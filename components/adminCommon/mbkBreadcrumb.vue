<template>
    <div class="mbk-header_breadcrumb">
        <div class="w12 clearable">
          <span class="fl">当前位置：</span>
          <el-breadcrumb class="fl" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index" :href="item.path">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
      </div>
</template>
<script>
    import {menus} from '~/static/js/menu'
    export default {
      data(){
        return {
          breadcrumb:[
            {
              path:'/',
              name:'首页'
            },
            {
              path:'/',
              name:'个人中心'
            }
          ]
        }
      },
      created(){
        var moduleName = this.$route.name.split('-')[0];
        menus.map(item=>{
          if(item.moduleName == moduleName){
            this.breadcrumb.push({
              name:item.title,
              path:item.path
            })
            item.children.map(thirdChild=>{
              thirdChild.children.map(fourChild=>{
                if(fourChild.path==this.$route.path){
                  this.breadcrumb.push({
                        name:fourChild.title,
                        path:fourChild.path
                      })
                }
              })
            })
          }
        })
      }
    }
</script>
<style lang="scss">
@import "~static/common/css.scss";
.mbk-header_breadcrumb {
  background: $white-color;
  padding: 20px 0;
  line-height: 1;
  font-size: 14px;
}
</style>

