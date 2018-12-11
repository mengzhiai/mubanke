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
            <div class="fl title-l">任务投稿平审核</div>
          </div>
          <!-- <SearchBar :configData="navLabelGroup" :search="search"></SearchBar> -->
          <div class="joins">
            <div class="joins-list">
              <div class="headPoint clearable">
                <div class="pic fl">
                  <img src="/img/mbk/head_pic.png" alt>
                </div>
                <div class="task fl">
                  <div class="task-rw com">
                    <p class="rw">招标任务</p>
                    <p class="task-money">¥1000-3000</p>
                  </div>
                  <div class="deadline">
                    <p>
                      <span>
                        <img src="/img/mbk/join_ico1.png">距离投标截止:
                      </span>
                      <span class="col">06天05时42分51秒</span>
                    </p>
                    <p>
                      <span>
                        <img src="/img/mbk/join_ico2.png">赏金分配:
                      </span>
                      <span>一人独享赏金</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="joins-list">
              <span class="fir">发布的任务</span>
              <span class="sen col">APP设计|UI主界面设计</span>
            </div>
            <div class="joins-list joins-txt clearable">
              <div class="fir fl">任务详情</div>
              <div class="show-txt fl">
                <p>美化现有网站页面，和APP的界面设计，网页要求简约风格，主色调蓝色，页面响应式（PC,手机,平板）</p>
                <p>具体价格可面议</p>
              </div>
            </div>
          </div>
          <div class="top clearable" style="border-bottom: none;border-top: 1px solid #ddd;">
            <div class="fl title-l">参与的任务进程</div>
          </div>
          <div class="joins">
            <div class="joins-list">
              <span class="fir">任务投稿</span>
              <span class="sen"></span>
            </div>
            <div class="joins-list">
              <span class="fir">我要报价</span>
              <span class="sen col">¥3000</span>
            </div>
            <div class="joins-list">
              <span class="fir">工作周期</span>
              <span class="sen col">30天</span>
            </div>
            <div class="joins-list joins-txt clearable">
              <div class="fir fl">报价说明</div>
              <div class="show-txt fl">
                <p>尊敬的雇主您好！</p>
                <P>我们是模板客VIP战略合作对象，线下实体企业，广州火鹰信息科技有限公司（公司官网：http://www.figo.cn）</p>
                <p>广州火鹰信息科技有限公司（简称火鹰科技）创始于2005年，是国内领先的「互联网+」技术服务商，国家高新技术企业，业务涉及商用高端APP定制开发、微信公众号及小程序等移动互联网应用开发、AR/VR产品孵化及技术创投等领域，目前与多家企业达成合作伙伴关系。</p>
                <p>火鹰科技创始人来自中山大学计算机专业，作为广东省大学生创业典型，多次获得国家、省市级领导接见，被国内近20家电视台、报纸媒体争相报道。至今，火鹰科技服务过上市公司、大型国企、各类私企近1000家，为多家公司提供各类app开发定制、智能家居、直播+、电商系统、人脉共享、知识付费问答、语音红包等技术解决方案服务。</p>
                <p>欢迎联系我们：</p>
                <p>电话：134*****474（赵先生）  微信：tony140****   QQ：235****</p>
                <p>地址：广州番禺南浦凹凸凹创意园B栋三楼</p>
                <p>详细报价及开发周期需确定具体需求后确定</p>
                <p>您有好的方案，我们帮您实现，您的满意，就是我们的追求！合作共赢！</p>
              </div>
            </div>
          </div>
          <div class="btns">
            <button class="active">接受邀请</button>
            <button>查看合同</button>
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
import LeftMenu from "~/components/common/leftMenu.vue"; //引入侧边栏导航
import PageModel from "~/components/common/pageModel.vue"; //引入翻页组件
import SearchBar from "~/components/common/searchBar.vue"; //引入检索组件
import Footer from "~/components/common/footer.vue"; //引入公共底部

import { getOrderList, cancelOrder } from "~/ajax/getData";
import { OrderOrderType, OrderStatus, memberType } from "~/config/enumerate"; //查询条件
export default {
  data() {
    return {
      orderNo: "",
      navLabelGroup: [
        {
          name: "会员类型",
          list: OrderStatus
        }
      ],
      tableConfig: {
        total: 0,
        loading: false
      },
      search: {
        orderNo: "",
        orderType: "-1",
        status: "-1",
        page: 1,
        pageSize: 5
      },
      table: []
    };
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
  created() {
    this.init();
  },
  watch: {
    search: {
      deep: true,
      handler: function(n, o) {
        // this.$router.push({ path: this.$route.path, query: this.getPamas() })
        this.init();
      }
    },
    orderNo(newV) {
      if (newV == "") {
        this.search.orderNo = newV;
      }
    }
  },
  methods: {
    async init() {
      let params = this.getPamas(); //参数
      this.tableConfig.loading = true;
      let { status, list, total } = await getOrderList(params);
      this.tableConfig.loading = false;
      if (status == 1) {
        this.table = list.map(item => {
          let orderTypeTitle, statusTitle, memberType;
          OrderOrderType.map(oType => {
            if (oType.value == item.orderType) {
            }
          });
          OrderStatus.map(oStatus => {
            if (oStatus.value == item.status) {
              statusTitle = oStatus.label;
            }
          });
          //会员类型
          /* memberType.map(oMember =>{
                if(oMember.value == item.type){

                }
              }) */
          return Object.assign(item, {
            orderTypeTitle,
            statusTitle
          });
        });
        this.tableConfig.total = total;
      }
    },
    getPamas() {
      return Object.assign(this.search);
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      return {
        rowspan: 1,
        colspan: 5
      };
    },
    renderHead(h, { column, $index }) {
      return h("span", [
        h("span", "站点编号/用户名:"),
        h(
          "span",
          {
            class: {
              "blue-font": true
            }
          },
          column.label
        )
      ]);
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      if (
        columnIndex == 0 ||
        columnIndex == 1 ||
        columnIndex == 2 ||
        columnIndex == 3
      ) {
        return { "border-right": "none" };
      }
      if (rowIndex == 0 && columnIndex == 3) {
        return {
          rowspan: 1,
          colspan: 2
        };
      }
    },
    handleCancelOrder(id) {
      this.$confirm(
        `<div style="margin:30px 0;">确定取消该订单吗？</div>`,
        "提示",
        {
          dangerouslyUseHTMLString: true,
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {
            if (action == "confirm") {
              cancelOrder({ id }).then(res => {
                if (res.status == 1) {
                  this.$message.success(res.returnmessage);
                  this.init();
                  this.search.orderNo = "";
                  this.search.orderType = "-1";
                  this.search.status = "-1";
                } else {
                  this.$message.success(returnmessage);
                }
              });
            }
          }
        }
      );
    },
    setClassName({ row, index }) {
      return !row.orderList.length ? "expand outTr" : "outTr";
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
</style>
<style lang="scss">
@import "~static/common/css.scss";
.col{
  color: #ec2828;
}
.my-join {
  margin-bottom: 1px solid #ccc;
  label {
    margin-right: 15px;
    width: 100px;
    text-align: right;
  }
}
.headPoint {
  margin: 30px 0;
  padding: 20px 0 30px;
  border-bottom: 1px solid #ddd;
  .col {
    color: #ec2828;
  }
}
.pic {
  margin-left: 30px;
  img {
    width: 90px;
    height: 90px;
  }
}
.task {
  margin-right: 30px;
  .com {
    margin: 10px 0;
  }
  .task-rw {
    border: 1px solid #ef5050;
    height: 30px;
    line-height: 30px;
    font-size: 0;
    margin-left: 20px;
    width: 210px;
    p {
      font-size: 14px;
      text-align: center;
      display: inline-block;
    }
    .rw {
      width: 70px;
      border-right: 1px solid #f00;
      background-color: #ef5050;
      color: #fff;
    }
    .task-money {
      width: 135px;
    }
  }
  .deadline {
    font-size: 0;
    margin-left: 20px;
    // i {
    //   border: 1px solid #f00;
    //   border-radius: 50%;
    //   padding: 3px;
    //   margin: 5px;
    //   color: #cc0001;
    // }
    img{
      margin: 0 5px;
    }
    p {
      display: inline-block;
      font-size: 14px;
      margin-right: 20px;
    }
    .col {
      color: #cc0001;
    }
  }
}
.joins {
  margin: 10px 40px;
  .joins-list {
    line-height: 40px;
    span {
      display: inline-block;
      font-size: 12px;
    }
    .fir {
      width: 100px;
      text-align: right;
      font-weight: 600;
      margin-right: 15px;
    }
  }
  .joins-txt{
    .fl{
      float: left;
    }
    .show-txt{
      width: 730px;
    }
  }
}
.btns {
  border-bottom: none;
  text-align: right;
  margin: 30px 40px;
  button {
    width: 110px;
    height: 40px;
    line-height: 40px;
    border: none;
    outline: none;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    &.active{
      color: #fff;
      background-color: #ec2828;
    }
    &:hover {
      color: #fff;
      background-color: #ec2828;
    }
  }
}
</style>



