import Vue from 'vue'

import 'normalize.css/normalize.css' // 重置浏览器的中的默认样式
import App from './App.vue' // 视图展示
import router from './router' // 路由
import store from './store' // vuex对象

import ElementUI from 'element-ui' // ElementUI
import './styles/element-variables.scss' // ElementUI样式
Vue.use(ElementUI)
Vue.prototype.$message = ElementUI.Message

import '@/assets/fonts/iconfont.css' // 使用FontClass使用icon
import IconFont from '_c/icon-font'
Vue.component('icon-font', IconFont)
import '@/assets/fonts/iconfont.js' // Symbol使用icon(多色)
import IconSvg from '_c/icon-svg'
Vue.component('icon-svg', IconSvg)

import '@/styles/index.scss' // 全局样式

if (process.env.NODE_ENV !== 'production') require('./mock') // 非生产环境，使用mockjs模拟

import * as filters from './filters' // 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
