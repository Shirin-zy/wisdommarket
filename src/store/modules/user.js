import { getUserInfo, setUserInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 个人权证信息
      userInfo: getUserInfo()
    }
  },
  mutations: {
    setInfo (state, obj) {
      state.userInfo = obj
      setUserInfo(obj)
    }
  },
  actions: {
    logout (context) {
      context.commit('setInfo', {})
    }
  },
  getters: {}
}
