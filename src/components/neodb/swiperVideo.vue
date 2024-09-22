<template>
  <div class="fixed-div" v-if="!isRecording">
    <el-upload
        multiple
        :auto-upload="false"
        accept=".json"
        :on-change="import_top_json"
        :show-file-list="false"
    >
      <el-button :icon="Upload">上传 top250 json</el-button>
    </el-upload>


    <el-button @click="click_swiper">click_swiper</el-button>

    <el-button @click="startRecording" :disabled="isRecording">Start Recording</el-button>
    <el-button @click="stopRecording">stopRecording</el-button>
  </div>


  <swiper-container
      :slidesPerView="5"
      :spaceBetween="5"
      :speed="300"
      :centeredSlides="true"
      :autoplay="opt"
      :modules="modules"
      class="mySwiper"
      ref="swiperInstance"
      pagination-type="progressbar"
      :navigation="true"
      :injectStyles="injectStyles"
      :pagination="page_opt"
  >
    <!--    <div class="my-container">-->
<!--    <swiper-slide v-for="item in items.reverse()">-->
<!--      <card :item="item"></card>-->
<!--    </swiper-slide>-->
    <swiper-slide v-for="item in items">
      <card :item="item"></card>
    </swiper-slide>
    <!--    </div>-->
  </swiper-container>

</template>
<script setup>

// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

import {register} from 'swiper/element/bundle';

register();

// import './style.css';

import {Autoplay, Pagination, Navigation, Virtual} from 'swiper/modules';

let opt = ref(
    {
      delay: 300,
      disableOnInteraction: false,
      reverseDirection: false,
      stopOnLastSlide: true,
    }
)

const injectStyles = ref([`
      .swiper-pagination-bullet {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #000;
        opacity: 1;
        background: rgba(0, 0, 0, 0.2);
      }

      .swiper-pagination-bullet-active {
        color: #fff;
        background: #007aff;
      }
      `])

function renderBullet(index, className) {
  return '<span class="' + className + '">' + (index + 1) + "</span>";
}

const page_opt = ref({
  clickable: true,
  renderBullet: renderBullet()
})
const modules = [Autoplay, Navigation, Pagination];

const DELAY_TIME = 600 * 2

// const swiper = new Swiper('.swiper', {
//   slidesPerView: 4,
//   speed: 60,
//   spaceBetween: 10,
//   centeredSlides: true,
//   modules: modules,
//   autoplay: opt.value,
// });
//
// console.log(swiper)

// <!--      :slidesPerView="4"-->
// <!--      :spaceBetween="10"-->
// <!--      :speed="60"-->
// <!--      :centeredSlides="true"-->
// <!--      :autoplay="opt"-->
// <!--      :modules="modules"-->
// <!--      class="mySwiper"-->

let swiperInstance = ref()
// renderStar(String(item.rate / 2))

// Setup the Swiper modules


function openPage() {
  window.open('page/index.html', '_blank');
}

function click_swiper() {
  console.log(swiperInstance.value)
  console.log(swiperInstance.value.swiper)

  // console.log(swiperInstance.value.swiper.autoplay.stop())
  swiperInstance.value.swiper.autoplay.start()
}

function handleAutoplayStop() {
  console.log('handleAutoplayStop')
  stopRecording()
}

function handleAutoplayPause() {
  console.log('handleAutoplayPause')
  stopRecording()
}

function handleAutoplayResume() {
  console.log('handleAutoplayResume')
  stopRecording()
}

function reachEnd() {
  console.log('reachEnd')
  setTimeout(() => {
    console.log('This message is shown after 600 milliseconds');
    stopRecording()

    swiperInstance.value.swiper.autoplay.stop()

  }, DELAY_TIME);


}

import {Upload} from "@element-plus/icons-vue";
import {computed, onMounted, ref} from "vue";
import {renderStar} from "@/components/neodb/util";
import html2canvas from "html2canvas";
import Video from "@/components/neodb/video.vue";
import Card from "@/components/neodb/card.vue";

let items = ref([])

let fullStars
let hasHalfStar
let emptyStars

// 计算星星相关数据

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
  // items.value = json_obj.reverse()
  items.value = json_obj

  fullStars = computed(() => Math.floor(items.value[0].rating / 2));
  hasHalfStar = computed(() => items.value[0].rating % 2 >= 1);
  emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0));


  console.log(new Date())

  // const swiperEl = document.querySelector('swiper-container');
  // swiperEl.swiper.stop()
  swiperInstance.value.swiper.autoplay.stop()
}

const canvas = ref(null);
const ctx = ref(null);

// 控制录制状态
const isRecording = ref(false);
const recordedChunks = ref([]);
const mediaRecorder = ref(null);
const videoElement = ref(null);

async function one_key(file) {
  await import_top_json(file)
  await startRecording()
}

async function startRecording() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: {
      mediaSource: 'screen',
      width: {ideal: 1920}, // 理想宽度
      height: {ideal: 1080}, // 理想高度
    },
    audio: false,
  });

  mediaRecorder.value = new MediaRecorder(stream);
  mediaRecorder.value.ondataavailable = handleDataAvailable;
  mediaRecorder.value.onstop = handleStop;
  mediaRecorder.value.start();

  isRecording.value = true;

  setTimeout(() => {
    console.log('This message is shown after 600 milliseconds');
    swiperInstance.value.swiper.autoplay.start()
  }, DELAY_TIME);
  // swiperInstance.value.swiper.on('autoplayStop', handleAutoplayStop);
  // swiperInstance.value.swiper.on('autoplayPause', handleAutoplayPause);
  // swiperInstance.value.swiper.on('autoplayResume', handleAutoplayResume);
  swiperInstance.value.swiper.on('reachEnd', reachEnd);
}

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.value.push(event.data);
  }
}

function handleStop() {
  const blob = new Blob(recordedChunks.value, {
    type: 'video/webm',
  });
  const url = URL.createObjectURL(blob);

  // 下载视频
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'recorded-video.webm';
  document.body.appendChild(a);
  a.click();

  // 释放URL对象
  URL.revokeObjectURL(url);

  // 重置录制块数组
  recordedChunks.value = [];

  // // 将视频展示到页面
  // videoElement.value.src = url;
}

function stopRecording() {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop();
  }
}

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d');
  }
});
</script>
<style scoped>
.fixed-div {
  position: fixed;
  top: 20px; /* 距离浏览器窗口顶部20px */
  left: 20px; /* 距离浏览器窗口右侧20px */
  background-color: #42b983;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999; /* 确保元素位于页面最上方 */
}


.swiper-container-wrapper {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 父容器高度设为100%视口高度 */
  background-color: #f0f0f0;
}

.swiper-container {
  width: 80%;
  height: 300px; /* 你可以根据需求调整高度 */
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background-color: #42b983;
  color: white;
}

/* Swiper 容器 */
.swiper-container {
  width: 80%;
  height: 300px;
}

/* Swiper 滑块 */
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background-color: #42b983; /* 将滑块背景色设置为豆瓣绿 */
  color: white;
}

/* 分页指示器 */
.swiper-pagination-bullet {
  background: #42b983; /* 分页指示器颜色设置为豆瓣绿 */
}

/* 分页指示器激活状态 */
.swiper-pagination-bullet-active {
  background: #2c7a59; /* 激活状态颜色，可以稍微深一些 */
}

/* 导航按钮 */
.swiper-button-prev,
.swiper-button-next {
  color: #42b983; /* 导航按钮颜色设置为豆瓣绿 */
}

/* 滚动条 */
.swiper-scrollbar-drag {
  background: #42b983; /* 滚动条颜色设置为豆瓣绿 */
}
</style>
