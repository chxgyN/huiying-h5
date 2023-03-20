<template>
  <!-- 三个页面的容器 -->
  <div class="wrapper">
    <!-- 内容 -->
    <keep-alive include="Home,Movies,Profile">
      <router-view />
    </keep-alive>
    <!-- 底部导航菜单 -->
    <bottom-bar />
  </div>
</template>

<script>
import BottomBar from "@/components/BottomBar";
export default {
  name: "Layout",
  components: {
    BottomBar,
  },
};
</script>
