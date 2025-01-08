<template>
  <!-- 充值记录 -->
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      title="充值记录"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-empty description="亲,暂无充值记录" />
  </div>
</template>
<script>
export default {
  name: 'RechargeRecord'
}
</script>
<style></style>
