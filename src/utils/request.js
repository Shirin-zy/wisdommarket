import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'

// 创建axios实例并对其进行自定义，这样可以避免影响到原始的axios实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'h5' }
})

// 自定义配置-请求/响应拦截器
// 1.添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 发起请求时添加loading效果并禁止其它操作以避免重复请求
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'h5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 2.添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    // 请求成功后关闭loading效果，且Toast是单例模式，同时只能存在一个，后面的会覆盖前面的效果
    Toast.clear()
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
