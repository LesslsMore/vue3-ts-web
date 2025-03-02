<template>
  <div class="list-container">
    <el-tabs v-model="activeTab" :tab-position="tabPosition" style="height: 100%" class="demo-tabs">
      <el-tab-pane name="progress" :label="`${getStatusLabel('progress')}(${statusCounts[currentType][activeTab]})`">
        <Item 
          :items="filteredItems" 
          :loading="loading"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @update:current-page="handlePageChange"
          @update:page-size="handleSizeChange"
          v-show="!loading"
        />
      </el-tab-pane>
      <el-tab-pane name="wishlist" :label="`${getStatusLabel('wishlist')}(${statusCounts[currentType][activeTab]})`">
        <Item 
          :items="filteredItems" 
          :loading="loading"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @update:current-page="handlePageChange"
          @update:page-size="handleSizeChange"
          v-show="!loading"
        />
      </el-tab-pane>
      <el-tab-pane name="complete" :label="`${getStatusLabel('complete')}(${statusCounts[currentType][activeTab]})`">
        <Item 
          :items="filteredItems" 
          :loading="loading"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @update:current-page="handlePageChange"
          @update:page-size="handleSizeChange"
          v-show="!loading"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script setup>
import Item from "./Item.vue"
import { ref, watch, computed } from 'vue'
import { fetchNeodbData } from "./api"

const props = defineProps(['type'])
const tabPosition = ref('top')
const activeTab = ref('progress')
const currentType = ref(props.type || 'game')
const currentItems = ref([])
const loading = ref(false)
const token = import.meta.env.VITE_neodb_token
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)

const statusCounts = ref({
  book: { progress: 0, wishlist: 0, complete: 0 },
  movie: { progress: 0, wishlist: 0, complete: 0 },
  tv: { progress: 0, wishlist: 0, complete: 0 },
  music: { progress: 0, wishlist: 0, complete: 0 },
  game: { progress: 0, wishlist: 0, complete: 0 }
})

const statusLabels = {
  book: {
    progress: '在读',
    wishlist: '想读',
    complete: '已读'
  },
  movie: {
    progress: '在看',
    wishlist: '想看',
    complete: '已看'
  },
  tv: {
    progress: '在看',
    wishlist: '想看',
    complete: '已看'
  },
  music: {
    progress: '在听',
    wishlist: '想听',
    complete: '已听'
  },
  game: {
    progress: '在玩',
    wishlist: '想玩',
    complete: '已玩'
  }
}

const filteredItems = computed(() => {
  return currentItems.value || []
})

const getStatusLabel = (status) => {
  const type = currentType.value || 'game'
  return statusLabels[type]?.[status] || statusLabels.game[status]
}

async function fetchPageData() {
  const type = currentType.value
  loading.value = true
  try {
    // 获取当前标签页的数据
    const result = await fetchNeodbData(token, type, activeTab.value, currentPage.value)
    currentItems.value = result.data
    total.value = result.total
    // 获取所有状态的数据总数
    const types = ['wishlist', 'progress', 'complete']
    for (const status of types) {
      if (status !== activeTab.value) {
        const statusData = await fetchNeodbData(token, type, status, 1)
        statusCounts.value[type][status] = statusData.total
      } else {
        statusCounts.value[type][status] = result.total
      }
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    loading.value = false
  }
}

function handlePageChange(page) {
  currentPage.value = page
  fetchPageData()
}

function handleSizeChange(size) {
  pageSize.value = size
  currentPage.value = 1
  fetchPageData()
}

watch([() => props.type, activeTab], () => {
  currentPage.value = 1
  currentType.value = props.type || 'game'
  fetchPageData()
}, { immediate: true })
</script>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
