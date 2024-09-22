<template>
  <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".html" @change="importFile">
  <el-button type="primary" :icon="Download" size="mini" @click="exportFile">导出</el-button>

<!--  <el-tree-v2-->
<!--      style="max-width: 600px"-->
<!--      :data="data"-->
<!--      :props="props"-->
<!--      :filter-method="filterMethod"-->
<!--      :height="600"-->
<!--      @node-click="handleNodeClick" />-->

  <el-tree
      style="max-width: 600px"
      :data="data"
      :props="props"
      @node-click="handleNodeClick"
  >
    <template #default="{ node, data }">
          <a :href="node.data.href" target="_blank">
            <img :src="node.data.icon">
            {{ node.data.text }}
          </a>
    </template>
  </el-tree>
</template>



<script setup>

import {Download} from "@element-plus/icons-vue";
import {ref} from "vue";

let data = ref([])

const props = {
  value: 'href',
  label: 'text',
  children: 'children',
}

function handleNodeClick(TreeNodeData, TreeNode) {
  console.log(TreeNodeData)
  console.log(TreeNode)
}

function importFile(e) {
  const files = e.target.files
  const rawFile = files[0] // only use files[0]
  if (!rawFile) return
  console.log(rawFile)

  if (rawFile && rawFile.type === 'text/html') {
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      // console.log(content)

      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      let dl = doc.querySelector("dl")
// console.log(doc)
      let res = getDoc(dl)
      console.log(res)
      data.value = res
    };
    reader.readAsText(rawFile);
  }
}

function getDoc(dl) {
  let res = []
  dl.childNodes.forEach(node => {
    if (node.tagName === 'DT') {
      if (node.childElementCount === 1) {
        // 文件
        let a = node.children[0]
        let href = a.href
        let text = a.textContent
        let add_date = a.getAttribute('add_date')
        let icon = a.getAttribute('icon')
        res.push({
          text,
          href,
          icon,
          add_date,
        })

      } else if (node.childElementCount === 3) {
        // 文件夹
        let h3 = node.children[0]
        let add_date = h3.getAttribute('add_date')
        let last_modified = h3.getAttribute('last_modified')
        let text = h3.textContent

        let dl = node.children[1]
        let res_r = getDoc(dl)
        res.push({
          text,
          add_date,
          last_modified,
          children: res_r,
        })
      }
    }
  })
  return res
}

function exportFile() {

}
</script>
