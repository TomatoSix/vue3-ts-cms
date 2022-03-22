import axios from 'axios'

// axios实例对象
// 模拟get请求
// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res)
// })

// axios配置选项
axios.defaults.baseURL = 'http://httpbin.org'

// axios拦截器
// fn1: 请求发送成功时会执行的函数
// fn2: 请求发送失败时会执行的函数
axios.interceptors.request.use(
  (config) => {
    console.log(config, 'config')
    // 1. 给请求添加token
    // 2. isLoaing动画
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)
// fn1: 数据响应成功
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)

axios
  .get('/get', {
    params: {
      name: 'tomatosix',
      age: 18
    }
  })
  .then((res) => {
    console.log(res)
  })
