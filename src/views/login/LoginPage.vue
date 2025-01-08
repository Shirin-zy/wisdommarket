<template>
  <!-- 登录页 -->
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar title="登录" left-arrow @click-left="$router.go(-1)">
    </van-nav-bar>
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input
            v-model="phone"
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            v-model="picCode"
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
          />
          <img v-show="picUrl" :src="picUrl" @click="getPicCode" alt="" />
        </div>
        <div class="form-item">
          <input
            v-model="smsCode"
            class="inp"
            placeholder="请输入短信验证码"
            type="text"
          />
          <button @click="getCode">
            {{ second === 60 ? "获取验证码" : second + "秒后重新发送" }}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import { getPiceCode, getMsgCode, login } from '@/api/login'
export default {
  name: 'LoginPage',
  data () {
    return {
      phone: '', // 用户输入的手机号
      picCode: '', // 用户输入的图片验证码
      smsCode: '', // 用户输入的短信验证码
      picKey: '', // 图片验证码唯一标识key
      picUrl: '', // 图片验证码
      second: 60, // 短信验证发发送倒计时
      timer: null // 定时器
    }
  },
  methods: {
    // 1.用户输入规则校验
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        Toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        Toast('请输入正确图形验证码')
        return false
      }
      return true
    },
    // 2.请求获取图像验证码并解析构出来
    async getPicCode () {
      const {
        data: { base64, key }
      } = await getPiceCode()
      this.picUrl = base64
      this.picKey = key
    },
    // 3.获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        return
      }
      const res = await getMsgCode(this.picCode, this.picKey, this.phone)
      Toast('验证码发送成功')
      console.log(res)
      // 当不存在开启的定时器时且倒计时为60秒时开启定时器
      if (!this.timer && this.second === 60) {
        this.timer = setInterval(() => {
          this.second--
          // 倒计时归零后清除定时器并重置时间
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = 60
          }
        }, 1000)
      }
    },
    // 4.登录验证
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        Toast('请输入正确短信验证码')
      }
      const res = await login(this.phone, this.smsCode)
      this.$store.commit('user/setInfo', res.data)
      Toast('登录成功')
      // 如果由被拦截回登录页的情况则记录下回跳的url，登录完成后跳回原页面
      const url = this.$route.query.backUrl || '/'
      this.$router.push(url)
    }
  },
  created () {
    this.getPicCode()
  },
  // 组件销毁时清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }
  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
