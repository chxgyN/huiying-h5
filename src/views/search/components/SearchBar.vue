<template>
  <div class="search-wrapper">
    <div class="search">
      <div class="search-form">
        <i class="iconfont icon-search"></i>
        <!-- 
          点击回车会触发表单提交
          该事件会导致页面刷新
          阻止表单提交
        -->
        <form @submit.prevent>
          <!--input发生输入事件时，调用自定义事件，将当前输入的value传递 -->
          <input
            ref="input"
            type="search"
            :value="value"
            @input="$emit('input', $event.target.value)"
            placeholder="搜影视 / 影人 "
          />
        </form>
        <i class="m-icon m-icon-cross" v-show="value" @click=clearValue></i>
      </div>
      <span class="go-back" @click="$router.replace('/home')">取消</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",

  props: {
    value: String,
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.input.focus();
    });
  },

  methods: {
    // 组件自定义事件
    clearValue() {
      this.$emit("on-clear");
    }
  },
};
</script>

<style scoped lang="scss">
.search-wrapper {
  height: 100px;
  position: relative;
  .search {
    z-index: 99;
    position: fixed;
    left: 0;
    top: 0;
    padding: 15px 0;
    width: 100%;
    height: 60px;
    display: flex;
    box-sizing: content-box;
    background-color: #fff;
    .search-form {
      display: flex;
      align-items: center;
      flex: 1;
      margin-left: 30px;
      padding: 0 20px;
      position: relative;
      height: 60px;
      line-height: 60px;
      border-radius: 60px;
      background: rgb(245, 245, 245);
      .icon-search {
        width: 40px;
        color: #999;
        font-size: 32px;
        text-align: center;
      }
      form {
        margin-left: 6px;
        flex: 1;
        input {
          height: 60px;
          color: #999;
          font-size: 28px;
          vertical-align: top;
          border: none;
          background: transparent;
          width: 100%;
        }
        input[type="search"] {
          -webkit-appearance: none;
        }
        input::-webkit-search-decoration,
        input::-webkit-search-cancel-button {
          display: none;
        }
      }
      .m-icon-cross {
        width: 44px;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        background-color: #c5c5c5;
        transform: scale(0.76);
      }
    }
    .go-back {
      width: 120px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 28px;
      color: #777;
    }
  }
}
</style>