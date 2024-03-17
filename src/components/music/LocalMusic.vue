<template>
  <div id="app">
    <!-- 准备一个容器用来存放音乐播放器 -->
    <div id="aplayer"></div>
  </div>
</template>

<script setup>
import Api from '@/api/music/music'
// import APlayer from "APlayer"; // 引入音乐插件
// import "APlayer/dist/APlayer.min.css"; // 引入音乐插件的样式
import { onMounted, ref } from 'vue';

onMounted(() => {
  initAudio();
})

let audio = ref([])// 歌曲列表
let info = ref({
  lrcType: 1,
  fixed: true, // 不开启吸底模式
  listFolded: true, // 折叠歌曲列表
  autoplay: true, // 开启自动播放
  preload: "auto", // 自动预加载歌曲
  loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
  order: "list", //  播放模式，list列表播放, random随机播放
})

function initAudio() {
  Api.get_music_list().then(response => {
    // console.log(response.data.data)
    for (let i in response.data) {
      // console.log(toRaw(response.data.data[i]))
      audio.value.push(response.data[i]);
    }

    console.log(audio)

    // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
    const ap = new APlayer({
      container: document.getElementById("aplayer"),
      audio: audio.value, // 音乐信息
      ...info.value, // 其他配置信息
    });
  })
}
</script>