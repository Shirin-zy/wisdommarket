<template>
  <!-- 布局页面 -->
    <div>
      <router-view></router-view>
      <!-- 二级路由出口 -->
       <van-tabbar route active-color="#ee0a24" inactive-color="#000">
        <!-- vant支持路由模式，配置后可自动跳转并高亮 -->
        <van-tabbar-item icon="home-o" to="/home"> 首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" :badge="cartTotal >0 ? cartTotal : null" to="/cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/user">我的</van-tabbar-item>
      </van-tabbar>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutPage',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('cart', ['cartTotal'])
  }
}</script>
<style></style>
