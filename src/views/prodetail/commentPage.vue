<template>
  <!-- 商品评论页 -->
  <div class="comment">
    <!-- 头部导航 -->
    <van-nav-bar
      title="评论"
      left-arrow
      @click-left="$router.push(`/detial/${goodId}`)"
    >
      <template #right>
        <van-icon style="color: #555555" name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <div>
      <tr>
        <td
          class="categorytab"
          v-for="(item, index) in commentCategory"
          :key="index"
        >
          <a
            class="label"
            :class="{ labelActive: index === activeIndex }"
            @click="activeIndex = index"
            >{{ item }}</a
          >
        </td>
      </tr>
    </div>
    <!-- 评论内容 -->
    <CommentItem  v-for="(item,index) in comment" :key=index :item="item"></CommentItem>
    <van-empty v-if="comment.length<=0" description="暂无评论" />
  </div>
</template>
<script>
import CommentItem from '@/components/CommentsItem.vue'
import { getProductComment } from '@/api/product'
export default {
  name: 'commentPage',
  data () {
    return {
      commentCategory: [
        '全部',
        '图/视频',
        '追评',
        '好评',
        '中/差评'
      ],
      activeIndex: 0, // 当前评价类别所在索引
      comment: [] // 评论列表
    }
  },
  methods: {
    getComment () {
      getProductComment(this.goodId, 999).then(res => {
        this.comment = res.data.list
        console.log(this.comment)
      })
    }
  },
  components: {
    CommentItem
  },
  computed: {
    goodId () {
      return this.$route.params.id
    }
  },
  created () {
    this.getComment()
  }
}
</script>
<style lang="less" scoped>
.van-icon-ellipsis {
  color: #555555;
}
.label {
  margin-right: 15px;
  margin-left: 15px;
}
.labelActive {
  color: #fb442f;
  background-color: #fff;
  margin-right: 15px;
  margin-left: 15px;
}
</style>
