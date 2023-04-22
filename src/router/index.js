import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import main from './main'
import movie from './movie'
import actor from './actor'
import award from './award'
import profile from './profile'

const routes = [
    {
      path: '/',
      redirect: '/home'
    },

  ...main,
  ...movie,
  ...actor,
  ...award,
  ...profile,

  // 搜索
  {
    path: '/search',
    name: "Search",
    component: () => import('@/views/search/index')
  },
  { // 正在热映
    path: '/theater',
    name: "Theater",
    component: () => import('@/views/movie/theater')
  },
  { // 即将上映
    path: '/coming',
    name: "Coming",
    component: () => import('@/views/movie/coming')
  },
  { // top 榜单
    path: '/top',
    name: "Top",
    component: () => import('@/views/movie/top')
  },
  { // 获奖
    path: '/award',
    name: "AwardList",
    component: () => import('@/views/award/index')
  },
  { // 那年今日
    path: '/today',
    name: "Today",
    component: () => import('@/views/movie/today')
  },
  // 相册
  // {
  //   path: '/:type/:id/photos',
  //   props: true,
  //   name: "Photos",
  //   component: () => import('@/views/photo/index')
  // },
  // 注册登录找回密码
  {
    path: '/login',
    name: "Login",
    component: () => import('@/views/account/login')
  },
  {
    path: '/register',
    name: "Register",
    component: () => import('@/views/account/register')
  },
  {
    path: '/forget',
    name: "Forget",
    component: () => import('@/views/account/forget')
  },

  // 离线
  {
    path: '/offline',
    name: "Offline",
    component: () => import('@/views/offline')
  },
  // 页面未找到
  {
    path: '*',
    name: "NotFound",
    component: () => import('@/views/404')
  },
]

const router = new VueRouter({
  linkActiveClass: 'is-active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: to.meta.scrollY }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (from.meta.scrollY !== undefined) {
    from.meta.scrollY = window.scrollY;
  }
  next()
})

export default router
