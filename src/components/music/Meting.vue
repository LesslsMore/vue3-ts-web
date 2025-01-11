<template>
    <div class="flex flex-wrap gap-4 items-center">

        <el-select v-model="server" placeholder="选择音乐" filterable default-first-option size="large" style="width: 240px">
            <el-option v-for="item, idx in servers" :key="idx" :label="item" :value="item" />
        </el-select>
        <br/>
        <el-input v-model="uid" style="width: 240px" placeholder="输入账号" />
        <br/>
        <el-button type="primary" @click="getSongList()">获取歌单</el-button>
        <br/>
        <el-select v-model="list_id" placeholder="选择歌单" filterable default-first-option size="large" style="width: 240px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <!-- <h3>tencent</h3>
        <el-select v-model="value_t" placeholder="Select" style="width: 240px">
            <el-option v-for="item in options_t" :key="item.value" :label="item.label" :value="item.value" />
        </el-select> -->
    </div>
    <Metingv :server="server" type="playlist" :id="list_id" fixed="true"></Metingv>
    <!-- <Metingv v-if="value_t" server="tencent" type="playlist" :id="value_t" fixed="true"></Metingv> -->
</template>



<script setup>
import netease from '@/api/music/netease'
// import tencent from '@/api/music/tencent'

import { onMounted, ref, watch } from 'vue';
import Metingv from './Metingv.vue';

let list_id = ref('')

let uid = ref(import.meta.env.VITE_netease_uid)
// let value_t = ref('')

// watch(value_n, (val)=>{
//     console.log(val)
// })




let server = ref('netease')
let servers = ref([
    'netease',
    'tencent'
])

let parms = {
        server: server.value,
        uid: uid.value
    }

let options = ref([])

let val = localStorage.getItem(JSON.stringify(parms))

if (val != null) {
    options.value = JSON.parse(val)
    list_id.value = options.value[0].value
}



const getSongList = async () => {

    parms = {
        server: server.value,
        uid: uid.value
    }

    let songlist = await netease(uid.value)
    options.value = songlist.map(el => {
        let value = el.id
        let label = el.name
        return {
            value, label
        }
    })

    console.log(options.value)
    localStorage.setItem(JSON.stringify(parms), JSON.stringify(options.value))
}

// onMounted(async () => {
//     let songlist = await netease(input.value)
//     options.value = songlist.map(el => {
//         let value = el.id
//         let label = el.name
//         return {
//             value,label
//         }
//     })
//     console.log(options.value)

//     // let songlist_t = await tencent('995083162')
//     // options_t.value = songlist_t.map(el => {
//     //     let value = el.id
//     //     let label = el.name
//     //     return {
//     //         value,label
//     //     }
//     // })
//     // console.log(options_t.value)
// })

</script>
