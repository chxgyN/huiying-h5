<template>
  <page>
    <header-bar title="关于作者" />

    <div class="main">
      <m-cell-group border card>
        <m-cell title="作者" value="chxgyN" />
        <m-cell title="性别" value="男" />
        <!-- <m-cell title="城市" value="重庆" /> -->
        <m-cell title="工作" value="前端开发" />
        <m-cell title="邮箱" value="chxygn@outlook.com" />
      </m-cell-group>
    </div>
  </page>
</template>

<script>
export default {
  name: "AboutAuthor",
};
</script>

<style scoped lang="scss">
.main {
  background-color: #f5f5f5;
  overflow: hidden;
  height: calc(100vh - 100px);
  .href {
    color: $color-theme;
  }
}
</style>