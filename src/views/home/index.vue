<template>
  <div class="container">
     <!-- 加载效果 -->
    <skeleton v-if="loading" />

    <!-- <header-bar :bgcolor="bgcolor" /> -->
    <header-bar/>

    <!-- swiper -->
    <!-- <div class="swipe-wrapper" v-if="swipers.length">
      <home-swiper :data="swipers" @swiper-index-change="onSwiperIndexChange" />
    </div> -->

    <!-- 导航菜单 -->
   

    <!-- 正在热映 -->
    <!-- slot默认插槽（组件中放内容）抽取共性、用slot占位保留不同 
    要「重复」使用某个组件 但组件中的一部分内容结构不同-->

    
    <m-panel 
      title="正在热映" 
      :subtitle="theaters.total + '部'" 
      to="/theater">
      <div class="movie-list">
        <movie-row
          v-for="movie in theaters.data"
          :movie="movie"
          :key="movie.id"
        />
      </div>
    </m-panel>

    
    <!-- 即将上映 -->
    <m-panel 
      title="即将上映" 
      :subtitle="comings.total + '部'" 
      to="/coming">
      <div class="movie-list">
        <movie-row
          v-for="movie in comings.data"
          :movie="movie"
          :key="movie.id"
          is-coming
        >
          <div class="coming-date">{{ movie.release_date }}</div>
        </movie-row>
      </div>
    </m-panel>
    
    
    <!-- 那年今日 -->
    <m-panel title="那年今日" :subtitle="todays.total + '部'" to="/today">
      <div class="movie-list">
        <movie-row
          v-for="movie in todays.data"
          :movie="movie"
          :key="movie.id"
        />
      </div>
    </m-panel>

    <home-menu /> 

    <footer-info />
  </div>
</template>

<script>
import { APP_NAME } from "@/config";
import { getIndex } from "@/api/api";

import Skeleton from "./components/Skeleton.vue";
import HomeMenu from "./components/HomeMenu.vue";
// import HomeSwiper from "./components/HomeSwiper.vue";
import HeaderBar from "./components/HeaderBar.vue";

export default {
  name: "Home",
  components: {
    Skeleton,
    HeaderBar,
    HomeMenu,
    // HomeSwiper,
  },
  data() {
    return {
      loading: false,
      // swipers: [],
      articles: [],
      todays: {
        total: "-",
      },
      theaters: { total: "-" },
      comings: { total: "-" },
      // bgcolor: "",
    };
  },

  filters: {
    dateToZh(date) {
      let dateList = date.split("-");

      if (dateList.length === 1) {
        return dateList[0] + "年";
      } else if (dateList.length === 2) {
        return dateList[0] + "年" + dateList[1] + "月";
      } else if (dateList.length === 3) {
        return dateList[1] + "月" + dateList[2] + "日";
      } else {
        return "";
      }
    },
  },

  created() {
    document.title = APP_NAME;
  },

  activated() {
    document.title = APP_NAME;
  },

  mounted() {
    this.getIndex();
  },

  methods: {
    async getIndex() {
      this.loading = true;
      const { code, data } = await getIndex();

      if (code === 200) {
        // this.swipers = data.swiper;
        this.articles = data.article.data;
        this.comings = data.coming;
        this.theaters = data.theater;
        this.todays = data.today;
      }

      // this.onSwiperIndexChange();

      this.$nextTick(() => {
        this.loading = false;
      });
    },

    // // 根据轮播变换背景色（swiper的index有bug）
    // onSwiperIndexChange() {
   
    //     this.bgcolor = this.swipers[0].bgcolor;
      
    // },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding-bottom: 10px;
  background-color: rgb(245,245,245)
  ;
  .swipe-wrapper {
    position: relative;
    height: 380px;
  }
  .movie-list {
    min-height: 335px;
    .coming-date {
      height: 36px;
      line-height: 40px;
      font-size: 24px;
      color: #888;
    }
  }
}
</style>
