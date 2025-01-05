<template>
  <!-- <div></div> -->
  <el-scrollbar class="scroll-content">

    <div class="hexo-neodb-items" v-for="item, id in itemlist" :key="id">
      <div class="hexo-neodb-item">
        <div class="hexo-neodb-picture">
          <!--                <img :src="item.image" loading="lazy" referrerpolicy="no-referrer">-->
        </div>
        <div class="hexo-neodb-info">
          <div class="hexo-neodb-title"><a :href="item.alt" target="_blank">{{ item.title }}</a></div>
          <div class="hexo-neodb-meta" style="-webkit-line-clamp: 4">{{ item.meta }}</div>
          <div class="hexo-neodb-rating">{{ item.rating }}</div>
          <div class="hexo-neodb-comment">{{ item.comment }}</div>
        </div>
      </div>
    </div>

    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                   :page-sizes="[10, 20, 50, 100, 200, 500, 1000]" :small="small" :disabled="disabled"
                   :background="background"
                   layout="total, sizes, prev, pager, next, jumper" :total="total"/>
  </el-scrollbar>

</template>

<script setup>
import {ref, computed, watch} from "vue"
import {nextTick} from "vue";

let props = defineProps(['items'])

console.log(props.items?.length)

let currentPage = ref(1)
let pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
// let itemlist = ref()

let total = ref(props.items?.length)

console.log(total)
// console.log(itemlist)

let itemlist = computed(() => {
  return props.items.slice((currentPage.value - 1) * pageSize.value, (currentPage.value - 1) * pageSize.value + pageSize.value)
})

</script>
<style scoped>
.hexo-neodb-items {
  display: flex;
  overflow: auto;
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

.scroll-content {
  flex: 1; /* 剩余空间自动填充 */
  overflow-y: auto; /* 滚动 */
}

.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
