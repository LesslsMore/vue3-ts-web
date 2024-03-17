<template>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".md" @change="handleClick">

    <div class="app-container">
        <div>
            $$\mathit{PRCPTOT_{j} = \sum_{i=1}^{I}RR_{ij}} $$
        </div>
        <div v-html="content"></div>
        <!-- <div>
            {{ content }}
        </div> -->

    </div>
</template>

<script lang="ts" setup>



import { onMounted, onUpdated, ref } from "vue";
import { markdownParser, updateMathjax } from "./utils/helper";

// import throttle from "lodash.throttle";

const THROTTLE_MATHJAX_TIME = 1500;

// let handleUpdateMathjax = throttle(updateMathjax, THROTTLE_MATHJAX_TIME);

onMounted(() => {
    try {


        updateMathjax()


    } catch (e) {
        console.log(e);
    }
})



onUpdated(() => {
    updateMathjax()
    // // console.log('更新完毕')
    // if (pluginCenter.mathjax) {
    //     handleUpdateMathjax();
    // }
})

async function handleClick(e) {
    const files = e.target.files
    const rawFile = files[0] // only use files[0]
    if (!rawFile) return
    // console.log(rawFile)
    await upload(rawFile)
}

let content = ref('')

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