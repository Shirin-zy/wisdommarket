import { getCartList, removeCart, updateCartList } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: [] // 购物车列表
    }
  },
  mutations: {
    // 求情回来的购物车列表数据提交存储到vuex
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 改变商品选中状态
    changeCheckBox (state, goodsId) {
      const good = state.cartList.find((item) => item.goods_id === goodsId)
      good.isCheck = !good.isCheck
    },
    changeAllCheck (state, flag) {
      // 让所有选项框同步为全选框状态
      state.cartList.forEach((item) => {
        item.isCheck = flag
      })
    },
    // 更新vuex中购物车列表以及数据库
    updateCart (state, obj) {
      // 更新vuex中购物车列表
      const good = state.cartList.find((item) => item.goods_id === obj.goodsId)
      good.goods_num = obj.goodsNum
      // 调用接口更新后台数据
      updateCartList(obj.goodsId, obj.goodsNum, obj.goodsSkuId)
    }
  },
  // actions支持异步
  actions: {
    // 发送请求拉取购物车列表
    async getCartList (context) {
      const { data } = await getCartList()
      // 加上一项isCheck用于绑定是否选中
      data.list.forEach((item) => {
        item.isCheck = false
      })
      // 提交给vuex进行存储
      context.commit('setCartList', data.list)
    },
    // 移除购物车内的商品
    async clearCart (context) {
      const clearList = context.getters.selectList.map(item => item.id)
      // 发送请求移除商品
      await removeCart(clearList)
      Toast('移除成功’')
      // 重新拉去更新后的数据
      context.dispatch('getCartList')
    }
  },
  getters: {
    // 购物车内商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品列表
    selectList (state) {
      return state.cartList.filter((item) => item.isCheck)
    },
    // 选中的商品总数
    selectCount (state, getters) {
      return getters.selectList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品总价
    selectPrice (state, getters) {
      return getters.selectList
        .reduce(
          (sum, item) => sum + item.goods_num * item.goods.goods_price_min,
          0
        )
        .toFixed(2)
    },
    // 全选框状态
    isAllCheck (state) {
      return state.cartList.every((item) => item.isCheck)
    }
  }
}
