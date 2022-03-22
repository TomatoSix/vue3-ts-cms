import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { nextTick } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    //重定向
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children: [] -> 根据userMenus来决定 -> children
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 如果不是登录页， 就跳转到首页
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      // router.push('/login')
      return '/login'
    }
  }

  if (to.path === '/main') {
    // 跳转到主页第一个菜单中
    // return firstMenu.url
    next(firstMenu.url)
  }
  next()
})

export default router
