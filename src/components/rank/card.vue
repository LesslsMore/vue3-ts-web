<template>
  <div class="card-container">
    <div class="card-rank">No. {{ len - idx }}</div>
    <!--        <div class="card-rank-bar"></div>-->

    <div class="card-image-container">
      <!-- <img :src="'../img/' + item.num + '.jpg'" loading="lazy" referrerpolicy="no-referrer"/> -->
     <img :src="item.img" loading="lazy" referrerpolicy="no-referrer"/>
    </div>
    <div class="card-content">
      <span class="card-title">{{ item.title }}</span>
      <p class="card-review"> {{ item.quote.length > 50 ? item.quote.slice(0, 50) + '...' : item.quote}}</p>
      <!-- 显示评分数 -->
      <div class="rating-container">
        <div v-html="convertToStars(item.rate)"></div>
        <span>&nbsp &nbsp</span>
        <span class="rating">{{ item.rate }}</span>
      </div>
      <!-- 显示评分人数 -->
      <div class="votes">{{ item.vote }} 人评价</div>
    </div>
<!--    0-2-->
<!--    2-4-->
<!--    4-6-->
<!--    6-8-->
<!--    8-10-->


  </div>
</template>

<script setup>

import '@fortawesome/fontawesome-free/css/all.css';
defineProps(['item', 'len', 'idx'])

function convertToStars(score) {
  const stars = Math.round(score) / 2;
  const fullStars = Math.floor(stars); // 整颗星的数量
  const halfStar = stars % 1 === 0.5; // 是否有半颗星
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // 空星的数量

  // 使用 Font Awesome 的图标
  let starDisplay = '<i class="fas fa-star"></i>'.repeat(fullStars); // 显示整颗星
  if (halfStar) {
    starDisplay += '<i class="fas fa-star-half-alt"></i>'; // 显示半颗星
  }
  starDisplay += '<i class="far fa-star"></i>'.repeat(emptyStars); // 显示空星

  return starDisplay;
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 父容器高度设为100%视口高度，示例用 */
  padding: 10px;
  border: 1px solid #e0e0e0;


  width: 270px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-rank {
  display: flex;
  justify-content: center; /* 水平居中 */
  flex-direction: column;
  align-items: center; /* 垂直居中 */
  height: 100px; /* 固定外层容器的高度 */
  font-size: 30px;
  font-weight: bold;
  color: #333;
  margin-right: 8px;
}

.card-image img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 4px;
}

.card-image-container {
  width: 270px; /* 固定外层容器的宽度 */
  height: 270px; /* 固定外层容器的高度 */
  margin-bottom: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 保证图片不会超出容器范围 */
  border-radius: 8px; /* 添加圆角效果 */
  background-color: #f0f0f0; /* 可以根据需要设置背景色 */
}

.card-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图片充满容器且不变形 */
}

.card-content {
  width: 270px; /* 固定外层容器的宽度 */
  height: 350px; /* 固定外层容器的高度 */
  justify-content: center;
  align-items: center;
}

.card-title {
  height: 100px; /* 固定外层容器的高度 */
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}

.card-review {
  height: 150px; /* 固定外层容器的高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #555;
  font-style: italic;
}

.rating-container {
  height: 100px; /* 固定外层容器的高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}

/* 如果需要调整星星的大小，可以在这里设置 */
i.fa-star, i.fa-star-half-alt, i.fa-star {
  color: gold !important; /* 强制设置星星的颜色为金黄色 */
  font-size: 30px; /* 设置星星的大小 */
  margin-right: 20px; /* 调整星星和文本之间的间距 */
}

.votes {
  height: 50px; /* 固定外层容器的高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #777;
}


</style>
