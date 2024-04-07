<template>
<!--  <el-upload>-->
<!--    <el-button type="primary">Click to upload</el-button>-->
<!--  </el-upload>-->
    <el-input v-model="server_url" style="width: 240px" placeholder="server_url" />
    <el-button type="primary" @click="setUrl()">setUrl</el-button>
    <el-input v-model="scan_path" style="width: 240px" placeholder="scan_path" />
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
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
  />
  <!-- 准备一个容器用来存放音乐播放器 -->
  <div id="aplayer"></div>

</template>
<script>
  import { defineComponent } from 'vue'
  import API from '@/api/music/api.js'

  import { orderBy } from 'lodash-es'
  import {useRouter} from "vue-router";
  import {ElTree} from "element-plus";

  let server_url = 'http://localhost:8088'
  server_url = 'http://192.168.1.2:8088'

  export default defineComponent({
    components: {
      ElTree,
    },
    setup() {
      return {
        // store: useMainStore(),
        router: useRouter(),
        // auth: useAuth(),
      }
    },
    mounted() {
      console.log('mounted')
      this.ap = new APlayer({
        container: document.getElementById("aplayer"),
        audio: this.audio, // 音乐信息
        ...this.info, // 其他配置信息
      });

    },
    beforeCreate() {
      console.log('beforeCreate')
      this.api = new API(server_url)

      console.log(this.api)
      console.log(this.server_url)
    },
    created() {
      console.log('created')
      this.api = new API(this.server_url)

      console.log(this.api)
      console.log(this.server_url)
    },
    beforeMount() {
      console.log('beforeMount')
      this.api = new API(this.server_url)

      console.log(this.api)
      console.log(this.server_url)
    },
    props: {
      path: { type: []}
    },
    data() {
      return {
        // server_url: 'http://localhost:8088',
        server_url: 'http://192.168.1.2:8088',
        scan_path:'E:\\T\\Music',
        form:{
          instFilePics:[],
          instFile:[]
        },
        items: [],
        defaultProps: {
          // children: 'directories',
          label: 'file',
        },
        info: {
          lrcType: 1,
          fixed: true, // 不开启吸底模式
          // listFolded: true, // 折叠歌曲列表
          listFolded: false,
          autoplay: true, // 开启自动播放
          preload: "auto", // 自动预加载歌曲
          loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
          order: "list", //  播放模式，list列表播放, random随机播放
        },
        audio: [],
      }
    },
    computed: {
      isPlaying() {
        // return this.$store.getters['player/isPlaying']
      },
      playingTrackId(){
        // return this.$store.getters['player/trackId']
      },
    },
    watch: {
      path: {
        immediate: true,
        async handler(paths) {
          console.log(paths)
          console.log(this.api)
          let rsp = await this.api.getOrScanFolds(paths)

          this.items = rsp.data
          // res.data[0].path

          rsp = await this.api.getOrScanSongs(paths)
          let audio = rsp.data.map(({name, artist, url, lrc, cover}) => {
            return {
              name,
              artist,
              url: this.server_url + '/music' + url,
              lrc,
              cover
            }
          })
          console.log(audio)
          this.ap.list.clear()
          this.ap.list.add(audio)
        }
      }
    },
    methods: {
      handleClick() {
        this.$nextTick(() => {
          const Ele = document.querySelector(".el-upload__input");
          Ele["webkitdirectory"] = true;
        });

        console.log('tim')
      },
      async setPath() {
        console.log(this.scan_path)
        let rsp = await this.api.setPath(this.scan_path)
        console.log(rsp)
        // await Api.post_scan()
      },
      async setUrl() {

      },
      async playNow() {
        // return this.$store.dispatch('player/playNow', {
        //   tracks: this.item!.tracks,
        // })
      },
      async shuffleNow() {
        // return this.$store.dispatch('player/shuffleNow', {
        //   tracks: this.item!.tracks,
        // })
      },
      handleNodeClick(data) {
        console.log(data.path)
        // const path = this.path.length === 0 ? id : [...this.path, id].join('/')
        // console.log(this.path)
        this.router.push({ path: `/music/${data.path}` })
      },
      openDirectory(id) {
        const path = this.path === '' ? id : [this.path, id].join('/')
        this.router.push({ path: `/files/${path}` })
      },
      openParent() {
        const path = this.path.split('/').slice(0, -1).join('/')
        this.router.push({ path: `/files/${path}` })
      },
    }
  })
</script>
