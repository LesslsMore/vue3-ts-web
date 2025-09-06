<template>
    <div id="animation-container"></div>

    <el-input v-model="token" style="width: 240px" placeholder="输入 token" />
    <br />
    <el-button type="primary" :icon="Download" @click="downNeodbList()">下载 neodblist</el-button>
    
    <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item, idx in categories" :key="idx" :label="item" :value="item" />
    </el-checkbox-group>

    <indexeddb/>

</template>

<script setup>

import { ref, onMounted } from "vue"
import { fetchAllData } from "./api.js"
import indexeddb from "@/components/common/indexeddb.vue"
import {categories} from "@/utils/db/db_neodb.js";


let token = ref(import.meta.env.VITE_neodb_token)

let checkList = ref([])


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
