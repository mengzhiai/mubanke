import axios from 'axios'
export default function({$axios,redirect}){
    $axios.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    }, 
    error => {
        if(error.response.status === 401){
        location.href = '/login.html'
        }
        if(error.response.data.status = 999){
        location.href = '/login.html'
        }
    
    });
    return axios;
}