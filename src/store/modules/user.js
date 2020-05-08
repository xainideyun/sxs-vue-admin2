import {
  login,
  getUserinfo,
  getRole
} from '@/api/user' // 用户信息的api接口
import {
  setToken
} from '@/lib/util' // 系统业务相关的公共方法
import router, {
  resetRouter
} from '@/router'

/**
 * 保存用户信息的store
 */
export default {
  namespaced: true, // 使用命名空间
  state: {
    hasGetUserinfo: false, // 是否已经获取用户信息
    token: '', // 登录后得到的token
    userinfo: {} // 用户信息
  },
  mutations: {
    // 提交登录信息
    LOGIN(state, token) {
      state.token = token
    },
    // 设置用户信息
    SET_USERINFO(state, user) {
      state.userinfo = user
      state.hasGetUserinfo = true
    },
    LOGOUT(state) {
      state.userinfo = {}
      state.token = ''
      state.hasGetUserinfo = false
    }
  },
  actions: {
    /**
     * 根据用户名密码，异步请求登录
     * @param { store } store对象
     * @param { Object } 用户信息
     */
    login({
      commit
    }, userinfo) {
      const {
        username,
        password
      } = userinfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => { // 调用登录接口，得到返回数据
          commit('LOGIN', res.token) // 提交登录结果
          setToken(res.token) // 设置cookie
          resolve(res) // 返回异步成功方法
        }).catch(err => {
          reject(err) // 返回异步失败方法
        })
      })
    },
    /**
     * 获取用户信息
     * @param { store } 提交函数
     */
    getUser({
      commit
    }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await getUserinfo()
          commit('SET_USERINFO', res)
          const roles = await getRole()
          resolve(roles)
        } catch (err) {
          reject(err)
        }
      })
    },
    /**
     * 登出
     * @param { store } 提交
     */
    logout({
      commit
    }) {
      return new Promise(resolve => {
        setToken('')
        commit('LOGOUT')
        resetRouter()
        resolve()
      })
    }
  }
}
