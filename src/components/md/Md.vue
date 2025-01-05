<template>
  <!--  <el-scrollbar>-->
  <!--    <el-card>-->
  <!--      <template #header>-->
  <!--        <div class="card-header">-->
  <!--          <span>-->
  <!--            <h1>{{ title }}</h1>-->
  <!--          </span>-->
  <!--        </div>-->
  <!--      </template>-->
  <!--      <div v-html="content"></div>-->
  <!--      <template #footer>-->
  <!--        <div class="copyright">©2020 - 2025 By Less ls More.</div>-->
  <!--      </template>-->
  <!--    </el-card>-->
  <!--  </el-scrollbar>-->

  <div class="app-container">
    <div>
      <h1>{{ title }}</h1>
    </div>

    <div v-html="content"></div>
    <!-- <div>
        {{ content }}
    </div> -->

  </div>

</template>

<script setup>
import {onMounted, onUpdated, ref} from "vue";
import {markdownParser, updateMathjax} from "./utils/helper";
import {useRoute} from "vue-router";
import {getFile} from "@/api/github";
import {provide} from "vue";

// import throttle from "lodash.throttle";

const THROTTLE_MATHJAX_TIME = 1500;
let content = ref('')
let title = ref('')
let toc = ref(''); // Add a ref for TOC
// let handleUpdateMathjax = throttle(updateMathjax, THROTTLE_MATHJAX_TIME);

onMounted(() => {
  try {
    updateMathjax()
    updateMd()
  } catch (e) {
    console.log(e);
  }

  // // console.log('挂载完毕')
  // if (pluginCenter.mathjax) {
  //     handleUpdateMathjax();
  // }
})

const route = useRoute()

function updateMd() {
  console.log(route)

  title.value = route.query.title
  let url = route.query.url
  console.log(url)
  // url = 'https://raw.githubusercontent.com/LesslsMore/blog/master/20240702【油猴脚本】动漫网站弹幕播放.md'
  // url = 'https://raw.githubusercontent.com/LesslsMore/blog/refs/heads/master/%E6%9C%BA%E5%99%A8%E8%A7%86%E8%A7%89/20201028%20%E4%B8%89%E7%BB%B4%E6%97%8B%E8%BD%AC%E7%9F%A9%E9%98%B5%EF%BC%9B%E4%B8%9C%E5%8C%97%E5%A4%A9%E5%9D%90%E6%A0%87%E7%B3%BB(ENU)%EF%BC%9B%E5%9C%B0%E5%BF%83%E5%9C%B0%E5%9B%BA%E5%9D%90%E6%A0%87%E7%B3%BB(ECEF)%EF%BC%9B%E7%BB%8F%E7%BA%AC%E5%BA%A6%E5%AF%B9%E5%BA%94%E5%9C%86%E5%BC%A7%E8%B7%9D%E7%A6%BB.md'
  getFile(url).then(res => {
    // console.log(res.data)

    const parseHtml = markdownParser.render(res.data)
    // console.log(parseHtml)
    content.value = parseHtml

    // let tocc = res.data.match(/^\[toc\]/im)
    // console.log('toc: ', tocc)
    // toc.value = markdownParser.render(tocc); // Extract TOC

    // console.log('toc: ', toc.value)
  })
}

onUpdated(() => {
  try {
    updateMathjax()
    updateMd()
  } catch (e) {
    console.log(e);
  }
})

provide('toc', toc); // Provide the TOC to child components

async function handleClick(e) {
  const files = e.target.files
  const rawFile = files[0] // only use files[0]
  if (!rawFile) return
  // console.log(rawFile)
  await upload(rawFile)
}


async function upload(file) {
  try {
    // console.log(dbFile)

    // modal.open('正在恢复数据库。请不要关闭当前窗口');
    // let storage = new Storage();
    let str = await file.arrayBuffer()
    let buffer = new Uint8Array(str);
    // console.log(str)
    // console.log(buffer)


    let string = new TextDecoder().decode(buffer);

    console.log(string)

    const parseHtml = markdownParser.render(string)

    console.log(parseHtml)
    content.value = parseHtml

    // const workbook = new ExcelJS.Workbook();
    // const worksheet = await workbook.xlsx.load(buffer);

    // let worksheets = worksheet.worksheets

    // let excel = {}

    // worksheets.forEach(sheet => {
    //     if (sheet.rowCount > 1) {
    //         excel[sheet.name] = get_json_by_sheet(sheet)
    //     }
    // })

    // console.log(excel)

    // for (let key in excel) {
    //     console.log(key)
    //     let rows = excel[key]
    //     for (let i = 0; i < rows.length; i++) {
    //         // console.log(rows[i])
    //         await db.douban.put(rows[i])
    //     }
    // }

  } catch (msg) {
    alert(msg);
  } finally {
    // modal.close();
  }
}

</script>
