<template>
  <!-- 地址编辑页 -->
  <div>
    <van-nav-bar
      class="header"
      fixed
      title="新增地址"
      left-arrow
      @click-left="$router.replace('/address')"
    />
    <van-address-edit
    style="margin-top: 50px;"
      :area-list="areaList"
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="save"
    />
  </div>
</template>
<script>
import { areaList } from '@vant/area-data'
import { addAddress } from '@/api/address'
export default {
  name: 'addressEdit',
  data () {
    return {
      areaList
    }
  },
  methods: {
    async save (content) {
      console.log(content)
      await addAddress(content)
      this.$router.push('/address')
    }
  },
  created () {
  }
}
</script>
<style></style>
