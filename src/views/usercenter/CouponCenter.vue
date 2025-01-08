<template>
  <!-- 领券中心 -->
  <div>
    <van-nav-bar
      fixed
      title="领券中心"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div v-if="CouponList.length <= 0">
      <van-empty description="亲,暂无可领取优惠券" />
    </div>
    <div style="margin-top: 60px">
      <div v-for="item in CouponList" :key="item.coupon_id" @click="receive(item.coupon_id,item.is_receive)"><CouponItem :item="item"></CouponItem></div>
      <!-- <CouponItem
        v-for="item in CouponList"
        :key="item.coupon_id"
        :item="item"
      ></CouponItem> -->
    </div>
  </div>
</template>
<script>
import { getCouponList, receiveCoupon } from '@/api/userInfo'
import CouponItem from '@/components/CouponItem.vue'
export default {
  name: 'CouponCenter',
  data () {
    return {
      CouponList: []
    }
  },
  methods: {
    // 领取优惠券
    async receive (couponId, receive) {
      // 如果当前优惠券未领取则进行领取
      if (receive === false) {
        await receiveCoupon(couponId)
        // 重新获取数据
        this.getCouponList()
      }
    },
    // 请求获取优惠券列表用于渲染
    async getCouponList () {
      const {
        data: { list }
      } = await getCouponList()
      this.CouponList = list
      console.log(list)
    }
  },
  components: {
    CouponItem
  },
  created () {
    this.getCouponList()
  }
}
</script>
<style></style>
