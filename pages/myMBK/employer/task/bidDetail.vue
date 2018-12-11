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
            <div class="fl title-l">任务投稿审核</div>
          </div>
          <!-- <SearchBar :configData="navLabelGroup" :search="search"></SearchBar> -->
          <div v-loading="loading">
          <div class="navbar" >
            <div class="navlit clearable">
              <div class="labels fl">我发布的任务</div>
              <div class="content-txt col fl">{{bidServer.taskName}}</div>
            </div>
            <div class="navlit clearable">
              <div class="labels fl">任务详情</div>
              <div class="content-txt fl">
                <div v-html="bidServer.taskName"></div>
              </div>
            </div>
          </div>
          <div class="navbar" style="border-bottom: none!important;">
            <div class="joins">
              <div class="joins-list">
                <div class="headPoint clearable">
                  <div class="pic fl">
                    <img :src="baseUrl+bidServer.bidHeadPhoto" >
                  </div>
                  <div class="task fl">
                    <div class="task-rw com">
                      <p class="rw">个人 | {{bidServer.bidUserName}}</p>
                    </div>
                    <div class="deadline">
                      <p>
                        <span>保证:</span>
                        <span class="btns">
                          <button>完成</button>
                          <button class="active">售后</button>
                          <button>原创</button>
                        </span>
                      </p>
                      <p>
                        <span>保证金:</span>
                        <span class="col">¥{{bidServer.bidBond}}</span>
                      </p>
                      <!-- <p>
                        <span>信用:</span>
                        <span class="ico">
                            <img src="/img/mbk/ico3.png" alt="">
                            <img src="/img/mbk/ico3.png" alt="">
                            <img src="/img/mbk/ico3.png" alt="">
                            <img src="/img/mbk/ico3.png" alt="">
                            <img src="/img/mbk/ico3.png" alt="">
                        </span>
                      </p> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="show-mes">
                <ul class="mes1 clearable">
                    <li class="one">¥{{bidServer.bidBond}}</li>
                    <li class="two">{{bidServer.bidWorkDay}}天</li>
                    <li class="three">{{`${bidServer.bidUserPro?bidServer.bidUserPro:''}${bidServer.bidUserCity?'-'+bidServer.bidUserCity:''}${bidServer.bidUserAdd?'-'+bidServer.bidUserAdd:''}`}}</li>
                </ul>
                <ul class="mes2 clearable">
                    <li class="one">报价</li>
                    <li class="two">工作周期</li>
                    <li class="three">所在地求</li>
                </ul>
                <div class="show-txt">
                    <p class="fir">报价说明</p>
                    <div v-html="bidServer.bidDescriptiaon"></div>
                </div>
            </div>
          </div>
          <div class="body">
            <div class="bottom-btn">
                <el-button type="button">联系TA</el-button>
                <el-button type="button" v-if="bidServer.taskStatus == 3" @click="getContract(bidServer.taskId)">约请合作</el-button>
                <el-button type="button">进入店铺</el-button>
            </div>
            <el-button style="display:none;" type="text" @click="dialogVisible = true">弹出合同</el-button>
            <el-button style="display:none;" type="text" @click="dialogDetail = true">弹出合同详情页</el-button>
            <el-dialog class="dialog"  title="合约合同"  :visible.sync="dialogVisible" width="1200px" >
                <div>
                    <div class="show-message">
                    <div class="title col">合同状态,正在生成</div>
                    <ul>
                      <li>您与雇主共同签署了合同，现在您可以：</li>
                      <li>1. 如有需求变更，您可以发起补充合同，以避免交易纠纷</li>
                      <li>2. 如交易发生纠纷，可以发起争议维权，或联系客服处理，客服热线：4000000000</li>
                    </ul>
                </div>
                <div>
                  <div class="show-message">
                    <div class="title">网络服务交易合同</div>
                    <div>
                      <p><span>合同说明：</span>此合同由雇主、服务商及模板客在线签订、共同遵守</p>
                      <div class="item clearable">
                        <div class="labels soft1 fl">工期</div>
                        <div class="content-txt fl">
                          <el-input style="width: 260px" v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                      </div>
                      <div class="item clearable">
                        <div class="labels soft2 fl">项目阶段</div>
                        <div class="content-txt fl">
                          <div class="input-w">
                            <div class="lists"><el-input v-model="input" placeholder="项目第一阶段"></el-input></div>
                            <div class="lists"><el-input v-model="input" placeholder="具体内容及交付结果"></el-input></div>
                            <div class="lists"><el-input v-model="input" placeholder="付款金额"></el-input><span class="pos col">¥</span></div>
                            <div class="lists"><el-input v-model="input" placeholder="所需工时"></el-input><span class="pos">天</span></div>
                          </div>
                          <div class="input-w">
                            <div class="lists"><el-input v-model="input" placeholder="项目第一阶段"></el-input></div>
                            <div class="lists"><el-input v-model="input" placeholder="具体内容及交付结果"></el-input></div>
                            <div class="lists"><el-input v-model="input" placeholder="付款金额"></el-input><span class="pos col">¥</span></div>
                            <div class="lists"><el-input v-model="input" placeholder="所需工时"></el-input><span class="pos">天</span></div>
                            <div class="lists"><i class="el-icon-plus"></i></div>
                          </div>
                        </div>
                      </div>
                      <div class="item clearable">
                        <div class="labels fl">核心功能</div>
                      </div>
                      <div class="item clearable">
                        <div class="labels fl">交付与验收</div>
                        <ul class="fl">
                          <li>乙方应按照本合同要求，按阶段向甲方交付开发成果，并协助甲方完成相应阶段的验收。</li>
                          <li>1、验收标准： a. 程序正常运行； b.方案中提到的功能全部实现；c.项目按时完成；d.交付文档齐全</li>
                          <li>1、验收标准： a. 程序正常运行； b.方案中提到的功能全部实现；c.项目按时完成；d.交付文档齐全</li>
                          <li>1、验收标准： a. 程序正常运行； b.方案中提到的功能全部实现；c.项目按时完成；d.交付文档齐全</li>
                          <li>1、验收标准： a. 程序正常运行； b.方案中提到的功能全部实现；c.项目按时完成；d.交付文档齐全</li>
                        </ul>
                      </div>
                      <div class="item clearable">
                        <div class="labels fl">售后服务</div>
                        <ul class="fl">
                          <li>乙方应按照本合同要求，按阶段向甲方交付开发成果，并协助甲方完成相应阶段的验收。</li>
                          <li>1、验收标准： a. 程序正常运行； b.方案中提到的功能全部实现；c.项目按时完成；d.交付文档齐全</li>
                          <li>1、验收标准： a. 程序正常运行； b.方案中提到的功能全部实现；c.项目按时完成；d.交付文档齐全</li>
                          <li>1、验收标准： a. 程序正常运行； b.方案中提到的功能全部实现；c.项目按时完成；d.交付文档齐全</li>
                          <li>1、验收标准： a. 程序正常运行； b.方案中提到的功能全部实现；c.项目按时完成；d.交付文档齐全</li>
                        </ul>
                      </div>
                      <div class="item clearable">
                        <div class="labels fl">产权说明</div>
                        <ul class="fl">
                          <li>乙方按本合同要求进行开发，是否需要交付源码： <a href="">是</a> ，其著作权由 <a href="">甲</a> 方享有。</li>
                        </ul>
                      </div>
                      <div class="item clearable">
                        <div class="labels fl">项目委托</div>
                        <ul class="fl">
                          <li>甲方委托 <a href="">甲方</a> 为甲方项目代理人，负责本项目的阶段性确认、验收等事宜。代理人在项目执行过程中签署的一切文件和代理人邮箱的回复，甲方均予以承认。乙方指定 乙方 为项目的管理（包括人员的安排，时间的安排等）。</li>
                        </ul>
                      </div>
                      <div class="item clearable">
                        <div class="labels fl">双方责任</div>
                        <ul class="fl">
                          <li>乙方按本合同要求进行开发，是否需要交付源码： 是 ，其著作权由 甲 方享有。</li>
                        </ul>
                      </div>
                      <div class="item clearable">
                        <div class="labels fl">发票说明</div>
                        <ul class="fl">
                          <li>乙方按本合同要求进行开发，是否需要交付源码： 是 ，其著作权由 甲 方享有。</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <div class="buttom-mask">
                    <el-button type="button" size="mini">生成合同</el-button>
                  </div>
                </span>
            </el-dialog>
            <el-dialog class="dialog dialog-detail"
                title="合约合同"  :visible.sync="dialogDetail" width="1200px">
                <div v-html="contract.customerContractCon">
                </div>
                <span slot="footer" class="dialog-footer">
                  <div class="buttom-mask">
                    <el-button @click="qdContract(contract.id)" type="button" size="mini">同意</el-button>
                  </div>
                </span>
            </el-dialog>
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

import { getBidDetById,getContractDtoById ,signContract} from "~/ajax/getData";
import { baseUrl } from "~/config/async/env"; //查询条件
export default {
  data() {
    return {
      loading:false,
      dialogVisible: false,
      dialogDetail: false,
      input: '',
      tables: [],
      tabs: [
        {
          photo: "/img/mbk/p1.png",
          title: "APP设计|UI主界面设计",
          category: "产品/UI设计 — 移动应用UI设计",
          date: "2018-10-16 09:50:21",
          price: "￥252.00/年",
          sort: "1",
          status: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          photo: "/img/mbk/p1.png",
          title: "APP设计|UI主界面设计",
          category: "产品/UI设计 — 移动应用UI设计",
          date: "2016-05-04",
          price: "￥252.00/年",
          sort: "1",
          status: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          photo: "/img/mbk/p1.png",
          title: "APP设计|UI主界面设计",
          category: "产品/UI设计 — 移动应用UI设计",
          date: "2016-05-01",
          price: "￥252.00/年",
          sort: "1",
          status: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          photo: "/img/mbk/p1.png",
          title: "APP设计|UI主界面设计",
          category: "产品/UI设计 — 移动应用UI设计",
          date: "2016-05-03",
          price: "￥252.00/年",
          sort: "1",
          status: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      bidServer:{},
      baseUrl,
      contract:{},
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
    this.init(this.$route.query.uId);
  },
 
  methods: {
    async init(bidId){
      this.loading = true
      let {status,data} = await getBidDetById({bidId})
      this.loading = false
      if(status == 1){
        this.bidServer = data;
      }else{
        this.$message.error('出错')
      }
    },
    async getContract(taskId){
      let {status,data,returnmessage} = await getContractDtoById({taskId,flag:0})
      if(status === 1){
        this.contract = data;
        this.dialogDetail = true
      }else{
        this.$message.error(returnmessage)
      }
    },
    async qdContract(contractId){
      let {status,returnmessage} = await signContract({status:1,contractId})
      if(status === 1){
        this.$message.success(returnmessage)
        this.dialogDetail = false;
        this.init(this.$route.query.uId);
      }else{
        this.$message.error(returnmessage)
      }
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
    padding: 0 25px;
    border-bottom: 1px solid #ddd;
    .navlit {
      line-height: 25px;
      margin: 20px 0;
      .labels {
        font-weight: bold;
        line-height: 25px;
        padding: 0px 10px;
        width: 120px;
        text-align: right;
      }
      .col {
        color: #f00;
      }
    }
  }
  .screen-main .navbar:first-of-type(1){
      border-bottom: none!important;
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

.headPoint {
  margin: 20px 0;
  padding: 20px 0 30px;
  border-bottom: 1px solid #ddd;
  .col {
    color: #ec2828;
  }
}
.pic {
  margin-left: 30px;
  img {
    width: 70px;
    height: 70px;
  }
}
.task {
  margin-right: 30px;
  .com {
    margin: 10px 0;
  }
  .task-rw {
    height: 20px;
    line-height: 20px;
    font-size: 0;
    margin-left: 20px;
    p {
      font-size: 14px;
      text-align: center;
      display: inline-block;
    }
    .rw {
      font-size: 17px;
      font-weight: 600;
    }
  }
  .deadline {
    font-size: 0;
    margin-left: 20px;
    img {
      margin: 0 5px;
    }
    .ico{
        img{
            margin: 0;
        }
    }
    p {
      display: inline-block;
      font-size: 12px;
      margin-right: 20px;
    }
    .col {
      color: #cc0001;
    }
    .btns {
      button {
        width: 36px;
        height: 18px;
        outline: none;
        background-color: #fff;
        font-size: 12px;
        color: #fff; 
        background-color: #a6afb5;
        cursor: pointer;
        &.active{
            background-color: #ffb40e;
            color: #fff;
        }
        &:hover{
            background-color: #ffb40e;
            color: #fff;
        }
      }
    }
  }
}

.show-mes{
    margin: 20px 0;
    padding: 0 30px;
    border-bottom: 1px solid #ddd;
    li{
        float: left;
        text-align: center;
        width: (100% / 3);
    }
    .mes1{
        margin: 10px;
        .one,.two{
            font-size: 29px;
            
        }
        .one{
            color: #f00;
        }
        .three{
            font-size: 14px;
            line-height: 40px;
        }
    }
    .mes2{
        li{
            line-height: 30px;
        }
        .one{
            font-size: 12px;
            background-color: #d4d4d4;
        }
        .two{
            background-color: #f2f2f2;
        }
        .three{
            background-color: #d4d4d4;
        }

    }
}
.show-txt{
    line-height: 30px;
    margin: 30px 0;
    // padding: 0 30px;
    boder-bottom: 1px solid #ddd;
    .fir{
        font-weight: 800;
    }
}
.bottom-btn{
    text-align: right;
    padding-bottom: 60px;
    .el-button{
        width: 90px;
    }
}
.col{
  color: #cc0001;
}
.dialog::-webkit-scrollbar{
  display: none;
}
.dialog{
  .el-dialog__header{
    padding: 5px;
    background-color: #e4e4e4;
    color: #565656;
    .el-dialog__title{
      color: #565656;
      font-size: 14px;
    }
  }
  .el-dialog__headerbtn{
    top: 15px;
    right: 20px;
  }
  
  .item{
    margin: 10px 0;
    .lists{
      margin: 0 3px;
      position: relative;
      display: inline-block;
      .pos{
        position: absolute;
        right: 10px;
        top: 10px;
      }
      i{
        position: absolute;
        top: -17px;
      }
    }
    .el-input{
      width: 120px;
    }
    .input-w{
      margin: 10px 0;
    }
    .show-detail{

    }
    .el-icon-plus{
      font-size: 24px;
      margin: 0 10px;
      cursor: pointer;
    }
  }
  .labels{
    display: inline-block;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    width: 100px;
    padding: 0px 10px;
    text-align: right;
    font-size: 12px;
  }
  .soft1{
    margin-top: 5px;
  }
  .soft2{
    margin-top: 15px;
  }
  .el-dialog__footer{
    padding: 10px;
    border-top: 1px solid #dadee5;
    background-color: #e4e4e4;
    .buttom-mask{
      el-bottom{
        border: 1px solid #dfdfdf;
      }
    }
  }
}
.dialog-detail {
  .el-dialog {
    padding: 10px;
    background: rgba(255,255,255,0.1);
  }
  .el-dialog__body{
    background: #fff;
  }
}
.dialog-detail{
  .show-message{
    margin-bottom: 30px;
    .ht{
      margin: 10px 0;
    }
    .item{
      background-color: #e4e4e4;
      height: 35px;
      line-height: 35px;
      margin: 0;
      padding: 0 10px;
      .tit{
        color: #272727;
      }
      img{
        padding: 0 5px;
      }
    }
    .contract-detail{
      line-height: 30px;
      width: 100%;
      border: 1px solid #ddd;
      padding: 30px;
    }
  }
  .show-message{
    .title{
      font-size: 18px;
      margin: 15px 0px;
      font-weight: 600;
    }
    p{
      font-size: 12px;
    }
    ul{
      li{
        display: block;
        line-height: 30px;
        font-size: 12px;
        width: 100%;
        a{
          color: #cc0001;
        }
      }
    }
  }
}
</style>



