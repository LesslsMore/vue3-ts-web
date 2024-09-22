<template>
  rank
  <el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="item in 20" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { ref } from "vue"

const supported_types = ['book', 'movie', 'tv', 'music', 'game']
let items = ref([])

get_items()

function get_items() {
  let val = localStorage.getItem(supported_types[0])

  if (val != null) {
    items.value = JSON.parse(val)
    console.log(items.value.complete)


    items.value.complete.forEach((item, index) => {
      // top 250
      // 从 100 到 1 倒叙
      // 排名
      // 图片
      // 标题
      // 评分
      // 人数
      // 评价
      console.log(
          index + 1,
          item.image,
          item.title,
          item.comment,
          item.rating,
      )
    });
  }
}

</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
