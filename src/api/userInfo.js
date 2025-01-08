import request from '@/utils/request'

// 1. 获取用户余额、积分、优惠券
export const getBalance = () => {
  return request.get('/user/assets')
}

// 2.获取用户详细信息
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
// 3.获取用户优惠券
export const getCoupon = (type) => {
  return request.get('/myCoupon/list', {
    params: {
      dataType: type,
      page: 1
    }
  })
}

// 4.获取可领取优惠券
export const getCouponList = () => {
  return request.get('/coupon/list')
}

// 5.领取优惠券
export const receiveCoupon = (couponId) => {
  return request.post('/myCoupon/receive', {
    couponId
  })
}
