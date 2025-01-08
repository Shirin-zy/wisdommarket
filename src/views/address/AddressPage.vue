<template>
  <!-- 地址页 -->
  <div class="container">
    <van-nav-bar
      class="header"
      fixed
      title="地址管理"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 地址列表 -->
    <main class="address">
      <van-row v-for="item in AddressList" :key="item.address_id">
        <van-col span="24">
          <div class="address-item">
            <span class="info">{{ item.name }} {{ item.phone }}</span>
            <span class="detail-address"
              >{{ item.region.province }} {{ item.region.city }}
              {{ item.region.region }} {{ item.detail }}</span
            >
            <hr class="divide" />
            <van-checkbox
              @click="setDefaultAddress(item.address_id)"
              style="margin-left: 40px; margin-bottom: 20px"
              v-model="item.isdefault"
              >默认</van-checkbox
            >
            <div
              style="margin-left: 210px; margin-top: -42px; margin-bottom: 20px"
            >
              <van-icon
                name="edit"
                size="25"
                style="margin-right: 20px"
                @click = "$router.push(`/addressDetail/${item.address_id}`)"
              ></van-icon>
              <van-icon name="delete-o" size="25" @click="removeAddress(item.address_id)"></van-icon>
            </div>
          </div>
        </van-col>
      </van-row>
    </main>
    <!-- 删除地址 -->
    <footer class="footer">
      <van-button
        @click="$router.push('/addressEdit')"
        style="width: 300px; left: 15px"
        round
        type="info"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        >新增地址
      </van-button>
    </footer>
  </div>
</template>
<script>
import {
  getAddress,
  getDefaultAddress,
  setDefaultAddress,
  deleteAddress
} from '@/api/address'
export default {
  name: 'addressManage',
  data () {
    return {
      chice: true,
      AddressList: ['你好']
    }
  },
  methods: {
    // 获取地址数据
    async getAddress () {
      const {
        data: { list }
      } = await getAddress()
      const {
        data: { defaultId }
      } = await getDefaultAddress()
      list.forEach((item) => {
        item.isdefault = item.address_id === defaultId
      })
      this.AddressList = list
    },
    // 设置默认地址
    async setDefaultAddress (addressId) {
      await setDefaultAddress(addressId)
      // 重新拉取更新后的数据
      this.getAddress()
    },
    // 删除地址
    async removeAddress (addressId) {
      await deleteAddress(addressId)
      // 重新拉取更新后的数据
      this.getAddress()
    }
  },
  async created () {
    this.getAddress()
  }
}
</script>
<style lang="less" scoped>
.container {
  position: relative;
  min-height: 100%;
}
.address {
  margin-top: 30px;
  padding: 1rem;
  width: 100%;
  height: 80%;
  .address-item {
  background-color: rgb(235, 235, 235);
    margin-left: 10px;
    margin-top: 20px;
    margin: 14px, auto, 14px, auto;
    padding: 22px, 29px;
    width: 94%;
    display: flow-root;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.05);
    border-radius: 11px;
    background: #fff;
    position: relative;
    .info {
      display: block;
      font-size: 18px;
      margin-left: 40px;
      margin-top: 20px;
    }
    .detail-address {
      display: block;
      font-size: 16px;
      margin-left: 40px;
      margin-top: 10px;
    }
    .divide {
      width: 80%;
      margin-left: 10%;
      margin-top: 5px;
      background-color: rgb(231, 231, 231);
      height: 0.5px;
      border: none;
      margin-bottom: 10px;
    }
  }
}
.header {
  background-color: #ffffff;
}
.footer {
  background-color: #f8f9fa;
  padding: 1rem;
  position: fixed;
  width: 100%;
  bottom: 0;
}
main.scrollable {
  margin-top: calc(1rem + env(safe-area-inset-top));
  margin-bottom: calc(1rem + env(safe-area-inset-bottom));
  overflow-y: auto;
  height: calc(
    100% - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 2rem
  );
  padding: 1rem;
}
</style>
