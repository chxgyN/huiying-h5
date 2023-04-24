<template>
  <div class="favorite-container">
    <header-scroll-bar :title="favorite.name" />

    <!-- 收藏夹信息 -->
    <favorite-info :favorite="favorite" :images="photos" />

    <!-- 加载 -->
    <div class="skeleton" v-if="loading">
      <movie-skeleton top="0" :total="4" />
    </div>

    <!-- 收藏影视列表 -->
    <div v-if="total">
      <div class="favorite-list" v-infinite-scroll="loadMore">
        <movie-item v-for="movie in list" :key="movie.id" :movie="movie">
          <div class="movie-tool">
            <span></span>
            <m-icon name="more" @click="showMore($event, movie)" />
          </div>
        </movie-item>
        <m-loadmore :loading="loading" />
      </div>
    </div>

    <div v-else>
      <no-data content="这个收藏夹是空的" />
    </div>

    <!-- 取消收藏 -->
    <m-action-sheet
      :visible="visible"
      :actions="actions"
      show-cancel
      @cancel="visible = false"
      @click="handleClickItem"
    />

    <transition name="layer">
      <router-view :favorite="favorite" @on-change="favoriteChange" />
    </transition>
  </div>
</template>

<script>
import {
  getUserFavorite,
  getUserFavoriteMovies,
  deleteUserFavoriteMovies,
} from "@/api/user";
import FavoriteInfo from "./components/FavoriteInfo";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "Favorite",

  components: { FavoriteInfo },

  mixins: [getInfiniteData],

  props: ["id"],

  data() {
    return {
      favoriteLoading: false,
      visible: false,
      movie: {},
      actions: [
        {
          name: "取消收藏",
          color: "#ed3f14",
          loading: false,
        },
      ],
      favorite: {
        name: "加载中",
        count: "-",
      },
    };
  },

  computed: {
    photos() {
      // 获取索引小于3的海报
      return this.list.filter((m, idx) => idx < 3).map((m) => m.poster);
    },
  },

  mounted() {
    this.getUserFavorite();
  },

  methods: {
    favoriteChange(val) {
      this.favorite = val;
    },

    loadMore() {
      this.getData(getUserFavoriteMovies, this.id);
    },

    async getUserFavorite() {
      this.favoriteLoading = true;
      const { code, data } = await getUserFavorite(this.id);
      this.favoriteLoading = false;
      if (code === 200) {
        this.favorite = data;
      }
    },

    showMore(event, movie) {
      console.log(event, movie);
      this.movie = movie;
      this.visible = true;
      event.stopPropagation();
    },

    async handleClickItem(index) {
      if (index === 0) {
        this.actions[0].loading = true;
        // id是收藏夹的id；union_id是影视id
        const { code, data, message } = await deleteUserFavoriteMovies(
          this.id, 
          this.movie.union_id
        );
        console.log(...this.list );
        this.actions[0].loading = false;
        if (code === 200) {
          this.$toast(message);
          const index = this.list.findIndex(
            (m) => 
            m.union_id === this.movie.union_id
          );
          // 从list中删除，渲染更新后的list和总个数
          if (index > -1) {
            this.list.splice(index, 1);
            this.favorite.count = --this.favorite.count;
            console.log(...this.list);
          }
          this.visible = false;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.favorite-container {
  .skeleton {
    position: absolute;
    left: 0;
    top: 330px;
    right: 0;
    bottom: 0;
  }
  .favorite-list {
    padding: 15px 0;
    .movie-tool {
      margin: 12px -12px 0;
      padding: 0 12px;
      height: 36px;
      line-height: 36px;
      font-size: 24px;
      color: #999;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>