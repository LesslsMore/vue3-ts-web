<template>
  <div class="app">
    <el-scrollbar>
      <h3>done</h3>&nbsp;&nbsp;
      <RouterLink to="/bili"><a>bili 分段视频搜索</a></RouterLink>&nbsp;&nbsp;
      <RouterLink to="/meting"><a>在线 meting 播放器</a></RouterLink>&nbsp;&nbsp;
      <RouterLink to="/music"><a>本地 aplayer 播放器</a></RouterLink>&nbsp;&nbsp;
      <RouterLink to="/md"><a>md 数学公式</a></RouterLink>&nbsp;&nbsp;
      <!-- 使用 mdnice
      换用 mpe -->

      <br />
      <h3>doing</h3>&nbsp;&nbsp;

      <RouterLink to="/douban"><a>douban 列表创建</a></RouterLink>&nbsp;&nbsp;
      
      <RouterLink to="/neodb" ><a>neodb 数据统计</a></RouterLink>&nbsp;&nbsp;

      <br />
      <h3>todo</h3>&nbsp;&nbsp;

      <a>cms 视频播放</a>&nbsp;&nbsp;
      <a>epub gitboot 电子书</a>&nbsp;&nbsp;
      <a>live2d 模型加载</a>&nbsp;&nbsp;
      <a>mbti political 测试</a>&nbsp;&nbsp;
      <a>chrome 收藏导航</a>&nbsp;&nbsp;
      <a>midi 钢琴游戏</a>&nbsp;&nbsp;
      <a>webgal 4399 游戏</a>&nbsp;&nbsp;

      <br />

      <RouterView></RouterView>
    </el-scrollbar>
  </div>

  <!-- <Tabs/> -->
  <!-- <SidebarMenu :menu-list="permissionStore.routes" base-path="" /> -->
  <!-- <Tabs/> -->
  <!-- <Menu/> -->
  <!-- <h2 class="title">Vue路由测试</h2> -->
  <!-- 导航区 -->
  <!-- <div class="navigate"> -->
  <!-- <RouterLink to="/home" active-class="xiaozhupeiqi">首页</RouterLink>
      <RouterLink to="/news" active-class="xiaozhupeiqi">新闻</RouterLink>
      <RouterLink to="/about" active-class="xiaozhupeiqi">关于</RouterLink>
      <br/>

      <RouterLink to="/search" active-class="xiaozhupeiqi">search</RouterLink>
      <br/> -->

  <!-- <RouterLink to="/tabs" active-class="xiaozhupeiqi">tabs</RouterLink>
      <br/> -->
  <!-- <RouterLink to="/midlist" active-class="xiaozhupeiqi">midlist</RouterLink>
      <br/>
      <RouterLink to="/bvidlist" active-class="xiaozhupeiqi">bvidlist</RouterLink>
      <br/> -->
  <!-- </div> -->
  <!-- 展示区 -->
</template>

<script lang="ts" setup name="App">
import { RouterView, RouterLink } from 'vue-router'

// import "@/components/md/utils/math"

// import Tabs from '@/layout/Tabs.vue'
// import Menu from '@/layout/Menu.vue'
</script>