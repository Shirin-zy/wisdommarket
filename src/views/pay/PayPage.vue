<template>
  <!-- 支付页 -->
  <div class="pay">
    <van-nav-bar
      fixed
      title="订单结算台"
      left-arrow
      @click-left="$router.push('/cart')"
    />

    <!-- 地址相关 -->
    <div class="address" @click="$router.push('/address')">
      <div class="left-icon">
        <van-icon name="logistics" />
      </div>

      <div class="info" v-if="address">
        <div class="info-content">
          <span class="name">{{ address.name }}</span>
          <span class="mobile">{{ address.phone }}</span>
        </div>
        <div class="info-address">
          {{ address.region.province }} {{ address.region.city }}
          {{ address.region.region }} {{ address.detail }}
        </div>
      </div>

      <div class="info" v-else>请选择配送地址</div>

      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 订单明细 -->
    <div class="pay-list">
      <div class="list" v-for="(item, index) in list" :key="index">
        <div class="goods-item">
          <div class="left">
            <img :src="item.goods.goods_image" alt="" />
          </div>
          <div class="right">
            <p class="tit text-ellipsis-2">
              {{ item.goods.goods_name }}
            </p>
            <p class="info">
              <span class="count">x{{ item.goods_num }}</span>
              <span class="price">¥{{ item.goods.goods_price_min }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="flow-num-box">
        <span>共 {{modeType==='cart' ? selectCount:list[0].goods_num }} 件商品，合计：</span>
        <span class="money">￥{{modeType === 'cart' ? selectPrice:(list[0].goods_num*list[0].goods.goods_price_min).toFixed(2) }}</span>
      </div>

      <div class="pay-detail">
        <div class="pay-cell">
          <span>订单总金额：</span>
          <span class="red">￥{{modeType === 'cart' ? selectPrice:(list[0].goods_num*list[0].goods.goods_price_min).toFixed(2) }}</span>
        </div>

        <div class="pay-cell">
          <span>优惠券：</span>
          <span>无优惠券可用</span>
        </div>

        <div class="pay-cell">
          <span>配送费用：</span>
          <span v-if="false">请先选择配送地址</span>
          <span v-else class="red">+￥0.00</span>
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="pay-way">
        <span class="tit">支付方式</span>
        <div class="pay-cell">
          <span
            ><van-icon name="balance-o" />余额支付（可用 ¥ {{balance}} 元）</span
          >
          <!-- <span>请先选择配送地址</span> -->
          <span class="red"><van-icon name="passed" /></span>
        </div>
      </div>

      <!-- 买家留言 -->
      <div class="buytips">
        <textarea
          placeholder="选填：买家留言（50字内）"
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="remark"
        ></textarea>
      </div>
    </div>

    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">
        实付款：<span>￥{{modeType === 'cart' ? selectPrice:(list[0].goods_num*list[0].goods.goods_price_min).toFixed(2) }}</span>
      </div>
      <div class="tipsbtn" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAddress, getDefaultAddress } from '@/api/address'
import { getBalance } from '@/api/userInfo'
import { submitOrder } from '@/api/order'
import { getProductDetail } from '@/api/product'
// import { removeCart } from '@/api/cart'
import { Toast } from 'vant'
export default {
  name: 'payPage',
  data () {
    return {
      address: null, // 收货地址
      balance: null, // 账户余额
      remark: '', // 买家留言
      mode: 'cart',
      list: [] // 购买的商品列表
    }
  },
  methods: {
    // 提交订单
    async submitOrder () {
      if (this.modeType === 'cart') {
        await submitOrder(this.modeType, {
          cartIds: this.cartIds,
          remark: this.remark
        })
      } else {
        await submitOrder(this.modeType, {
          goodsId: this.goodsId,
          goodsNum: this.buyNum,
          goodsSkuId: this.list[0].goodsSkuId,
          remark: this.remark
        })
      }
      Toast('支付成功')
      this.$router.replace('/orderState?words=all')
    }
  },
  computed: {
    ...mapGetters('cart', ['selectList', 'selectCount', 'selectPrice']),
    modeType () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    },
    goodsId () {
      return this.$route.query.goodsId
    },
    buyNum () {
      return this.$route.query.count
    }
  },
  async created () {
    // 从立即购买页面跳转来无购物车数据，需根据goodsId请求数据进行渲染
    if (this.goodsId) {
      const { data: { detail } } = await getProductDetail(this.goodsId)
      const buyList = [{ goods: { goods_image: detail.goods_image, goods_name: detail.goods_name, goods_price_min: detail.goods_price_min }, goods_num: this.buyNum, goodsSkuId: detail.skuList[0].goods_sku_id }]
      this.list = buyList
    } else {
      this.list = this.selectList
    }
    console.log(this.goodsId)
    /// /
    const {
      data: { list }
    } = await getAddress()
    const {
      data: { defaultId }
    } = await getDefaultAddress()
    this.address = list.find((item) => item.address_id === defaultId)
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
.pay {
  padding-top: 46px;
  padding-bottom: 46px;
  ::v-deep {
    .van-nav-bar__arrow {
      color: #333;
    }
  }
}
.address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-size: 14px;
  color: #666;
  position: relative;
  background: url(@/assets/border-line.png) bottom repeat-x;
  background-size: 60px auto;
  .left-icon {
    margin-right: 20px;
  }
  .right-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-7px);
  }
}
.goods-item {
  height: 100px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 100px;
    img {
      display: block;
      width: 80px;
      margin: 10px auto;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    padding-right: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #333;
    .info {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      .price {
        color: #fa2209;
      }
    }
  }
}

.flow-num-box {
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px;
  font-size: 14px;
  border-bottom: 1px solid #efefef;
  .money {
    color: #fa2209;
  }
}

.pay-cell {
  font-size: 14px;
  padding: 10px 12px;
  color: #333;
  display: flex;
  justify-content: space-between;
  .red {
    color: #fa2209;
  }
}
.pay-detail {
  border-bottom: 1px solid #efefef;
}

.pay-way {
  font-size: 14px;
  padding: 10px 12px;
  border-bottom: 1px solid #efefef;
  color: #333;
  .tit {
    line-height: 30px;
  }
  .pay-cell {
    padding: 10px 0;
  }
  .van-icon {
    font-size: 20px;
    margin-right: 5px;
  }
}

.buytips {
  display: block;
  textarea {
    display: block;
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 100px;
  }
}

.footer-fixed {
  position: fixed;
  background-color: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-top: 1px solid #efefef;
  font-size: 14px;
  display: flex;
  .left {
    flex: 1;
    padding-left: 12px;
    color: #666;
    span {
      color: #fa2209;
    }
  }
  .tipsbtn {
    width: 121px;
    background: linear-gradient(90deg, #f9211c, #ff6335);
    color: #fff;
    text-align: center;
    line-height: 46px;
    display: block;
    font-size: 14px;
  }
}
</style>
