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

    <!-- Multi-level Sort Controls -->
    <div style="margin-top: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
      <h4>排序设置:</h4>
      <!-- Display Current Criteria -->
      <div v-for="(criterion, index) in sortCriteria" :key="'sort-' + index" style="margin-bottom: 5px;">
        <el-tag closable @close="removeSortCriterion(index)">
          字段: {{ getFieldLabel(criterion.field) }}, 顺序: {{ criterion.order === 'asc' ? '升序' : '降序' }}
        </el-tag>
        <el-button size="small" :icon="ArrowUp" circle @click="moveCriterionUp(index)" :disabled="index === 0"></el-button>
        <el-button size="small" :icon="ArrowDown" circle @click="moveCriterionDown(index)" :disabled="index === sortCriteria.length - 1"></el-button>
      </div>

      <!-- Add New Sort Criterion -->
      <el-row :gutter="10" align="middle" style="margin-top: 10px;">
        <el-col :span="8">
          <el-select v-model="newCriterionField" placeholder="选择排序字段">
            <el-option
                v-for="field in sortableFields"
                :key="field.value"
                :label="field.label"
                :value="field.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-radio-group v-model="newCriterionOrder">
            <el-radio-button label="asc">升序</el-radio-button>
            <el-radio-button label="desc">降序</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" :icon="Plus" @click="addSortCriterion" :disabled="!newCriterionField">添加排序</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- End Multi-level Sort Controls -->

    <!-- Filter Controls -->
    <div style="margin-top: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
        <h4>过滤设置:</h4>
        <!-- Display Current Filters -->
        <div v-for="(filter, index) in filterCriteria" :key="'filter-' + index" style="margin-bottom: 5px;">
            <el-tag closable @close="removeFilterCriterion(index)">
                字段: {{ getFieldLabel(filter.field) }}, 条件: {{ filter.operator }} {{ filter.value }}
            </el-tag>
        </div>

        <!-- Add New Filter Criterion -->
        <el-row :gutter="10" align="middle" style="margin-top: 10px;">
            <el-col :span="6">
                <el-select v-model="newFilterField" placeholder="选择过滤字段">
                    <el-option
                        v-for="field in filterableFields"
                        :key="field.value"
                        :label="field.label"
                        :value="field.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="newFilterOperator" placeholder="选择操作符">
                    <el-option label=">" value=">"></el-option>
                    <el-option label="<" value="<"></el-option>
                    <el-option label="=" value="==="></el-option> <!-- Use === for strict equality -->
                    <el-option label=">=" value=">="></el-option>
                    <el-option label="<=" value="<="></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input v-model="newFilterValue" placeholder="输入值" type="number"></el-input> <!-- Assuming numeric filtering -->
            </el-col>
            <el-col :span="4">
                <el-button type="primary" :icon="Plus" @click="addFilterCriterion" :disabled="!newFilterField || !newFilterOperator || newFilterValue === ''">添加过滤</el-button>
            </el-col>
        </el-row>
    </div>
    <!-- End Filter Controls -->

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
    <swiper-slide v-for="item, idx in processedItems" :key="item.num"> <!-- Use processedItems which includes filtering and sorting -->
      <card :item="item" :len="processedItems.length" :idx="idx"></card> <!-- Update length reference -->
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
// Import Element Plus components and icons needed for sorting UI
import { ElUpload, ElButton, ElTag, ElSelect, ElOption, ElRadioGroup, ElRadioButton, ElRow, ElCol, ElIcon, ElInput } from 'element-plus'; // Added ElInput
import { Upload, Plus, Delete, ArrowUp, ArrowDown } from '@element-plus/icons-vue';
import {computed, onMounted, ref} from "vue";
import Card from "@/components/rank/card.vue";


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

// const DELAY_TIME = 600 * 4 // Removed, no longer needed

const DELAY_TIME = 1000

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

// Removed reachEnd handler, replaced by handleTransitionEnd

// Function to handle the transitionEnd event
function handleTransitionEnd() {
  const swiper = swiperInstance.value?.swiper;
  if (swiper && swiper.isEnd) {
    console.log('Transition ended on the last slide');
    // Add a small delay to ensure the visual transition is fully complete before stopping
    setTimeout(() => {
        swiper.autoplay.stop();
    }, 100); // Small delay (e.g., 100ms) might still be useful

    setTimeout(() => {
      console.log('Stopping recording and autoplay after transition end.');
      stopRecording();

      // handleStop()
    }, DELAY_TIME * 2); // Small delay (e.g., 100ms) might still be useful
  }
}

function reachEnd() {
  console.log('reachEnd')
  setTimeout(() => {
    console.log('This message is shown after 600 milliseconds');
    stopRecording()

    swiperInstance.value.swiper.autoplay.stop()

  }, DELAY_TIME);
}

// import {Upload} from "@element-plus/icons-vue";
// import {computed, onMounted, ref} from "vue";
// import Card from "@/components/rank/card.vue";

let items = ref([])

// Sorting state - Updated for multi-level sorting
const sortCriteria = ref([
  // { field: 'num', order: 'asc' } // Default sort: by num ascending
  { field: 'rate', order: 'asc' }, // Default sort: by num ascending
  { field: 'vote', order: 'asc' } // Default sort: by num ascending
]);

// Available fields for sorting
const sortableFields = ref([
  { label: '排名', value: 'num' },
  // { label: '标题', value: 'title' },
  { label: '评分', value: 'rate' },
  { label: '评价人数', value: 'vote' }
]);

// State for adding a new sort criterion
const newCriterionField = ref('');
const newCriterionOrder = ref('asc');

// --- Filter State --- Additions
const filterCriteria = ref([
  // { field: 'num', operator: '>', value: 100 } // Default filter: num > 100
  { field: 'vote', operator: '>=', value: 100 } // Default filter: num > 100
]); // Stores active filters
const filterableFields = ref([
  { label: '排名', value: 'num' },
  { label: '评分', value: 'rate' },
  { label: '评价人数', value: 'vote' }
]);
const newFilterField = ref('');
const newFilterOperator = ref('');
const newFilterValue = ref('');
// --- End Filter State ---

// Helper function to get field label
const getFieldLabel = (value) => {
  const field = [...sortableFields.value, ...filterableFields.value].find(f => f.value === value);
  return field ? field.label : value;
};

// Function to add a new sort criterion
const addSortCriterion = () => {
  if (newCriterionField.value) {
    sortCriteria.value.push({
      field: newCriterionField.value,
      order: newCriterionOrder.value
    });
    // Reset fields for next addition
    newCriterionField.value = '';
    newCriterionOrder.value = 'asc';
  }
};

// Function to remove a sort criterion
const removeSortCriterion = (index) => {
  sortCriteria.value.splice(index, 1);
};

// Function to move a criterion up in the list (increase priority)
const moveCriterionUp = (index) => {
  if (index > 0) {
    const item = sortCriteria.value.splice(index, 1)[0];
    sortCriteria.value.splice(index - 1, 0, item);
  }
};

// Function to move a criterion down in the list (decrease priority)
const moveCriterionDown = (index) => {
  if (index < sortCriteria.value.length - 1) {
    const item = sortCriteria.value.splice(index, 1)[0];
    sortCriteria.value.splice(index + 1, 0, item);
  }
};

// --- Filter Functions --- Additions
// Function to add a new filter criterion
const addFilterCriterion = () => {
  if (newFilterField.value && newFilterOperator.value && newFilterValue.value !== '') {
    filterCriteria.value.push({
      field: newFilterField.value,
      operator: newFilterOperator.value,
      value: parseFloat(newFilterValue.value) // Assuming numeric filtering, parse value
    });
    // Reset fields
    newFilterField.value = '';
    newFilterOperator.value = '';
    newFilterValue.value = '';
  }
};

// Function to remove a filter criterion
const removeFilterCriterion = (index) => {
  filterCriteria.value.splice(index, 1);
};
// --- End Filter Functions ---

// --- End Multi-level Sorting Logic ---

// Computed property for sorted items with multi-level sorting
// Renamed to processedItems to include filtering
const processedItems = computed(() => {
  // 1. Filter items
  let filtered = [...items.value].filter(item => {
    return filterCriteria.value.every(filter => {
      const itemValue = item[filter.field];
      const filterValue = filter.value;
      switch (filter.operator) {
        case '>': return itemValue > filterValue;
        case '<': return itemValue < filterValue;
        case '===': return itemValue === filterValue;
        case '>=': return itemValue >= filterValue;
        case '<=': return itemValue <= filterValue;
        default: return true; // Should not happen with current operators
      }
    });
  });

  // 2. Sort filtered items
  return filtered.sort((a, b) => {
    for (const criterion of sortCriteria.value) {
      const { field, order } = criterion;
      let valA = a[field];
      let valB = b[field];

      // Handle different data types for comparison
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        // Direct number comparison is fine
      } else {
         // Add handling for other types if necessary
      }

      let comparison = 0;
      if (valA > valB) {
        comparison = 1;
      } else if (valA < valB) {
        comparison = -1;
      }

      // If comparison is not 0, return result based on order
      if (comparison !== 0) {
        return order === 'desc' ? (comparison * -1) : comparison;
      }
    }
    // If all criteria result in equality, return 0
    return 0;
  });
});


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
  // 监控视频结束事件
  mediaRecorder.value.onstop = handleStop;
  setTimeout(() => {
    mediaRecorder.value.start(500); // 每秒 1000 毫秒
    console.log('Starting autoplay...');
    swiperInstance.value.swiper.autoplay.start(); 
  }, DELAY_TIME); // Delay before starting recording
  // mediaRecorder.value.start();

  isRecording.value = true;

  // Start autoplay immediately or after a desired initial delay if needed
  // The DELAY_TIME timeout is removed as autoplay start logic might change
  // Consider if autoplay should start immediately or after user interaction


  // Remove previous event listeners if they exist to avoid duplicates
  // swiperInstance.value.swiper.off('transitionEnd', handleTransitionEnd);

  // // Listen for transitionEnd instead of reachEnd
  // swiperInstance.value.swiper.on('transitionEnd', handleTransitionEnd);

  swiperInstance.value.swiper.on('reachEnd', reachEnd);
}

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.value.push(event.data);
  }
}

function handleStop() {
  setTimeout(() => {
    console.log('down video');

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
  }, DELAY_TIME * 2); // Small delay (e.g., 100ms) might still be useful
}

function stopRecording() {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop();
  }
  isRecording.value = false;
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
