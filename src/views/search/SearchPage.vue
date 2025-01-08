<template>
  <!-- 搜索页 -->
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.push('/home')" />

    <van-search v-model="searchKey" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="goSearch(searchKey)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="searchistory.length>0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clearHistory" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div class="list-item" v-for="item in searchistory" @click="goSearch(item)" :key="item">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { getHistorySearch, setHistorySearch } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchKey: '',
      searchistory: getHistorySearch(store.state.user.userInfo.userId)
    }
  },
  methods: {
    goSearch (key) {
      if (key === '') { return }
      if (this.searchistory.includes(key)) {
        this.searchistory = this.searchistory.filter(item => item !== key)
        this.searchistory.unshift(key)
      } else { this.searchistory.unshift(key) }
      setHistorySearch(this.searchistory, store.state.user.userInfo.userId)
      this.searchKey = ''
      this.$router.push(`/list?key=${key}`)
    },
    clearHistory () {
      this.searchistory = []
      setHistorySearch(this.searchistory, store.state.user.userInfo.userId)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
