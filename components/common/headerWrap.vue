<template>
    <div class="header-wrap">
        <div class="header-mbk w12 clearable">
          <div class="mbk-logo fl clearable">
            <a href="/myMBK/employer/home.html"><img class="mbk-logo_img fl" src="/img/mbk/header-logo.png" width="290" height="97" alt=""></a>
            <span class="header-docu fl">个人中心</span>
          </div>
          <div class="mbk-top-search  fl">
            <el-input id="header-search_inp" clearable type="text" placeholder="输入您要查找的服务" >
               <template slot="prepend"><img src="/img/mbk/icon_shou.png" alt=""></template>
               <template slot="append">
                 <el-button type="primary">搜索</el-button>
               </template>
            </el-input>
          </div>
          <!-- <div class="top-ot  fr">
            <button class="btn primary-btn">注册</button>
            <button class="btn secondary-btn">登录</button>
          </div> -->
        </div> 
      </div>
</template>
<script>
    
</script>
<style lang="scss">
@import "~static/common/css.scss";
.header-wrap {
  background: #fff;
  padding: 20px 0 10px;
  color: #252324;
  .mbk-logo {
    .mbk-logo_img {
      display: block;
    }
    .header-docu {
      display: inline-block;
      width: 70px;
      line-height: 20px;
      margin-top: 10px;
      // font-size: 12px;
      padding: 18px;
      border-left: 1px solid #dddddd;
    }
  }
  .mbk-top-search {
    margin-left: 100px;
    width: 500px;
    border: 2px solid $theme-color;
    margin-top: 25px;
    .el-input-group__prepend,.el-input-group__append{
      background: none;
      border: none;
    }
    .el-button.el-button--primary{
      background: $theme-color;
      border-color: $theme-color;
      color: #fff;
      height: 42px;
      border-radius: 0;
    }
  }
  #header-search_inp {
    line-height: 42px;
    height: 42px;
    border: none;
    outline: none;
  }
  .top-ot {
    margin-top: 25px;
  }
}
</style>

