<template>
  <!-- 帮助中心 -->
  <div>
    <van-nav-bar
      fixed
      title="帮助中心"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div>
      <span class="title">关于小程序</span>
      <span class="content"
        >小程序本身无需下载，无需注册，不占用手机内存，可以跨平台使用，响应迅速，体验接近原生APP。</span>
    </div>
  </div>
</template>
<script></script>
<style lang="less" scoped>
.title{
    position: absolute;
    margin-top: 60px;
    margin-left: 5%;
    margin-right: 5%;
    font-size: 20px;
}
.content{
    position: absolute;
    margin-top: 90px;
    margin-left: 5%;
    margin-right: 5%;
}</style>
