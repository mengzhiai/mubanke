<template>
  <div class="site-nav">
    <div class="mbk-status-login w12 clearable">
      <div class="fl">
        <span>您好，欢迎访问模板商城，客服热线：</span>
        <span class="tel">400-0000-0000</span>
      </div>
      <ul v-if="!info.nickName" class="fr login-opt">
        <li>
          <a href="/admin/login.html">登录</a>
        </li>
        <li>
          <span>注册</span>
        </li>
        <li>
          <span>扫描二维码</span>
        </li>
      </ul>
      <ul class="fr login-opt" v-else>
        <li>
          <span>{{info.nickName}}</span>
        </li>
        <li>
          <a href="/admin/login.html"><span>退出</span></a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getAdminInfo, outLogingAdmin } from "~/ajax/getData";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["ACCOUNT_INFO"]),
    async init() {
      let json = await getAdminInfo();
      if (json.status == 1) {
        this.info = json.data;
        // this.ACCOUNT_INFO(json.list);
        this.$store.commit("ACCOUNT_INFO", json.data);
      }
    },
    //退出
    /* async logoff() {
      this.$confirm(
        `<div style="margin:30px 0;">确定要退出吗？</div>`,
        "提示",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          let { status, returnmsg } = await outLogingAdmin();
          if (status == 1) {
            this.$router.push("/admin/login.html");
          } else {
            this.$message.error(returnmsg);
          }
        })
        .catch(() => {});
    } */
  }
};
</script>
<style lang="scss" scoped>
@import "~static/common/css.scss";
$login-nav-bg: #252324;
.site-nav {
  background: $login-nav-bg;
  color: #fff;
  line-height: 34px;
  .mbk-status-login {
    font-size: 12px;
    .tel {
      font-family: Georgia, "Times New Roman", Times, serif;
      font-size: 16px;
      color: #fc0;
      font-weight: bold;
    }
    .login-opt {
      li {
        float: left;
        padding: 0 20px;
        position: relative;
        cursor: pointer;
        a {
          color: #fff;
        }
        &::after {
          content: "|";
          position: absolute;
          left: 0;
        }
        &:first-child {
          &::after {
            content: "";
            position: absolute;
          }
        }
      }
    }
  }
}
</style>

