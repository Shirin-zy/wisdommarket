<template>
  <!-- 钱包页面 -->
  <div class="body">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      title="我的钱包"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 图片 -->
    <div>
      <img
        class="bg"
        src="https://smart-shop.itheima.net/static/wallet.png"
        alt=""
      />
    </div>
    <!-- 钱包余额 -->
    <div class="balance">
      <span>{{balance}}</span>
      <span style="font-size: 16px; color: #cec1c1; font-family: STHeiti"
        >账户余额(元)</span
      >
    </div>
    <!-- 充值和查询 -->
    <div>
      <van-button round class="recharge" @click="$router.push('/user/rechargeCenter')">充 值</van-button>
      <van-row style="margin-top: 30px;">
        <van-col span="12" class="label" @click="$router.push('/user/rechargeRecord')">充值记录</van-col>
        <van-col span="12" class="label" @click="$router.push('/user/billDetails')">账单详情</van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { getBalance } from '@/api/userInfo'
export default {
  name: 'walletPage',
  data () {
    return {
      balance: null // 账户余额
    }
  },
  async created () {
    const { data: { assets: { balance } } } = await getBalance()
    this.balance = balance
  }
}
</script>
<style lang="less" scoped>
.body {
  align-items: center;
  text-align: center;
  width: 100%;
  .bg {
    width: 200px;
    height: 200x;
    margin-top: 150px;
  }
  .balance {
    font-size: 36px;
    margin-top: 30px;
  }
}
span {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}
.recharge {
  background-color: #786cff;
  color: white;
  font-size: 20px;
  margin-top: 150px;
  width: 60%;
}
.label{
  font-size: 18px;
  color: #5e5e5e;
}
</style>
