/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 */
let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = `http://localhost:29414/`;
} else if (process.env.NODE_ENV === 'production') {
  if(process.browser){
    baseUrl =  `http://${location.host}/`
  }else{
    baseUrl = `http://mubanke.wx.qkk.cn/`
  }
  
}
export {
  baseUrl
}
