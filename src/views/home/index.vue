<template>
  <div class="container">
     <!-- 加载效果 -->
    <skeleton v-if="loading" />

    <header-bar/>

    <!-- 正在热映 -->
    <!-- slot默认插槽（组件中放内容）抽取共性、用slot占位保留不同 
    要「重复」使用某个组件 但组件中的一部分内容结构不同-->  
    <m-panel 
      title="正在热映" 
      to="/theater"
    >
      <div class="movie-list">
        <movie-row
          v-for="movie in theatersFilter"
          :movie="movie"
          :key="movie.id"
        />
      </div>
    </m-panel>

    <!-- 即将上映 -->
    <m-panel 
      title="即将上映" 
      to="/coming">
      <div class="movie-list">
        <movie-row
          v-for="movie in comingFilter"
          :movie="movie"
          :key="movie.id"
          is-coming
        >
          <div class="coming-date">{{ movie.release_date }}</div>
        </movie-row>
      </div>
    </m-panel>
    
    <!-- 那年今日 -->
    <m-panel 
      title="那年今日" 
      to="/today"
    >
      <div class="movie-list">
        <movie-row
          v-for="movie in todayFilter"
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
import { getMovieTheater, getMovieComing, getMovieToday} from "@/api/api";

import Skeleton from "./components/Skeleton.vue";
import HomeMenu from "./components/HomeMenu.vue";
import HeaderBar from "./components/HeaderBar.vue";

export default {
  name: "Home",
  components: {
    Skeleton,
    HeaderBar,
    HomeMenu,
  },
  data() {
    return {
      loading: false,
      todays: [],
      theaters: [],
      comings: [],
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
    this.getMovieTheater();
    this.getMovieComing();
    this.getMovieToday();

  },

  computed:{
    theatersFilter() {
      return this.theaters.filter(item => {
        return !item.poster.includes("default")
      })
    },
    comingFilter() {
      return this.comings.filter(item => {
        return !item.poster.includes("default")
      })
    },
    todayFilter() {
      return this.todays.filter(item => {
        return !item.poster.includes("default")
      })
    }
  },
  methods: {
    async getMovieTheater() {
      this.loading = true;
      const { code, data } = await getMovieTheater();
      if (code === 200) {
        this.theaters = data;
      }
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    async getMovieComing() {
      this.loading = true;
      const { code, data } = await getMovieComing();
      if (code === 200) {
        this.comings = data;
      }
      this.$nextTick(() => {
        this.loading = false;
      });
    },
    async getMovieToday() {
      this.loading = true;
      const { code, data } = await getMovieToday();
      if (code === 200) {
        this.todays = data;
      }
      this.$nextTick(() => {
        this.loading = false;
      });
    },

  },
};
</script>

<style scoped lang="scss">
.container {
  padding-bottom: 10px;
  background-color: rgb(245,245,245)
  ;

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
