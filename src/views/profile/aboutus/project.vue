<template>
  <page>
    <header-bar title="关于项目" />

    <div class="main">
      <m-cell-group border card>
        <m-cell title="项目名称" value="灰影" />
        <m-cell title="技术栈">
          <span>vue2.6 / vue-route / vuex / axios</span>
        </m-cell>
      </m-cell-group>
    </div>
  </page>
</template>

<script>
export default {
  name: "AboutProject",
};
</script>

<style scoped lang="scss">
.main {
  overflow: hidden;
  height: calc(100vh - 100px);
  background-color: #f5f5f5;
  .link {
    display: inline-block;
    word-break: break-all;
    width: 400px;
    text-align: right;
    color: $color-theme;
  }
}
</style>