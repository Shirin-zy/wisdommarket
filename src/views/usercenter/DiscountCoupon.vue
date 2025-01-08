<template>
  <!-- 优惠券页面 -->
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar
      fixed
      title="优惠券"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 主体 -->
    <van-tabs route v-model="currentIndex" style="margin-top: 50px">
      <van-tab title="未使用" name="isUnused"></van-tab>
      <van-tab title="已使用" name="isUse"></van-tab>
      <van-tab title="已过期" name="isExpire"></van-tab>
    </van-tabs>
    <div v-if="list.length <= 0">
      <van-empty description="亲,暂无相关优惠券" />
    </div>
    <!-- 优惠券列表 -->
    <div style="margin-top: 10px;">
      <CouponItem
        style=""
        v-for="item in list"
        :key="item.coupon_id"
        :item="item"
      ></CouponItem>
    </div>
  </div>
</template>
<script>
import CouponItem from '@/components/CouponItem.vue'
import { getCoupon } from '@/api/userInfo'
export default {
  name: 'discountCoupon',
  components: {
    CouponItem
  },
  data () {
    return {
      currentIndex: 'unsed', // 当前选中tab标签
      list: [] // 优惠券列表
    }
  },
  async created () {
    const {
      data: {
        list: { data }
      }
    } = await getCoupon('isUnused')
    this.list = data
  },
  watch: {
    async currentIndex (newVal) {
      const {
        data: {
          list: { data }
        }
      } = await getCoupon(newVal)
      this.list = data
    }
  }
}
</script>
<style lang="less" scoped></style>
