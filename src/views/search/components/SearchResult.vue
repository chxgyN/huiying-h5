<template>
  <div class="container search-result">
    <div class="menu-list" :class="'menu-' + type">
      <!-- isactive高亮效果 -->
      <div
        class="menu-item"
        :class="{ 'is-active': type === 'movie' }"
        @click="typeChange('movie')"
      >
        影视
      </div>
      <div
        class="menu-item"
        :class="{ 'is-active': type === 'actor' }"
        @click="typeChange('actor')"
      >
        影人
      </div>
      <!-- <div
        class="menu-item"
        :class="{ 'is-active': type === 'role' }"
        @click="typeChange('role')"
      >
        角色
      </div> -->
    </div>

    <!-- 搜索结果 
      dosearch执行 1 滚动到底部时自动执行 2 keyword改变时 3 第一次切换type的时候-->
    <div class="result-list" v-infinite-scroll="doSearch">
      <!-- 加载中 -->
      <transition name="fade">
        <div class="init-loading" v-if="isShowLoading">
          <m-spinner type="triple" color="#f60, #7fd901, #36a2e0" />
        </div>
      </transition>

      <!-- 无查询内容 -->
      <div v-if="isShowNoData" class="no-data">未找到相关内容</div>

      <!-- 影视搜索结果 -->
      <div class="movie-result" v-show="type === 'movie'">
        <movie-item
          @on-checked="checkedHandle(movie.title)"
          v-for="movie in movies"
          :movie="movie"
          :key="movie.id"
          :keyword="keyword"
        />
      </div>

      <!-- 影人搜索结果 -->
      <div class="actor-result" v-show="type === 'actor'">
        <actor-item
          @on-checked="checkedHandle(actor.name)"
          v-for="actor in actors"
          :actor="actor"
          :key="actor.id"
          :keyword="keyword"
        />
      </div>

      <m-loadmore v-if="!isShowNoData" :loading="loading" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { debounce } from "@/util";

export default {
  name: "SearchResult",

  props: ["keyword"],

  data() {
    return {
      loading: false,
      cancel: null,
      per_page: 20,
      type: "movie",
      movies: [],
      actors: [],
      moviePage: 1,
      actorPage: 1,
      movieTotal: 0,
      actorTotal: 0,
      movieTop: 0,
      actorTop: 0,
      movieNoMoreData: false,
      actorNoMoreData: false,
    };
  },

  watch: {
    keyword(val) {
      if (val) {
        this.refreshSearch();
      }
    },
  },

  computed: {
    isShowLoading() {
      return this.loading && this[this.type + "Page"] === 1;
    },
    isShowNoData() {
      return this[this.type + "Total"] === 0 && !this.loading;
    },
  },

  methods: {
    refreshSearch() {
      this.movieNoMoreData = false;
      this.actorNoMoreData = false;
      this.movies = [];
      this.actors = [];
      this.moviePage = 1;
      this.actorPage = 1;
      this.movieTotal = 0;
      this.actorTotal = 0;
      this.movieTop = 0;
      this.actorTop = 0;
      this.doSearch();
    },

    // 选中记录关键字
    checkedHandle(keyword) {
      this.$emit("keyword-change", keyword);
    },

    typeChange(type) {
      // 保存当前页面滑动高度
      const scrollTop =  document.documentElement.scrollTop || document.body.scrollTop;
      this[this.type + "Top"] = scrollTop;

      this.type = type;

      this.$nextTick(function(){
        document.documentElement.scrollTop = this[type + "Top"];
      });

      if (this[this.type + "Total"] === 0) {
        this.doSearch();
      }
    },
    // 该包装器将经过?毫秒的非活动状态，然后使用最新的参数调用 f 一次。
    doSearch: debounce(function () {
      if (this.keyword) {
        this.search();
      }
    }),

    // 接口有新请求时取消上次的请求
      // req1发出请求(超出防抖函数设置时间200ms) 第300ms接受 覆盖req2结果
      // req2发出请求第210ms发出 第290ms接受
    async search() {
      if (this[this.type + "NoMoreData"] === true) return;
      this.loading = true;
      // 通过axios创建一个canceltoken类
      let CancelToken = axios.CancelToken;
      let _this = this;
     
      // 取消方法存在,执行取消
      // 首次输入无此方法,等待初始工作完毕以后,执行await后面创建取消函数
      // 因为第一次不存在上次请求

      if (this.cancel) {
        this.cancel();
      }
      
      let page;
      if (this.type === "actor") {
        page = this.actorPage; 
      } else {
        page = this.moviePage;
      }

      let params = {
        page,
        keyword: this.keyword,
        type: this.type,
      };
      
      // 响应码,数据,数据总数
      const { code, data, total } = await axios.get(`/search`, {
        params,
        cancelToken: new CancelToken(function executor(c) {
          _this.cancel = c;
        }),
      })

      // 调用this.cancel()取消请求
      if (code === 200) {
        switch (this.type) {
          case "actor":
            this.actors.push(...data);
            this.actorPage++;
            this.actorTotal = total;
            break;
          default:
            // 数组中的data对象摊开
            this.movies.push(...data);
            this.moviePage++;
            this.movieTotal = total;
            break;
        }
        if (data.length < this.per_page) {
          this[this.type + "NoMoreData"] = true;
        }
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.container.search-result {
  .menu-list {
    z-index: 3;
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    padding-left: 12px;
    height: 74px;
    color: rgb(102, 102, 102);
    border-bottom: 1px solid #eee;
    background-color: #fff;
    &::after {
      content: "";
      position: absolute;
      left: 68px;
      bottom: 4px;
      width: 46px;
      height: 6px;
      background-color: $color-theme;
      border-radius: 4px;
      transform: translateX(-50%);
      transition: left 0.2s;
    }
    &.menu-movie {
      &::after {
        left: 68px;
      }
    }
    &.menu-actor {
      &::after {
        left: 180px;
      }
    }
    &.menu-role {
      &::after {
        left: 292px;
      }
    }
    .menu-item {
      display: inline-block;
      width: 112px;
      height: 74px;
      line-height: 56px;
      font-weight: bold;
      font-size: 28px;
      text-align: center;
      transition: font-size 0.2s;
      &.is-active {
        font-size: 32px;
      }
    }
  }

  .result-list {
    padding: 80px 0 15px;
    .no-data {
      height: 400px;
      line-height: 400px;
      text-align: center;
      color: #888;
    }

    // 影视样式重写
    .movie-result {
      ::v-deep .poster-wrapper {
        width: 134px;
        height: 180px;
      }
    }

    // 影人影视重写
    .actor-result {
      ::v-deep .actor-avatar {
        width: 134px;
        height: 180px;
      }
    }

    // 角色样式重写
    .role-result {
      ::v-deep .role-avatar {
        width: 134px;
        height: 180px;
      }
    }
  }

  .init-loading {
    z-index: 99;
    position: fixed;
    left: 0;
    top: 164px;
    right: 0;
    bottom: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>