<template>
  <div class="layout_right">
    <el-scrollbar>
      <!-- 添加 TOC 卡片 -->
      <el-card v-if="layoutStore.showToc && layoutStore.tocContent">
        <!-- <template #header> -->
          <!-- <div class="card-header">
            <span>文章目录</span>
          </div> -->
        <!-- </template> -->
        <div class="toc-content">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item title="目录" name="1">
              <div v-html="layoutStore.tocContent"></div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>

      <el-card>
        <template #header>
          <div class="card-header">
            <span>Less ls More.</span>
          </div>
        </template>
        <el-avatar shape="square" :size="100" :src="squareUrl" />
        <template #footer>至繁归于至简。</template>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout';
import { ref } from 'vue';

const layoutStore = useLayoutStore();
const activeCollapse = ref(['1']);

let squareUrl = "https://avatars.githubusercontent.com/u/39825147?s=400&u=292e2d371c7ee58b695bb70d0b48217525b5b1e0&v=4"
</script>

<style scoped lang="scss">
.layout_right {
  position: fixed;
  width: $base-menu-width;
  height: calc(100% - $base-tabbar-height);
  left: calc(100% - $base-menu-width);
  top: $base-tabbar-height;
}

.toc-content {
  :deep(a) {
    color: #333;
    text-decoration: none;
    &:hover {
      color: #409EFF;
    }
  }

  :deep(.toc-list) {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
  }

  :deep(.toc-item) {
    margin: 4px 0;
    
    .toc-link {
      display: block;
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.3s;
      
      &:hover {
        background-color: #f0f2f5;
      }
    }
  }

  :deep(ul ul) {
    padding-left: 16px;
  }

  :deep(.el-collapse) {
    border: none;
  }

  :deep(.el-collapse-item__header) {
    border: none;
    font-size: 14px;
  }

  :deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }
}
</style>
