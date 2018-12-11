
import {
  ACCOUNT_INFO,IS_LOGIN
} from './mutation-types.js'
export default {
  [ACCOUNT_INFO] (state,value){
    state.accountInfo = value
  },
  [IS_LOGIN] (state,value){
    state.isLogin = value
  }
}
