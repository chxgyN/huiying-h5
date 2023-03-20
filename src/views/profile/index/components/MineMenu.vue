<template>
  <div class="menu-list">
    <div class="menu-item" @click="pathTo('actors')">
      <div class="menu-count">{{ count.actor_count }}</div>
      <div class="menu-name">关注影人</div>
    </div>
    <div class="menu-item" @click="pathTo('information')">
      <div class="menu-count" v-if="!isLogin">{{ count.information_count}}</div>
      <m-icon name="tag" color="#EE5C42" v-else/>
      <div class="menu-font-name">我的资料</div>
    </div>
    <div class="menu-item" @click="pathTo('favorites')">
      <div class="menu-count" v-if="!isLogin">{{ count.favorites_count }}</div>
      <m-icon name="star" color="#EE5C42" v-else/>
      <div class="menu-font-name">影片收藏</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MineMenu",
  props: {
    count: {
      type: Object,
      required: true,
    },
    isLogin: {
      type: Boolean,
    },
  },
  methods: {
    pathTo(type) {
      if (this.isLogin) {
        this.$router.push(`/profile/${type}`);
        // console.log(this.count)
      } else {
        this.$router.push(`/login`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.menu-list {
  z-index: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px;
  margin-top: -80px;
  height: 160px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 6px 6px #eee;
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    .menu-count {
      height: 64px;
      line-height: 64px;
      text-align: center;
      color: $color-theme;
      font-size: 40px;
    }
    .menu-name {
      margin-top: 16px;
      font-size: 24px;
      font-weight: bold;
      color: #666;
    }
    .menu-font-name {
      margin: 12px;
      font-size: 24px;
      font-weight: bold;
      color: #666;
    }
  }
}
</style>