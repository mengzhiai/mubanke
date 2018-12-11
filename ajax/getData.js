import http from '~/plugins/axios.js'
// import Mock from 'mock.js'
const IS_DEBUG = true;
/**
 * @function : 登录  
 * @author ：sherry 
 */
//手机验证码登录
export const userLongin = (data) => {return http.apiGet('/Login/LoginByPhone', data)}
//发送手机验证码
export const sendMessage = (data) => {return http.apiGet('Login/sendMess', data)}
//管理员登录
export const adminLogin = (data) => {return http.apiGet('AdminLogin/AdminLogin', data)}
//测试登录
export const loginTest = (data) => {return http.apiGet('Login/LoginTest', data)}
//清除登录信息
export const outLogin = (data) => {return http.apiGet('Login/OutLoging', data)}


 /**
  * 获取用户信息
  */
 export const getMyselfInfo = (data)=>{
   return http.apiGet('/AccountCenter/GetMyselfInfo',data)
 }
 //用户实名认证
 export const addUserNameCheckInfo = (data)=>{
   return http.apiGet('/AccountCenter/AddUserNameCheckInfo',data)
 }
 //获取认证信息
 export const getMyNameAuthenInfo = (data)=>{
  // return IS_DEBUG ? Mock.mock('http://123.com',{
  //   'name|3':'fei',//这个定义数据的模板形式下面会介绍
  //   'age|20-30':25,
  // }):
  return http.apiGet('/AccountCenter/GetMyNameAuthenInfo',data) 
}
 
/**
  * 保存用户信息
  */
export const saveUserInfo = (data)=>{
  return http.apiGet('/AccountCenter/SaveUserInfo',data)
}

export const setmeal = (mbId) =>{
  let data = {
    action:'shopdata',
    companyid:598, 
    id:mbId
  }
  return http.apiGet('api/json/shop/shop.ashx',data)
}

//账户中心-账户认证-邮箱认证
export const sendCheckEmailMessage = (data)=>{
  return http.apiGet('AccountCenter/SendCheckEmailMessage',data)
}

//账户中心-账户认证-邮箱认证-邮箱验证码
export const checkEmailCode = (data)=>{
  return http.apiGet('AccountCenter/CheckEmailCode',data)
}




/**
 * 站点
 */
//站点列表
export const stationList = (data)=>{return http.apiGet('Station/GetStationsList',data)}
//新建站点生成订单
export const addStationOrder = (data) =>{return http.apiGet('Station/AddStationOrder',data)}
//获取当前登录人所有的站点列表
export const getStationsByUserId = (data)=>{return http.apiGet('Station/GetStationsByUserId',data)}
//获取网站后缀名
export const getSuffix = (data)=>{return http.apiGet('OpenWeb/GetSuffix',data)}

/**
 * 订单详情
 */
export const getStationDataByOrderNo = (data) =>{ 
  return http.apiGet('OrderManager/GetStationDataByOrderNo',data)
}

/* 
  订单详情页
*/
export const GetStationInfoById = (data) =>{
  return http.apiGet('Station/GetStationInfoById', data)
}

/**
 * 订单支付
 */
export const payOrder = (data) =>{
  return http.apiGet('OrderManager/PayOrder',data)
}
/**
 * 微信、支付宝支付
 */
export const allpay = (data) =>{
  return http.apiGet('OrderPay/Allpay',data)
}
/**
 * 继续支付是否成功
 */
export const checkPayStatus = (data) =>{
  return http.apiGet('Station/CheckPayStatus',data)
}
/**
 * 订单列表
 */
export const getOrderList =(data)=>{
  return http.apiGet('OrderManager/GetOrderList',data)
}

//服务审核列表
export const getAllToCheckTaskList =(data)=>{return http.apiGet('AdminTask/GetAllToCheckTaskList',data)}
//服务详情
export const getTaskByTaskId =(data)=>{return http.apiGet('AdminTask/GetTaskByTaskId',data)}
//服务审核
export const checkTask =(data)=>{return http.apiGet('AdminTask/CheckTask',data)}
//服务审核不通过增加子订单
export const addChildOrder = (data)=>{return http.apiGet('AdminTask/AddChildOrder',data)}

/**
 * 取消订单
 */
export const cancelOrder =(data)=>{
  return http.apiGet('OrderManager/CancelOrder',data)
}
/**
 * 支付完成后开站
 */
export const openStation = (data) =>{
  return http.apiPost('Station/OpenStation',data)
}
/**
 * 服务分类
 */
export const GetAllServerList = (data)=>{
  return http.apiGet('Task/GetAllServiceList',data)

}

//账户提现
export const userApplyCash = (data)=>{
  return http.apiGet('AccountCenter/UserApplyCash',data)
}
//账户充值
export const rechargeBalance = (data)=>{
  return http.apiGet('/AccountCenter/RechargeBalance',data)
}

/**
 * 任务
 */
//发布任务
export const AddTask = (data)=>{return http.apiPost('Task/AddTask',data)}
//关闭任务
export const revokeTask = (data)=>{return http.apiGet('Task/RevokeTask',data)}
// 获取我竞标的信息列表
export const getBidInfoListByUser = (data)=>{return http.apiGet('Task/GetBidInfoListByUser',data)}
//雇主任务详情
export const getEMTaskByTaskId =(data)=>{return http.apiGet('Task/GetTaskByTaskId',data)}
//根据任务Id获取竞标数据列表
export const getBiddingListByTaskId =(data)=>{return http.apiGet('Task/GetBiddingListByTaskId',data)}
//服务商中标
export const winBid =(data)=>{return http.apiGet('Task/WinBid',data)}
//服务商
export const getBidDetById =(data)=>{return http.apiGet('Task/GetBidDetById',data)}
//根据Id精确查找合同
export const getContractDtoById =(data)=>{return http.apiGet('Task/GetContractDtoById',data)}
//服务商雇主操作合同
export const signContract =(data)=>{return http.apiGet('Task/SignContract',data)}
/**
 * 任务
 */



/**
 * 判断账户余额
 */
export const JudgeUserMoney = (data)=>{
  return http.apiGet('AccountCenter/JudgeUserMoney',data)

}

/**
 * 支付服务订单
 */
export const PayTask = (data)=>{
  return http.apiGet('Task/PayTask',data)
}

/**
 * 获取雇主发布的任务列表
 */
export const GetTasksByUserId = (data)=>{
  return http.apiGet('Task/GetTasksByUserId',data)
}

/**
 * 个人中心 -- 我参与的任务
 */
export const getMyTaskListByPage = (data)=>{
  return http.apiGet('MyMBK/GetMyTaskListByPage',data)
}

/**
 * 个人中心 -- 我关注的任务
 */
export const getMyFollowedTaskListByPage = (data)=>{
  return http.apiGet('MyMBK/GetMyFollowedTaskListByPage',data)
}
/**
 * 个人中心 -- 我关注的雇主
 */
export const getMyFollowedUserListByPage = (data)=>{
  return http.apiGet('MyMBK/GetMyFollowedUserListByPage',data)
}
/**
 *头像上传
 */
export const upLoadHeadPhoto = (data)=>{
  return http.apiPost('AccountCenter/UpLoadHeadPhoto',data)
}
/**
 * 文件上传
 */
export const Upfile = (data)=>{
  return http.apiPost('Task/UpLoadFile',data)
}

/**
 * 管理员
 */

 //管理员登录信息
 export const getAdminInfo = (data)=>{
  return http.apiGet('AdminUser/GetAdminInfo',data)
}
 //管理员退出登录
 export const outLogingAdmin = (data)=>{
  return http.apiGet('AdminLogin/OutLogingAdmin',data)
}



//管理员获取所有的用户审核信息
export const getAllToCheckUserInfo = (data)=>{
  return http.apiGet('AdminUser/GetAllToCheckUserInfo',data)
}
//管理员审核实名认证
export const checkNameAuthentication = (data)=>{
  return http.apiGet('AdminUser/CheckNameAuthentication',data)
}
//根据Id获取用户单个详细验证信息
export const getCheckUserInfoById = (data)=>{
  return http.apiGet('AdminUser/GetCheckUserInfoById',data)
}
//管理员获取所有的用户列表
export const getAllUser = (data)=>{
  return http.apiGet('AdminUser/GetAllUser',data)
}
//操作用户启用与否
export const operateUser = (data)=>{
  return http.apiGet('AdminUser/OperateUser',data)
}
//操作记录
export const getLogList = (data)=>{
  return http.apiGet('SystemLog/getLogList',data)
}


//服务商竞标
export const bidTask = (data)=>{
  return http.apiPost('Task/BidTask',data)
}



//提现
export const getAllToCheckCash = (data)=>{
  return http.apiGet('AdminUser/GetAllToCheckCash',data)
}
