<template>
  <div class="movie-rating-wrapper">
    <div class="wish-count" v-if="movie.release_status === 1">
      <div>
        <span class="count">{{ movie.wish_count }}</span>
        <span class="count-label">人想看</span>
      </div>
      <div class="release-date">
        {{ movie.release_date }}上映
      </div>
    </div>

    <div class="rating-container" v-else-if="douban.rating">
      <!-- 豆瓣评分 -->

      <div class="rating-map">
        <div >
          豆瓣评分
        </div>
        <div class="rating-score">{{ douban.rating }}</div>
        <div>{{ douban.count }}人评</div>
      </div>

    </div>

    <div v-else class="no-rating">
      <span>暂无评分</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieRating",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    douban() {
      // 可选链操作符 ? 存在返回, 不存在返回undefined
      return this.movie.thrid_rating?.douban || { rating: 0, count: 0 };
    },
  },
};
</script>

<style scoped lang="scss">
.movie-rating-wrapper {
  margin: 10px 20px;
  border-radius: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 30px 0;
  .wish-count {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 136px;
      .count {
        padding: 0 10px;
        font-size: 48px;
        color: rgb(254, 179, 0);
        font-weight: bold;
      }
    .release-date {
      position: absolute;
      right: 20px;
      bottom: -15px;
      color: #e5e5e5;
    }
  }
  .no-rating {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 136px;
  }
  .rating-container {
    display: flex;
    justify-content: center;
    .rating-map {
      min-width: 120px;
      text-align: center;
      .rating-score {
        height: 76px;
        line-height: 76px;
        font-size: 44px;
        font-weight: bold;
        color: rgb(254, 179, 0);
      }
    }
    .line {
      width: 1px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .rating-footer {
    .status-count {
      display: flex;
      align-items: center;
      justify-content: right;
      margin: 40px 30px 0;
      color: #999;
    }
  }

  .tip-content {
    text-align: left;
    p {
      text-align: justify;
      line-height: 1.6;
    }
    .update-time {
      margin-top: 28px;
      color: #aaa;
      font-size: 24px;
      text-align: right;
    }
  }
}
</style>