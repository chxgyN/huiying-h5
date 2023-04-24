<template>
  <div class="nav-wrapper">
    <ul class="nav-list">
      <li class="nav-item" @click="$router.push('/theater')">
        <i class="iconfont icon-video"></i>
        <div>热映中</div>
      </li>
      <li class="nav-item" @click="$router.push('/top')">
        <i class="iconfont icon-level"></i>
        <div>高分榜</div>
      </li>
      <li class="nav-item" @click="$router.push('/coming')">
        <i class="iconfont icon-see"></i>
        <div>即将上映</div>
      </li>
      <li class="nav-item" @click="$router.push('/today')">
        <i class="iconfont icon-date"></i>
        <div>那年今日</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeMenu",
};
</script>

<style scoped lang="scss">
.nav-wrapper {
  position: relative;
  margin: 20px;
  padding: 40px 0 20px;
  background-color: #fff;
  border-radius: 12px;
  .nav-list {
    display: flex;
    .nav-item {
      flex: 1;
      text-align: center;
      i {
        display: inline-block;
        width: 80px;
        height: 80px;
        line-height: 80px;
        font-size: 44px;
        border-radius: 12px;
      }
      div {
        margin-top: 8px;
        font-size: 24px;
        height: 40px;
        line-height: 40px;
      }
      // 匹配li父亲ul的第一个子元素li的子代i
      &:nth-child(1) > i {
        color: #ff4f4d;
        background: rgba(#ff4f4d, 0.15);
      }
      &:nth-child(2) > i {
        color: #f8a52d;
        background: rgba(#f8a52d, 0.15);
      }
      &:nth-child(3) > i {
        color: #41acff;
        background: rgba(#41acff, 0.15);
      }
      &:nth-child(4) > i {
        color: #916dff;
        background: rgba(#916dff, 0.15);
      }
    }
  }
}
</style>