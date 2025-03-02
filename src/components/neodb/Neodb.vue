<template>
    <div id="animation-container"></div>

    <el-input v-model="token" style="width: 240px" placeholder="输入 token" />
    <br />
    <el-button type="primary" :icon="Download" @click="downNeodbList()">下载 neodblist</el-button>
    
    <!-- <el-button type="primary" :icon="Upload" @click="importNeodbList()">导入 neodblist</el-button> -->

    <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item, idx in categories" :key="idx" :label="item" :value="item" />
    </el-checkbox-group>

    <el-upload
      multiple
      :auto-upload="false"
      accept=".json"
      :on-change="import_db"
      :show-file-list="false"
  >
    <el-button :icon="Upload" type="primary">import_db</el-button>
  </el-upload>
  <el-button :icon="Download" @click="export_db">export_db</el-button>
</template>

<script setup>

import { ref } from "vue"
import { fetchData } from "./http"
import { saveAs } from 'file-saver'
import { Upload, Download } from '@element-plus/icons-vue'
// import ElUpload from "./Upload.vue"
import { fetchAllData } from "./api.js"
import {export_db, import_db, categories} from "@/utils/db/db_neodb.js";

// import anime from 'animejs/lib/annime.es.js';

import Tab from "./Tab.vue"

let token = ref(import.meta.env.VITE_neodb_token)

let checkList = ref([])

let items = ref([])

function get_items() {
  let val = localStorage.getItem(categories[3])

  if (val != null) {
    items.value = JSON.parse(val)
    console.log(items.value.complete)


    const container = document.getElementById('animation-container');

    items.value.complete.forEach((item, index) => {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      // bar.style.width = `${item.rank * 10}px`;
      bar.textContent = `${item.title}. ${item.rating}`;
      container.appendChild(bar);

    //   anime({
    //     targets: bar,
    //     width: '100%',
    //     easing: 'easeOutQuad',
    //     duration: 1000 + index * 500
    //   });
    });
  }
}

async function downNeodbList() {
    let categories = checkList.value
    for (let i in categories) {
        let category = categories[i]
        console.log(category)

        const startTime = new Date().getTime();

        let data = await fetchAllData(token.value, category);

        const endTime = new Date().getTime();

        console.log(`${data.wishlist.length} (wishlist), ${data.progress.length} (progress),${data.complete.length} (complete) ${category} loaded in ${endTime - startTime} ms`);
    }
}
</script>
