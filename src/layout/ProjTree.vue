<template>
    <el-tree
        style="max-width: 600px"
        default-expand-all
        :data="projStore.proj"
        :props="defaultProps"
        @node-click="handleNodeClick"
    >
    </el-tree>
</template>
<script setup>
import {useRouter} from "vue-router";
import useProjStore from '@/stores/proj';

let projStore = useProjStore();

const router = useRouter()
const handleNodeClick = (data, node) => {
  if (node.data.name === 'politics') {
    router.push({
      name: 'politics',
      params: {
        url: encodeURIComponent('https://politiscales.party/')
      }
    })
  } else if (node.data.name === 'mbti') {
    router.push({
      name: 'mbti',
      params: {
        url: encodeURIComponent('https://www.16personalities.com/ch/%E4%BA%BA%E6%A0%BC%E6%B5%8B%E8%AF%95')
      }
    })
  } else {
    router.push({name: node.data.name})
  }
}

const defaultProps = {
  children: 'children',
  label: getLabel,
}

function getLabel(data, node) {
  // console.log(data, node)
  return data.meta.label
}
</script>
