import Layout from '@/views/layout'

export const constantRoutes = [{
    path: '/redirect',  // 重定向路由，用于选项卡的刷新
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/Redirect')
    }]
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import(`@/views/Home`),
      meta: {
        title: '首页',
        icon: 'officeicon_excelco',
        affix: true
      }
    }]
  },
  {
    path: '/about',
    component: Layout,
    children: [{
      path: 'index',
      name: 'about',
      component: () => import('@/views/About'),
      meta: {
        title: '关于我们'
      }
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error_404'),
    hidden: true,
    meta: {
      title: '未找到页面'
    }
  },
  {
    path: '/401',
    component: () => import('@/views/Error_401'),
    hidden: true,
    meta: {
      title: '无权限'
    }
  }
]

export const asyncRoutes = [{
    path: '/good',
    name: 'good',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '商品管理'
    },
    children: [{
        path: 'list',
        name: 'goodList',
        component: () => import('@/views/good/List'),
        meta: {
          title: '商品列表'
        }
      },
      {
        path: 'detail',
        name: 'goodDetail',
        component: () => import('@/views/good/Detail'),
        meta: {
          title: '商品详情'
        }
      }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    redirect: 'user',
    component: Layout,
    meta: {
      title: '系统设置'
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/settings/User.vue'),
        meta: {
          title: '个人中心'
        }
      },
      {
        path: 'sys',
        name: 'sys',
        component: () => import('@/views/settings/Sys.vue'),
        meta: {
          title: '配置'
        }
      },
    ]
  },
  {
    path: '*',
    name: 'error_404',
    redirect: '/404',
    hidden: true,
    meta: {
    }
  }
]

export default constantRoutes
