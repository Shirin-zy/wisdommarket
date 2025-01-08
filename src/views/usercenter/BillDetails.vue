<template>
  <!-- 消费记录页 -->
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      title="账单详情"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div v-if="orderList.length <= 0" style="margin-top: 50px;"><van-empty description="暂无账单 " /></div>
    <div class="billist">
      <div v-for="item in orderList" :key="item.order_id" class="bill">
        <span>用户消费:</span>
        <span>{{ item.order_no }}</span>
        <span>{{ item.create_time }}</span>
        <span class="money">-{{ item.total_price }}元</span>
        <hr class="divide" />
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderList } from '@/api/order'
export default {
  name: 'BillDetails',
  data () {
    return {
      orderList: [] // 订单列表
    }
  },
  async created () {
    const {
      data: {
        list: { data }
      }
    } = await getOrderList('all')
    this.orderList = data
  }
}
</script>
<style lang="less" scoped>
.billist {
  margin-top: 50px;
}
span {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  font-size: 18px;
  padding: 5px;
  margin-left: 20px;
}
.money {
  margin-left: 250px;
  margin-top: -32px;
}
.divide {
  width: 90%;
  margin-left: 5%;
  margin-top: 5px;
  background-color: rgb(231, 231, 231);
  height: 0.5px;
  border: none;
  margin-bottom: 10px;
}
</style>
