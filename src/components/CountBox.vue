<!-- 封装的数字框组件 -->
<template>
  <div class="countBox">
    <button class="sub" @click="handleSub">-</button>
<input :value=value @change="handleChange" class="inp" type="text" />
    <button class="add" @click="handleAdd">+</button>
  </div>
</template>
<script>
export default {
  name: 'countBox',
  data () {
    return {

    }
  },
  methods: {
    // 处理购买或加入购物车数量变动并提交回父组件进行修改
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleSub () {
      if (this.value > 1) {
        this.$emit('input', this.value - 1)
      }
    },
    handleChange (e) {
      const num = +e.target.value // 转成数字类型,隐式转化
      if (num <= 0 || isNaN(num)) {
        // 输入不合格则回退为原始值
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  },
  props: {
    // 接受父组件传递的数据
    value: {
      type: Number,
      default: 1
    }
  }
}
</script>
<style lang="less">
.countBox {
  width: 110px;
  display: flex;
  .sub, .add {
    width: 30px;
    height: 30px;
    background-color: #efefef;
    outline: none;
    border: none;
  }
  .inp {
    width: 40px;
    height: 30px;
    background-color: #efefef;
    outline: none;
    border: none;
    margin: 0 5px;
    text-align: center;
  }
}
</style>
