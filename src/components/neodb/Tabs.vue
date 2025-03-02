<template>
  <div class="container">
    <el-tabs :tab-position="tabPosition" style="height: 100%" class="demo-tabs">
        <el-tab-pane v-for="type, id in menuItems" :key="id" :label="type.title">
            <template #label>
              <el-icon><component :is="type.icon" /></el-icon>
              {{ type.title }}
            </template>
            <Tab :type="type.type"/>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script setup>
import Tab from "./Tab.vue"
import { ref } from 'vue'

const tabPosition = ref('left')

const menuItems = [
  {
    type: 'book',
    title: 'Book',
    icon: 'Notebook'
  },
  {
    type: 'movie',
    title: 'Movie',
    icon: 'Film'
  },
  {
    type: 'tv',
    title: 'TV',
    icon: 'Monitor'
  },
  {
    type: 'music',
    title: 'Music',
    icon: 'Headset'
  },
  {
    type: 'game',
    title: 'Game',
    icon: 'SwitchFilled'
  }
]

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column; /* 纵向排列 */
  /* height: 100vh; */
}
.el-tabs :deep(.el-tabs__nav) {
  width: 100%;
}

.el-tabs :deep(.el-tabs__item) {
  display: flex;
  align-items: left;
  width: 100%;
  padding-left: 20px;
}

.el-tabs :deep(.el-icon) {
  margin-right: 8px;
}
</style>
