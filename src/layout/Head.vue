<template>
  <div class="layout_header">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <el-menu-item index="1">todo</el-menu-item>
      <el-menu-item index="2">doing</el-menu-item>
      <el-menu-item index="3">done</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup name="Head">
//获取用户相关的小仓库
import useProjStore from '@/stores/proj';

let projStore = useProjStore();

import {todoRoute} from "@/router/todo.js";
import {constantRoute} from "@/router/route.js";
import {ref} from "vue";

const activeIndex = ref('2')
const handleSelect = (key, keyPath) => {
  if (key === '1') {
    projStore.proj = todoRoute
  } else if (key === "2") {
    projStore.proj = constantRoute
  }
}
</script>


<style scoped lang="scss">
.layout_header {
  position: absolute;
  width: 100%;
  height: $base-tabbar-height;
  background: #8d8d8d;
}
</style>
