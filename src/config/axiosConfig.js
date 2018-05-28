import axios from 'axios';

axios.defaults.timeout = 10000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头

//(添加请求拦截器)
axios.interceptors.request.use((config) => {
  let token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
},(error) =>{
  // _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
  //对响应数据做些事
  if(res.data.info == 1){
    console.log(res.data.msg);
  }
  return res;
}, (error) => {
  console.log("网络异常", 'fail');

});

export default axios

