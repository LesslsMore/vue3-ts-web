<template>
    <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          :collapse="false"
          :ellipsis="false"
      >
      <div class="head-left">
        <recursive-menu :menu-items="leftMenuItems" />
      </div>

      <div class="head-mid">
        Less ls More.
      </div>

      <div class="head-right">
        <recursive-menu :menu-items="rightMenuItems" />
      </div>
    </el-menu>
</template>

<script setup name="Head">
import useProjStore from '@/stores/proj';
import { useLayoutStore } from '@/stores/layout';
import { ref, onBeforeMount } from "vue";
import router from "@/router";
import {todoRoute, doingRoute} from "@/router/route.js";
import RecursiveMenu from '@/components/common/RecursiveMenu.vue';

let projStore = useProjStore();
const layoutStore = useLayoutStore();
const activeIndex = ref('md');
const leftMenuItems = ref([]);

// 递归转换路由为菜单项
function convertRouteToMenuItem(route) {
  // 如果只有 meta.label，创建一个禁用的菜单项
  if (!route.name && route.meta?.label) {
    return {
      index: route.meta.label,
      title: route.meta.label,
      icon: route.meta?.icon || '',
      disabled: true
    };
  }

  // 如果没有 name 且没有 meta.label，跳过该路由
  if (!route.name && !route.meta?.label) {
    return null;
  }

  const menuItem = {
    index: route.name,
    title: route.meta?.label || route.name,
    icon: route.meta?.icon || ''
  };

  // 递归处理子路由
  if (route.children && route.children.length > 0) {
    const children = route.children
      .map(child => convertRouteToMenuItem(child))
      .filter(item => item !== null);
    if (children.length > 0) {
      menuItem.children = children;
    }
  }

  return menuItem;
}

onBeforeMount(() => {
  // 初始化状态
  projStore.proj = [];
  layoutStore.setShowToc(true);
  
  // 使用递归函数转换路由
  const todoMenuItems = todoRoute
    .map(route => convertRouteToMenuItem(route))
    .filter(item => item !== null);
  const doingMenuItems = doingRoute
    .map(route => convertRouteToMenuItem(route))
    .filter(item => item !== null);
  
  // 初始化左侧菜单项
  leftMenuItems.value = [
  {
    index: 'todo',
    title: 'todo',
    icon: 'WarningFilled',
    children: todoMenuItems
  },
  {
    index: 'doing',
    title: 'doing',
    icon: 'QuestionFilled',
    children: doingMenuItems
  },
  {
    index: 'done',
    title: 'done',
    icon: 'SuccessFilled'
  },
  {
    index: 'md',
    title: '文章',
    icon: 'Document'
  }
  ];
});

const rightMenuItems = [
  {
    index: 'mastodon',
    title: 'Mastodon',
    icon: 'ChatLineRound'
  },
  {
    index: 'home',
    title: '主页',
    icon: 'HomeFilled'
  },
  {
    index: 'list',
    title: '清单',
    icon: 'List',
    children: [
      {
        index: 'Music',
        title: 'Music',
        icon: 'Headset',
      },
      {
        index: 'Movie',
        title: 'Movie',
        icon: 'Film'
      },
      {
        index: 'Book',
        title: 'Book',
        icon: 'Notebook'
      },
      {
        index: 'Game',
        title: 'Game',
        icon: 'SwitchFilled'
      },
      {
        index: 'TV',
        title: 'TV',
        icon: 'Monitor'
      }
    ]
  },
  {
    index: 'about',
    title: '关于',
    icon: 'Avatar'
  }
];

const handleSelect = (key, keyPath) => {
  if (key === 'todo') {
    projStore.proj = todoRoute
    layoutStore.setShowToc(false)
  } else if (key === "doing") {
    projStore.proj = doingRoute
    layoutStore.setShowToc(false)
  } else if (key === 'md') {
    projStore.proj = []
    layoutStore.setShowToc(true)
  } else if (key === 'mastodon') {
    router.push({name: key})
    layoutStore.setShowToc(false)
  } else if (key === 'home') {
    router.push('/');
  } else if (['Music', 'Movie', 'Book', 'Game', 'TV'].includes(key)) {
    router.push({
      path: "/list",
      query: { type: key },
    });
  } else if (key === 'about') {
    const nodeData = {
      name: 'README.md',
      download_url: 'https://raw.githubusercontent.com/LesslsMore/lesslsmore/refs/heads/main/README.md'
    }

    router.push({
      name: 'md',
      query: {
        name: nodeData.name.slice(0, -3),
        url: nodeData.download_url
      }
    });
    
    layoutStore.setShowToc(true)
  } else if (key === 'politics') {
    router.push({
      name: 'politics',
      params: {
        url: encodeURIComponent('https://politiscales.party/')
      }
    })
  } else if (key === 'mbti') {
    router.push({
      name: 'mbti',
      params: {
        url: encodeURIComponent('https://www.16personalities.com/ch/%E4%BA%BA%E6%A0%BC%E6%B5%8B%E8%AF%95')
      }
    })
  } else if (key === 'bili') { // Add this condition for bili page navigation
    // window.location.href = '/page/bili/index.html';
    window.open('/page/bili/index.html', '_blank');
  } 
  else {
    router.push({name: key})
  }
}
</script>

<style scoped lang="scss">
.el-menu-demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.head-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 3;
}

.head-mid {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.head-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 3;
}
</style>