<template>
  <div class="container">
    
    <skeleton v-if="loading" :is-half="isHalf" :offset-top="infoHeight" />

    <!-- 吸顶头部 -->
    <header-scroll-bar
      ref="headerScrollBar"
      :poster="poster"
      :title="movie.title"
      :placeholder="movie.category"
      :bgcolor="movie.bgcolor"
    >
      <template v-slot:subtitle>
        <div class="is-coming" v-if="movie.release_status === 1">
          <span class="wish-count">{{ movie.wish_count }}</span>
          <span class="wish-label">人想看</span>
        </div>
        <div v-else-if="movie.rating">
          <m-rate
            v-model="movie.rating"
            :size="24"
            :step="2"
            :max="10"
            allow-half
            readonly
          />
          <span>{{ movie.rating }}</span>
        </div>
        <div class="movie-subtitle" v-else v-html="movie.title_original">
        </div>
      </template>

      <!-- 想看/评分 -->
      <div class="btn-group" v-if="!movie.is_rating">
        <div
          class="btn"
          :class="{ 'is-wish': movie.is_wish }"
          @click="wishChange()"
        >
          {{ movie.is_wish ? "已想看" : "想看" }}
        </div>
        <div
          v-if="movie.release_status !== 1"
          class="btn"
          @click="$router.push(`/movies/${movie.id}/rating/create`)"
        >
          看过
        </div>
      </div>

      <!-- 已评分 -->
  
    </header-scroll-bar>

    <!-- 基本信息 -->
    <div class="info-wrapper" :style="bgStyle">
      <!-- 基本信息 -->
      <movie-info
        :movie="movie"
        :loading="loading"
        ref="movieInfoRef"
        @wish-change="wishChange"
      />
      <!-- 评分 -->
      <movie-rating :movie="movie" />
      <!-- 标签 -->
      <div class="tag-list">
        <div class="tag" v-for="(tag, index) in movie.tags" :key="index">
          {{ tag }}
        </div>
      </div>
      <!-- 剧情 -->
      <m-panel 
        title="剧情" 
        subtitle="详情"
        :to="`/movies/${id}/detail`" 
        v-if="movie.summary"
      >
        <div class="summary">
          <div>{{ movie.summary }}</div>
        </div>
      </m-panel>
      <!-- 演员 -->
      <m-panel
        v-if="movie.cast_count > 0"
        title="演员"
        :subtitle="`全部${movie.cast_count}`"
        :to="`/movies/${movie.id}/cast`"
      >
      <!-- 插槽中对该内容区域设置了两个样式 实现横向滚动
        overflow-x：scroll 
        防止文本换行
      -->
        <div class="actor-list ">
          <!-- 每一个都是行内块 -->
          <actor-row
            v-for="actor in movie.cast"
            :key="actor.union_id"
            :actor="actor"
          />
        </div>
      </m-panel>
    </div>

    <!-- 奖项 子页面-->
    <m-panel
      v-if="movie.awards_total_count > 0"
      title="奖项"
      :to="`/movies/${movie.id}/awards`"
    >
      <movie-award :movie="movie" />
    </m-panel>

    <!-- 资料 -->
    <m-panel title="资料" v-if="hasExtra">
      <movie-extra :movie="movie" />
    </m-panel>

    <!-- 相似 to属性才有小箭头和跳转-->
    <!-- movierow不是影视筛选页的，而是全局注册的那个 -->
    <!-- 懒加载 -->
    <m-panel 
      title="相似影视" 
      v-if="movie.like_movies.length > 0"
    >
      <movie-row
        v-for="movie in movie.like_movies"
        :key="movie.id"
        :movie="movie"
      />
    </m-panel>

    <footer-info />

    <!-- 详情/收藏等 -->
    <!-- 包裹添加过渡效果 -->
    <!-- 评分提交后，利用自定义事件，重新获取信息 -->
    <!-- 收藏提交后，利用自定义事件，重新获取信息 -->
    <transition :name="transition">
      <router-view
        :movie="movie"
        :loading="loading"
        @ratingChange="ratingChange"
        @favorite-update="favoriteUpdate"
      />
    </transition>
  </div>
</template>

<script>
import { getMovie } from "@/api/movie";
import { userMovieWish } from "@/api/user";

import MovieInfo from "./components/MovieInfo";
import MovieRating from "./components/MovieRating";
import PhotoWall from "./components/PhotoWall";
import MovieAward from "./components/MovieAward";
import MovieExtra from "./components/MovieExtra";
import Skeleton from "./components/Skeleton";

export default {
  name: "MovieDetail",
  components: {
    MovieInfo,
    MovieRating,
    PhotoWall,
    MovieAward,
    MovieExtra,
    Skeleton,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
      detail: false,
      movie: {
        cast_count: 0,
        cast: [],
        review_count: 0,
        reviews: [],
        like_movies: [],
        collection_count: 0,
        photo_count: 0,
        photos: [],
        is_wish: false, // 是否想看
        is_collection: false,
      },
      infoHeight: 0,
      isShowSaveModal: true,
      check: false,
      wishLoading: false,
      // 从下往上抽屉式 layer ，页面滑动slide-left
      transition: "slide-left", 
    };
  },

  computed: {
    isHalf() {
      const movie = this.$store.getters.getMovie;
      return movie && parseInt(this.id) === parseInt(movie.id);
    },
    poster() {
      return typeof this.movie.poster === "object"
        ? this.movie.poster.small
        : this.movie.poster;
    },
    bgStyle() {
      return { background: this.movie.bgcolor };
    },
    hasExtra() {
      return (
        this.movie.level_count ||
        this.movie.dialogue_count ||
        this.movie.knowledge_count ||
        this.movie.company_count
      );
    },
  },

  watch: {
    id: {
      handler() {
        const movie = this.$store.getters.getMovie;

        if (movie && parseInt(this.id) === movie.id) {
          this.movie = { ...this.$options.data().movie, ...movie };
          document.title = movie.title;
        } else {
          this.movie.category = "加载中...";
        }

        this.getMovie();

        this.$nextTick(() => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.$refs.headerScrollBar.getScrollTop();

          const headerH =
            this.$refs.headerScrollBar.$el.querySelector(
              ".header"
            ).offsetHeight;
          const InfoH = this.$refs.movieInfoRef.$el.offsetHeight;

          this.infoHeight = headerH + InfoH;
        });
      },
      immediate: true,
    },
  },

  // 组件内守卫 movie下增加修改参数 变化前都会调用
  beforeRouteUpdate(to, from, next) {
    // 使用layer上拉过渡的组件名
    const layerRouters = [
      "MovieFavorite",
      "MovieDetail",
      "MovieRating",
      "MovieRatingCreate",
    ];
    if (layerRouters.includes(to.name)) {
      this.transition = "layer";
    } else {
      this.transition = "slide-left";
    }
    next();
  },

  activated() {
    const movie = this.$store.getters.getMovie;

    if (parseInt(this.id) === movie.id) {
      this.movie = { ...this.movie, ...movie };
      document.title = movie.title;
    }
  },

  methods: {
    ratingChange() {
      this.getMovie();
    },

    favoriteUpdate(data) {
      this.movie.collection_count = data.collection_count;
      this.movie.is_collection = data.is_collection;
    },

    // 获取影视信息
    async getMovie() {
      this.loading = true;
      const { code, data } = await getMovie(this.id);

      if (code === 200) {
        let movie = data;
        movie.akas = movie.akas.join(" / ");
        movie.countries = movie.countries.join(" / ");
        movie.genres = movie.genres.join(" / ");
        movie.durations = movie.durations.join(" / ");
        movie.languages = movie.languages.join(" / ");
        movie.pubdates = movie.pubdates.join(" / ");

        this.movie = Object.assign(this.$options.data().movie, movie);
        this.$store.commit("SET_MOVIE", this.movie);
        document.title = movie.title;
      }

      this.$nextTick(() => {
        this.loading = false;
      });
    },

    async wishChange() {
      // 网速很慢 多次点击必须等异步请求完成后 才可以进行下次请求
      if (this.wishLoading) return;
      this.wishLoading = true;
      const { code, data, message } = await userMovieWish(this.id);
      this.wishLoading = false;
      if (code === 200) {
        this.movie.is_wish = data.is_wish;
        // 取消想看1 想看2
        this.movie.wish_count = data.wish_count;
        this.$message.success(message);
      }
    },
  },
};
</script>


<style scoped lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  .btn-group {
    display: flex;
    align-items: center;
    height: 100px;
    .btn {
      margin-left: 20px;
      padding: 0 10px;
      border-radius: 6px;
      height: 48px;
      line-height: 48px;
      background-color: rgba(#fff, 0.25);
      &.is-wish {
        color: rgba(#fff, 0.35);
        background-color: rgba(#fff, 0.1);
      }
    }
    &.has-rating {
      font-size: 24px;
      label {
        margin-left: 8px;
        color: #f7ba2a;
        font-weight: bold;
      }
    }
  }
  .is-coming {
    height: 40px;
    .wish-count {
      color: #f7ba2a;
      font-size: 28px;
      margin-right: 4px;
    }
    .wish-label {
      font-style: 20px;
    }
  }
  .movie-subtitle {
    font-size: 24px;
    max-width: 360px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.info-wrapper {
  padding-top: 100px;
  padding-bottom: 10px;
  background-color: #232020;
  ::v-deep .panel {
    margin: 0;
    // 设置元素背景透明
    background-color: transparent;
    .panel-title span {
      color: #fff;
      &::before {
        display: none;
      }
    }
    .panel-more {
      color: #fff;
    }
  }
  .tag-list {
    display: flex;
    // 弹性盒子换行
    flex-wrap: wrap;
    margin: 30px 20px 0;
    color: #f5f5f5;
    .tag {
      font-size: 24px;
      line-height: 56px;
      height: 56px;
      padding: 0 24px;
      margin: 0 16px 16px 0;
      border-radius: 28px;
      background: rgba(#fff, 0.1);
    }
  }
  .summary {
    white-space: normal;
    color: #f5f5f5;
    display: -webkit-box;
    // 主轴设置为垂直方向
    -webkit-box-orient: vertical;
    // 限制显示行数为四行
    -webkit-line-clamp: 4;
    // overflow: hidden;
    // text-align: justify;
  }
  .actor-list {
    // 使用了 ::v-deep 伪类选择器来穿透组件的样式作用域，从而修改 .actor-row 元素内部的样式。
    ::v-deep .actor-row {
      .actor-name {
        color: #fff;
      }
      .actor-label {
        color: rgba(#f5f5f5, 0.75);
      }
    }
  }

}
</style>
