// 创建一个路由器，并暴露出去

// 第一步：引入createRouter
import { createRouter, createWebHistory } from 'vue-router'
// 引入一个一个可能要呈现组件
// import Home from '@/components/Home.vue'
// import News from '@/components/News.vue'
// import About from '@/components/About.vue'

//引入组件
import MybatisList from '@/components/bili/MybatisList.vue'
import LocalMusic from '@/components/music/LocalMusic.vue'
import Meting from '@/components/music/Meting.vue'

import Douban from '@/components/media/Douban.vue'
import Neodb from '@/components/media/Neodb.vue'

// import Tabs from '@/layout/Tabs.vue'

// 第二步：创建路由器
const router = createRouter({
  history: createWebHistory(), //路由器的工作模式（稍后讲解）
  routes: [ //一个一个的路由规则
    {
      path: '/bili',
      component: MybatisList
    },
    {
      path: '/meting',
      component: Meting
    },
    {
      path: '/music',
      component: LocalMusic
    },
    {
      path: '/douban',
      component: Douban
    },
    {
      path: '/neodb',
      component: Neodb
    },

    // {
    // 	path:'/tabs',
    // 	component:Tabs
    // }
  ]
})

// 暴露出去router
export default router
