<template>
  <div class="list-container">
    <div class="filter-section">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :disabled="loading"
        @change="handleDateRangeChange"
      />
      <el-select
        v-model="selectedYear"
        placeholder="选择年份"
        :disabled="loading || dateRange"
        @change="handleYearChange"
      >
        <el-option
          v-for="year in availableYears"
          :key="year"
          :label="year + '年'"
          :value="year"
        />
      </el-select>
      <el-button @click="clearFilters" :disabled="!dateRange && !selectedYear">清除筛选</el-button>
    </div>
    <el-tabs v-model="activeTab" :tab-position="tabPosition" style="height: 100%" class="demo-tabs">
      <el-tab-pane name="progress" :label="`${getStatusLabel('progress')}`">
        <Item 
          :items="filteredItems" 
          :loading="loading"
          :current-page="(!dateRange && !selectedYear) ? currentPage : 1"
          :page-size="(!dateRange && !selectedYear) ? pageSize : filteredTotal"
          :total="filteredTotal"
          @update:current-page="handlePageChange"
          @update:page-size="handleSizeChange"
          v-show="!loading"
        />
      </el-tab-pane>
      <el-tab-pane name="wishlist" :label="`${getStatusLabel('wishlist')}`">
        <Item 
          :items="filteredItems" 
          :loading="loading"
          :current-page="(!dateRange && !selectedYear) ? currentPage : 1"
          :page-size="(!dateRange && !selectedYear) ? pageSize : filteredTotal"
          :total="filteredTotal"
          @update:current-page="handlePageChange"
          @update:page-size="handleSizeChange"
          v-show="!loading"
        />
      </el-tab-pane>
      <el-tab-pane name="complete" :label="`${getStatusLabel('complete')}`">
        <Item 
          :items="filteredItems" 
          :loading="loading"
          :current-page="(!dateRange && !selectedYear) ? currentPage : 1"
          :page-size="(!dateRange && !selectedYear) ? pageSize : filteredTotal"
          :total="filteredTotal"
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
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from "vue-router"
import { fetchNeodbData } from "./api"

const route = useRoute()
const tabPosition = ref('top')
const activeTab = ref('progress')
const currentType = ref('game')
const currentItems = ref([])
const loading = ref(false)
const token = import.meta.env.VITE_neodb_token
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const dateRange = ref(null)
const allItems = ref([])
const selectedYear = ref(new Date().getFullYear())
const availableYears = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => currentYear - i)
})

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
  // 默认使用当前页数据
  if (!dateRange.value && !selectedYear.value) {
    return currentItems.value || []
  }

  // 使用所有数据进行筛选
  const items = allItems.value || []
  
  if (dateRange.value) {
    const [startDate, endDate] = dateRange.value
    return items.filter(item => {
      const itemDate = new Date(item.created_time)
      return itemDate >= startDate && itemDate <= endDate
    })
  }
  
  if (selectedYear.value) {
    return items.filter(item => {
      const itemDate = new Date(item.created_time)
      return itemDate.getFullYear() === selectedYear.value
    })
  }

  return items
})

const filteredTotal = computed(() => {
  return dateRange.value ? filteredItems.value.length : total.value
})

const getStatusLabel = (status) => {
  const type = route.query.type?.toLowerCase() || 'game'
  return statusLabels[type]?.[status] || statusLabels.game[status]
}

async function fetchPageData() {
  const type = route.query.type?.toLowerCase() || 'game'
  currentType.value = type
  loading.value = true
  try {
    const result = await fetchNeodbData(token, type, activeTab.value, currentPage.value)
    
    // 如果需要筛选，获取所有数据
    if (dateRange.value || selectedYear.value) {
      allItems.value = result.data
      const totalPages = Math.ceil(result.total / pageSize.value)
      
      for (let page = 2; page <= totalPages; page++) {
        const nextPage = await fetchNeodbData(token, type, activeTab.value, page)
        allItems.value = [...allItems.value, ...nextPage.data]
      }
      currentItems.value = allItems.value
    } else {
      // 正常分页模式
      currentItems.value = result.data
      allItems.value = result.data
    }
    
    total.value = result.total
    statusCounts.value[type][activeTab.value] = result.total
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    loading.value = false
  }
}

function handleDateRangeChange() {
  if (dateRange.value) {
    fetchPageData()
  }
}

function clearFilters() {
  dateRange.value = null
  selectedYear.value = new Date().getFullYear()
  fetchPageData()
}

function handleYearChange() {
  if (selectedYear.value) {
    fetchPageData()
  }
}

onMounted(() => {
})

watch([() => route.query, activeTab], () => {
  currentPage.value = 1
  dateRange.value = null
  selectedYear.value = new Date().getFullYear()
  fetchPageData()
}, { immediate: true })

function handlePageChange(page) {
  if (!dateRange.value) {
    currentPage.value = page
    fetchPageData()
  }
}

function handleSizeChange(size) {
  if (!dateRange.value) {
    pageSize.value = size
    currentPage.value = 1
    fetchPageData()
  }
}
</script>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.filter-section {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;
}
</style>
