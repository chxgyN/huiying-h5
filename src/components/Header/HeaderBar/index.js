import HeaderBar from './index.vue';

// 在 install(){ } 中vue.component(‘name’, component) 声明的组件，
// 可在main.js中用 vue.use ()加载
export default {
  install(Vue) {
    Vue.component(HeaderBar.name, HeaderBar);
  }
};