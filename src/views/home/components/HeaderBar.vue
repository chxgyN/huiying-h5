<!-- 首页搜索顶部 -->
<template>
  <div class="header-bar-wrapper">
    <!-- 绑定class样式的对象写法 不确定用不用 -->
    <div class="header-bar" :class="{ 'is-top': isTop }">
      <div class="search" @click="$router.push('/search')">
        <i class="search-icon iconfont icon-search"></i>
        <span class="search-label">请输入你要搜索的内容</span>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from "@/util/index";

export default {
  name: "HeaderBar",

  data() {
    return {
      scrollTop: 0,
      backgroundStyle: "",
    };
  },

  computed: {
    isTop() {
      return this.scrollTop <= 1;
    },
  },
  // 移入当前页面，给整个页面中添加了一个滚动事件监听器，回调函数
  // 减少滚动事件的触发次数，从而提高应用的性能。
  activated() {
    window.addEventListener("scroll", this.handleScroll);
  },

  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll: throttle(function () {
      this.getScrollTop();
    }),

    getScrollTop() {
      // 为了兼容不同的浏览器，通常会使用类似下面的代码来获取滚动条位置
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollTop = scrollTop;
    },
  },
};
</script>

<style scoped lang="scss">
.header-bar-wrapper {
  position: relative;
  height: 100px;
}
.header-bar {
  z-index: 4;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  // 回溯一层 匹配没有istop属性的header-bar
  &:not(.is-top) {
    background-color: #fff;
    box-shadow: 0 1px 2px #e5e5e5;
    .search {
      background-color: #e5e5e5;
    }
  }
  .search {
    flex: 1;
    display: flex;
    align-items: center;
    height: 56px;
    line-height: 56px;
    border-radius: 100px;
    color: #666;
    background: rgba(#fff, 0.8);
    .search-icon {
      padding: 4px 20px 0;
      font-size: 28px;
    }
    .search-label {
      flex: 1;
      font-size: 28px;
    }
  }
}
</style>