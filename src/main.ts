// 引入createApp用于创建应用
import { createApp } from 'vue'
// 引入App根组件
import App from './App.vue'
// 引入路由器
// import router from './router'
import router from "@/router";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import hljsVuePlugin from '@highlightjs/vue-plugin';





// 创建一个应用
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


// app.use(hljsVuePlugin);
app.use(ElementPlus)
// 使用路由器
app.use(router)
// 挂载整个应用到app容器中
app.mount('#app')