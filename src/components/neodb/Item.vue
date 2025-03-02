<template>
  <el-scrollbar class="scroll-content">
    <div class="item-list">
      <el-card v-for="(item, id) in itemlist" :key="id" class="item-card">
        <div class="item-content">
          <div class="item-image">
            <el-image 
              :src="item.image" 
              :preview-src-list="[item.image]"
              fit="cover"
              loading="lazy"
              :initial-index="4"
              @error="handleImageError"
            >
              <template #error>
                <div class="image-error">
                  <el-icon><picture-filled /></el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <div class="item-info">
            <h3 class="item-title">
              <el-link :href="item.alt" target="_blank" type="primary">{{ item.title }}</el-link>
            </h3>
            <p class="item-meta">{{ item.meta }}</p>
            <div class="rating-container">
              <el-rate
                v-model="item.rating"
                disabled
                allow-half
                show-score
                text-color="#ff9900"
                :max="5"
                :model-value="item.rating / 2"
              >
              </el-rate>
              <span class="created-time">{{ item.created_time }}</span>
            </div>
            <p class="item-comment">{{ item.comment }}</p>
          </div>
        </div>
      </el-card>
    </div>

    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :small="small"
      :disabled="disabled || loading"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @update:current-page="page => emit('update:currentPage', page)"
      @update:page-size="size => emit('update:pageSize', size)"
      class="pagination"
      :pager-count="7"
      prev-text="上一页"
      next-text="下一页"
      :page-sizes="[20,]"
      size-change-text="条/页"
      jump-text="前往"
    />
  </el-scrollbar>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { PictureFilled } from '@element-plus/icons-vue'

const props = defineProps({
  items: Array,
  loading: Boolean,
  currentPage: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

const scoreTemplate = (score) => {
  return `评分: ${score * 2} 分`; // 每颗星代表 2 分
};

const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const small = ref(false)
const background = ref(true)
const disabled = ref(false)

const itemlist = computed(() => props.items || [])

const handleImageError = () => {
  console.warn('Image failed to load')
}
</script>

<style scoped>
.scroll-content {
  height: 100%;
  padding: 20px;
}

.item-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.item-card {
  transition: all 0.3s;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.item-content {
  display: flex;
  gap: 16px;
}

.item-image {
  width: 120px;
  height: 160px;
  overflow: hidden;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-title {
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
}

.item-meta,
.item-comment {
  margin: 0;
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.rating-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.created-time {
  color: #909399;
  font-size: 14px;
}
.image-error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 24px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
