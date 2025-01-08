<template>
  <!-- 优惠券组件 -->
  <div :class="{'coupon-item':item.state.value===0}">
    <div class="left">
      <span
        style="
          position: absolute;
          margin-top: 25px;
          margin-left: 20%;
          font-size: 25px;
          color: white;
        "
        >¥{{ item.reduce_price }}</span
      >
      <span
        style="
          position: absolute;
          margin-top: 55px;
          margin-left: 4%;
          font-size: 14px;
          color: white;
        "
        >满{{ item.min_price }}元可用</span
      >
    </div>
    <div class="right">
      <span
        style="
          position: absolute;
          margin-top: 20px;
          margin-left: 10%;
          color: white;
          font-size: 18px;
        "
        >{{ item.name }}</span
      >
      <span
        style="
          position: absolute;
          margin-top: 55px;
          margin-left: 10%;
          color: white;
          font-size: 16px;
        "
        >{{couponData}}</span
      >
      <span
        style="
          position: absolute;
          margin-top: 70px;
          margin-left: 82%;
          color: white;
          font-size: 16px;
        "
        >{{ item.state.text }}</span
      >
      <span
        style="
          position: absolute;
          margin-top: 18px;
          margin-left: 80%;
          color: #a771ff;
          font-size: 14px;
          transform: rotate(45deg);
        "
        >满减券</span
      >
    </div>
    <div class="up"></div>
    <div class="down"></div>
  </div>
</template>
<script>
export default {
  name: 'couponItem',
  data () {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    couponData () {
      if (this.item.start_time) {
        return this.item.start_time + '~' + this.item.end_time
      } else {
        return '领取后7天内有效'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.left {
  position: relative;
  margin-left: 10px;
  width: 30%;
  height: 100px;
  background: linear-gradient(to right, #00b3ff, #0387c0);
  border-radius: 5px;
  display: inline-block;
}
.right {
  position: relative;
  margin-left: 5px;
  width: 63%;
  height: 100px;
  background: linear-gradient(to right, #00b3ff, #80b4ca);
  border-radius: 5px;
  display: inline-block;
}
.up {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  margin-left: 30.5%;
  margin-top: -112px;
}
.down {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  margin-left: 30.5%;
  margin-top: 78px;
}
.coupon-item{
    filter: grayscale(100%);
}
</style>
