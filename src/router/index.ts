// 创建一个路由器，并暴露出去

// 第一步：引入createRouter
import {createRouter, createWebHistory} from 'vue-router'
// 引入一个一个可能要呈现组件

// 第二步：创建路由器
const router = createRouter({
    history: createWebHistory(), //路由器的工作模式（稍后讲解）
    routes: [ //一个一个的路由规则
        {
            path: '/bili',
            component: () => import('@/components/bili/Bili.vue'),
            children: [
                {
                    path: 'indexed',
                    component: () => import('@/components/bili/IndexeddbList.vue')
                },
                {
                    path: 'mybatis',
                    component: () => import('@/components/bili/MybatisList.vue')
                },
                {
                    path: 'mongo',
                    component: () => import('@/components/bili/MongodbList.vue')
                }
            ]
        },
        {
            path: '/meting',
            component: () => import('@/components/music/Meting.vue')
        },
        {
            path: '/music/:path*',
            // component: LocalMusic
            // component: () => import('@/components/music/Files0.vue'),
            component: () => import('@/components/music/Files.vue'),
            props: true,
        },
        {
            path: '/douban',
            component: () => import('@/components/douban/Douban.vue'),
            children: [
                {
                    path: 'tabs',
                    component: () => import('@/components/douban/Tabs.vue')
                },
            ]
        },
        {
            path: '/neodb',
            component: () => import('@/components/neodb/Neodb.vue'),
            children: [
                {
                    path: 'tabs',
                    component: () => import('@/components/neodb/Tabs.vue')
                },
            ]
        },
        {
            path: '/md',
            component: () => import('@/components/md/Md.vue')
        },
        {
            path: '/live2d',
            component: () => import('@/components/live2d/Live2d.vue')
        },
    ]
})

// 暴露出去router
export default router
