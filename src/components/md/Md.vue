<template>
  <div class="app-container">
    <div>
      <h1>{{ title }}</h1>
    </div>

    <div v-html="content">
    </div>

    <div id="gitalk-container">
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUpdated, ref, watch} from "vue";
import {markdownParser, updateMathjax} from "./utils/helper";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {getFile} from "@/api/github";

import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

import CryptoJS from 'crypto-js';

let content = ref('')
let title = ref('')

const route = useRoute()

function init_gitalk(name, url) {
  // 清空现有的评论容器
  document.getElementById('gitalk-container').innerHTML = '';

  const {
    VITE_gitalk_client_id,
    VITE_gitalk_client_secret,
    VITE_gitalk_repo,
    VITE_gitalk_owner,
    VITE_gitalk_admin
  } = import.meta.env


  console.log(url);
  const hash = CryptoJS.MD5(url).toString();
  console.log(hash); // Outputs the MD5 hash of the message

  var gitalk = new Gitalk({
    clientID: VITE_gitalk_client_id,
    clientSecret: VITE_gitalk_client_secret,
    repo: VITE_gitalk_repo,
    owner: VITE_gitalk_owner,
    admin: [VITE_gitalk_admin],
    id: hash,      // Ensure uniqueness and length less than 50
    distractionFreeMode: false,  // Facebook-like distraction free mode
    title: name
  })

  gitalk.render('gitalk-container')
}

function init() {
  // location.reload()

  updateMathjax()

  // console.log(route)
  const {name, url} = route.query
  // document.tilte = name
  updateMd(name, url)
  init_gitalk(name, url)
}

watch(
    () => route.fullPath, // 监听路由完整路径的变化
    () => {
      try {
        init()
      } catch (e) {
        console.log(e);
      }
    }
);

// onBeforeRouteUpdate((to, from, next) => {
//   try {
//     init()
//   } catch (e) {
//     console.log(e);
//   }
//   next()
// })

onMounted(() => {
  try {
    init()
  } catch (e) {
    console.log(e);
  }

  // // console.log('挂载完毕')
  // if (pluginCenter.mathjax) {
  //     handleUpdateMathjax();
  // }
})


function updateMd(name, url) {
  title.value = name
  // url = 'https://raw.githubusercontent.com/LesslsMore/blog/master/20240702【油猴脚本】动漫网站弹幕播放.md'
  // url = 'https://raw.githubusercontent.com/LesslsMore/blog/refs/heads/master/%E6%9C%BA%E5%99%A8%E8%A7%86%E8%A7%89/20201028%20%E4%B8%89%E7%BB%B4%E6%97%8B%E8%BD%AC%E7%9F%A9%E9%98%B5%EF%BC%9B%E4%B8%9C%E5%8C%97%E5%A4%A9%E5%9D%90%E6%A0%87%E7%B3%BB(ENU)%EF%BC%9B%E5%9C%B0%E5%BF%83%E5%9C%B0%E5%9B%BA%E5%9D%90%E6%A0%87%E7%B3%BB(ECEF)%EF%BC%9B%E7%BB%8F%E7%BA%AC%E5%BA%A6%E5%AF%B9%E5%BA%94%E5%9C%86%E5%BC%A7%E8%B7%9D%E7%A6%BB.md'
  getFile(url).then(res => {
    // console.log(res.data)

    const parseHtml = markdownParser.render(res.data)
    // console.log(parseHtml)
    content.value = parseHtml
  })
}
</script>
