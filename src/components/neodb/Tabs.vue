<template>
    <el-tabs :tab-position="tabPosition" style="height: 100%" class="demo-tabs">
        <el-tab-pane v-for="type,id in supported_types" :key="id" :label="type">
            <Tab :type="type"/>
        </el-tab-pane>
    </el-tabs>
</template>


<script setup>
import Tab from "./Tab.vue"
import { ref } from 'vue'

const tabPosition = ref('left')

const supported_types = ['book', 'movie', 'tv', 'music', 'game']


</script>

<style scoped>
.hexo-neodb-tabs {
    margin-bottom: 15px;
    margin-top: 15px;
}

.hexo-neodb-tab {
    padding: 5px;
    text-decoration: none !important;
}

.hexo-neodb-tab-active {
    background: #657b83;
    color: #fff !important;
}

.hexo-neodb-item {
    position: relative;
    clear: both;
    min-height: 170px;
    padding: 10px 0;
    border-bottom: 1px #ddd solid;
}

@media screen and (max-width: 600px) {
    .hexo-neodb-item {
        width: 100%;
    }
}

.hexo-neodb-picture {
    position: absolute;
    left: 0;
    top: 10px;
    width: 100px;
}

.hexo-neodb-info {
    padding-left: 120px;
}

.hexo-neodb-meta {
    overflow: hidden;
    display: -webkit-box;
    font-size: 12px;
    line-height: 16px;
    padding-right: 10px;
    margin-top: 5px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4
}

.hexo-neodb-rating {
    overflow: hidden;
    display: -webkit-box;
    font-size: 12px;
    padding-right: 10px;
    margin-top: 8px;
}

.hexo-neodb-comments {
    font-size: 12px;
}

.hexo-neodb-pagination {
    margin-top: 15px;
    text-align: center;
    margin-bottom: 10px;
}

.hexo-neodb-button {
    padding: 5px;
    text-decoration: none !important;
}

.hexo-neodb-button:hover {
    background: #657b83;
    color: #fff !important;
    opacity: 1;
}
</style>
<!-- <style>

/* .hexo-neodb-tabs {
    margin-bottom: 15px;
    margin-top: 15px;
}

.hexo-neodb-tab {
    padding: 5px;
    text-decoration: none !important;
}

.hexo-neodb-tab-active {
    background: #657b83;
    color: #fff !important;
} */

.hexo-neodb-item {
    position: relative;
    clear: both;
    min-height: 170px;
    padding: 10px 0;
    border-bottom: 1px #ddd solid;
}

@media screen and (max-width: 600px) {
    .hexo-neodb-item {
        width: 100%;
    }
}

.hexo-neodb-picture {
    position: absolute;
    left: 0;
    top: 10px;
    width: 100px;
}

.hexo-neodb-info {
    padding-left: 120px;
}

.hexo-neodb-meta {
    overflow: hidden;
    display: -webkit-box;
    font-size: 12px;
    line-height: 16px;
    padding-right: 10px;
    margin-top: 5px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4
}

.hexo-neodb-rating {
    overflow: hidden;
    display: -webkit-box;
    font-size: 12px;
    padding-right: 10px;
    margin-top: 8px;
}

.hexo-neodb-comments {
    font-size: 12px;
}

.hexo-neodb-pagination {
    margin-top: 15px;
    text-align: center;
    margin-bottom: 10px;
}

.hexo-neodb-button {
    padding: 5px;
    text-decoration: none !important;
}

.hexo-neodb-button:hover {
    background: #657b83;
    color: #fff !important;
    opacity: 1;
}

</style> -->
