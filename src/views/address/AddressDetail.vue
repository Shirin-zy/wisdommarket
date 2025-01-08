<template>
  <!-- 地址详情页 -->
  <div class="container">
    <van-nav-bar
      class="header"
      fixed
      title="地址详情"
      left-arrow
      @click-left="$router.push('/address')"
    />
    <div style="margin-top: 60px">
      <van-field v-model="address.name" label="姓名" placeholder="收货人姓名" />
      <van-field v-model="address.phone" label="电话" placeholder="收货人手机号" />
      <van-field v-model="address.region.province" label="省份" placeholder="请选择省份" />
      <van-field v-model="address.region.city" label="城市" placeholder="请选择城市" />
      <van-field v-model="address.region.region" label="地区" placeholder="请选择地区区" />
      <van-field v-model="address.detail" label="详细地址" placeholder="详细地址" />
    </div>
  </div>
</template>
<script>
import { getAddressDetail } from '@/api/address'
export default {
  name: 'addressDetail',
  data () {
    return {
      address: []// 详细地址
    }
  },
  computed: {
    addressId () {
      return this.$route.params.id
    }
  },
  async  created () {
    const { data: { detail } } = await getAddressDetail(this.addressId)
    console.log(detail)
    this.address = detail
  }
}
</script>
<style lang="less" scoped>
.container {
  position: relative;
  min-height: 100%;
}
</style>
