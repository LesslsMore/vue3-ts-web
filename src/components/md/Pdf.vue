<template>
  <div v-if="!isPdfLoaded" class="pdf-viewer-container">
    <!-- 输入框和按钮 -->
    <div class="search-box">
      <el-input
          v-model="inputUrl"
          placeholder="输入 PDF 文件的 URL"
          class="input-url"
          @keyup.enter="loadPdf"
      />
      <el-button type="primary" @click="loadPdf">预览 PDF</el-button>
    </div>
  </div>

  <!-- PDF 显示区域 -->
  <div v-if="isPdfLoaded" class="pdf-container">
    <VuePdfEmbed annotation-layer text-layer :source="pdfSource" />
  </div>

</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';
import { ElInput, ElButton } from 'element-plus';

// 可选样式
import 'vue-pdf-embed/dist/styles/annotationLayer.css';
import 'vue-pdf-embed/dist/styles/textLayer.css';
import {useRoute} from "vue-router";

const inputUrl = ref('');
const pdfSource = ref('');
const isPdfLoaded = ref(false);

const route = useRoute();

function showPdf() {
  if (route.query.url) {
    console.log(route.query.url)
    pdfSource.value = decodeURIComponent(route.query.url);
    inputUrl.value = pdfSource.value; // 将路由参数同步到输入框
    loadPdf()
  }
}

// 从路由参数中获取 PDF 路径
onMounted(() => {
  showPdf()
});

watch(
    () => route.fullPath, // 监听路由完整路径的变化
    () => {
      showPdf()
    }
);

// 加载 PDF
const loadPdf = () => {
  if (inputUrl.value) {
    pdfSource.value = inputUrl.value;
    isPdfLoaded.value = true; // 隐藏输入框和按钮
  }
};

// const pdfSource = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf'
//
// const pdfSource = 'https://raw.githubusercontent.com/LesslsMore/blog-img/master/%E7%89%A9%E8%AF%AD%E7%B3%BB%E5%88%97%E7%9F%AD%E7%AF%87%E9%9B%86PartB.pdf'
</script>

<style scoped>
.pdf-viewer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-url {
  width: 400px; /* 调整输入框宽度 */
}
</style>
