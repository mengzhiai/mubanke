<template>
  <transition name="index">
    <div>
      <SiteNav></SiteNav>
      <HeaderWrap></HeaderWrap>
      <MbkNav></MbkNav>
      <MbkBreadcrumb></MbkBreadcrumb>
      <div class="screen-center clearable">
        <LeftMenu></LeftMenu>
        <div class="screen-main admin">
          <div class="top clearable">
            <div class="fl title-l">认证详情</div>
          </div>
          <div class="body">
            <el-form ref="form" inline-message :model="form" label-width="120px">
              <el-form-item prop="region" label="区域选择">{{form.regionTitle}}</el-form-item>
              <el-form-item prop="identitySelect" label="身份选择">{{form.identitySelectTitle}}</el-form-item>
              <el-form-item prop="realName" label="真实姓名">{{form.realName}}</el-form-item>
              <el-form-item prop="licenseNumber" label="证件号">{{form.licenseNumber}}</el-form-item>
              <el-form-item prop="limitType" label="身份证到期时间">
                {{form.limitDate}}
                <!-- {{form.limitDate.substr(0,10)}} -->
              </el-form-item>

              <el-form-item prop="idCardPersonPhoto" label="身份证人像面">
                <img class="avatar" :src="baseUrl+form.idCardPersonPhoto" alt>
              </el-form-item>
              <el-form-item prop="idCardNationalEmblemPhoto" label="身份证国徽面">
                <img class="avatar" :src="baseUrl+form.idCardNationalEmblemPhoto" alt>
              </el-form-item>
              <el-form-item prop="idCardAndPersonPhoto" label="手持证件照">
                <img class="avatar" :src="baseUrl+form.idCardAndPersonPhoto" alt>
              </el-form-item>
              <el-form-item>
                <div>
                    <el-button size="small" @click="handleCheckAuth(form.id,1)">通过</el-button>
                    <el-button size="small" @click="handleCheckAuth(form.id,2)">驳回</el-button>
                    <el-button size="small" @click="handleReturn()">返回</el-button>
                  </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </transition>
</template>
<script>
import SiteNav from "~/components/adminCommon/siteNav.vue"; //顶部登录
import HeaderWrap from "~/components/adminCommon/headerWrap.vue"; //顶部搜索
import MbkNav from "~/components/adminCommon/mbkNav.vue"; //顶部搜索
import MbkBreadcrumb from "~/components/adminCommon/mbkBreadcrumb.vue"; //面包屑
import LeftMenu from "~/components/adminCommon/leftMenu.vue"; //引入公共底部
import Footer from "~/components/adminCommon/footer.vue"; //引入公共底部

import { baseUrl } from "~/config/async/env";
// import { getCheckUserInfoById, checkNameAuthentication } from "~/ajax/getData";
import { getCheckUserInfoById, GetTasksByUserId,getAllToCheckUserInfo ,checkNameAuthentication} from '~/ajax/getData'
import {
  UserAuthenInfoRegion,
  UserAuthenInfoIdentitySelect,
  UserAuthenInfoLimitType
} from "~/config/enumerate";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入真实姓名"));
      } else {
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(value)) {
          callback(new Error("真实姓名格式不正确"));
        }
        callback();
      }
    };
    var validateIDcard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入证件号"));
      } else {
        if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
          callback(new Error("证件号格式不正确"));
        }
        callback();
      }
    };
    return {
      baseUrl: baseUrl,
      NameAuthenStatus: -1,
      form: {
        idCardPersonPhoto: "",
        idCardNationalEmblemPhoto: "",
        idCardAndPersonPhoto: ""
      },

      areaList: UserAuthenInfoRegion.filter(item => {
        if (item.value != -1) return item;
      }),
      identityList: UserAuthenInfoIdentitySelect.filter(item => {
        if (item.value != -1) return item;
      }),
      limitTypeList: UserAuthenInfoLimitType.filter(item => {
        if (item.value != -1) return item;
      }),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    };
  },
  head: {
    bodyAttrs: {
      class: 'admin-page'
    }
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      let { status, data } = await getCheckUserInfoById({
        id: this.$route.query.id
      });
      if (status == 1) {
        UserAuthenInfoRegion.map(region => {
          if (region.value == data.region) {
            data.regionTitle = region.label;
          }
        });
        UserAuthenInfoIdentitySelect.map(ident => {
          if (ident.value == data.identitySelect) {
            data.identitySelectTitle = ident.label;
          }
        });
        this.form = data;
      }
    },
    handleReturn() {
        this.$router.go(-1);
    },
    async handleCheckAuth(id,type) {
      if (type == 1) {
        this.$confirm(
          `<div style="margin:30px 0;">确定执行该操作吗？</div>`,
          "提示",
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(async () => {
            let { status, returnmessage } = await checkNameAuthentication({
              id,
              nameAuthenticationType: type
            });
            if (status == 1) {
              this.$message.success(returnmessage);
              this.init();
            } else {
              this.$message.error(returnmessage);
            }
          })
          .catch(() => {});
      } else if (type == 2) {
          this.$prompt(
            `<div style="margin:30px 0 0;">确定执行该操作吗？</div>`,
            "提示",
            {
              dangerouslyUseHTMLString: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              inputPattern: /\S/,
              inputErrorMessage: "请填写不通过原因"
            }
          )
            .then(async ({ value }) => {
              let { status, returnmessage } = await checkNameAuthentication({
                id,
                nameAuthenticationType: type,
                reason: value
              });
              if (status == 1) {
                this.$message.success(returnmessage);
                this.init();
              } else {
                this.$message.error(returnmessage);
              }
            })
            .catch(() => {});
        }
    }
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    Footer
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

  .body {
    padding: 25px 60px 25px 40px;
    .progres {
      height: 60px;
      width: 700px;
      margin: 40px auto;
      position: relative;
      z-index: 1;
    }

    .progres span.progres_bg {
      background: #ccc;
      width: 700px;
      height: 2px;
      line-height: 0;
      font-size: 0;
      display: block;
      position: absolute;
      left: 0;
      top: 11px;
      z-index: 1;
    }

    .progres span.progres_des {
      background: #ec2828;
      width: 33%;
      height: 2px;
      line-height: 0;
      font-size: 0;
      display: block;
      position: absolute;
      left: 0;
      top: 11px;
      z-index: 2;
    }

    .progres span.progres_tip {
      height: 54px;
      width: 700px;
      display: block;
      position: absolute;
      left: 0;
      top: 0px;
      z-index: 3;
    }

    .progres span.progres_tip > span {
      width: 100px;
      margin: 0 66px;
      display: block;
      float: left;
      text-align: center;
    }

    .progres span.progres_tip > span > i {
      background: url(/img/mbk/ico_main.png) no-repeat 0 -280px;
      width: 24px;
      height: 24px;
      overflow: hidden;
      margin: 0 auto;
      display: block;
    }

    .progres span.progres_tip > span.select > i {
      background-position: -50px -280px;
    }

    .progres span.progres_tip > span.success > i {
      background-position: 0 -330px;
    }

    .progres span.progres_tip > span.successon > i {
      background-position: -50px -330px;
    }

    .progres span.progres_tip > span > font {
      height: 30px;
      line-height: 30px;
      color: #999;
      display: block;
      font-size: 12px;
    }

    .progres span.progres_tip > span.select > font,
    .progres span.progres_tip > span.successon > font {
      color: #ec2828;
    }

    .progres span.progres_tip > span.error > i {
      background-position: 0 -470px;
    }
    .tip {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }
  .des {
    line-height: 25px;
    font-size: 12px;
    dd {
      margin-left: 20px;
    }
  }
  .area {
    border: 1px solid #e9e9e9;
    float: left;
    margin-right: 10px;
    padding: 10px 20px;
    text-align: center;
    color: #999;
    line-height: 25px;
    position: relative;
    cursor: pointer;
    &.active {
      color: #f02828;
      border-color: #f02828;
      &::after {
        content: "√";
        width: 20px;
        height: 18px;
        background: #f02828;
        position: absolute;
        right: 0;
        top: 0;
        color: #fff;
        line-height: 18px;
      }
    }
    .zh {
      font-size: 18px;
    }
    .en {
      font-size: 13px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 45px;
    color: #8c939d;
    text-align: center;
    margin-top: 40px;
  }

  .uploader-tip {
    border: 1px solid #d1d1d1d1;
    border-radius: 4px;
    width: 220px;
    height: 160px;
  }
  .avatar {
    width: 240px;
    height: 151px;
    display: block;
    margin-top: 15px;
  }
  .uptip {
    font-size: 12px;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    background: #fef8ee;
    padding: 5px 20px;
  }
}
</style>




