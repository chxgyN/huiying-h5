<template>
  <div class="menu-cell">
    <m-cell-group border card>
      <!-- <m-cell
        icon="feed"
        icon-color="#ffbe10"
        title="意见反馈"
        url="/profile/feedback"
      /> -->
      <m-cell
        icon="boy"
        icon-color="#ffbe10"
        title="关于作者"
        url="/profile/author"
      />
      <m-cell
        icon="aboutus"
        icon-color="#ffbe10"
        title="关于项目"
        url="/profile/project"
      />

      <m-cell
        icon="set"
        icon-color="#ffbe10"
        title="设置"
        url="/profile/setting"
      />
    </m-cell-group>
  </div>
</template>

<script>
export default {
  name: "MineCell",
  props: {
    user: {
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.menu-cell {
  ::v-deep .m-cell__group--card {
    box-shadow: 0 0 24px #eee;
    .m-cell {
      margin: 0 30px;
      padding-left: 0;
      padding-right: 0;
    }
  }
  .log {
    padding-left: 300px;
  }
}
</style>