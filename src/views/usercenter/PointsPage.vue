<template>
  <!-- 积分页面 -->
  <div>
    <van-nav-bar
      fixed
      title="我的积分"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div v-if="score.length <= 0"><van-empty description="暂无积分" /></div>
  </div>
</template>
<script>
export default {
  name: 'PointsPage',
  data () {
    return {
      score: [] // 积分列表
    }
  }
}
</script>
<style></style>
