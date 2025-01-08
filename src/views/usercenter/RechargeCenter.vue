<template>
  <!-- 充值中心 -->
  <div>
    <div class="body">
      <!-- 导航栏 -->
      <van-nav-bar
        fixed
        title="充值中心"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <!-- 余额 -->
      <div class="balance">
        <van-row style="margin-top: 30px">
          <van-col span="12" class="label">账户余额</van-col>
          <van-col span="12" class="label">￥{{ balance }}</van-col>
        </van-row>
      </div>
      <!-- 充值中心 -->
      <div>
        <span>充值金额</span>
        <input type="text" placeholder="请输入充值金额" />
        <van-button round class="recharge" @click="submit">充 值</van-button>
        <span style="margin-top: 50px">充值说明</span>
      </div>
    </div>
    <span class="detail">1.账户充值仅限微信在线方式支付，充值金额实时到账；</span>
    <span class="detail">2.账户充值套餐赠送的金额即时到账；</span>
    <span class="detail">3.账户余额有效期：自充值日起至用完即止；</span>
    <span class="detail">4.若有其它疑问，可拨打客服电话400-000-1234</span>
  </div>
</template>
<script>
import { getBalance } from '@/api/userInfo'
import { Toast } from 'vant'
export default {
  name: 'rechargeCenter',
  data () {
    return {
      balance: null // 账户余额
    }
  },
  methods: {
    submit () {
      Toast('测试环境暂不支持充值')
    }
  },
  async created () {
    const {
      data: {
        assets: { balance }
      }
    } = await getBalance()
    this.balance = balance
  }
}
</script>
<style lang="less" scoped>
.body {
  align-items: center;
  text-align: center;
  width: 100%;
  .balance {
    margin-top: 100px;
    width: 70%;
    height: 80px;
    background-color: #816bff;
    border-radius: 5px;
    margin-left: 15%;
    box-shadow: 0 5px 22px 0 rgba(0, 0, 0, 0.26);
  }
}
.label {
  font-size: 18px;
  color: white;
  margin-top: 25px;
}
input {
  margin-top: 20px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  width: 80%;
  height: 30px;
}
span {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  margin-left: -65%;
  font-size: 14px;
  margin-top: 20px;
}
.recharge {
  background-color: #786cff;
  color: white;
  font-size: 36px;
  margin-top: 20px;
  width: 60%;
}
.van-button__text {
  font-size: 18px;
  margin-left: 5%;
  margin-top: -5px;
}
.detail {
  margin-left: 10%;
  color: #888888;
}
</style>
