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
            <div class="fl title-l">完善站点基本信息</div>
          </div>
          <div class="body new-site">
            <el-form  ref="form" :model="form" label-width="140px" :rules="rules">
              <el-form-item prop="companyName" class="inputWidth" label="网站名称">
                <el-input name="companyName" placeholder="请输入网站名称"  v-model="form.companyName" :minlength="2" :maxlength="50" clearable ></el-input>
              </el-form-item>
              <el-form-item label="站点赠送域名" prop="companyLxren">
                  http://<el-input style="width: 200px;" :maxlength="50" v-model="form.companyLxren" clearable></el-input>
                  <el-select style="width: 180px;"  v-model="form.companyDept" placeholder="后缀名">
                    <el-option v-for="(suf,index) in suffix" :key="index" :label="suf.className" :value="suf.classId"></el-option>
                  </el-select>
              </el-form-item>
              <!-- <el-form-item label="静态文件后缀名" class="inputWidth">
                <el-radio-group v-model="form.companyUrl">
                  <el-radio label="html">html</el-radio>
                  <el-radio  label="shtml">shtml</el-radio>
                </el-radio-group>
              </el-form-item> -->
              <el-form-item label="站点描述" class="inputWidth">
                <el-input placeholder="请输入站点描述" :minlength="2"  :maxlength="50" v-model="form.stationDescription" clearable ></el-input>
              </el-form-item>
              <el-form-item label="站点公司名称" class="inputWidth">
                <el-input placeholder="请输入点公司名称" :minlength="2" :maxlength="50" v-model="form.companyCountry" clearable ></el-input>
              </el-form-item>
              <el-form-item label="负责人" class="inputWidth">
                <el-input placeholder="请输入负责人" :minlength="2" :maxlength="50" v-model="form.companyFzren"  clearable></el-input>
              </el-form-item>
              <el-form-item prop="companyPhone" label="站点联系人手机" class="inputWidth">
                <el-input placeholder="请输入站点联系人手机" :minlength="2" :maxlength="50" v-model="form.companyPhone" clearable></el-input>
              </el-form-item>
              <el-form-item label="座机号码" class="inputWidth">
                <el-input
                  placeholder="请输入座机号码"
                  :minlength="2"
                  :maxlength="50"
                  v-model="form.companyMSN"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="传真号码" class="inputWidth">
                <el-input
                  placeholder="请输入传真号码"
                  :minlength="2"
                  :maxlength="50"
                  v-model="form.companyFax"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="联系地址" class="inputWidth">
                <el-input
                  placeholder="请输入联系地址"
                  :minlength="2"
                  :maxlength="50"
                  v-model="form.companyAddress"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="邮政编码" class="inputWidth">
                <el-input
                  placeholder="请输入邮政编码"
                  :minlength="2"
                  :maxlength="50"
                  v-model="form.companyPost"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="companyWangWang" label="电子邮箱" class="inputWidth">
                <el-input
                  placeholder="请输入电子邮箱"
                  :minlength="2"
                  :maxlength="50"
                  v-model="form.companyWangWang"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="companyRegTime" label="站点绑定省市区县地址" class="inputWidth">
                <el-select style="width:115px;" v-model="provinceD" placeholder="请选择省" @change="getCity">
                      <el-option  v-for="(item,index) in province" :key="index" :label="item.name"  :value="item.name"></el-option>
                  </el-select>
                  <el-select style="width:115px;"  v-model="cityD" placeholder="请选择市" @change="getArea(provinceD,cityD)">
                      <el-option  v-for="(item,index) in city" :key="index" :label="item.name"  :value="item.name"></el-option>
                  </el-select>
                  <el-select style="width:115px;"  v-model="areaD" placeholder="请选择区">
                      <el-option  v-for="(item,index) in area" :key="index" :label="item.name"  :value="item.name"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item prop="companySmallContent" label="备注" class="inputWidth">
                <el-input style="width: 360px" type="textarea" resize="none" rows="4" placeholder="请输入备注"  :minlength="2" :maxlength="2000"  
                v-model="form.companySmallContent" clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="companyMap" label="地图位置" >
                <div id="map" style="width:660px;height:400px;margin:10px auto;"></div>
              </el-form-item>
              
              <el-form-item style="border-top:1px solid #f0f0f0;padding-top:30px;margin-bottom:0;">
                <el-button  @click="startSite" class="red-btn">保存</el-button>
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

import { openStation,GetStationInfoById,getSuffix } from "~/ajax/getData.js";
import provinceData from '~/static/js/provinces.json'
import cityData from '~/static/js/cities.json'
import areaData from '~/static/js/areas.json'
import {TMap} from '~/plugins/txMap.js'
import { mapState, mapMutations } from "vuex"


export default {
  data() {
    var validatePhone = (rule, value, callback) => {
          if(!value){
            callback()
          }else{
            if (!/^1[123456789]\d{9}$/.test(value)){
              callback(new Error('手机号格式不正确'));
            }
          }
           callback();
      };
    var validateEmail = (rule, value, callback) => {
          if(!value){
            callback()
          }else{
            if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value)){
              callback(new Error('邮箱格式不正确'));
            }
          }
           callback();
      };
    return {
      form: {
        companyName: "",
        companyLxren: "",
        companyDept: "",
        companySmallContent: "",
        companyUrl: "html",
        stationDescription: "",
        companyCountry: "",
        companyFzren: "",
        companyPhone: "",
        companyMSN: "",
        companyFax: "",
        companyAddress: "",
        companyPost: "",
        companyWangWang: "",
        companyRegTime: "",
        orderNo: "",
        companyMap: "",
        stationId:""
      },
      rules: {
        companyName:[
          { required: true, message: "请输入网站名称", trigger: "blur"}
        ],
        companyLxren:[
          { required: true, message: "请输入赠送域名", trigger: "blur"}
        ],
        orderNo:[
          { required: true, message: "请输入订单号", trigger: "blur"}
        ],
        stationName:[
          { required: true, message: "请输入网站名称", trigger: "blur"}
        ],
        companyPhone: [
          { validator: validatePhone, trigger: "blur" }
        ],
        companyWangWang:[
          { validator: validateEmail, trigger: "blur" }
        ]
      },
      suffix:[],
      province:provinceData,
      city:[],
      area:[],
      provinceD:'',
      cityD:'',
      areaD:'',
    };
  },
  components: {
    SiteNav,
    HeaderWrap,
    MbkNav,
    MbkBreadcrumb,
    LeftMenu,
    Footer
  },
  created() {
    this.init()
  },
  computed:{
    ...mapState(["accountInfo"]) 
  },
  mounted() {
    TMap('OTDBZ-XMUKJ-AVTF7-FOAKP-X5C3J-C3F2T').then(qq => {
        let _this = this;
        var map = new qq.maps.Map(document.getElementById("map"),{
            center: new qq.maps.LatLng(39.916527,116.397128),
            zoom: 13
        })
        var smarker=new qq.maps.Marker({
            position:new qq.maps.LatLng(39.916527,116.397128),
			animation:qq.maps.MarkerAnimation.DROP,
            map:map
        });
        qq.maps.event.addListener(map, 'click', function(event) {
            if(smarker){
                smarker.setMap(null);  
            }
            _this.form.companyMap = event.latLng.getLat() + ', ' +event.latLng.getLng();
            console.log('您点击的位置为: [' + event.latLng.getLat() + ', ' +event.latLng.getLng() + ']');
            var marker=new qq.maps.Marker({
                position:event.latLng, 
                map:map
          });
          qq.maps.event.addListener(map, 'click', function(event) {
                marker.setMap(null);  
            });    
        });
        
    })
  },
  watch:{
    accountInfo(newV){
      this.form.companyPhone = newV.mobile;
      this.form.companyFzren = newV.realName;
    },
    'provinceD':function(newV){
      this.form.companyRegTime = `${newV}-${this.cityD}-${this.areaD}`
    },
    'cityD':function(newV){
      this.form.companyRegTime = `${this.provinceD}-${newV}-${this.areaD}`
    },
    'areaD':function(newV){
      this.form.companyRegTime = `${this.provinceD}-${this.cityD}-${newV}`
    }
  },
  methods: {
    async init(){
      let {status,data} = await GetStationInfoById({id:this.$route.query.out_trade_no});
      if(status===1){
        this.form.orderNo = data.orderNo
        this.form.stationId = this.$route.query.out_trade_no
        let {result:{status,suffix}} = await getSuffix({serverId:data.server})
        if(status === '1') {
          this.suffix = suffix;
          this.form.companyDept = this.suffix[0].classId
        }
      }
    },
    async startSite() {
      this.$refs.form.validate(async (valid,resData) => {
        if (valid) {
          let { status, returnmessage } = await openStation(this.form);
          if (status == 1) {
            this.$message.success(returnmessage);
            location.href = '/myMBK/employer/station/list.html';
          } else {
            this.$message.error(returnmessage.split('|')[0]);
          }
        }
      });
    },
    getCity(province){
        this.cityD = '';
        this.areaD = '';
        this.city = []
        let provinceCode ;
        for(let pro of provinceData){
            if(province == pro.name){
                provinceCode = pro.code
            }
        }
        cityData.map(city=>{
            if(city.provinceCode == provinceCode){
                this.city.push(city)
            }
        })
    },
    getArea(province,city){
        this.areaD = '';
        this.area = []
        let provinceCode,cityCode ;
        for(let pro of provinceData){
            if(province == pro.name){
                provinceCode = pro.code
            }
        }
        for(let cit of cityData){
            if(city == cit.name && provinceCode==cit.provinceCode){
                cityCode = cit.code
            }
        }
        areaData.map(area=>{
            if(area.cityCode == cityCode){
                this.area.push(area)
            }
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

  .body {
    padding: 25px 60px 25px 40px;

    .el-form {
      margin: 10px 0 50px;
      overflow: hidden;
      .mb-img {
        border: 1px solid #f0f0f0;
        width: 240px;
        height: 186px;
      }
      .server {
        color: #999999;
        font-size: 12px;
        line-height: 22px;
        text-align: center;
        padding: 10px 20px;
        border: 1px solid #dbdada;
        margin-right: 20px;
        cursor: pointer;
        &:last-of-type {
          margin-right: 0;
        }
        &.active {
          border-color: $theme-color;
          color: $theme-color;
        }
      }
      .mbtc {
        float: left;
        color: #999999;
        font-size: 12px;
        line-height: 31px;
        text-align: center;
        padding: 0px 20px;
        border: 1px solid #dbdada;
        margin-right: 20px;
        cursor: pointer;
        &:last-of-type {
          margin-right: 0;
        }
        &.active {
          border-color: $theme-color;
          color: $theme-color;
        }
      }
      .nx {
        float: left;
        color: #999999;
        font-size: 12px;
        line-height: 31px;
        text-align: center;
        padding: 0px 40px;
        border: 1px solid #dbdada;
        margin-right: 20px;
        cursor: pointer;
        &:last-of-type {
          margin-right: 0;
        }
        &.active {
          border-color: $theme-color;
          color: $theme-color;
        }
      }
      .acco {
        font-size: 12px;
        color: #333333;
        .total {
          font-size: 20px;
          font-weight: bold;
          color: #cc0001;
        }
      }
    }
    .tip {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }
}
</style>
<style lang="scss" >
.screen-main .new-site .fs14 .el-form-item__label {
  font-size: 14px;
  color: #333333;
}
.screen-main .new-site {
  .el-form-item {
    margin-bottom: 35px;
    position: relative;
    min-height: 40px;
    .el-form-item__label {
      position: absolute;
      // top: 50%;
      // transform:translateY(-50%);
      // line-height: 20px;
    }
  }
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    color: #cc0001;
  }
  .inputWidth{
    width: 500px;
    margin-bottom: 30px;
  }
}
</style>





