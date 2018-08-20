import axios from 'axios'
import router from '@/router/index'
import {getToken} from './auth'

export const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 添加请求拦截器
// 拦截器的本身就是一个方法
// 该方法什么时候执行？
// 拦截器函数接收一个参数 config
// config 就是你当前请求的配置对象
// 当你使用 axios 发起请求的时候，那么就会先经过这个拦截器然后再发出请求
// 也就是说在请求拦截器内部的请求还没有发出去
// 我们可以在这里定制请求之前的行为
http.interceptors.request.use(function (config) {
  // 如果本次请求的不是 /login 接口，则我们就加入请求头
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
  }

  // return config 就好比 next() 允许通过
  // 通过之后才要真正的发起请求
  return config
}, function (error) { // 当请求出错的时候会调用到第二个参数函数
  // Do something with request error
  return Promise.reject(error)
})

// http 响应拦截器
// 我们可以在这里对一些公共的业务进行处理
// 例如需要对每个接口进行 403 权限认证判断
// 如果本地响应的数据是 403 ，则我们提示用户：你没有权限执行该操作
http.interceptors.response.use(function (response) {
  const {meta} = response.data
  if (meta.status === 403) {
    window.alert('你没有权限执行该操作！')
  } else if (meta.status === 401) {
    // 如果用户长时间未操作导致 token 失效或者有人恶意伪造 token
    // 我们也不允许他进入我的系统界面
    // 所以我们这里通过对 401 统一拦截跳转到登录页

    // 1. 我们只需要告诉登陆组件，我从哪里跳过来的
    //    通过 url 地址告诉登陆组件
    // 2. 登陆成功之后，看一下 url 中有没有一个叫 redirect 的字段
    //    如果有就往这里跳，如果没有默认往 home 跳
    router.push({
      name: 'login',
      query: {
        redirect: window.location.hash
      }
    })
  }

  // 类似于 next()，放行通过响应拦截器
  return response
}, function (error) {
  return Promise.reject(error)
})

// 建议通过定义插件的配置来扩展 Vue 本身
// 1. 定义一个插件对象
const httpPlugin = {}

// 2. 为插件对象添加一个成员：install
//    install 是一个函数
//    该函数接收两个参数：Vue、options
//
//   Vue.use(httpPlugin) 会来调用 install 方法
httpPlugin.install = function (Vue, options) {
  // 3. 添加实例方法
  Vue.prototype.$http = http
}

// 4. 导出插件对象
export default httpPlugin

// 5. 在入门文件模块 main.js 加载使插件生效
// Vue.use(httpPlugin)
