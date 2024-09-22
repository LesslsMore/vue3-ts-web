// 创建一个路由器，并暴露出去

// 第一步：引入createRouter
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import {constantRoute} from "@/router/route";
import {todoRoute} from "@/router/todo";
// 引入一个一个可能要呈现组件

// 第二步：创建路由器
const router = createRouter({
    // history: createWebHistory(), //路由器的工作模式（稍后讲解）
    history: createWebHashHistory(),
    routes: [...constantRoute, ...todoRoute]
})

// 暴露出去router
export default router
