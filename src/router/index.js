import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import NProgress from 'nprogress' // 跳转加载条
import 'nprogress/nprogress.css'
import {
  setTitle,
  getToken
} from '@/lib/util'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function (to, from, next) {
  NProgress.start()
  const token = getToken()

  if (token) {
    // 如果存在token，说明已经登录过了
    if (to.name === 'login') {
      next('/')
      NProgress.done()
    } else {
      if (store.state.user.hasGetUserinfo) {
        // 如果已经获取用户信息，则直接跳转到指定页面
        next()
      } else {
        // 否则获取用户信息后跳转
        store.dispatch('user/getUser')
          .then(res => {
            next()
          }).catch(err => {
            // 如果获取信息时出错，则退出系统，然后跳转到登录页
            store.dispatch('user/logout').then(res => {
              next('/login')
              NProgress.done()
            })
          })
      }
    }
  } else {
    // 不存在token，说明没有登录
    if (to.name === 'login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

})

router.afterEach(to => {
  to.meta && setTitle(to.meta.title)
  NProgress.done()
})

export default router
