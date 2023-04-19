<template>
  <div class="panel">
    <div class="panel-header">
      <!-- 主标题 -->
      <div class="panel-title">
        <span>{{ title }}</span>
      </div>
      <!-- 副标题 和 > -->
      <div class="panel-more" @click="routerTo">
        <!-- $slots.subtitle判断 该组件的使用者是否在使用该组件时传递了名为 subtitle 的具名插槽。 -->
        <slot name="subtitle" v-if="$slots.subtitle"></slot>
        <span v-else>{{ subtitle }}</span>
        <m-icon v-if="to" name="arrow-right" size="24"/>
      </div>
    </div>
    <!-- 不确定使不使用 -->
    <div class="panel-content" :class="{ 'scroll-x': scrollX }">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "MPanel",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    replace: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
    },
    scrollX: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    routerTo() {
      if (this.to) {
        if (this.replace) {
          this.$router.replace(this.to);
        } else {
          this.$router.push(this.to);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.panel {
  // 标准文档流中，竖直方向不叠加
  margin: 20px;
  padding-bottom: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  .panel-header {
    padding: 0 20px;
    height: 84px;
    // 行高
    line-height: 84px;  
    font-size: 28px;
    color: #666;
    display: flex;
    align-items: center;
    .panel-title {
      // 拉伸填充剩余空间
      flex: 1;
      span {
        // 字体粗细程度
        font-weight: 500;
        // display: inline-block;
        // &::before {
        //   content: "";
        //   vertical-align: middle;
        //   display: inline-block;
        //   margin-top: -4px;
        //   margin-right: 8px;
        //   width: 6px;
        //   height: 28px;
        //   border-radius: 10px;
        //   background-color: $color-theme;
        // }
      }
    }
    .panel-more {
      height: 80px;
      font-size: 24px;
      padding-left: 8px;
      .m-icon {
        vertical-align: top;
      }
    }
  }

  .panel-content {
    width: 100%;
    // 交集选择器
    &.scroll-x {
      padding: 0 22px;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>