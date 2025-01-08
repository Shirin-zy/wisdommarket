// 存放所有与登录模块相关的接口请求

import request from '@/utils/request'
// 1.获取图形验证码
export const getPiceCode = () => {
  return request.get('/captcha/image')
}

// 2.获取短信验证码
export const getMsgCode = (captchaCode, captchKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchKey,
      mobile
    }
  })
}

// 3.验证码登录
export const login = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
