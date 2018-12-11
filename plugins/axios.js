import axios from 'axios'
import { Message } from 'element-ui';
import Qs from 'qs'
axios.defaults.timeout = 15000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.browser?process.env.NODE_ENV === 'development'?`/api/`:`http://${location.host}/`:process.env.NODE_ENV === 'development'?`/api/`:`http://mubanke.wx.qkk.cn/`
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {  
  var param = config.params;
  if(param){ 
    var params = Object.assign(config.params,{
      time:new Date().getTime()
    })
  }else{
    var params ={  
      time:new Date().getTime()
    }  
  }
  return Object.assign(config,{
    params:params
  }) 
}, error => { 
  return Promise.reject(error)
}) 
axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  }, 
  error => {
    const actions = new Map([
      [401,'未授权'],
      [999,'未登陆'],
      [500,'网络连接有误'],
      [502,'数据格式有误，请重新上传'],
      [504,'网络连接有误'],
    ])
    for(let action of actions){
      if(error.response.status === action[0]){
        Message.closeAll()
        Message.warning(action[1]);
      }
    }
    if(error.response.status === 401){
      // location.href = '/login.html'
    }
    if(error.response.data.status = 999){ 
      // location.href = '/login.html'
    }
    return Promise.reject(error)
  });
const apiMethods = {
  apiGet(url, data) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params: data }).then((response) => {
        resolve(response.data);
      }).catch(function (error) {
        resolve(error); 
      });
    })
  }, 
  apiPost(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then((response) => {
        resolve(response.data)
      }).catch((response) => {
        resolve(response)
      })
    })
  },
  apiDelete(url, id) {
    return new Promise((resolve, reject) => {
      axios.delete(url + id).then((response) => {
        resolve(response.data)
      }, (response) => {
        reject(response)
      })
    })
  },
  apiDeleteParam(url, params) {
    return new Promise((resolve, reject) => {
      axios.delete(url, {data:params}).then((response) => {
        resolve(response.data)
      }, (response) => {
        reject(response)
      }) 
    })
  },
  apiPut(url, id, obj) {
    return new Promise((resolve, reject) => {
      axios.put(url + id, obj).then((response) => {
        resolve(response.data)
      }, (response) => {
        reject(response) 
      })
    })
  },
  apiAll(list) {
    return new Promise((resolve, reject) => {
      axios.all(list).then((response) => {
        resolve(response)
      }, (response) => {
        reject(response)
      })
    })
  }
}
export default apiMethods


 