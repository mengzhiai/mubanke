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
                <div class="fl title-l">站点详情</div>
            </div>
                <div class="body new-site">
                    <el-form v-loading="loading" ref="form"  label-width="180px"  >
                        <el-form-item class="fs14" label="当前已选模板" >
                            <img class="mb-img" :src="station.images" alt="">
                        </el-form-item>
                        <el-form-item label="官方运营服务器" >
                            <div v-for="(item,index) in server.diaser" :key="index" class="fl server active">
                                <p>{{item.className}}</p>
                                <p>{{item.classText1}}</p>
                                <p>{{item.classText2}}</p>
                            </div>
                        </el-form-item>
                        <el-form-item class="fs14" style="margin:80px 0 50px 0;" label="套餐类型" >
                           {{station.tc}}
                        </el-form-item>
                        <!-- <el-form-item class="fs14" style="margin:80px 0 50px 0;" label="默认域名" >
                           {{station.domain}}
                        </el-form-item>
                        <el-form-item class="fs14" style="margin:80px 0 50px 0;" label="数据库管理域名" >
                           {{station}}
                        </el-form-item> -->
                        <el-form-item label="开通年限" prop="years" :show-message="false">
                            {{station.nx}}
                        </el-form-item>
                        <el-form-item label="总额" prop="name" :show-message="false">
                            <div class="acco">
                                <span class="total">￥{{station.amount}}</span>元
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
import SiteNav from "~/components/common/siteNav.vue"; //顶部登录
import HeaderWrap from "~/components/common/headerWrap.vue"; //顶部搜索
import MbkNav from "~/components/common/mbkNav.vue"; //顶部搜索
import MbkBreadcrumb from "~/components/common/mbkBreadcrumb.vue"; //面包屑
import LeftMenu from "~/components/common/leftMenu.vue"; //引入公共底部
import Footer from "~/components/common/footer.vue"; //引入公共底部
import jsonp from 'vue-jsonp'
import {getStationDataByOrderNo,GetStationInfoById} from '~/ajax/getData.js'
export default {
  data() {
    return {  
        loading:false,
        server:{
            "diaser": [{
                "classId": 194,
                "className": "华东服务器01",
                "classText1": "120.78.218.205",
                "classText2": "华东服务器01，需要备案",
                "classText3": "0",
                "classText4": "0",
                "classText5": "open",
                "classText6": "yes",
                "classText7": "0",
                "classText8": "0",
                "classText9": "",
                "classText10": "50",
                "classText11": "1",
                "classText12": "100",
                "classNote": "",
                "typeId": 10,
                "orderID": 1
            }],
                "diacopc": [{
                "classId": 86,
                "className": "多端合一企业版",
                "classText1": "8000",
                "classText2": "0",
                "classText3": "8000",
                "classText4": "10100,10002,10003,10004,10014,10015,10000,10001,10008,10010,10018,10030",
                "classText5": "36",
                "classText6": "0",
                "classText7": "0",
                "classText8": "",
                "classText9": "",
                "classText10": "",
                "classText11": "",
                "classText12": "",
                "classNote": "多端合一套餐企业版，适合以展示型为主的企业基础建站，同时可展示在电脑端，手机浏览器，微信公众平台",
                "typeId": 103,
                "orderId": 7,
                "delFg": 0,
                "yunId": 1002,
                "syid": 16
                }, {
                "classId": 87,
                "className": "多端合一商务版",
                "classText1": "10000",
                "classText2": "0",
                "classText3": "10000",
                "classText4": "10100,10002,10003,10004,10012,10014,10005,10016,10017,10015,10009,10000,10001,10008,10010,10018,10030",
                "classText5": "36",
                "classText6": "0",
                "classText7": "0",
                "classText8": "",
                "classText9": "",
                "classText10": "",
                "classText11": "",
                "classText12": "",
                "classNote": "多端合一商务版，适合有会员交互的企业商务建站，包含有会员系统，可以定制会员专用频道，同时可展示在电脑端，手机浏览器，微信公众平台",
                "typeId": 103,
                "orderId": 8,
                "delFg": 0,
                "yunId": 1002,
                "syid": 17
                }, {
                "classId": 88,
                "className": "多端合一电商版",
                "classText1": "15000",
                "classText2": "0",
                "classText3": "15000",
                "classText4": "10100,10002,10003,10004,10012,10014,10005,10016,10017,10006,10007,10015,10013,10009,10000,10001,10008,10010,10018,10022,10023,10030",
                "classText5": "36",
                "classText6": "0",
                "classText7": "0",
                "classText8": "",
                "classText9": "",
                "classText10": "",
                "classText11": "",
                "classText12": "",
                "classNote": "多端合一电商版，适合需要实现商品发布、会员注册、购物流程、支付流程的电商型网站，同时可展示在电脑端，手机浏览器，微信公众平台",
                "typeId": 103,
                "orderId": 9,
                "delFg": 0,
                "yunId": 1002,
                "syid": 18
                }]
        },
        images:'',
        station:{}
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
  created(){
        this.init();
  },
  computed:{
  },
  methods:{
    async init(){
        let {status,data} = await GetStationInfoById({id:this.$route.query.out_trade_no});
        if(status == 1){
        this.station = data;
        //查询模板信息
        this.$jsonp('http://www.jjzhy.cn/api/json/content/content.ashx?action=content&companyid=598', 
            { 
                callbackName: 'mb',
                jsoncallback:'mb',
                id:data.code
            }).then(json => {
            if(json.status==1){
                this.$set(this.station,'Meta_title',json.content[0].Meta_title)
                this.$set(this.station,'images',json.content[0].images)
            }else{
                this.$message.error('出错')
            }
        })
        //查询套餐
        this.$jsonp('http://www.jjzhy.cn/api/json/shop/shop.ashx?action=shopdata&companyid=598',
            {
                callbackName: 'tc',
                jsoncallback:'tc',
                id:data.code
            }).then(json => {
                if(json.status==1){
                    json.shop_attribute.map((item,index)=>{ 
                        item.shop_attribute_data.map((att,ind)=>{
                            if(att.shop_attribute_hh==data.hh){
                                this.$set(this.station,'tc',item.shop_attribute_xh)
                                this.$set(this.station,'nx',att.shop_attribute_gg)
                            }
                        })
                    })
                }
            })
        }
    },
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
    
    .el-form{
        margin: 10px 0 50px;
        overflow: hidden;
        .mb-img{
            border: 1px solid #f0f0f0;
            width: 240px;
            height: 186px;
        }
        .server{
            color: #999999;
            font-size:12px;
            line-height: 22px;
            text-align: center;
            padding: 10px 20px;
            border: 1px solid #dbdada;
            margin-right: 20px;
            cursor:pointer;
            &:last-of-type{
                margin-right: 0;
            }
            &.active{
                border-color: $theme-color;
                 color: $theme-color;
            }
        }
        .mbtc{
            float: left;
            color: #999999;
            font-size:12px;
            line-height: 31px;
            text-align: center;
            padding: 0px 20px;
            border: 1px solid #dbdada;
            margin-right: 20px;
            cursor:pointer;
            &:last-of-type{
                margin-right: 0;
            }
            &.active{
                border-color: $theme-color;
                color: $theme-color;
            }
        }
        .nx{
            float: left;
            color: #999999;
            font-size:12px;
            line-height: 31px;
            text-align: center;
            padding: 0px 40px;
            border: 1px solid #dbdada;
            margin-right: 20px;
            cursor:pointer;
            &:last-of-type{
                margin-right: 0;
            }
            &.active{
                border-color: $theme-color;
                color: $theme-color;
            }
        }
        .acco{
            font-size: 12px;
            color:#333333;
            .total{
                font-size:20px;
                font-weight:bold;
                color:#CC0001;
            }
        }
    }
    .tip{
        font-size:12px;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height: 20px;
    }
    
  }
}
</style>
<style lang="scss" >
    .screen-main .new-site .fs14 .el-form-item__label{
         font-size:14px;
         color:#333333;
    }
    .screen-main .new-site  {
        .el-form-item{
            margin-bottom: 35px;
            position: relative;
            min-height: 40px;
            .el-form-item__label{
                position: absolute;
                // top: 50%;
                // transform:translateY(-50%);
                // line-height: 20px;
            }
        }
        .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before{
            color: #cc0001;
        }
    }
    .payType{
        #tab-wechart{
            &.el-tabs__item.is-active{
                color:rgb(0,211,12);
            }
        }
        #tab-ali{
            &.el-tabs__item.is-active{
                color:rgb(27,171,234);
            }
        }
        .el-tabs__active-bar{
            background:rgb(27,171,234);
        }
        .el-tabs__item:hover{
            color:#303133;
        }
        .el-dialog__header{
            display:none;
        }
        #pane-ali{
            background:rgb(27,171,234);
            padding: 50px;
            width:360px;
            margin: 20px auto;
            text-align:center;
            border-radius:5px;
            box-shadow:0px 0px 20px 0px #aaa;
        }
        #pane-wechart{
            background:rgb(0,211,12);
            padding: 50px;
            width:360px;
            margin: 20px auto;
            text-align:center;
            border-radius:5px; 
            box-shadow:0px 0px 20px 0px #aaa;
        }
        .el-tab-pane{
            &>div{
                background: rgb(255, 255, 255); 
                padding: 20px;
                img{
                    width: 100%;
                }
            }
            .orderid{
                margin-bottom:10px;
            }
            
        }
    }
</style>







