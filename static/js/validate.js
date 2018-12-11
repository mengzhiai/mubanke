export const validatePhone = (rule, value, callback)=>{
    if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (!/^1[345789]\d{9}$/.test(value)){
            callback(new Error('手机号格式不正确'));
        }
        callback();
      }

}