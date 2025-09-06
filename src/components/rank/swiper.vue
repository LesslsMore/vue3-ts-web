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

  <el-upload
      multiple
      :auto-upload="false"
      accept=".json"
      :on-change="import_imdb_json"
      :show-file-list="false"
  >
    <el-button :icon="Upload">上传 imdb top250 json</el-button>
  </el-upload>

  <el-upload
      multiple
      :auto-upload="false"
      accept=".json"
      :on-change="import_neodb_json"
      :show-file-list="false"
  >
    <el-button :icon="Upload">上传 neodb top250 json</el-button>
  </el-upload>

  <el-upload
      multiple
      :auto-upload="false"
      accept=".json"
      :on-change="import_hupu_json"
      :show-file-list="false"
  >
    <el-button :icon="Upload">上传 hupu top json</el-button>
  </el-upload>

  <el-button :icon="Download" @click="export_hupu_json">下载 hupu top json</el-button>

  <el-button :icon="Download" @click="export_top_json">下载 top250 json</el-button>

  <el-button @click="openPage">openPage</el-button>

  <!-- Canvas 元素 -->
  <!--  <canvas ref="canvas" width="600" height="400"></canvas>-->
  <!--  <button @click="captureAndDraw">Capture and Draw</button>-->
</template>
<script setup>
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

import './style.css';

import {Autoplay, Pagination, Navigation, Virtual} from 'swiper/modules';
import {saveAs} from 'file-saver'

let opt = ref(
    {
      // delay: 300,
      // disableOnInteraction: false,
      // reverseDirection: false,
      // stopOnLastSlide: true,
    }
)
// renderStar(String(item.rate / 2))

// Setup the Swiper modules
const modules = [Autoplay];

function openPage() {
  window.open('page/rank/index.html', '_blank');
}

import {Download, Upload} from "@element-plus/icons-vue";
import {computed, onMounted, ref} from "vue";
import {renderStar} from "@/components/neodb/util";
import html2canvas from "html2canvas";

let items = ref([])

let imdb_items = ref([])
let neodb_items = ref([])
let hupu_items = ref([])

let fullStars
let hasHalfStar
let emptyStars

// 计算星星相关数据

const import_imdb_json = async (file) => {
  console.log('import_imdb_json...')
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
  imdb_items.value = json_obj
  console.log(new Date())
}

const import_neodb_json = async (file) => {
  console.log('import_neodb_json...')
  console.log(new Date())
  let json_str = await file.raw.text()
  let json_obj = JSON.parse(json_str);
  console.log(json_obj)
  neodb_items.value = json_obj
  console.log(new Date())
}

const import_hupu_json = async (file) => {
  console.log('import_hupu_json...')
  console.log(new Date())
  let json_str = await file.raw.text()
  let json_obj = JSON.parse(json_str);
  let name = json_obj.data.groupInfo.name
  let data = json_obj.data.nodePageResult.data
  console.log(name)
  console.log(data)
  hupu_items.value = data
  console.log(new Date())
}

function get_date() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，所以需要 +1
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}${month}${day}`;

  console.log(formattedDate); // 输出格式为 20240908
  return formattedDate
}

const export_hupu_json = () => {
  let hupu = hupu_items.value
  let data = get_hupu_data(hupu)
  const blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"});
  saveAs(blob, `${get_date()} hupu-top.json`);
}

const export_top_json = () => {
  let imdb = imdb_items.value
  let neodb = neodb_items.value

  if (imdb.length === 250 && neodb.length === 250) {
    let data = get_merge_data(imdb, neodb)
    const blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, `imdb-neodb-top250.json`);
  } else {
    console.log('请上传 imdb neodb 数据')
  }
}

function get_hupu_data(hupu_items) {
  let i = 0
  const data = []
  for (const [idx, item] of hupu_items.entries()) {
    const {
      image,
      name,
      commentCount,
      summedScorePersonCount,
      scoreAvg,
      hottestComments
    } = item.node

    if (commentCount > 0) {
      i++
      data.push({
        num: i,
        title: name,
        img: image[0],
        rate: scoreAvg,
        vote: summedScorePersonCount,
        quote: Array.isArray(hottestComments) && hottestComments.length > 0 ? hottestComments[0] : '',
      })
    }
  }
  console.log(data.length)
  console.log(i)
  return data
}

function get_merge_data(imdb_items, neodb_items) {
  const data = []
  for (let i = 0; i < 250; i++) {
    let {num, year, rate, vote} = imdb_items[i]
    let {title, img, info} = neodb_items[i]
    data.push({
      num,
      title,
      year,
      img,
      rate,
      vote,
      quote: info,
    })
  }
  return data
}

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

  fullStars = computed(() => Math.floor(items.value[0].rating / 2));
  hasHalfStar = computed(() => items.value[0].rating % 2 >= 1);
  emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0));


  console.log(new Date())
}

const canvas = ref(null);
const ctx = ref(null);

function captureAndDraw() {
  if (canvas.value) {
    html2canvas(document.querySelector('.mySwiper')).then(capturedCanvas => {
      const capturedCtx = capturedCanvas.getContext('2d');
      ctx.value.drawImage(capturedCanvas, 0, 0);
    });
  }
}

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d');
  }
});
</script>
<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
  width: 300px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-rank-container {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.card-rank {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-right: 8px;
}

.card-rank-bar {
  height: 4px;
  width: 60px;
  background-color: #4caf50; /* 豆瓣绿 */
  border-radius: 2px;
}

.card-image img {
  //width: 150px; /* 统一图片宽度 */
  //height: 150px; /* 统一图片高度 */
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 12px;
}

.card-image-container {
  width: 200px; /* 固定外层容器的宽度 */
  height: 320px; /* 固定外层容器的高度 */
  margin-bottom: 12px;
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
  text-align: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.star {
  font-size: 18px;
  margin-right: 2px;
}

.star.full {
  color: #f7a628;
}

.star.half {
  color: #f7a628;
  clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
}

.star.empty {
  color: #e0e0e0;
}

.card-rating {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}

.card-rating .rating {
  font-size: 16px;
  font-weight: 500;
  margin-right: 4px;
}

.card-rating .votes {
  font-size: 14px;
  color: #777;
}

.card-review {
  font-size: 14px;
  color: #555;
  margin-top: 8px;
  font-style: italic;
  quotes: "“" "”" "‘" "’";
}

.card-review q::before {
  content: open-quote;
}

.card-review q::after {
  content: close-quote;
}

.quote span.inq {
  color: #666;
}
</style>
