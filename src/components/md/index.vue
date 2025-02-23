<template>
  <div class="markdown-content">
    <div v-html="htmlContent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'
import { useLayoutStore } from '@/stores/layout'

const props = defineProps<{
  content: string
}>()

const htmlContent = ref('')
const layoutStore = useLayoutStore()

// 初始化 markdown-it 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

// 配置 markdown-it-anchor
md.use(anchor, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#',
  permalinkClass: 'header-anchor'
})

// 配置 markdown-it-toc-done-right
md.use(toc, {
  containerClass: 'toc',
  listType: 'ul',
  listClass: 'toc-list',
  itemClass: 'toc-item',
  linkClass: 'toc-link',
  level: [1, 2, 3],
  callback: function(html: string) {
    // 更新 store 中的 TOC 内容
    layoutStore.setTocContent(html)
  }
})

// 监听内容变化并重新渲染
watch(() => props.content, (newContent) => {
  renderContent(newContent)
}, { immediate: true })

// 渲染 Markdown 内容
const renderContent = (content: string) => {
  htmlContent.value = md.render(content)
}
</script>

<style lang="scss" scoped>
.markdown-content {
  padding: 20px;
  
  :deep(h1, h2, h3, h4, h5, h6) {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
    scroll-margin-top: 1em;
  }

  :deep(h1) { font-size: 2em; }
  :deep(h2) { font-size: 1.5em; }
  :deep(h3) { font-size: 1.25em; }
  :deep(h4) { font-size: 1em; }
  :deep(h5) { font-size: 0.875em; }
  :deep(h6) { font-size: 0.85em; }

  :deep(p) {
    margin-top: 0;
    margin-bottom: 16px;
  }

  :deep(a) {
    color: #0366d6;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  :deep(.header-anchor) {
    float: left;
    margin-left: -20px;
    padding-right: 4px;
    line-height: 1;
    opacity: 0;
    transition: opacity 0.2s;
  }

  :deep(h1, h2, h3, h4, h5, h6) {
    &:hover .header-anchor {
      opacity: 1;
    }
  }
}
</style>