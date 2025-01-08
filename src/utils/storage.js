const INFO_KEY = 'hm_shopping_info'
const HISTORY_SEARCH = 'hm_shopping_seaech' // 基础名称，后续拼接用户id进行存储以区别不同用户的搜索历史
const CART_COUNT = 'hm_shopping_cart_count'
// 1.用户登录权证持久化到本地
// 获取用户信息
export const getUserInfo = () => {
  const defaultInfo = {
    token: '',
    userId: ''
  }
  const info = localStorage.getItem(INFO_KEY)
  return info ? JSON.parse(info) : defaultInfo
}

// 设置用户信息
export const setUserInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 移除用户信息
export const removeUserInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 2.持久化收索历史到本地
// 读取搜索历史
export const getHistorySearch = (userId) => {
  const defaultInfo = []
  const info = localStorage.getItem(HISTORY_SEARCH + userId)
  return info ? JSON.parse(info) : defaultInfo
}

// 存储搜索历史
export const setHistorySearch = (Searchistory, userId) => {
  localStorage.setItem(HISTORY_SEARCH + userId, JSON.stringify(Searchistory))
}

// 3.持久化购物车商品数量到本地(弃用)
// 读取购物车数据
export const getCartCount = (userId) => {
  const defaultCartCount = null
  const cartCount = localStorage.getItem(CART_COUNT + userId)
  return cartCount ? JSON.parse(cartCount) : defaultCartCount
}

// 存储购物车数据
export const setCartCount = (cartCount, userId) => {
  localStorage.setItem(CART_COUNT + userId, JSON.stringify(cartCount))
}
