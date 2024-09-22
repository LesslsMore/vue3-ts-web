<template>
  <div>
    <!-- Canvas 元素 -->
    <canvas ref="canvas" width="600" height="400"></canvas>

    <!-- 控制按钮 -->
    <button @click="startRecording" :disabled="isRecording">Start Recording</button>
    <button @click="stopRecording" :disabled="!isRecording">Stop Recording</button>
    <video ref="videoElement" controls></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
const videoElement = ref(null);
const isRecording = ref(false);
const recordedChunks = ref([]);
const mediaRecorder = ref(null);

function startRecording() {
  console.log("startRecording...")
  console.log(canvas.value)
  if (canvas.value) {
    const stream = canvas.value.captureStream(30); // 30 FPS
    mediaRecorder.value = new MediaRecorder(stream);
    mediaRecorder.value.ondataavailable = handleDataAvailable;
    mediaRecorder.value.onstop = handleStop;
    mediaRecorder.value.start();
    isRecording.value = true;
  }
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
  console.log("stopRecording...")
  console.log(mediaRecorder.value)
  if (mediaRecorder.value) {
    mediaRecorder.value.stop();
  }
}

// Canvas 动画示例
function draw() {
  const ctx = canvas.value.getContext('2d');
  let x = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(x, 50, 50, 50);
    x += 2;
    if (x > canvas.value.width) x = 0;
    requestAnimationFrame(animate);
  }
  animate();
}

// 初始化
onMounted(() => {
  draw();
});

// 清理
onUnmounted(() => {
  if (mediaRecorder.value && mediaRecorder.value.state === 'recording') {
    mediaRecorder.value.stop();
  }
});
</script>
