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
                <div class="fl title-l">基本资料</div>
            </div>
            <div class="body">
                <div class="photo-box">
                    <div class="thumb">
                        <img :src="form.headPhotoUrl?baseUrl+form.headPhotoUrl:'/img/mbk/logo.png'" alt="用户头像">
                    </div>
                    <div class="title-s">
                        真人照片作为头像可提高交易对象对您的信任，
                        <el-upload accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF,.BMP.PNG" :http-request="handleUpload" style="display:inline-block;" action="" class="upload-demo" :show-file-list="false">
                            <span class="blue-font">编辑头像</span>
                        </el-upload>
                    </div> 
                </div>
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="用户名" >
                        <span>{{form.userName}}</span>
                    </el-form-item>
                    <el-form-item label="昵称" >
                        <el-input class="w-270" v-model.trim="form.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="企业名称" >
                        <el-input disabled class="w-270" v-model.trim="form.companyName"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" >
                        <el-radio-group v-model.trim="form.gender">
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                     <el-form-item label="手机号码" >
                         <div>
                             <el-input disabled class="w-270" v-model.trim="form.mobile"></el-input>
                         </div>
                        
                        <div class="tip">用于接受重要提醒（仅方便用于模板客客服联系您，请您放心填写）</div>
                        
                    </el-form-item>
                    <el-form-item label="电子邮箱" >
                        <div>
                            <el-input class="w-270" v-model="form.email"></el-input>
                            <a href="/account/authentication/email/mailAuth.html"><span class="blue-font title-s">认证邮箱</span></a>
                        </div>
                    </el-form-item>
                    <el-form-item label="固定电话" >
                        <div>
                            <el-input class="w-270" v-model="form.tel"></el-input>
                        </div>
                        <div class="tip">请输入自己的固定电话，格式如：010-123456</div>
                    </el-form-item>
                    <el-form-item label="QQ" >
                        <el-input class="w-270" v-model="form.qq"></el-input>
                    </el-form-item>
                    <el-form-item label="微信" >
                        <el-input class="w-270" v-model="form.weChat"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区" >
                        <el-select style="width:140px;" v-model="form.province" placeholder="请选择省" @change="getCity">
                            <el-option  v-for="(item,index) in province" :key="index" :label="item.name"  :value="item.name"></el-option>
                        </el-select>
                        <el-select style="width:140px;" v-model="form.city" placeholder="请选择市" @change="getArea">
                            <el-option  v-for="(item,index) in city" :key="index" :label="item.name"  :value="item.name"></el-option>
                        </el-select>
                        <el-select style="width:140px;" v-model="form.address" placeholder="请选择区">
                            <el-option  v-for="(item,index) in area" :key="index" :label="item.name"  :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址" >
                        <div>
                            <el-input class="w-270" v-model.trim="form.addressDetail"></el-input>
                            <span @click="openMap" style="cursor:pointer;" class="blue-font title-s">标注地图</span>
                        </div>
                        <div class="tip">请输入详细地址，不含省市</div> 
                    </el-form-item>
                    <el-form-item label="个人简介" >
                        <el-input rows="5" cols="10" resize="none" type="textarea" v-model.trim="form.introduce"></el-input>
                        <div class="tip">请输入至少4-200个字，支持中文，英文</div>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="commit" class="red-btn">保存</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog title="地理位置"  :visible.sync="dialogVisible" width="800px" :modal="false">
                    <div id="map"  style="width:760px;height:400px;margin:0 auto 0;"></div>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                  </span>
                </el-dialog>
            </div>
        </div>
      </div>
      <Footer></Footer>  
    </div>
    </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import SiteNav from "~/components/common/siteNav.vue"; //顶部登录
import HeaderWrap from "~/components/common/headerWrap.vue"; //顶部搜索
import MbkNav from "~/components/common/mbkNav.vue"; //顶部搜索
import MbkBreadcrumb from "~/components/common/mbkBreadcrumb.vue"; //面包屑
import LeftMenu from "~/components/common/leftMenu.vue"; //引入公共底部
import Footer from "~/components/common/footer.vue"; //引入公共底部
import {baseUrl} from '~/config/async/env'
import { upLoadHeadPhoto,getMyselfInfo,saveUserInfo } from '~/ajax/getData'
import {TMap} from '~/plugins/txMap.js'
import provinceData from '~/static/js/provinces.json'
import cityData from '~/static/js/cities.json'
import areaData from '~/static/js/areas.json'
export default {
  data() {
    return { 
        dialogVisible:false,
        baseUrl:baseUrl,
        form:{
            headPhotoUrl:'',
            name:'',
            priceType:'1',
            imageUrl:'',
            gender:'',
        },
        province:provinceData,
        city:[],
        area:[]
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
  created() {
      this.init();
  },
  mounted() {
      
  },
  methods:{
    async init(){
        let json = await getMyselfInfo(); 
        if(json.status==1){
            this.form = json.data;
        }
    },
    openMap(){
        this.dialogVisible = true;
        TMap('OTDBZ-XMUKJ-AVTF7-FOAKP-X5C3J-C3F2T').then(qq => {
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
    selectMap(){

    },
    commit(){
        saveUserInfo(this.form).then(res=>{
            if(res.status==1){
                 this.$message.success(res.returnmessage);
                 this.init()
            }else{
                 this.$message.error(res.returnmessage)
            }
        })
    },
    async handleUpload(item){
        let formData = new FormData()
        formData.append('file', item.file)
        let {state,url} = await upLoadHeadPhoto(formData)
        if(state === "SUCCESS"){
            this.form.headPhotoUrl = url;
        }else{
            this.$message.error('上传失败，请重新上传')
        }
    },
    getCity(province){
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
    getArea(city){
        this.area = []
        let cityCode ;
        for(let cit of cityData){
            if(city == cit.name){
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
      .photo-box{
          text-align: center;
          margin:60px 0;
          .thumb{
              border: 1px solid #dcdfe6;
              width: 120px;
              height: 120px;
              margin:0 auto;
          }
          img{
              width: 120px;
              height: 120px;
          }
          .title-s{
              line-height: 40px;
          }
      }
    padding: 25px 60px 25px 40px;
    .tip{
        font-size:12px;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height: 20px;
    }
  }
}
</style>




