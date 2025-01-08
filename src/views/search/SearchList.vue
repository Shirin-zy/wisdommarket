<template>
  <!-- 搜索结果页 -->
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.push('/search')" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="searchKey"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" @click="$router.push('/category')" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in prolist" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
    <van-empty v-if="prolist.length<=0" description="暂无商品" />
  </div>
</template>

<script>
import { getSearchProduct } from '@/api/product'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'SearchIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      page: 1,
      prolist: []
    }
  },
  computed: {
    // 获取地址栏的关键字
    searchKey () {
      return this.$route.query.key
    }
  },
  async created () {
    const res = await getSearchProduct({
      categoryId: this.$route.query.categoryId,
      goodsName: this.searchKey,
      page: this.page
    })
    this.prolist = res.data.list.data
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
