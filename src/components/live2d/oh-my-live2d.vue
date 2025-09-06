<template>
  <!-- 准备一个容器用来存放音乐播放器 -->
  <el-input v-model="server_url" style="width: 240px" placeholder="server_url" />
  <el-button @click="setUrl()">setUrl</el-button>

  <el-button @click="get()">get</el-button>
  <div id="canvas"></div>
  <el-tree-v2 ref="treeRef" style="max-width: 600px" :data="data" :props="props" :filter-method="filterMethod"
    :height="600" @node-click="handleNodeClick" />

  <!-- <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
  </el-table> -->
  <v-list-item v-for="(file) in tableData" :key="file" color="primary">
    <v-list-item-content>
      <el-button @click="openfile(file)">{{ file }}</el-button>
    </v-list-item-content>
  </v-list-item>


</template>
<script setup>
import { loadOml2d } from 'oh-my-live2d';
import { onMounted, onBeforeMount, ref, watch, toRaw } from 'vue'

loadOml2d({
  models: [
    {
      path: 'https://cdn.jsdelivr.net/gh/LesslsMore/live2d-model@master/mygo_avemujica_v5/soyo/039_casual-2023_rip/model.json',
      // scale: 1,
      // position: [100, 100],
      // stageStyle: {
      //   height: 1000
      // }
    },
    // {
    //   path: 'https://cdn.jsdelivr.net/gh/LesslsMore/live2d-model@master/碧蓝航线/AzurLane-火奴鲁鲁【盛夏的“灾难”？】互动版/2389297294.model3.json'
    // }
  ]
});
</script>
