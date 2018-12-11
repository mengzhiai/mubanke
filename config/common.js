/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return
    return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

export const setCookie = (cname, cvalue, exdays) =>{
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
export const getCookie = (cname)=> {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
//清除cookie  
export const clearCookie = (cname)=> {  
  var d = new Date();
  d.setTime(d.getTime() + ((-1)*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + "" + "; " + expires;
}  

export const clearAllCookie = ()=> {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if(keys) {
    for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=;path=/;expires=' + new Date(0).toUTCString()
  }
}



