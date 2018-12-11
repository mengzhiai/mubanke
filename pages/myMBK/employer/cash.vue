<template>
  <transition name="index">
    <div>
      <SiteNav></SiteNav>
      <HeaderWrap></HeaderWrap>
      <MbkNav></MbkNav>
      <MbkBreadcrumb></MbkBreadcrumb>
      <div class="screen-center clearable">
        <LeftMenu></LeftMenu>
        <div class="screen-main">
          <div class="top clearable">
            <div class="fl title-l">提现申请</div>
          </div>
          <!-- <SearchBar :configData="navLabelGroup" :search="search"></SearchBar> -->
          <div class="body">
            <div class="cash new-site">
              <el-form label-width="140px" ref="form" :model="form" :rules="rules">
                <el-form-item label="提现账户" class="inputWidth" prop="operationAccount">
                  <el-input
                    placeholder="请输入提现账户"
                    :minlength="2"
                    :maxlength="6"
                    v-model="form.operationAccount"
                    max="22"
                    autofocus
                    prefix
                    blur
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="提现金额" class="inputWidth" prop="amount">
                  <el-input
                    placeholder="请输入交易金额"
                    :maxlength="20" v-model="form.amount"
                    @input.native="amountInput"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="getCash" class="red-btn">提现</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </transition>
</template>
<script>
import SiteNav from "~/components/common/siteNav.vue"; //顶部登录
import HeaderWrap from "~/components/common/headerWrap.vue"; //顶部搜索
import MbkNav from "~/components/common/mbkNav.vue"; //顶部搜索
import MbkBreadcrumb from "~/components/common/mbkBreadcrumb.vue"; //面包屑
import LeftMenu from "~/components/common/leftMenu.vue"; //引入公共底部
import PageModel from "~/components/common/pageModel.vue"; //引入翻页组件
import SearchBar from "~/components/common/searchBar.vue"; //引入检索组件
import Footer from "~/components/common/footer.vue"; //引入公共底部
import { mapState } from "vuex";
import { userApplyCash } from "~/ajax/getData";
export default {
  data() {
    var validateAmount = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入费用"));
      } else {
        if(value > this.accountInfo.balance){
          callback(new Error("提现金额不能大于账户余额"));
        }
        callback();
      }
    };
    return {
      form: {
        operationAccount: "",
        amount: ""
      },
      rules: {
        operationAccount: [
          { required: true, message: "请输入提现账户", trigger: "blur" }
        ],
        amount: [{ required: true, validator: validateAmount, trigger: "blur" }]
      },
       value: ''
    };
  },
  computed:{
    ...mapState(['accountInfo'])
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    SearchBar,
    PageModel,
    Footer
  },
  methods: {
    getCash() {
      this.$refs.form.validate(async valid => {
        if (valid) {
            let status = await userApplyCash(this.form)
              if (res.status == 1) {
                this.$message.success(res.returnMess);
              } else {
                this.$message.error(res.returnMess);
              }
          }
      });
    },
    amountInput:function(){
      var value = this.form.amount;
      value = value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
      value = value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
      value = value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
      if(value.indexOf(".")< 0 && value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
          value= parseFloat(value); 
      } 
      this.$nextTick(()=>{
        this.form.amount = value
      })
      
    }
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
      }
      li {
        float: left;
        padding: 0px 10px;
        margin: 0 5px;
        cursor: pointer;
        &:hover {
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
  .body {
    padding: 25px;
    .el-table__row {
      .photo {
        max-width: 70px;
        max-height: 70px;
        margin-right: 20px;
      }
      .title {
        font-size: 12px;
      }
      .category {
        font-size: 12px;
        margin-top: 5px;
        color: #666666;
      }
      .date,
      .time {
        font-size: 12px;
      }
      .price {
        font-size: 12px;
        color: #666666;
        font-weight: bold;
      }
      .status {
        color: #009966;
        font-size: 12px;
      }
    }
  }

  #server-page {
    float: right;
    margin: 20px 0;
    .el-pager li {
      font-size: 12px;
      font-weight: 400;
    }
  }
}

.cash {
  .inputWidth {
    width: 500px;
    margin-bottom: 30px;
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
<style lang="scss">
.server-name-input {
  .el-input__inner {
    height: 30px;
  }
  .el-input-group__append {
    background: #f2f2f2;
    padding: 0 7px;
  }
}
.expand .el-table__expand-column .cell {
  display: none;
}
#server-opt {
  margin-bottom: 20px;
  .el-button {
    padding: 8px 10px;
    border-radius: 1px;
    font-size: 12px;
    color: #666;
  }
}
#server {
  .el-table__header-wrapper {
    .is-leaf {
      background: #f4f4f4 !important;
      padding: 5px 0 !important;
    }
  }
  .el-table__row {
    .el-button {
      padding: 8px 10px;
      border-radius: 1px;
      font-size: 12px;
      color: #666;
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }
  .outHead {
    th {
      font-weight: normal;
      font-size: 12px;
    }
  }
  .outTr {
    &:hover {
      & > td {
        background-color: #fff;
      }
    }
    & > td {
      border: none;
      font-size: 12px;
      & > .cell {
        padding: 0;
      }
    }
  }
}
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
    background-color: #cc0001;
    color: #fff;
  }
  .btn-prev:disabled,
  .btn-next:disabled {
    background: #f4f4f5;
    color: #c0c4cc;
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



