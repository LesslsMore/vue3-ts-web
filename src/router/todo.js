export const todoRoute = [
    {
        path: '/navi',
        name: 'navi',
        meta: {
            label: 'chrome 收藏导航',
        },
        component: () => import('@/components/navi/Navi.vue')
    },
    {
        path: '/webdav',
        name: 'webdav',
        meta: {
            label: 'webdav',
        },
        component: () => import('@/components/webdav/Webdav.vue')
    },
    {
        meta: {
            label: 'cms 视频播放',
        },
    },
    {
        meta: {
            label: 'epub gitboot 电子书',
        },
    },
    {
        meta: {
            label: 'mbti political 测试',
        },
    },
    {
        meta: {
            label: 'midi 钢琴游戏',
        },
    },
    {
        meta: {
            label: 'webgal 4399 游戏',
        },
    },
]
