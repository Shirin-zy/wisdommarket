<template>
  <!-- 用户信息页面 -->
  <div class="user">
    <div class="head-page" v-if="isLogin">
      <div class="head-img">
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="mobile">{{ detail.mobile }}</div>
        <div class="vip">
          <van-icon name="diamond-o" />
          普通会员
        </div>
      </div>
    </div>

    <div v-else class="head-page" @click="$router.push('/login')">
      <div class="head-img">
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="mobile">未登录</div>
        <div class="words">点击登录账号</div>
      </div>
    </div>

    <div class="my-asset">
      <div class="asset-left">
        <div class="asset-left-item" @click="$router.push('/user/wallet')">
          <span>{{ assets.balance || 0 }}</span>
          <span>账户余额</span>
        </div>
        <div class="asset-left-item" @click="$router.push('/user/points')">
          <span>{{ assets.points || 0 }}</span>
          <span>积分</span>
        </div>
        <div class="asset-left-item" @click="$router.push('/user/coupon')">
          <span>{{ assets.coupon || 0 }}</span>
          <span>优惠券</span>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-right-item" @click="$router.push('/user/wallet')">
          <van-icon name="balance-pay" />
          <span>我的钱包</span>
        </div>
      </div>
    </div>
    <div class="order-navbar">
      <div
        class="order-navbar-item"
        @click="$router.push('/orderState?words=all')"
      >
        <van-icon name="balance-list-o"/>
        <span>全部订单</span>
      </div>
      <div
        class="order-navbar-item"
        @click="$router.push('/orderState?words=payment')"
      >
        <van-icon name="clock-o" :badge="orderState.payment > 0 ? orderState.payment : ''" />
        <span>待支付</span>
      </div>
      <div
        class="order-navbar-item"
        @click="$router.push('/orderState?words=delivery')"
      >
        <van-icon name="logistics" :badge="orderState.delivery > 0 ? orderState.delivery : ''" />
        <span>待发货</span>
      </div>
      <div
        class="order-navbar-item"
        @click="$router.push('/orderState?words=received')"
      >
        <van-icon name="send-gift-o" :badge="orderState.received > 0 ? orderState.received : ''" />
        <span>待收货</span>
      </div>
    </div>

    <div class="service">
      <div class="title">我的服务</div>
      <div class="content">
        <div class="content-item" @click="$router.push('/address')">
          <van-icon name="records" />
          <span>收货地址</span>
        </div>
        <div class="content-item" @click="$router.push('/user/couponcenter')">
          <van-icon name="gift-o" />
          <span>领券中心</span>
        </div>
        <div class="content-item" @click="$router.push('/user/coupon')">
          <van-icon name="gift-card-o" />
          <span>优惠券</span>
        </div>
        <div class="content-item" @click="$router.push('/user/help')">
          <van-icon name="question-o" />
          <span>我的帮助</span>
        </div>
        <div class="content-item" @click="$router.push('/user/points')">
          <van-icon name="balance-o" />
          <span>我的积分</span>
        </div>
        <div class="content-item" @click="$router.push('/user/refund')">
          <van-icon name="refund-o" />
          <span>退换/售后</span>
        </div>
      </div>
    </div>
    <div class="logout-btn">
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
import { getUserInfoDetail, getBalance } from '@/api/userInfo'
import { getOrderStatus } from '@/api/order'
import { Dialog } from 'vant'
export default {
  name: 'UserPage',
  data () {
    return {
      detail: {}, // 用户信息
      assets: {}, // 余额，积分优惠券信息
      orderState: { } // 订单状态
    }
  },
  created () {
    if (this.isLogin) {
      this.getUserInfoDetail()
    }
    if (this.isLogin) {
      this.getOrderStatus()
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  },
  methods: {
    // 获取用户信息
    async getUserInfoDetail () {
      const {
        data: { userInfo }
      } = await getUserInfoDetail()
      this.detail = userInfo
      const {
        data: { assets }
      } = await getBalance()
      this.assets = assets
    },
    async getOrderStatus () {
      const { data: { counts } } = await getOrderStatus()
      console.log(counts)
      this.orderState = counts
    },
    // 退出登录
    logout () {
      Dialog.confirm({
        title: '温馨提示',
        message: '你确认要退出么？'
      })
        .then(() => {
          this.$store.dispatch('user/logout')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 50px;
}

.head-page {
  height: 130px;
  background: url("https://ts1.cn.mm.bing.net/th/id/R-C.09498052beb6c7824dfa5e010de8a4ac?rik=JxKFhHFyw1kjPA&riu=http%3a%2f%2fimg.pptjia.com%2fimage%2f20180816%2f6c0a552d40a3ef440c7dad3b1fe8eb1e.JPG&ehk=oE7p4tWu4m1Y8%2byFb%2f4fouYlayPetpZ4FwePf10n1I4%3d&risl=&pid=ImgRaw&r=0");
  background-size: cover;
  display: flex;
  align-items: center;
  .head-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.info {
  .mobile {
    margin-bottom: 5px;
    color: #c59a46;
    font-size: 18px;
    font-weight: bold;
  }
  .vip {
    display: inline-block;
    background-color: #3c3c3c;
    padding: 3px 5px;
    border-radius: 5px;
    color: #e0d3b6;
    font-size: 14px;
    .van-icon {
      font-weight: bold;
      color: #ffb632;
    }
  }
}

.my-asset {
  display: flex;
  padding: 20px 0;
  font-size: 14px;
  background-color: #fff;
  .asset-left {
    display: flex;
    justify-content: space-evenly;
    flex: 3;
    .asset-left-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child {
        margin-bottom: 5px;
        color: #ff0000;
        font-size: 16px;
      }
    }
  }
  .asset-right {
    flex: 1;
    .asset-right-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
      }
    }
  }
}

.order-navbar {
  display: flex;
  padding: 15px 0;
  margin: 10px;
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  .order-navbar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    .van-icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
  }
}

.service {
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  margin: 10px;
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    font-size: 16px;
  }
  .content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 14px;
    background-color: #fff;
    border-radius: 5px;
    .content-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      margin-bottom: 20px;

      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
        color: #ff3800;
      }
    }
  }
}

.logout-btn {
  button {
    width: 60%;
    margin: 10px auto;
    display: block;
    font-size: 13px;
    color: #616161;
    border-radius: 9px;
    border: 1px solid #dcdcdc;
    padding: 7px 0;
    text-align: center;
    background-color: #fafafa;
  }
}
</style>
