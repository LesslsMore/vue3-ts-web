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
  // console.log(data,b,c,d)
  // getPath(node)
  console.log(node.data.name);
  router.push({name: node.data.name})
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
