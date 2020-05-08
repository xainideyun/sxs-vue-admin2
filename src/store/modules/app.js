/**
 * 应用store
 */
import Cookies from 'js-cookie'
import config from '@/config'
import {
  asyncRoutes,
  constantRoutes
} from '@/router/router'

/**
 * 过滤动态路由表
 * @param routes 动态路由
 * @param roles 角色权限
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

/**
 * 判断该角色是否有权限
 * @param { Object } roles 角色权限
 * @param { Object } route 路由
 */
function hasPermission(roles, route) {
  if (!route.name) return false // 如果不存在name，则直接返回无权限
  if (!roles.hasOwnProperty(route.name)) return true // 如果返回的权限中不存在指定的name，则直接返回有权限
  return roles[route.name]
}

export default {
  namespaced: true,
  state: {
    sidebar: { // 布局页侧边栏状态
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop', // 登录设备
    size: Cookies.get('size') || 'medium', // 尺寸
    routes: [], // 当前正在使用的路由表
    addRoutes: [] // 新增的路由表
  },
  mutations: {
    /**
     * 侧边栏状态切换
     */
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    /**
     * 关闭侧边栏
     */
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    /**
     * 更改登录设备
     */
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    /**
     * 更改尺寸
     */
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    /**
     * 设置系统路由表
     */
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = [...constantRoutes, ...routes]
    }
  },
  actions: {
    toggleSideBar({
      commit
    }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({
      commit
    }, {
      withoutAnimation
    }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({
      commit
    }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setSize({
      commit
    }, size) {
      commit('SET_SIZE', size)
    },
    /**
     * 生成路由表
     * @param { Object } store
     * @param { Object} roles
     */
    generateRoutes({
      commit
    }, roles) {
      return new Promise(resolve => { // 此处根据角色信息筛选可用的路由表
        let accessedRoutes
        if (config.openRoleSystem) {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        } else {
          accessedRoutes = asyncRoutes
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
      // return new Promise(resolve => {
      //   let routes = asyncRoutes || []
      //   commit('SET_ROUTES', routes)
      //   resolve(routes)
      // })
    }
  }
}
