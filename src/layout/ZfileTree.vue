<template>
    <el-tree
        :data="treeData"
        :props="defaultProps"
        :lazy="true"
        :load="loadNode"
        @node-click="handleNodeClick"
    >
    </el-tree>
</template>
<script setup>
import {useRouter} from "vue-router";

import {onMounted, ref} from "vue";

import {loadFileListReq} from "@/api/zfile";

const router = useRouter()

const defaultProps = {
  children: 'children',
  label: getLabel,
  isLeaf: (data) => data.type === "FILE", // 判断是否叶子节点
}

function getLabel(data) {
  if (data.type === "FILE") {
    return data.name.split('.')[0]
  } else {
    return data.name
  }
}

const treeData = ref([]);
const fetchTreeData = async (path) => {
  try {
    const response = await loadFileListReqFun(path);
    treeData.value = response.data.files;
    console.log(treeData.value)
  } catch (error) {
    console.error('Error fetching tree data:', error);
  }
};

async function loadFileListReqFun(path) {
  let param = {
    "storageKey": "e",
    "path": path,
    "password": "",
    "orderBy": "name",
    "orderDirection": "asc"
  }
  const response = await loadFileListReq(param)
  return response.data;
}

// 点击节点事件
const handleNodeClick = (nodeData, node) => {
  console.log("点击节点：", nodeData);

  if (nodeData.type === 'FOLDER') {
    // 如果节点已经加载过子节点，则不重复加载
    if (nodeData.children !== undefined) {
      return;
    }
    console.log(nodeData.path)

    loadFileListReqFun(nodeData.path + '/' + nodeData.name).then((response) => {
      console.log(response)
      nodeData.children = response.data.files;
    }).catch((error) => {
      console.error("加载子节点失败：", error);
    });
  } else if (nodeData.type === 'FILE') {
    // 如果是文件，则打开文件
    console.log("打开文件：", nodeData.url);
    router.push({
      name: 'md',
      query: {
        title: nodeData.name.split('.')[0],
        // filePath: nodeData.path + '/' + nodeData.name,
        url: nodeData.url
      }
    });

  }
};

onMounted(() => {
  // fetchTreeData("/T")
  fetchTreeData("/T/Documents/VSCode/0-md/0-blog")

});
</script>
