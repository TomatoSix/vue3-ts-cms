import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
// 全局引入element-plus 针对vue3开发的一个组件库
// 打包后的包很大
import ElementPlus from 'element-plus'
// 引入element-plus样式
import 'element-plus/lib/theme-chalk/index.css'

// import hyRequest from './service/index'

import App from './App.vue'
// 注册路由
import router from './router'
// 注册vuex
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

app.use(store)
app.use(ElementPlus)
// 下面两行顺序不能换
setupStore()
app.use(router)

app.mount('#app')

// console.log(process.env.VUE_APP_BASE_URL, '111')
