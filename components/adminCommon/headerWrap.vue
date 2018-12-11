<template>
    <div class="header-wrap">
        <div class="header-mbk w12 clearable">
          <div class="mbk-logo fl clearable">
            <a href="/admin/home.html"><img class="mbk-logo_img fl" src="/img/mbk/header-logo.png" width="290" height="97" alt=""></a>
            <span class="header-docu fl">管理员中心</span>
          </div>
          <div class="mbk-top-search  fl">
            <label for="header-search_inp" ><img src="/img/mbk/icon_shou.png" alt=""></label>
            <input id="header-search_inp" type="text" placeholder="输入您要查找的服务">
            <button class="btn  primary-btn search">搜索</button>
          </div>
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
      width: 80px; 
      line-height: 20px;
      margin-top: 10px;
      padding: 18px;
      border-left: 1px solid #dddddd;
      text-align: center;
    }
  }
  .mbk-top-search {
    margin-left: 100px;
    width: 500px;
    line-height: 42px;
    padding-left: 10px;
    border: 2px solid $admin-theme-color;
    margin-top: 25px;
    #header-search_inp {
      padding: 0 10px;
      width: 350px;
    }
    .search {
      float: right;
      border: none;
    }
    .btn.primary-btn{
          background: $admin-theme-color;
          color: #fff;
          border: 1px solid $admin-theme-color;
    }
  }
  .top-ot {
    margin-top: 25px;
  }
}
</style>

