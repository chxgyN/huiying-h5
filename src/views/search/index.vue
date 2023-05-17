<template>
  <div class="container">
    <!-- 
      输入先流向data，data再通过props传递到子组件 
      父子 props 之间形成了一个单向下行绑定：但是反过来则不行。 
      防止从子组件意外改变父组件以及同级子组件的状态，导致你的应用的数据流向难以理解。 
      同时当 <search-bar> 触发一个 input 事件并附带一个新的值的时候，
      这个 keyword 的 property 将会被更新 
    -->

    <!-- 搜索栏 -->
    <search-bar
      v-model="keyword"
      @on-clear="clearKeyword"
    />
 

    <!-- 搜索时候显示内容 -->
    <search-result
      v-show="keyword"
      :keyword="keyword"
      @keyword-change="storageKeyword"
    />


    <!-- 历史搜索记录 -->
    <search-history
      v-show="!keyword"
      :histories="histories"
      @on-clear="clearHistories"
      @on-keyword="keywordChange"
    />
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import SearchResult from "./components/SearchResult";

export default {
  name: "Search",

  components: {
    SearchBar, 
    SearchHistory, 
    SearchResult 
  },

  data() {
    return {
      keyword: "", //	搜索内容
      histories: [],
    };
  },

  computed: {
    hasHistory() {
      return !!this.histories.length;
    },
  },

  created() {
    this.getHistories();
  },
  

  methods: {
    // 历史搜索记录
    getHistories() {
      const histories = localStorage.getItem("histories");
      if (histories) {
        try {
          this.histories = JSON.parse(histories);
        } catch (e) {
          console.warn(e);
        }
      } else {
        this.histories = [];
      }
    },

    // 选择历史记录中的关键字
    keywordChange(keyword) {
      this.keyword = keyword;
    },

    // 清空历史记录
    clearHistories() {
      localStorage.removeItem("histories");
      this.histories = [];
    },

    // 清空搜索内容
    clearKeyword() {
      this.keyword = "";
    },

    // 搜索关键字存储
    storageKeyword(keyword) {
      if (!keyword) return;
      // 获取历史记录数组
      this.getHistories();
      if (!this.histories.includes(keyword)) {
        // 删除并返回数组最后一个元素
        if (this.histories.length > 20) {
          this.histories.pop();
        }
        this.histories.unshift(keyword);
        localStorage.setItem("histories", JSON.stringify(this.histories));
      }
    },
  },
};
</script>

<style scoped lang="scss">
.recommend {
  padding: 5px 10px;
  border-bottom: 10px solid #eee;
}
.history {
  padding: 5px 10px;
}
.title {
  margin: 0 8px;
  line-height: 30px;
  color: #666;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.title > i {
  width: 30px;
  text-align: center;
}
.list > li {
  display: inline-block;
  padding: 5px 10px 4px;
  color: #666;
  margin: 7px;
  border: 1px solid #eee;
  font-size: 14px;
  border-radius: 20px;
}

.no-history {
  margin-top: 30px;
  text-align: center;
  color: #aaa;
  font-size: 14px;
}
</style>
