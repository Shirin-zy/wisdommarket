import request from '@/utils/request'

// 1.提交订单(购物车购买)
// moed：cart => obj {cartId}
// mode: buyNow => obj {goodsId,goodsNum,goodsSkuId}
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10, // 10 快递 20 自提
      couponId: 0, // 优惠券id,0 不使用优惠券
      isUsePoints: 0, // 是否使用积分,0 不使用
      ...obj // 将传递过来的参数动态展开
    }
  })
}

// 2.提交订单
// moed：cart => obj {cartId}
// mode: buyNow => obj {goodsId,goodsNum,goodsSkuId}
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 10 快递 20 自提
    couponId: 0, // 优惠券id,0 不使用优惠券
    isUsePoints: 0, // 是否使用积分,0 不使用
    payType: 10,
    ...obj // 将传递过来的参数动态展开

  })
}

// 3.获取订单列表
export const getOrderList = (mode) => {
  return request.get('/order/list', {
    params: {
      page: 1,
      dataType: mode
    }
  })
}

// 4.订单状态,待发货、收货数量
export const getOrderStatus = () => {
  return request.get('/order/todoCounts')
}

// 5.取消订单
export const cancleOrder = (orderId) => {
  return request.post('/order/cancel', {
    orderId
  })
}
