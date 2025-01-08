import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('@/views/layout/LayoutPage.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/layout/HomePage.vue')
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/layout/CategoryPage.vue')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/layout/ProductCar.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/layout/UserPage.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginPage.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/SearchPage.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/search/SearchList.vue')
  },
  // 商品详情,动态路由传参
  {
    path: '/detial/:id',
    name: 'detial',
    component: () => import('@/views/prodetail/ProductionDetial.vue')
  },
  {
    path: '/comment/:id',
    name: 'comment',
    component: () => import('@/views/prodetail/commentPage.vue')
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/pay/PayPage.vue')
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('@/views/address/AddressPage.vue')
  },
  {
    path: '/addressEdit',
    name: 'addressEdit',
    component: () => import('@/views/address/AddressEdit.vue')
  },
  {
    path: '/addressDetail/:id',
    name: 'addressDetail',
    component: () => import('@/views/address/AddressDetail.vue')
  },
  {
    path: '/orderState',
    name: 'orderState',
    component: () => import('@/views/order/LayoutPage.vue')
  },
  {
    path: '/user/wallet',
    name: 'walletPage',
    component: () => import('@/views/usercenter/MyWallet.vue')
  },
  {
    path: '/user/rechargeRecord',
    name: 'rechargeRecord',
    component: () => import('@/views/usercenter/RechargeRecord.vue')
  },
  {
    path: '/user/billDetails',
    name: 'billDetails',
    component: () => import('@/views/usercenter/BillDetails.vue')
  },
  {
    path: '/user/rechargeCenter',
    name: 'rechargeCenter',
    component: () => import('@/views/usercenter/RechargeCenter.vue')
  },
  {
    path: '/user/coupon',
    name: 'coupon',
    component: () => import('@/views/usercenter/DiscountCoupon.vue')
  },
  {
    path: '/user/points',
    name: 'points',
    component: () => import('@/views/usercenter/PointsPage.vue')
  },
  {
    path: '/user/help',
    name: 'help',
    component: () => import('@/views/usercenter/HelpPage.vue')
  },
  {
    path: '/user/refund',
    name: 'refund',
    component: () => import('@/views/usercenter/RefundPage.vue')
  },
  {
    path: '/user/couponcenter',
    name: 'couponcenter',
    component: () => import('@/views/usercenter/CouponCenter.vue')
  }
]

const router = new VueRouter({
  routes
})
// 需要有权限的页面
const privtePage = ['/pay', '/order', '/orderState', '/cart']
// 配置全局导航守卫
// (1)next() 直接放行
// (2)next(路径) 进行拦截_
router.beforeEach((to, from, next) => {
  // 非隐私页面直接可访问
  if (!privtePage.includes(to.path)) {
    next()
    return
  }
  // 隐私页面进行权限验证
  const token = store.state.user.userInfo.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
