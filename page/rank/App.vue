<template>
  <div class="container">
    <swiper></swiper>
  </div>
</template>

<script setup>
import swiper from "@/components/rank/swiperVideo.vue"
</script>

<style>
/* 全局去除右侧滚动条 */
body {
  cursor: none;
  overflow: hidden;
}

.container {
  position: relative;
  height: 100vh; /* 父容器高度设为100%视口高度，示例用 */
  background-color: #f0f0f0;
}

</style>
