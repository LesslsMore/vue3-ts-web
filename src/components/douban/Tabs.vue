<template>
  <el-tabs :tab-position="tabPosition" style="height: 100%" class="demo-tabs">
    <el-tab-pane label="top250">
      <el-button type="primary" :icon="Download" @click="exportDoubanTop250()">导出 DoubanTop250</el-button>
    </el-tab-pane>
  </el-tabs>
</template>


<script setup>
import { ref } from 'vue'
import Item from "@/components/neodb/Item.vue";
import {Download} from "@element-plus/icons-vue";
import {getDoubanTop250} from './get-douban-top250.js'

const tabPosition = ref('left')

const supported_types = ['book', 'movie', 'tv', 'music', 'game']

function exportDoubanTop250() {
  getDoubanTop250()
}

</script>
