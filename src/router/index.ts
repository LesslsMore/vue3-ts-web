// 创建一个路由器，并暴露出去

// 第一步：引入createRouter
import { createRouter, createWebHistory } from 'vue-router'
// 引入一个一个可能要呈现组件
// import Home from '@/components/Home.vue'
// import News from '@/components/News.vue'
// import About from '@/components/About.vue'

//引入组件
import Files from '@/components/music/Files.vue'
import Meting from '@/components/music/Meting.vue'

import Douban from '@/components/douban/Douban.vue'
import DoubanTabs from '@/components/douban/Tabs.vue'

import Neodb from '@/components/neodb/Neodb.vue'
import Tabs from '@/components/neodb/Tabs.vue'

import Md from '@/components/md/Md.vue'

import Bili from '@/components/bili/Bili.vue'
import IndexeddbList from '@/components/bili/IndexeddbList.vue'
import MybatisList from '@/components/bili/MybatisList.vue'
import MongodbList from '@/components/bili/MongodbList.vue'

// import Tabs from '@/layout/Tabs.vue'

// 第二步：创建路由器
const router = createRouter({
  history: createWebHistory(), //路由器的工作模式（稍后讲解）
  routes: [ //一个一个的路由规则
    {
      path: '/bili',
      component: Bili,
      children: [
        {
          path:'indexed',
          component:IndexeddbList
        },
        {
          path:'mybatis',
          component:MybatisList
        },
        {
          path:'mongo',
          component:MongodbList
        }
      ]
    },
    {
      path: '/meting',
      component: Meting
    },
    {
      path: '/music/:path*',
      // component: LocalMusic
      component: Files,
      props: true,
    },
    {
      path: '/douban',
      component: Douban,
      children: [
        {
          path:'tabs',
          component:DoubanTabs
        },
      ]
    },
    {
      path: '/neodb',
      component: Neodb,
      children: [
        {
          path:'tabs',
          component:Tabs
        },
      ]
    },
    {
      path: '/md',
      component: Md
    },


    // {
    // 	path:'/tabs',
    // 	component:Tabs
    // }
  ]
})

// 暴露出去router
export default router
