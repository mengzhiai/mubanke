<template>
<transition name='index'>
    <div>
        <SiteNav></SiteNav>
         <HeaderWrap></HeaderWrap>
      <MbkNav></MbkNav>
     <MbkBreadcrumb></MbkBreadcrumb>
     <div class="screen-center clearable">
        <LeftMenu></LeftMenu>
        <div class="screen-main">
            <div class="top clearable">
                <div class="fl title-l">订单详情</div>
            </div>
            <div class="body " >
                <el-card class="box-card" v-if="order.orderType==1">
                    <div slot="header" class="clearfix">
                        <span>我的站点</span>
                    </div>
                    <div>
                        <div class="order-detail-item">
                            <span>交易号</span>
                            <span>{{order.orderNo}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span>所购站点</span>
                            <span class="price-color">{{station.Meta_title}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span>站点版本</span>
                            <span>{{station.setType}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span>站点套餐</span>
                            <span class="blue-font">{{station.tc}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span>站点时限</span>
                            <span>{{`${station.createTime.replace('T',' ').substr(0,10)}至${station.serviceOverTime.replace('T',' ').substr(0,10)}`}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span>订单金额</span>
                            <span class="price-color">￥{{order.amount}}元</span>
                        </div>
                        <div v-if="order.status==0" class="order-detail-item">
                            <span></span>
                            <span ><el-button @click="commit(order.id)" size="small" class="red-btn"> 支付</el-button></span>
                        </div>
                        <div v-if="order.status==3" class="order-detail-item">
                            <span></span>
                            <nuxt-link :to="`/myMBK/employer/station/edit.html?out_trade_no=${station.id}`"><el-button  size="small" class="red-btn">完善站点</el-button></nuxt-link>
                        </div>
                    </div>
                    
                </el-card>
                <el-card class="box-card" v-if="order.orderType==0">
                    <div slot="header" class="clearfix">
                        <span>我的服务</span>
                    </div>
                    <div>
                        <div class="order-detail-item">
                            <span>交易号</span>
                            <span>{{order.orderNo}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span>服务类型</span>
                            <span class="price-color">{{task.serviceTypeTitle}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span>服务名称</span>
                            <span class="blue-font">{{task.taskName}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span>服务时限</span>
                            <span>{{task.endTime}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span>订单金额</span>
                            <span class="price-color">￥{{order.amount}}元</span>
                        </div>
                        <div class="order-detail-item order-detail-item-last">
                            <span>服务详情</span>
                            <span v-html="task.description" class="price-color"></span>
                        </div>
                    </div>
                    <el-table  empty-text="暂无子订单" size="mini" border :data="orderList">
                        <el-table-column align="center" prop="amount" label="金额">
                            <template slot-scope="props">
                                <span class="title-s">￥ {{props.row.amount}}元</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="status"  label="状态"  >
                            <template slot-scope="props">
                                <span class="title-s"  :class="{'price-color':props.row.status==0,'num-color':props.row.status==2}">
                                    {{order.status==1?'已取消':props.row.status==0?'未支付':'已支付'}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="status"  label="操作"  >
                            <template slot-scope="props">
                                <el-button v-if="props.row.status==0&&order.status==0 || props.row.status==0&&order.status==2" @click="commit(props.row.id)" size="small" class="red-btn"> 支付</el-button>
                                <!-- <el-button v-if="props.row.status==0&&order.status==0" @click="handleCancelOrder(order.id)" size="small" > 取消</el-button> -->
                            </template>
                        </el-table-column>
                        </el-table>
                </el-card>
                <el-card class="box-card" v-if="order.orderType==3">
                    <div slot="header" class="clearfix">
                        <span>我的充值</span>
                    </div>
                    <div>
                        <div class="order-detail-item">
                            <span>交易号</span>
                            <span>{{order.orderNo}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span>充值金额</span>
                            <span>{{order.amount}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span></span>
                            <span ><el-button @click="recharge(order.id)" size="small" class="red-btn"> 支付</el-button></span>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card" v-if="order.orderType==4">
                    <div slot="header" class="clearfix">
                        <span>我的插件</span>
                    </div>
                    <div>
                        <div class="order-detail-item">
                            <span>交易号</span>
                            <span>{{order.orderNo}}</span>
                        </div>
                        <div class="order-detail-item">
                            <span>插件类型</span>
                            <span class="price-color">69666</span>
                        </div>
                        <div class="order-detail-item">
                            <span>插件名称</span>
                            <span class="blue-font">69666</span>
                        </div>
                        <div class="order-detail-item">
                            <span>插件时限</span>
                            <span>69666</span>
                        </div>
                        <div v-if="order.status==0" class="order-detail-item">
                            <span>订单金额</span>
                            <span class="price-color">￥{{order.amount}}元</span>
                        </div>
                    </div>
                    
                </el-card>
            </div>
        </div>
        <el-dialog  :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" class="payDialog" title="" :visible.sync="dialogVisible" width="520px">
            <iframe :src="src" frameborder="0" width="480" height="604"></iframe>
            <i @click="dialogVisible=false;src=''" style="color:red;font-size:24px;cursor:pointer;position:absolute;right:0;top:40px;" class="el-icon-circle-close-outline"></i>
            
        </el-dialog>
        <!-- <el-dialog title="确认关闭吗" :visible.sync="dialogVisible"></el-dialog> -->
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
import Footer from "~/components/common/footer.vue"; //引入公共底部
import {getStationDataByOrderNo,payOrder,checkPayStatus,GetAllServerList,cancelOrder} from '~/ajax/getData.js'
export default {
  data() {
    return { 
        loading:false,
        order:{
            
        },
        task:{

        },
        station:{
            Meta_title:'',
            tc:''
        },
        dialogVisible:false,
        src:'',
        orderList:[]
    };
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    Footer,
  },
  watch:{
      src(newValue){
          if(newValue){
              this.dialogVisible = true;
          }
      }
  },
  created(){
    this.order.orderNo = this.$route.query.orderNo;   //订单编号
    this.init();
  },
  methods:{
    async init(){
        let {status,data }= await getStationDataByOrderNo({orderNo:this.order.orderNo});
        if(status == 1){
            this.order = data.orderData;   //订单编号
            this.station = data.stationData
            if(data.taskData){
                this.orderList = data.orderList;   //子订单状态：0：未支付 1：已支付
                let {list} = await GetAllServerList();
                list&&list.map(server=>{
                    if(server.id==data.taskData.serviceTypeId){
                        this.task = Object.assign(data.taskData,{
                            serviceTypeTitle:server.serviceTypeName,
                            endTime:data.taskData.endTime.substr(0,10)
                        })
                    }
                })
            }
            if(data.stationData){
                //查询模板信息
                this.$jsonp('http://www.jjzhy.cn/api/json/content/content.ashx?action=content&companyid=598', 
                    { 
                        callbackName: 'mb',
                        jsoncallback:'mb',
                        id:data.stationData.code
                    }).then(json => {
                    if(json.status==1){
                        this.$set(this.station,'Meta_title',json.content[0].Meta_title)
                    }else{
                        this.$message.error('出错')
                    }
                }).catch(err => {
                　　console.log(err)
                })
                //查询套餐
                this.$jsonp('http://www.jjzhy.cn/api/json/shop/shop.ashx?action=shopdata&companyid=598',
                    {
                        callbackName: 'tc',
                        jsoncallback:'tc',
                        id:data.stationData.code
                    }).then(json => {
                        if(json.status==1){
                            json.shop_attribute.map((item,index)=>{ 
                                item.shop_attribute_data.map((att,ind)=>{
                                    if(att.shop_attribute_hh==data.stationData.hh){
                                        this.$set(this.station,'tc',item.shop_attribute_xh)
                                    }
                                })
                            })
                        }
                    }).catch(err => {
                    　　console.log('ss',err) 
                    })
            }
        }
    },
    async commit(id){
        this.$confirm(`<div style="margin:30px 0;">确定执行该操作吗？</div>`, '提示', {
            dangerouslyUseHTMLString: true,
            type:'warning',
            confirmButtonText: '确定',
            callback: async action => {
                if(action=='cancel') return ;
                this.loading = true;
                let {status,balance,returnmessage} = await payOrder({id});
                this.loading = false;
                if(status==1 && balance == 0){
                    this.$message.success('支付成功');
                    this.init();
                }else if(status==1 && balance > 0){
                    this.$alert(`<div style="margin:30px 0;">${returnmessage}</div>`, '提示', {
                        dangerouslyUseHTMLString: true,
                        type:'warning',
                        confirmButtonText: '确定',
                        callback: action => {
                            if(action=='confirm'){
                                this.src = `http://mubanke.wx.qkk.cn/OrderPay/Allpay?OrderID=${id}`; 
                            }else if(action=='cancel'){
                                this.$message.warning('您取消了支付');
                            }
                        }
                    });
                } 
            }
        })
    },
    recharge(id){
        this.src = `http://mubanke.wx.qkk.cn/OrderPay/Allpay?OrderID=${id}`
    },
    handleCancelOrder(id){
      this.$confirm(`<div style="margin:30px 0;">确定取消该订单吗？</div>`, '提示', {
        dangerouslyUseHTMLString: true,
        type:'warning',
        confirmButtonText: '确定',
        callback: action => {
            if(action=='confirm'){
                cancelOrder({id}).then(res=>{
                  if(res.status ==1){
                    this.$message.success(res.returnmessage);
                    this.init();
                    this.search.orderNo = '';
                    this.search.orderType = '-1';
                    this.search.status = '-1';
                  }else{
                    this.$message.success(returnmessage);
                  }
                })
            }
        }
      });
    },
  },
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
  .box-card{
      margin: 20px; 
      .order-detail-item{
          line-height: 50px;
          span{
              display: inline-block;
              &:first-child{
                  width: 100px;
                  text-align: right;
                  margin-right:15px;
              }
          }
      }
      .order-detail-item-last{
          margin: 0 0 50px;
      }
  }
  
} 
</style>
<style lang="scss">
.payDialog{
    .el-dialog{
        background: transparent;
        box-shadow:none;
    }
    .el-dialog__headerbtn .el-dialog__close {
        color:red;
    }
}

</style>








