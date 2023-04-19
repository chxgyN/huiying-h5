// 混入组件配置
export const getInfiniteData = {
  data() {
    return {
      loading: false,
      noData: false,
      noMoreData: false,
      isError: false,
      list: [],
      total: 0,
      page: 1,
      per_page: 20,
      form: {},
    };
  },

  computed: {
    isShowSkeleton() {
      return this.loading && this.page === 1;
    },
  },

  // 无限滚动指令中定义，一上来就调用一次加载方法 -> getData
  mounted() {
    this.loadMore();
  },

  methods: {
    async getData(fn, ...args) {

      // 请求失败 / 正在加载 / 没有更多数据 阻止滚动继续发起请求
      if (this.isError || this.loading || this.noMoreData) return;

      // 没有更多数据且第一页列表无数据，可以再次请求
      if (this.noMoreData && this.page === 1 && this.list.length === 0) {
        this.noMoreData = false;
      }

      this.loading = true;

      let params = {
        page: this.page,
        per_page: this.per_page,
        ...this.form
      };

      const { code, data, total } = await fn(...args, params);

      if (code === 200) {
        // 是否无数据
        if (this.page === 1 && data.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
        this.isError = false;
        this.page++;
        this.list.push(...data);
        this.total = total || 0
        if (data.length < this.per_page) {
          this.noMoreData = true;
        }
      } 
      else {
        this.isError = true;
      }

      this.$nextTick(() => {
        this.loading = false;
      });
    },
  },
}