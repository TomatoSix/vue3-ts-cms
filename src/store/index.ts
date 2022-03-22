import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'tomatosix',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

// 防止刷新后vuex中的内容消失
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
