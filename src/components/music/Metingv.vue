<template>
    <div id="app">
        <!-- 准备一个容器用来存放音乐播放器 -->
        <div id="aplayer"></div>
    </div>
</template>

<script setup>
// import APlayer from "APlayer"; // 引入音乐插件
// import "APlayer/dist/APlayer.min.css"; // 引入音乐插件的样式
import { onMounted, watch, toRefs} from "vue";



// onMounted(() => {
//     parse()
// })


let props = defineProps(['server', 'type', 'id', 'fixed'])

console.log(props)

let { server, type, id, fixed } = toRefs(props)

console.log(server, type, id, fixed)

watch(
    id,
    async (val) => {
        console.log(val)
        parse()
    },
    // { immediate: true }
)

const api = 'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r'

let ap

async function parse() {
    let parms = {
        server: server?.value,
        id: id?.value,
    }

    let key = JSON.stringify(parms)

    console.log(key)

    let val = localStorage.getItem(key)
    let result
    // console.log(val)
    if (val != null) {
        result = JSON.parse(val)

    } else {
        let url = api
            .replace(':server', server?.value)
            .replace(':type', type?.value)
            .replace(':id', id?.value)
            //   .replace(':auth', this.meta.auth)
            .replace(':r', Math.random())

        result = await fetch(url)
            .then(res => res.json())
            .then(result => result)

        localStorage.setItem(key, JSON.stringify(result))
        console.log('setItem...')
    }
    console.log(result)

    newPlayer(result)

    // if (ap === undefined) {
    //     ap = newPlayer(result)
    //     console.log('newPlayer...')
    // } else {
    //     loadPlayer(result, ap)
    //     console.log('loadPlayer...')
    // }


}

function newPlayer(data) {
    let defaultOption = {
        audio: data,
        mutex: true,
        lrcType: 3,
        storageName: 'metingjs'
    }

    if (!data.length) return

    let container = document.getElementById("aplayer")

    console.log('container: ',container)

    let options = {
        ...defaultOption,
        fixed,
        container,
    }



    let ap = new APlayer(options)
    return ap
}

function loadPlayer(data, ap) {
    ap.audio = data
}

</script>

<style scoped>

</style>
