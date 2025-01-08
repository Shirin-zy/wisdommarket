// 购物车相关接口
import request from '@/utils/request'

// 1.加入购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 2.获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 3.更新购物车商品
export const updateCartList = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 4.移除购物车内的商品
export const removeCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
