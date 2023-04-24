<template>
  <div class="container">
    <user-info :user="user" />
    <user-menu :is-login="isLogin" />
    <user-cell :user="user" />
    <transition name="slide-left">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserInfo from "./components/MineInfo";
import UserMenu from "./components/MineMenu";
import UserCell from "./components/MineCell";

export default {
  name: "Profile",

  components: {
    UserInfo,
    UserMenu,
    UserCell,
  },

  computed: {
    ...mapGetters({ user: "user/getUser", }),
    isLogin() {
      // 就是转换为布尔值
      return !!this.user;
    },
  },

  created() {
    document.title = "我的";
  },

  activated() {
    document.title = "我的";
  },

};
</script>
