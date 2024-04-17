//小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia'

import {constantRoute} from "@/router/route.js";

const useProjStore = defineStore('ProjStore', {
    state: () => {
        return {
            proj:constantRoute,
        }
    },
})

export default useProjStore
