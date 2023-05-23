import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { APP_NAME } from './config'

import './assets/styles/index.css'

import 'lib-flexible/flexible'

// 懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload);

import HeaderBar from '@/components/Header/HeaderBar/index'
Vue.use(HeaderBar)

import HeaderScrollBar from '@/components/Header/HeaderScrollBar/index'
Vue.use(HeaderScrollBar)

// fixed 子页面
import Page from '@/components/Page'
Vue.use(Page)

// 面板组件
import MPanel from '@/components/MPanel'
Vue.use(MPanel)

import ActorItem from '@/components/Actor/ActorItem/index'
Vue.use(ActorItem)

import ActorRow from '@/components/Actor/ActorRow/index'
Vue.use(ActorRow)

import MovieRow from '@/components/Movie/MovieRow/index'
Vue.use(MovieRow)

import MovieItem from '@/components/Movie/MovieItem/index'
Vue.use(MovieItem)

// 骨架屏
import MovieSkeleton from '@/components/Movie/Skeleton'
Vue.use(MovieSkeleton)

import MovieCard from '@/components/Movie/MovieCard/index'
Vue.use(MovieCard)

import infiniteScroll from "./directive/infinite-scroll";
Vue.use(infiniteScroll)

import TabSwitch from '@/components/TabSwitch/index'
Vue.use(TabSwitch)

import FooterInfo from '@/components/App/FooterInfo'
Vue.use(FooterInfo)

import NoData from '@/components/NoData'
Vue.use(NoData)

import ImageUpload from "./components/ImageUpload/index";
Vue.use(ImageUpload);

import ImageGroup from "./components/ImageGroup/index";
Vue.use(ImageGroup);

import Skeleton from "./components/Skeleton/index";
Vue.use(Skeleton);

import { preventScroll } from './util/index'
Vue.prototype.$preventScroll = preventScroll;

import components from '@/components /packages'
Vue.use(components);

// 应用名称
Vue.prototype.$APP_NAME = APP_NAME

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
