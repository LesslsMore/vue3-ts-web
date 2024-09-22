<template>
  <!--  <el-upload>-->
  <!--    <el-button type="primary">Click to upload</el-button>-->
  <!--  </el-upload>-->
  <el-input v-model="server_url" style="width: 240px" placeholder="server_url"/>
  <el-button type="primary" @click="setUrl()">setUrl</el-button>
  <el-input v-model="scan_path" style="width: 240px" placeholder="scan_path"/>
  <el-button type="primary" @click="setPath()">setPath</el-button>

  <!--  <el-input-->
  <!--      v-model="filterText"-->
  <!--      style="width: 240px"-->
  <!--      placeholder="Filter keyword"-->
  <!--  />-->

  <el-tree
      ref="treeRef"
      style="max-width: 600px"
      class="filter-tree"
      :data="items"
      :props="defaultProps"
      default-expand-all
      @node-click="handleNodeClick"
  />
  <!-- 准备一个容器用来存放音乐播放器 -->
  <div id="aplayer"></div>

</template>
<script setup>
import {onMounted, onBeforeMount, ref, watch} from 'vue'
import API from '@/api/music/api.js'
import {useRouter} from "vue-router";
import {ElTree} from "element-plus";

let server_url = ref('http://localhost:8088')
server_url.value = 'http://192.168.1.2:8088'

const router = useRouter()

console.log(router)

let props = defineProps(['path'])

let scan_path = ref('E:\\T\\Music')

let items = ref([])

let audio = ref([])

let defaultProps = {
  label: 'file',
}

let info = {
  lrcType: 1,
  fixed: true, // 不开启吸底模式
  // listFolded: true, // 折叠歌曲列表
  listFolded: false,
  autoplay: true, // 开启自动播放
  preload: "auto", // 自动预加载歌曲
  loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
  order: "list", //  播放模式，list列表播放, random随机播放
}

let ap
let api = new API(server_url.value)

onMounted(() => {
  console.log('mounted')
  ap = new APlayer({
    container: document.getElementById("aplayer"),
    audio: audio, // 音乐信息
    ...info, // 其他配置信息
  });
})

// onBeforeMount(() => {
//   console.log('beforeMount')
//   api = new API(server_url)
//
//   console.log(api)
//   console.log(erver_url)
// })

watch(() => router.currentRoute.value.params.path,
    (newPath, oldPath) => {
      handler(newPath)
    },
    {immediate: true}
);

// watch(path,async (newValue,oldValue)=>{
//   await handler(newValue)
// },{immediate:true})

async function handler(paths) {
  let rsp = await api.getOrScanFolds(paths)

  items.value = rsp.data
  // res.data[0].path

  rsp = await api.getOrScanSongs(paths)
  let audio = rsp.data.map(({name, artist, url, lrc, cover}) => {
    return {
      name,
      artist,
      url: server_url.value + '/music' + url,
      lrc,
      cover
    }
  })
  console.log(audio)
  ap.list.clear()
  ap.list.add(audio)
}

async function setPath() {
  console.log(scan_path)
  let rsp = await api.setPath(scan_path)
  console.log(rsp)
  // await Api.post_scan()
}

function setUrl() {
  console.log(server_url.value)
  api = new API(server_url.value)
}

function handleNodeClick(data) {
  console.log(data.path)
  // const path = this.path.length === 0 ? id : [...this.path, id].join('/')
  // console.log(this.path)
  router.push({path: `/music/${data.path}`})
}

</script>
