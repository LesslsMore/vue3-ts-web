<template>
  <div ref="swiperContainer" class="swiper-container">
    <!-- Swiper 内容 -->
    <swiper
        :slidesPerView="4"
        :spaceBetween="30"
        :centeredSlides="true"
        :autoplay="opt"
        :pagination="{
      clickable: true,
    }"
        :modules="modules"
        class="mySwiper"
    >
      <swiper-slide v-for="item in 8">
        <div class="card-container">
        {{ item }}
        </div>
      </swiper-slide>
    </swiper>
  </div>

  <!-- 控制按钮 -->
  <button @click="startRecording" :disabled="isRecording">Start Recording</button>
  <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
  <video ref="videoElement" controls></video>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import {Autoplay, Pagination, Navigation} from 'swiper/modules';

const modules = [Autoplay];

let opt = ref(
    {
      delay: 300,
      disableOnInteraction: false,
      reverseDirection: false,
      stopOnLastSlide: true,
    }
)

import {FFmpeg} from '@ffmpeg/ffmpeg'; // 引入 ffmpeg.js

const swiperContainer = ref(null);

function data2video() {
  const swiper = new Swiper(swiperContainer.value, {
    autoplay: true,
    // Swiper 配置
  });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // 假设你要捕获 1920x1080 分辨率的帧
  canvas.width = 1920;
  canvas.height = 1080;

  const frames = [];

  swiper.on('slideChange', () => {
    // 绘制 Swiper 容器到 canvas
    context.drawImage(swiperContainer.value, 0, 0, canvas.width, canvas.height);

    // 将当前帧保存为图片数据
    const frameData = canvas.toDataURL('image/png');
    frames.push(frameData);
  });

  // 停止时生成视频
  swiper.on('autoplayStop', async () => {
    const ffmpegInstance = FFmpeg.createFFmpeg({log: true});
    await ffmpegInstance.load();

    // 将帧图像保存为视频
    frames.forEach((frame, index) => {
      ffmpegInstance.FS('writeFile', `frame${index}.png`, frame);
    });

    await ffmpegInstance.run(
        '-r', '30', // 30帧每秒
        '-i', 'frame%d.png', // 使用帧图像
        '-vcodec', 'libx264',
        'output.mp4'
    );

    const videoData = ffmpegInstance.FS('readFile', 'output.mp4');
    const videoBlob = new Blob([videoData.buffer], {type: 'video/mp4'});

    // 生成的视频可供下载或直接播放
    const videoUrl = URL.createObjectURL(videoBlob);
    const videoElement = document.createElement('video');
    videoElement.src = videoUrl;
    document.body.appendChild(videoElement);
  });
}

onMounted(() => {
  // data2video();
  // captureAndRecord();
});

import html2canvas from 'html2canvas';

function captureAndRecord() {
  html2canvas(document.querySelector('.mySwiper')).then(canvas => {
    const videoStream = canvas.captureStream(30); // 30 FPS
    const mediaRecorder = new MediaRecorder(videoStream);
    const chunks = [];

    mediaRecorder.ondataavailable = event => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'swiper-video.webm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 10000); // 录制 10 秒
  });
}

// 控制录制状态
const isRecording = ref(false);
const recordedChunks = ref([]);
const mediaRecorder = ref(null);
const videoElement = ref(null);

async function startRecording() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: 'screen' },
    audio: false,
  });

  mediaRecorder.value = new MediaRecorder(stream);
  mediaRecorder.value.ondataavailable = handleDataAvailable;
  mediaRecorder.value.onstop = handleStop;
  mediaRecorder.value.start();

  isRecording.value = true;
}

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.value.push(event.data);
  }
}

function handleStop() {
  const blob = new Blob(recordedChunks.value, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  if (videoElement.value) {
    videoElement.value.src = url;
    videoElement.value.play();
  }
  recordedChunks.value = [];
  isRecording.value = false;
}

function stopRecording() {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop();
  }
}
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
  height: 500px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
