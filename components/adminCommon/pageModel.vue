<template>
    <el-pagination id="server-page" layout="total,prev, pager, next" background prev-text="上一页" next-text="下一页"
            @current-change="PageChange" :config="config"
            :current-page="currentPage" :search="search"
            :page-size="pageSize"
            :total="total">
    </el-pagination>
</template>

<script>
export default {
  props: [ 'config','total', 'pageSize', 'currentPage','search'],
  data() {
    return {}
  },
  methods: {
    PageChange(currentPage) {
      this.search.page = currentPage;
    }
  },
  created() {}
}
</script>

<style lang="scss">
@import "~static/common/css.scss";
#server-page {
  .el-pager li {
    font-size: 12px;
    font-weight: 400; 
    // color: #666;
    padding: 0 10px;
  }
  .btn-prev,
  .btn-next {
    padding: 0 16px;
    background-color: $admin-theme-color;
    color: #fff;
  }
  .btn-prev:disabled,
  .btn-next:disabled {
    background: #f4f4f5;
    color: #c0c4cc;
  }
  &.el-pagination.is-background .el-pager li:not(.disabled):hover{
    color:  $admin-theme-color;
  }
  &.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color:  $admin-theme-color;
    color: #fff;
  }
}
.start-time,
.end-time {
  &.el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100px;
    .el-input__inner {
      padding-left: 5px;
      padding-right: 5px;
      text-align: center;
    }
    .el-input__prefix,
    .el-input__suffix {
      display: none;
    }
  }
}
</style>