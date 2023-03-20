<template>
  
  <div class="tabbar-wrapper">
    <ul class="tabbar">
      <!-- 
        custom去除a标签包裹内容行为 
        更灵活决定routerlink渲染结果
        navigate是触发导航的函数
        通过v-slot获取内部传给我们的值
      -->
      <router-link custom to="/home" v-slot="{ isActive, navigate }">
        <li
          class="tab-item"
          :class="{ 'is-active': isActive }"
          @click="navigate"
        >
          <div class="tab-icon">
            <i class="icon iconfont icon-home"></i>
          </div>
          <div class="tab-label">首页</div>
        </li>
      </router-link>

      <router-link custom to="/movies" v-slot="{ isActive, navigate }">
        <li
          class="tab-item"
          :class="{ 'is-active': isActive }"
          @click="navigate"
        >
          <div class="tab-icon">
            <i class="icon iconfont icon-movie-fill"></i>
          </div>
          <div class="tab-label">分类</div>
        </li>
      </router-link>

      <router-link custom to="/profile" v-slot="{ isActive, navigate }">
        <li
          class="tab-item"
          :class="{ 'is-active': isActive }"
          @click="navigate"
        >
          <div class="tab-icon">
            <img v-if="isLogin" class="avatar" :src="user.avatar" />
            <i v-else class="icon iconfont icon-user"></i>
          </div>
          <div class="tab-label">我的</div>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default ({
  name: "BottomBar",

  computed: {
    ...mapGetters({
      user: "user/getUser",
    }),
    // 类似这种结构
    // user2(){
    //   return {id:'007'}
    // },
    isLogin() {
      // console.log(this.user)
      return !!this.user;
    },
  },
}) ;

</script>

<style scoped lang="scss">
.tabbar-wrapper {
  height: 100px;
  .tabbar {
    display: flex;
    z-index: 91;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    border-top: 1px solid #eee;
    background-color: #fff;
    .tab-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      color: #b7bac3;
      transition: all 0.2s;
      // filter: contrast(2);

      .tab-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #fff;
        transition: transform 0.2s;
        .icon {
          position: relative;
          font-size: 48px;
        }
        .avatar {
          width: 48px;
          height: 48px;
          border: 2px solid transparent; /*no*/
          border-radius: 50%;
          transition: border-color 0.2s;
        }
      }
      .tab-label {
        height: 36px;
        line-height: 32px;
        font-size: 24px;
      }
      &.is-active {
        color: $color-theme;
        .tab-icon {
          transform: translateY(-3px);
          &::before {
            content: "";
            position: absolute;
            left: 6px;
            top: 0;
            width: 48px;
            height: 48px;
            box-shadow: 0 0 1px unset $color-theme; /*no*/
            border-radius: 50%;
          }
        }
        .avatar {
          background-color: $color-theme;
        }
      }
    }
  }
}
</style>