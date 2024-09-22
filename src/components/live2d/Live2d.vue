<template>
  <!-- 准备一个容器用来存放音乐播放器 -->
  <el-input v-model="server_url" style="width: 240px" placeholder="server_url" />
  <el-button @click="setUrl()">setUrl</el-button>

  <el-button @click="get()">get</el-button>
  <div id="canvas"></div>
  <el-tree-v2 ref="treeRef" style="max-width: 600px" :data="data" :props="props" :filter-method="filterMethod"
    :height="600" @node-click="handleNodeClick" />

  <!-- <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
  </el-table> -->
  <v-list-item v-for="(file) in tableData" :key="file" color="primary">
    <v-list-item-content>
      <el-button @click="openfile(file)">{{ file }}</el-button>
    </v-list-item-content>
  </v-list-item>


</template>
<script setup>
import { loadOml2d } from 'oh-my-live2d';
import { getFileURL, getRootNodes, loadRootNode } from './data';
import { onMounted, onBeforeMount, ref, watch, toRaw } from 'vue'
// import type { TreeNode } from './data';




let data = ref([])

let mods = getRootNodes()
data.value = mods
const props = {
  value: 'id',
  label: 'name',
  children: 'children',
}

function handleNodeClick(TreeNodeData, TreeNode) {
  // console.log(TreeNode.parent.data.name) 递归获取
  // console.log(TreeNodeData)
  // console.log(TreeNode)
  tableData.value = TreeNodeData.files
  // // path.value = data.name
  TreeNode_p.value = TreeNode
  TreeNodeData_n.value = TreeNodeData.name
  // activeFolder.value = TreeNodeData
}

let TreeNodeData_n = ref()
let TreeNode_p = ref()
const tableData = ref([])
let path = ref()

let oml2d

function openfile(file) {
  oml2d = undefined
  // console.log(TreeNode_p.value, TreeNodeData_n.value, file)
  const file_url = getFileURL_my(TreeNode_p.value, file)

  console.log(file_url)
  // oml2d = loadOml2d({
  //     models: [
  //       {
  //         path: file_url
  //       }
  //     ]
  //   });

}


const JSDELIVR_PREFIX = 'https://cdn.jsdelivr.net/gh/';

function getFileURL_my(TreeNode, file) {
  const folderPath = getTreeNodePath(TreeNode, '');
  // console.log(folderPath)
  if (folderPath) {
    let filePath = encodeURI(folderPath + file);
    return JSDELIVR_PREFIX + filePath;
  }
}

function getTreeNodePath(TreeNode, path) {
  if (TreeNode.parent === undefined) {
    return TreeNode.label + '/' + path
  } else {
    return getTreeNodePath(TreeNode.parent, TreeNode.label + '/' + path)
  }
}

// const url = 'https://cdn.jsdelivr.net/gh';
const url = 'http://localhost:5173/api'

let server_url = ref('')

function setUrl() {
  console.log(server_url.value)
  loadOml2d({
    models: [
      {
        path: server_url.value
      }
    ]
  });
}

function get() {
  let paths = []
  console.log(mods)
  getAllMod(mods)
  // getAllNode(data.value, '', paths)

  let paths_j = paths.filter(path => path.endsWith('.json') && path.includes('碧蓝航线'))

  let opt = paths_j.map(path => {
    return { path }
  })

  paths_j.forEach(path => console.log(path))

  function getAllMod(nodes) {
    nodes.forEach(node => getAllNode(node, url, paths))
  }

  function getAllNode(node, path, paths) {
    // console.log(node)
    if (node.files === undefined) {
      if (node.children) {
        console.log(node.children)
        node.children.forEach(child => {

          getAllNode(child, path + '/' + node.name, paths)
        })
      }
    } else {
      // console.log(path)
      let files = []
      // console.log(node)
      node.files.forEach(file => files.push(path + '/' + node.name + '/' + file))
      // console.log(files)
      paths.push(...files)
      // console.log(paths)
    }
  }

  loadOml2d({
    models: opt
  });
}

// {
//       path: 'https://cdn.jsdelivr.net/gh/LesslsMore/live2d-model@master/AzurLane-火奴鲁鲁【盛夏的“灾难”？】互动版/2389297294.model3.json'
//     },
//     {
//       path: 'https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/碧蓝航线%20Azue%20Lane/Azue%20Lane(JP)/huonululu_3/huonululu_3.model3.json'
//     }




const cubism2Model =
  "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json";
const cubism4Model =
  "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json";

(async function main() {
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    resizeTo: window
  });

  const model2 = await PIXI.live2d.Live2DModel.from(cubism2Model);
  const model4 = await PIXI.live2d.Live2DModel.from(cubism4Model);

  app.stage.addChild(model2);
  app.stage.addChild(model4);

  model2.scale.set(0.3);
  model4.scale.set(0.25);

  model4.x = 300;
})();

</script>
