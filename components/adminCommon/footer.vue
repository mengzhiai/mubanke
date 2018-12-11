<template>
  <footer class="footer">
    <div class="footer-main w12 clearable">
      <ul class="footer-link fl">
            <li class="link-squ">
              <div class="title-l">模板商城</div>
              <ul>
                <li><a href=""><span>SEO通用</span></a></li>
                <li><a href=""><span>企业商务</span></a></li>
                <li><a href=""><span>行业通用</span></a></li>
                <li><a href=""><span>网上商城</span></a></li>
                <li><a href=""><span>新闻用户</span></a></li>
                <li><a href=""><span>H5响应式</span></a></li>
              </ul>
            </li>
            <li class="link-squ">
              <div class="title-l">需求大厅</div>
              <ul>
                <li><a href=""><span>企业官网设计</span></a></li>
                <li><a href=""><span>品牌形象设计</span></a></li>
                <li><a href=""><span>APP开发</span></a></li>
                <li><a href=""><span>微信公众平台</span></a></li>
                <li><a href=""><span>小程序开发</span></a></li>
                <li><a href=""><span>公众号开发</span></a></li>
              </ul>
            </li>
            <li class="link-squ">
              <div class="title-l">成功案例</div>
              <ul>
                <li><a href=""><span>企业案例</span></a></li>
                <li><a href=""><span>行业案例</span></a></li>
                <li><a href=""><span>商城案例</span></a></li>
                <li><a href=""><span>SEO案例</span></a></li>
                <li><a href=""><span>H5案例</span></a></li>
              </ul>
            </li>
            <li class="link-squ">
              <div class="title-l">模板客学院</div>
              <ul>
                <li><a href=""><span>学院进阶</span></a></li>
                <li><a href=""><span>新手入门</span></a></li>
                <li><a href=""><span>UI设计学院</span></a></li>
                <li><a href=""><span>前端设计学院</span></a></li>
                <li><a href=""><span>高手进阶</span></a></li>
              </ul>
            </li>
            <li class="link-squ">
              <div class="title-l">关于模板客</div>
              <ul>
                <li><a href=""><span>公司介绍</span></a></li>
                <li><a href=""><span>联系方式</span></a></li>
                <li><a href=""><span>在线留言</span></a></li>
              </ul>
            </li> 
      </ul>
      <div class="footer-wx fl">
        <div><img src="/img/mbk/header-logo.png" alt=""><span>关注微信</span></div>
        <div><img src="/img/mbk/header-logo.png" alt=""><span>关注微信</span></div>
      </div>
      <div class="footer-contact fr">
        <div class="top">联系我们</div>
        <ul class="msg">
          <li>地址：天津市东丽区航空商务区A6楼302</li>
          <li>电话：400-955-9950</li>
          <li>座机：84956198转86</li>
          <li>E-mail：serves@jiujiukeji.net</li>
        </ul>
      </div>
    </div>
      
  </footer>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
@import "~static/common/css.scss";
  .footer{
    background: $white-color;
    padding: 40px 0;
    .footer-link{
      .link-squ{
        float: left;
        margin-right: 50px;
        text-align: center;
        .title-l{
          margin-bottom: 10px;
        }
        li{
          line-height: 30px;
          a{
            color:#666;
          }
        }
      }
    }
    .footer-wx{
      overflow: hidden;
      div{
        float: left;
        text-align: center;
        margin: 0 20px;
        color: #8C9093;
        img{
          width: 110px;
          height: 110px;
          display: block;
          margin-bottom: 5px;
        }
      }
    }
    .footer-contact{
      .top{
        font-size: 16px;
        color: #333333;
        margin-bottom: 20px;
      }
      .msg{
        li{
          line-height: 30px;
          color:#8C9093;
          font-size: 14px;
        }
      }
    }
  }
</style>
