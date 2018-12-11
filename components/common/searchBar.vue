<template>
    <div class="navbar " >
        <div v-for="(item,index) in configData" :key="index" class="navlit clearable">
            <span class="fl label">{{item.name}}</span>
            <ul class="fl" >
                <li @click="switchSearchT(item.prop,sitem.value)" v-for="(sitem,sindex) in item.list" :key="sindex" :class="search[item.prop]==sitem.value?'active':''"><span>{{sitem.label}}</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        props:[
            'configData','search'
        ],
        methods:{
            switchSearchT(t,v){
                this.search[t] = v;
            }
        }
    }
</script>
<style lang="scss" scoped>
@import "~static/common/css.scss";
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
        display: inline-block;
        width: 100px;
        margin: 5px 0;
        text-align: right;
      }
      ul{
          width: 780px;
      }
      li {
        float: left;
        padding: 0px 10px;
        margin: 5px 5px;
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
</style>
