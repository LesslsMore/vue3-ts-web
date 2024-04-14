<template>
  <div class="app">
    <el-scrollbar>
      <div class="layout_container">
        <div class="layout_slider">
          <h3>done</h3>
          <RouterLink to="/bili">bili 分段视频搜索</RouterLink>
          <br/>
          <RouterLink to="/meting">在线 meting 播放器</RouterLink>
          <br/>
          <RouterLink to="/music">本地 aplayer 播放器</RouterLink>
          <br/>
          <RouterLink to="/md">md 数学公式</RouterLink>
          <br/>
          <!-- 使用 mdnice
          换用 mpe -->


          <h3>doing</h3>
          <RouterLink to="/douban">douban 列表创建</RouterLink>
          <br/>
          <RouterLink to="/neodb">neodb 数据统计</RouterLink>
          <br/>

          <h3>todo</h3>
          <RouterLink to="/live2d">live2d 模型加载</RouterLink>
          <br/>
          cms 视频播放
          <br/>
          epub gitboot 电子书
          <br/>
          mbti political 测试
          <br/>
          chrome 收藏导航
          <br/>
          midi 钢琴游戏
          <br/>
          webgal 4399 游戏
          <br/>

        </div>
        <div class="layout_main">
          <RouterView></RouterView>
        </div>
      </div>
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
import {RouterView, RouterLink} from 'vue-router'
import {Discount} from "@element-plus/icons-vue";

// import "@/components/md/utils/math"

// import Tabs from '@/layout/Tabs.vue'
// import Menu from '@/layout/Menu.vue'
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    //color: white;
    width: $base-menu-width;
    height: 100vh;
    //background: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width );
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width );
      left: $base-menu-min-width;
    }

  }
}
</style>
