<template>
  <!-- 商品详情页 -->
  <div class="prodetail">
    <van-nav-bar
      fixed
      title="商品详情页"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 商品展示轮播图 -->
    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="item in images" :key="item.file_id">
        <img :src="item.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }} / {{ images.length }}
        </div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.line_price_min }}</span>
        </div>
        <div class="sellcount">已售{{ detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ total }}条)</div>
        <div class="right" @click="$router.push(`/comment/${goodsId}`)">
          查看更多 <van-icon name="arrow" />
        </div>
      </div>
      <div class="comment-list">
        <div
          class="comment-item"
          v-for="item in comment"
          :key="item.comment_id"
        >
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
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="detail.content"></div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home">
        <van-icon @click="$router.push('/home')" name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart">
        <van-icon
          @click="$router.push('/cart')"
          name="shopping-cart-o"
          :badge="cartTotal"
        />
        <span>购物车</span>
      </div>
      <div class="btn-add" @click="addCart">加入购物车</div>
      <div class="btn-buy" @click="buyNow">立刻购买</div>
    </div>

    <!-- 加入购物车或立即购买弹窗 -->
    <van-action-sheet
      v-model="show"
      :title="mode === 'addCart' ? '加入购物车' : '立即购买'"
    >
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="detail.goods_image" alt="" />
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ detail.goods_price_min  }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <!-- 通过v-model绑定将数据传递各子组件 -->
          <CountBox v-model="chiceCount"></CountBox>
        </div>
        <div class="showbtn" v-if="detail.stock_total > 0">
          <div class="btn" v-if="mode === 'addCart'" @click="handleAddCart">
            加入购物车
          </div>
          <div class="btn now" v-else @click="handleBuyNow">立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getProductDetail, getProductComment } from '@/api/product'
import { addCart } from '@/api/cart'
import CountBox from '@/components/CountBox.vue'
import { Dialog, Toast } from 'vant'
import { mapGetters } from 'vuex'
export default {
  name: 'ProDetail',
  data () {
    return {
      images: [], // 商品展示轮播图
      detail: {}, // 商品的详细信息
      current: 0, // 轮播图当前所处页数
      comment: [], // 评论内容
      limit: 3, // 评论数量
      total: '', // 评论总数
      defaultAvatar:
        'https://imgs.699pic.com/images/401/455/311.png!detail.oblique.v1', // 默认头像
      show: false, // 控制弹窗
      mode: 'addcart', // 控制弹窗为购买或者加入购物车
      chiceCount: 1 // 购买或者加入购物车数量
    }
  },
  computed: {
    // 获取传递的商品ID
    goodsId () {
      return this.$route.params.id
    },
    ...mapGetters('cart', ['cartTotal'])
  },
  components: {
    CountBox
  },
  methods: {
    // 获取当前轮播图到第几个了
    onChange (index) {
      this.current = index
    },
    // 获取详情数据用于渲染
    getDetail () {
      getProductDetail(this.goodsId).then((res) => {
        this.detail = res.data.detail
        this.images = res.data.detail.goods_images
      })
    },
    // 获取商品评论数据
    getComment () {
      getProductComment(this.goodsId, this.limit).then((res) => {
        this.comment = res.data.list
        this.total = res.data.total
      })
    },
    // 加入购物车
    addCart () {
      this.show = true
      this.mode = 'addCart'
    },
    buyNow () {
      this.show = true
      this.mode = 'buyNow'
    },
    // 处理加入购物车
    async handleAddCart () {
      // 判断token，存在则正常执行，不存在则跳转登录
      if (!this.$store.getters.token) {
        Dialog.confirm({
          title: '温馨提示',
          message: '请现登录后再操作',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // 携带上当前的地址，当登录完成后用于回跳
            this.$router.push({
              path: '/login',
              query: { backUrl: this.$route.fullPath }
            })
          })
          .catch(async () => {
            this.show = false
          })
      }
      // Token存在，正常执行加入购物车
      const {
        data: { cartTotal }
      } = await addCart(
        this.goodsId,
        this.chiceCount,
        this.detail.skuList[0].goods_sku_id
      )
      Toast('添加成功')
      this.CartCount = cartTotal
      this.show = false
    },
    // 处理立即购买
    async handleBuyNow () {
      // 判断token，存在则正常执行，不存在则跳转登录
      if (!this.$store.getters.token) {
        Dialog.confirm({
          title: '温馨提示',
          message: '请现登录后再操作',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // 携带上当前的地址，当登录完成后用于回跳
            this.$router.push({
              path: '/login',
              query: { backUrl: this.$route.fullPath }
            })
          })
          .catch(async () => {
            this.show = false
          })
      }
      // Token存在，跳转到支付界面
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          count: this.chiceCount
        }
      })
      this.show = false
    }
  },
  created () {
    this.getDetail()
    this.getComment()
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

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
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home,
    .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}
.tips {
  padding: 10px;
}
.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn,
  .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}
</style>
