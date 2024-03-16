// 引入createApp用于创建应用
import {createApp} from 'vue'
// 引入App根组件
import App from './App.vue'
// 引入路由器
// import router from './router'
import router from "@/router";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 创建一个应用
const app = createApp(App)

app.use(ElementPlus)
// 使用路由器
app.use(router)
// 挂载整个应用到app容器中
app.mount('#app')