<template>
  <!-- 评论组件 -->
  <div class="comment-list">
    <div class="comment-item">
      <div class="top">
        <img :src="item.user.avatar_url || defaultAvatar" alt="" />
        <div class="name">{{ item.user.nick_name }}</div>
        <van-rate
          :size="16"
          :value="item.score / 2"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
        />
      </div>
      <div class="content">
        {{ item.content }}
      </div>
      <div class="time">
        {{ item.create_time }}
        <div class="shell">
          <van-icon name="chat-o" />
          &nbsp;
          <van-icon name="like-o" />
          &nbsp;
          <van-icon name="share-o" />
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>
<script>
export default {
  name: 'commentItem',
  data () {
    return {
      defaultAvatar: 'https://imgs.699pic.com/images/401/455/311.png!detail.oblique.v1' // 默认头像
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
.comment {
  padding: 10px;
}
.comment-title {
  display: flex;
  justify-content: space-between;
  .right {
    color: #959595;
  }
}

.comment-item {
  font-size: 16px;
  line-height: 30px;
  width: 375px;
  overflow: hidden;
  .top {
    height: 30px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    img {
      width: 20px;
      height: 20px;
    }
    .name {
      margin: 0 10px;
    }
  }
  .time {
    color: #999;
    .shell{
      margin-left: 280px;
      margin-top: -30px;
    }
  }
}
.comment-list{
  width: 375px;
}
</style>
