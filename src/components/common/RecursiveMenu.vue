<template>
  <template v-for="item in menuItems" :key="item.index">
    <el-sub-menu v-if="item.children && item.children.length" :index="item.index">
      <template #title>
        <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
        {{ item.title }}
      </template>
      <recursive-menu :menu-items="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.index">
      <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
      {{ item.title }}
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
defineProps({
  menuItems: {
    type: Array,
    required: true
  }
});
</script>