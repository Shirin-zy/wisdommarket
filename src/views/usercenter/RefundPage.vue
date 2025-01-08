<template>
  <!-- 退换/售后 -->
  <div>
    <van-nav-bar
      fixed
      title="退换/售后"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-tabs route v-model="currentIndex" style="margin-top: 50px">
      <van-tab title="全部" name="all"></van-tab>
      <van-tab title="待处理" name="waitDeal"></van-tab>
    </van-tabs>
    <div><van-empty description="亲,暂无售后记录" /></div>
  </div>
</template>
<script>
export default {
  name: 'refundPage',
  data () {
    return {
      currentIndex: 'all' // 当前tab标签
    }
  }
}
</script>
<style></style>
