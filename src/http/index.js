import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { HOST } from '@/config'
//js文件中使用但不use
import Toast from '@/components/packages/toast'

// 默认配置,作用于每个请求 axios 配置
axios.defaults.timeout = 20000
axios.defaults.baseURL = HOST
// 请求头:告诉服务器请求内容的格式
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'


// 请求拦截器
axios.interceptors.request.use(config => {
  // 发送请求前做些什么...
  if (store.state.user.token) {
    // 如果本地存有token 设置权限请求头 请求权限数据
    config.headers['Authorization'] = 'Bearer ' + store.state.user.token
  }
  return config
  // 请求错误做些什么...
}, function (error) {
  // 抛出异常
  return Promise.reject(error)
})

// 返回拦截器
axios.interceptors.response.use(res => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么...
  if (res.status === 200) {
    // 判断后端自定义的code
    if (res.data.code >= 400) {
      Toast({
        position: 'top',
        message: res.data.message
      })
    }
    // console.log(res);
    // res是axios包装之后的对象 
    // 直接拿到我们需要的data数据
    return res.data
  }
  // 此处接口只要有返回，无论是什么错误，都重新整理为以下通用格式
  return {
    code: res.status_code,
    message: res.message,
    data: {}
  }

}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么...
  
  // console.log(error.response)
  
  if (String(error).includes('timeout')) {
    Toast('网络请求超时')
    console.log(error);
    
  } 
  
  else if (String(error).includes('Network Error')) {
    Toast('网络异常')
    router.push({
      path: '/offline'
    })
  } 
  
  else if (error.response) {
    // 获取error.response中k的v值
    const { status, statusText } = error.response
  

    // 后端定义的未登录状态 token失效或者被篡改
    if (status === 401) {
      // // 清空
      store.commit("user/SET_USER", null);
      store.commit("user/SET_TOKEN", "");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // console.log(router.currentRoute.name);
      if (!['Login', 'Profile', 'Register', 'NotFound', 'Forget'].includes(router.currentRoute.name)) {
        router.push({
          path: '/login',
          query: { redirect: router.currentRoute.fullPath }
        })
      // code 401 message a...
      return error.response.data
    }
    Toast(status + ' ' + statusText)
  }

  return {
    'code': 400,
    'messsage': 'error'
  }
}})


export default {
  get(url, params) {
    return axios({
      method: 'get',
      url,
      params
    })
  },

  post(url, data) {
    return axios({
      method: 'post',
      url,
      data
    })
  },

  patch(url, data) {
    return axios({
      method: 'patch',
      url,
      data
    })
  },

  put(url, data) {
    return axios({
      method: 'put',
      url,
      data
    })
  },

  delete(url, data) {
    return axios({
      method: 'delete',
      url,
      data
    })
  }
}