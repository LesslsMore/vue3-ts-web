<template>
  <div class="layout-head">
    <div class="head-left">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
      >
        <el-menu-item index="md">
          <el-icon><Document /></el-icon>
          文章</el-menu-item>
        <el-menu-item index="todo">
          <el-icon><WarningFilled /></el-icon>
          todo</el-menu-item>
        <el-menu-item index="doing">
          <el-icon><QuestionFilled /></el-icon>
          doing</el-menu-item>
        <el-menu-item index="done">
          <el-icon><SuccessFilled /></el-icon>
          done</el-menu-item>
      </el-menu>
    </div>

    <div class="head-mid">
      Less ls More.
    </div>

    <div class="head-right">
      <div>
        <el-icon><HomeFilled />
        </el-icon>
        主页
      </div>


      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-icon><List /></el-icon>
          清单
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="Music">
              <el-icon><Headset /></el-icon>
              Music</el-dropdown-item>
            <el-dropdown-item command="Movie">
              <el-icon><Film /></el-icon>
              Movie</el-dropdown-item>
            <el-dropdown-item command="Book">
              <el-icon><Notebook /></el-icon>
              Book
            </el-dropdown-item>
            <el-dropdown-item command="Game">
              <el-icon><SwitchFilled /></el-icon>
              Game</el-dropdown-item>
            <el-dropdown-item command="TV">
              <el-icon><Monitor /></el-icon>
              TV
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div>
        <el-icon><Avatar />
        </el-icon>
        关于
      </div>

    </div>
  </div>
</template>

<script setup name="Head">
//获取用户相关的小仓库
import useProjStore from '@/stores/proj';

let projStore = useProjStore();

import {todoRoute, doingRoute} from "@/router/route.js";
import {ref} from "vue";
import router from "@/router";

const activeIndex = ref('2')
const handleSelect = (key, keyPath) => {
  if (key === 'todo') {
    projStore.proj = todoRoute
  } else if (key === "doing") {
    projStore.proj = doingRoute
  } else {
    projStore.proj = []
  }
}

const handleCommand = (command) => {
  router.push({
    path: "/list",
    query: { type: command }, // 通过 query 传递参数
  });
};
</script>


<style scoped lang="scss">

.el-menu-demo {
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: row;
  //justify-content: space-around;
  align-items: center;
}

.head-left {
  position: fixed;
  width: $base-menu-width;
  height: $base-tabbar-height;
}

.head-mid {
  position: fixed;
  left: $base-menu-width;
  right: $base-menu-width;
  width: calc(100% - $base-menu-width * 2);
  height: $base-tabbar-height;
  display: flex;
  justify-content: center;
  align-items: center;
}

.head-right {
  position: fixed;
  width: $base-menu-width;
  right: 0;
  height: $base-tabbar-height;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>
