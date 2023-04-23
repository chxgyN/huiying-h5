<!-- 电影详情页的页眉 -->
<template>
  <div class="header-wrapper" ref="header">
    <header class="header">
    
      <!-- isTop是一个滚动值判断，大于这个值为真，小于这个值为假 -->
      
      <!-- ！！透明度相同，后面的元素会覆盖前面的元素 -->

      <!-- 滚动背景遮罩 -->
      <!-- :class="{ 'is-show': !isTop }" -->
      <!-- bgcolorStyle 
           如果传过来海报中值颜色，
           如果没有使用空值 -->
      <!-- opacity
           根据高度计算透明度 -->
      <div
        class="header-bg"
        :style="bgcolorStyle + opacity"
      >
      </div>

      <!-- 电影两字 -->
      <div class="category" :class="{ 'is-show': isTop }">
        {{ placeholder }}
      </div>

      <!-- 内容区 按钮也在这里-->
      <div class="header-content" :class="{ 'is-show': !isTop }">
        <div class="header-box">
          <div class="header-poster" v-if="poster">
            <img class="poster" :src="poster" />
          </div>
          <div class="header-info">
            <h3 class="title">{{ title }}</h3>
            <slot name="subtitle" v-if="$slots.subtitle"></slot>
            <div class="subtitle" v-else>{{ subtitle }}</div>
          </div>
        </div>
        <div class="header-slot" :class="{ 'is-share': share }">
          <slot/>
        </div>
      </div>

      <div class="back" @click="$router.back()">
        <i class="iconfont icon-back"></i>
      </div>

      
      <div class="share" v-if="share" @click="showShare()">
        <m-icon name="share" size="40" />
      </div>
    </header>
  </div>
</template>

<script>
import { throttle } from "@/util";

export default {
  name: "HeaderScrollBar",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    poster: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    bgcolor: {
      type: String,
    },
    share: {
      type: Boolean,
      default: false,
    },
    startTop: {
      type: Number,
      default: 10,
    },
    endTop: {
      type: Number,
      default: 160,
    },
  },
  data() {
    return {
      scrollTop: 0,
      isBindScroll: false,
      scrollTopValue: 0,
      headerH: 100,
    };
  },
  computed: {
    isTop() {
      console.log(this.scrollTop <= this.headerH);
      return this.scrollTop <= this.headerH;
    },
    bgcolorStyle() {
      return this.bgcolor ? `background-color: ${this.bgcolor};` : `background-color: gray;`;
    },
    opacity() {
      if (this.scrollTop < this.startTop) {
        return `opacity: 0;`;
      }
      const rate = this.scrollTop / this.headerH;
      const opacity = rate > 1 ? 1 : rate;  
      return `opacity: ${opacity};`;
    },
  },

  // 由于有页面是 keep-alive，会先后触发 mounted->activated 生命周期，因此
  // 用 isBindScrol 标志位判断是否已绑定 srcoll 事件监听，已监听则 actived 生命周期中
  // 不需要再次监听
  mounted() {
    this.isBindScroll = true;
    this.headerH = document.querySelector(".header").offsetHeight;
    console.log("@@"+this.headerH);
    window.addEventListener("scroll", this.handleScroll);
  },

  // 避免内存泄漏
  beforeDestroy() {
    this.isBindScroll = false;
    window.removeEventListener("scroll", this.handleScroll);
  },

  activated() {
    if (this.isBindScroll) return;
    window.addEventListener("scroll", this.handleScroll);
  },

  deactivated() {
    this.isBindScroll = false;
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    showShare() {
      console.warn("uncomplate");
    },

    handleScroll: throttle(function () {
      this.getScrollTop();
    }),

    getScrollTop() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // 只有在滚动范围内时改变 scrollTop 值以优化滚动
      if (this.scrollTopValue <= this.endTop + 20) {
        console.log(this.scrollTop);
        this.scrollTop = scrollTop;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header-wrapper {
  background-color: transparent;
  .header {
    z-index: 9;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100px;
    color: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    .back {

      position: absolute;
      left: 10px;
      top: 0;
      width: 80px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 38px;
      opacity: 1;
    }

    .header-bg {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100px;
      transition: opacity 0.15s ease-in-out;
      opacity: 0;
      // background-color: $color-theme;

      &.is-show {
        opacity: 1;
      }
    }

    .category {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 32px;
      transform: translateY(-100%);
      transition: all 0.2s ease-in-out;
      opacity: 0;

      &.is-show {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .header-content {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: space-between;
      opacity: 0;
      &.is-show {
        opacity: 1;

        .header-box {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .header-box {
        display: flex;
        align-items: center;
        height: 100px;
        padding-left: 100px;
        flex: 1;
        opacity: 0;
        transform: translateY(100%);
        transition: all 0.2s ease-in-out;
        .header-poster {
          margin-right: 16px;
          width: 50px;
          height: 68px;
          flex-shrink: 0;
          .poster {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
            background-color: #f5f5f5;
          }
        }
        .header-info {
          overflow: hidden;
          .title {
            font-size: 28px;
            height: 38px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .subtitle {
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .header-slot {
        display: flex;
        align-items: center;
        margin-right: 20px;
        &.is-share {
          margin-right: 100px;
        }
      }
    }
    .share {
      z-index: 1;
      position: absolute;
      right: 10px;
      top: 0;
      width: 80px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>