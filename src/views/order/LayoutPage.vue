<template>
  <!-- 订单管理页 -->
  <div class="layout">
    <van-nav-bar
      fixed
      title="我的订单"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 顶部tab标签 -->
    <van-tabs route v-model="currentIndex" style="margin-top: 50px">
      <van-tab title="全部" name="all"></van-tab>
      <van-tab title="待支付" name="payment"></van-tab>
      <van-tab title="待发货" name="delivery"></van-tab>
      <van-tab title="待收货" name="received"></van-tab>
      <van-tab title="待评价" name="comment"></van-tab>
    </van-tabs>
    <!-- 订单列表组件 -->
    <div v-if="list.length<=0"><van-empty description="暂无订单" /></div>
    <!-- 接受子组件传递事件 -->
    <OrderListItem
      v-for="item in list"
      :key="item.order_id"
      :item="item"
      @cancleOrder="refreshDate"
    ></OrderListItem>
  </div>
</template>
<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getOrderList } from '@/api/order'
export default {
  data () {
    return {
      currentIndex: this.$route.query.words || 'allOrders', // 当前选中tab标签
      list: [] // 订单列表
    }
  },
  methods: {
    // 响应子组件取消订单事件并刷新数据
    async refrehDate () {
      const {
        data: {
          list: { data }
        }
      } = await getOrderList(this.currentIndex)
      this.list = data
    },
    // 获取订单数据用于渲染
    async getData () {
      const {
        data: {
          list: { data }
        }
      } = await getOrderList(this.mode)
      this.list = data
    }
  },
  computed: {
    mode () {
      return this.$route.query.words
    }
  },
  components: {
    OrderListItem
  },
  async created () {
    this.getData()
  },
  watch: {
    async currentIndex (newVal) {
      const {
        data: {
          list: { data }
        }
      } = await getOrderList(newVal)
      this.list = data
    }
  }
}
</script>
<style></style>
