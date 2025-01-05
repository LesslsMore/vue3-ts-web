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


<!--    <div id="page">-->
<!--        <div id="article-container">-->
<!--            <blockquote>-->
<!--                <p>This is my game quote</p>-->
<!--            </blockquote>-->

<!--            <div class="hexo-neodb-tabs">-->
<!--                <a class="hexo-neodb-tab hexo-neodb-tab-progress" href="javascript:;" rel="external" data-pjax-state="">-->
<!--                    在玩-->
<!--                    (0)</a>-->
<!--                <a class="hexo-neodb-tab hexo-neodb-tab-wishlist" href="javascript:;" rel="external" data-pjax-state="">-->
<!--                    想玩-->
<!--                    (0)</a>-->
<!--                <a class="hexo-neodb-tab hexo-neodb-tab-complete hexo-neodb-tab-active" href="javascript:;"-->
<!--                    rel="external" data-pjax-state="">-->
<!--                    已玩-->
<!--                    (6)</a>-->
<!--            </div>-->
<!--            &lt;!&ndash; <Item /> &ndash;&gt;-->
<!--            <div class="hexo-neodb-pagination">-->
<!--                <a class="hexo-neodb-button hexo-neodb-firstpage" href="javascript:;" data-pjax-state=""> 首页</a>-->
<!--                <a class="hexo-neodb-button hexo-neodb-previouspage" href="javascript:;" data-pjax-state="">上一页</a>-->
<!--                <span class="hexo-neodb-pagenum">1 / 1</span>-->
<!--                <a class="hexo-neodb-button hexo-neodb-nextpage" href="javascript:;" data-pjax-state="">下一页</a>-->
<!--                <a class="hexo-neodb-button hexo-neodb-lastpage" href="javascript:;" data-pjax-state="">尾页</a>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</template>


<script setup>
import Item from "./Item.vue"
import { ref } from 'vue'

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
</style>
