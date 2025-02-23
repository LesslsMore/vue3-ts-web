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
import { ref } from "vue";
import router from "@/router";
import {todoRoute, doingRoute} from "@/router/route.js";
import RecursiveMenu from '@/components/common/RecursiveMenu.vue';

let projStore = useProjStore();
const layoutStore = useLayoutStore();
const activeIndex = ref('2');

const leftMenuItems = [
  {
    index: 'todo',
    title: 'todo',
    icon: 'WarningFilled'
  },
  {
    index: 'doing',
    title: 'doing',
    icon: 'QuestionFilled'
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
      //   children: [
      // {
      //   index: 'Music',
      //   title: 'Music',
      //   icon: 'Headset'
      // }      ,{
      //   index: 'Movie',
      //   title: 'Movie',
      //   icon: 'Film'
      // }]
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
  } else if (key === 'mastodon') {
    router.push({name: key})
    layoutStore.setShowToc(false)
  } else if (key === 'md') {
    projStore.proj = []
    layoutStore.setShowToc(true)
  } else if (key === 'home') {
    router.push('/');
  } else if (key === 'about') {
    const nodeData = {
      name: 'README.md',
      download_url: 'https://raw.githubusercontent.com/LesslsMore/lesslsmore/refs/heads/main/README.md'
    }

    // router.push('/about');

    router.push({
      name: 'md',
      query: {
        name: nodeData.name.slice(0, -3),
        url: nodeData.download_url
      }
    });
    
    layoutStore.setShowToc(true)
  } else if (['Music', 'Movie', 'Book', 'Game', 'TV'].includes(key)) {
    router.push({
      path: "/list",
      query: { type: key },
    });
  } 
  // else {
  //   projStore.proj = []
  //   layoutStore.setShowToc(false)
  // }
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