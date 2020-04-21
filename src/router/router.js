import Layout from '@/views/layout'

export const constantRoutes = [{
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import(`@/views/Home`),
      meta: {
        title: '首页'
      }
    }, {
      path: '/about',
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
    meta: {
      title: '登录',
      hideMenu: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error_404'),
    meta: {
      hideMenu: true
    }
  },
  {
    path: '/401',
    component: () => import('@/views/Error_401'),
    meta: {
      hideMenu: true
    }
  }
]

export const asyncRoutes = [{
    path: '/good',
    name: 'good',
    component: Layout,
    redirect: '/good/list',
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
    path: '*',
    redirect: '/404',
    meta: {
      hideMenu: true
    }
  }
]

export default constantRoutes
