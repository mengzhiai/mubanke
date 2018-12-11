
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import mutations from './mutations.js'
const state = {
  //用户信息
  accountInfo:{},
  isLogin:true
}

const createStore = () => {
  return new Vuex.Store({
    state,
    mutations
  })
}
export default createStore
