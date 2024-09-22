<template>
  <el-upload
      multiple
      :auto-upload="false"
      accept=".json"
      :on-change="import_top_json"
      :show-file-list="false"
  >
    <el-button :icon="Upload">上传 top250 json</el-button>
  </el-upload>

  <div class="swiper-container" ref="swiperContainer">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in items">
        <card :item="item"></card>
      </div>
    </div>
  </div>

  <el-button @click="startAutoplay">Start Autoplay</el-button>
</template>

<script setup>
import {ref, onMounted, onUnmounted, computed} from 'vue';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import {Autoplay} from "swiper/modules";
import Card from "@/components/neodb/card.vue";
import {Upload} from "@element-plus/icons-vue";

const swiperInstance = ref(null);
const slides = ref([1, 2, 3, 4, 5]);

let items = ref([])

const import_top_json = async (file) => {
  console.log('import_top_json...')
  console.log(new Date())
  let json_str = await file.raw.text()
  let json_obj = JSON.parse(json_str);
  console.log(json_obj)
  // top 250
  // 从 100 到 1 倒叙
  // 排名
  // 图片
  // 标题
  // 评分
  // 人数
  // 评价
  items.value = json_obj

  // fullStars = computed(() => Math.floor(items.value[0].rating / 2));
  // hasHalfStar = computed(() => items.value[0].rating % 2 >= 1);
  // emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0));


  console.log(new Date())

  // const swiperEl = document.querySelector('swiper-container');
  // swiperEl.swiper.stop()
  // swiperInstance.value.swiper.autoplay.stop()
}

function startAutoplay() {
  console.log(swiperInstance.value.autoplay)
  // if (swiperInstance.value) {
  //   swiperInstance.value.swipe.autoplay.start();
  // }
}

function handleAutoplayStop() {
  console.log('Autoplay has stopped');
}

function reachEnd() {
  console.log('reachEnd')
}

// import {Autoplay, Pagination, Navigation, Virtual} from 'swiper/modules';
const modules = [Autoplay];

onMounted(() => {
  swiperInstance.value = new Swiper('.swiper-container', {
    autoplay: {
      delay: 30,
      disableOnInteraction: false,
      stopOnLastSlide: true,
    },
    modules: modules,
    loop: false,
  });

  // 监听 autoplay.stop 事件
  swiperInstance.value.on('autoplayStop', handleAutoplayStop);

  swiperInstance.value.on('reachEnd', reachEnd);
});

onUnmounted(() => {
  if (swiperInstance.value) {
    swiperInstance.value.off('autoplayStop', handleAutoplayStop);
  }
});
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 300px;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background-color: #42b983;
  color: #fff;
}
</style>
