<template>
    <el-tabs v-if="val" :tab-position="tabPosition" style="height: 100%" class="demo-tabs">
        <el-tab-pane :label="`在玩(${items.progress.length})`">
            <Item :items="items.progress"/>
        </el-tab-pane>
        <el-tab-pane :label="`想玩(${items.wishlist.length})`">
            <Item :items="items.wishlist"/>
        </el-tab-pane>
        <el-tab-pane :label="`已玩(${items.complete.length})`">
            <Item :items="items.complete"/>
        </el-tab-pane>
    </el-tabs>


    <div id="page">
        <div id="article-container">
            <blockquote>
                <p>This is my game quote</p>
            </blockquote>



            <div class="hexo-neodb-tabs">
                <a class="hexo-neodb-tab hexo-neodb-tab-progress" href="javascript:;" rel="external" data-pjax-state="">
                    在玩
                    (0)</a>
                <a class="hexo-neodb-tab hexo-neodb-tab-wishlist" href="javascript:;" rel="external" data-pjax-state="">
                    想玩
                    (0)</a>
                <a class="hexo-neodb-tab hexo-neodb-tab-complete hexo-neodb-tab-active" href="javascript:;"
                    rel="external" data-pjax-state="">
                    已玩
                    (6)</a>
            </div>
            <!-- <Item /> -->
            <div class="hexo-neodb-pagination">
                <a class="hexo-neodb-button hexo-neodb-firstpage" href="javascript:;" data-pjax-state=""> 首页</a>
                <a class="hexo-neodb-button hexo-neodb-previouspage" href="javascript:;" data-pjax-state="">上一页</a>
                <span class="hexo-neodb-pagenum">1 / 1</span>
                <a class="hexo-neodb-button hexo-neodb-nextpage" href="javascript:;" data-pjax-state="">下一页</a>
                <a class="hexo-neodb-button hexo-neodb-lastpage" href="javascript:;" data-pjax-state="">尾页</a>
            </div>



        </div>
    </div>
</template>


<script setup>
import Item from "./Item.vue"
import { ref } from 'vue'

// import Music from '@/components/localmusic/Music.vue'
// import Meting from '@/components/meting/Meting.vue'

const tabPosition = ref('top')
let props = defineProps(['type'])


// let key = 'game'
let val = localStorage.getItem(props.type)

// console.log(val)

let items = ref([])
if (val != null) {
    items.value = JSON.parse(val)
    console.log(items.value)
}




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
