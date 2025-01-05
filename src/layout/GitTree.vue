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

import {loadFileListReq} from "@/api/github";

const router = useRouter()

const defaultProps = {
  children: 'children',
  label: getLabel,
  isLeaf: (data) => data.type === "file", // 判断是否叶子节点
}

let data = {
  owner: 'LesslsMore',
  repo: 'blog',
  path: '',
  ref:  'master'
}

function getLabel(data) {
  if (data.type === "file") {
    return data.name.slice(0, -3)
  } else {
    return data.name
  }
}

const treeData = ref([]);
const fetchTreeData = async (data) => {
  try {
    const response = await loadFileListReq(data);
    console.log(response)
    treeData.value = response.data;
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

  if (nodeData.type === 'dir') {
    // 如果节点已经加载过子节点，则不重复加载
    if (nodeData.children !== undefined) {
      return;
    }
    console.log(nodeData.path)
    data.path = nodeData.path
    loadFileListReq(data).then((response) => {
      console.log(response)
      nodeData.children = response.data;
    }).catch((error) => {
      console.error("加载子节点失败：", error);
    });

  } else if (nodeData.type === 'file') {
    // 如果是文件，则打开文件
    console.log("打开文件：", nodeData.url);
    router.push({
      name: 'md',
      query: {
        title: nodeData.name.slice(0, -3),
        url: nodeData.download_url
      }
    });

  }
};

onMounted(() => {
  // fetchTreeData("/T")
  fetchTreeData(data)

});
</script>
