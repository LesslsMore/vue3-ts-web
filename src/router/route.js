export const constantRoute = [ //一个一个的路由规则
    {
        path: '/bili',
        name: 'bili',
        meta: {
            label: 'bili 分段视频搜索',
        },
        component: () => import('@/components/bili/Bili.vue'),
        children: [
            {
                path: 'indexed',
                name: 'indexed',
                meta: {
                    label: 'IndexeddbList',
                },
                component: () => import('@/components/bili/IndexeddbList.vue')
            },
            {
                path: 'mybatis',
                name: 'mybatis',
                meta: {
                    label: 'MybatisList',
                },
                component: () => import('@/components/bili/MybatisList.vue')
            },
            {
                path: 'mongo',
                name: 'mongo',
                meta: {
                    label: 'MongodbList',
                },
                component: () => import('@/components/bili/MongodbList.vue')
            }
        ]
    },
    {
        path: '/meting',
        name: 'meting',
        meta: {
            label: '在线 meting 播放器',
        },
        component: () => import('@/components/music/Meting.vue')
    },
    {
        path: '/music/:path*',
        name: 'music',
        meta: {
            label: '本地 aplayer 播放器',
        },
        // component: LocalMusic
        // component: () => import('@/components/music/Files0.vue'),
        component: () => import('@/components/music/Files.vue'),
        props: true,
    },
    {
        path: '/douban',
        name: 'douban',
        meta: {
            label: 'douban excel 导入',
        },
        component: () => import('@/components/douban/Douban.vue'),
        children: [
            {
                path: 'tabs',
                name: 'douban-tabs',
                meta: {
                    label: 'douban top250 抓取',
                },
                component: () => import('@/components/douban/Tabs.vue')
            },
        ]
    },
    {
        path: '/neodb',
        name: 'neodb',
        meta: {
            label: 'neodb json 导出',
        },
        component: () => import('@/components/neodb/Neodb.vue'),
        children: [
            {
                path: 'tabs',
                name: 'neodb-tabs',
                meta: {
                    label: 'neodb json 显示',
                },
                component: () => import('@/components/neodb/Tabs.vue')
            },
        ]
    },
    {
        path: '/md',
        name: 'md',
        meta: {
            label: 'md 数学公式',
        },
        component: () => import('@/components/md/Md.vue')
    },
    {
        path: '/live2d',
        name: 'live2d',
        meta: {
            label: 'live2d 模型加载',
        },
        component: () => import('@/components/live2d/Live2d.vue')
    },

]


