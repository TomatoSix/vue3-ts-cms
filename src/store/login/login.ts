import { Module } from 'vuex'
// 本地保存插件
import { mapMenusToRoutes } from '@/utils/map-menus'

import localCache from '@/utils/cache'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'
import router from '@/router'
import { IAccount } from '@/service/login/types'
import { ILoginState } from './types'
import { IRootState } from '../types'

// 传入两个泛型,模块中state类型， 根模块
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: {}
    }
  },
  mutations: {
    // 保存token
    changeToken(state, token: string) {
      state.token = token
    },
    // 保存用户信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 保存菜单信息
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu

      // 注册动态路由
      // userMenus 映射到 routes中
      // userMenus => routes
      const routes = mapMenusToRoutes(userMenu)

      // 将routes 添加到 router.main.children
      routes.forEach((route) => {
        // 给main路由添加子路由
        // addRoute 动态添加子路由
        router.addRoute('main', route)
      })
    }
  },
  getters: {},
  actions: {
    // 账号登录
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log(payload, '00')

      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data

      // 数据存储到vuex中
      commit('changeToken', token)
      // 把token做一个本地缓存
      localCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.获取菜单
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)

      const userMenu = userMenusResult.data
      commit('changeUserMenu', userMenu)
      localCache.setCache('userMenu', userMenu)

      console.log(userMenu)

      // 4. 跳转到首页
      router.push('/main')
    },

    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenu = localCache.getCache('userMenu')
      if (userMenu) {
        commit('changeUserMenu', userMenu)
      }
    },

    // 手机登录
    async phoneLoginAction({ commit }, payload: any) {
      console.log('执行手机登录action', payload)
    }
  }
}

export default loginModule
