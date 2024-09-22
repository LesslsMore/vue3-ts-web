<template>
  <div ref="listContainer" class="list-container"></div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import * as d3 from 'd3';

const listContainer = ref(null);
const displayedItems = ref([]);
const allItems = ref([]);
const itemCount = 10; // FIFO 栈的容量
const totalItems = 100; // 总数据条数
const scrollSpeed = 1000; // 数据滚动速度 (毫秒)

let scrollInterval;

const loadItems = () => {
  if (displayedItems.value.length >= itemCount) {
    displayedItems.value.shift(); // 移除最早的一项
  }

  const nextItem = allItems.value[displayedItems.value.length];
  if (nextItem) {
    displayedItems.value.push(nextItem);
  }

  updateVisualization();
};

const updateVisualization = () => {
  const container = d3.select(listContainer.value);
  container.selectAll('div')
      .data(displayedItems.value, d => d.id)
      .join(
          enter => enter.append('div').style('opacity', 0)
              .text(d => d.content)
              .style('color', 'black')
              .style('padding', '10px')
              .style('border-bottom', '1px solid #ddd')
              .transition()
              .duration(500)
              .style('opacity', 1),
          update => update,
          exit => exit.transition()
              .duration(500)
              .style('opacity', 0)
              .remove()
      );
};

onMounted(() => {
  // 初始化数据
  allItems.value = Array.from({length: totalItems}, (v, i) => ({
    id: i + 1,
    content: `Item ${i + 1}`,
  }));

  // 启动自动数据滚动
  scrollInterval = setInterval(() => {
    loadItems();
  }, scrollSpeed);
});

onUnmounted(() => {
  // 组件卸载时清除定时器
  clearInterval(scrollInterval);
});
</script>

<style scoped>
.list-container {
  height: 300px;
  overflow-y: hidden;
  border: 1px solid #ccc;
}
</style>
