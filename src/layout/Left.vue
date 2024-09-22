<template>
  <div class="layout_left">
    <!--    <el-menu-->
    <!--        :default-active="activeIndex"-->
    <!--        class="el-menu-demo"-->
    <!--        @select="handleSelect"-->
    <!--        router-->
    <!--    >-->
    <!--    </el-menu>-->

    <el-tree
        style="max-width: 600px"
        default-expand-all
        :data="projStore.proj"
        :props="defaultProps"
        @node-click="handleNodeClick"
    >
    </el-tree>
  </div>
</template>
<script setup name="Left">
import {useRouter} from "vue-router";

import {ref} from "vue";
import useProjStore from '@/stores/proj';

let projStore = useProjStore();

const router = useRouter()
const handleNodeClick = (data, node) => {
  // console.log(data,b,c,d)
  // getPath(node)
  console.log(node.data.name);
  router.push({name: node.data.name})
}

function getPath(node) {
  console.log(node)
  console.log(node.parent.data instanceof Array)
  if (node.parent.data instanceof Array) {
    return node.data.path

  } else {
    return getPath(node.parent) + '/' + node.data.path
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

<style scoped lang="scss">
.layout_left {
  position: absolute;
  width: $base-menu-width;
  height: 100vh;
  top: $base-tabbar-height;
  background: #d1dbe5;

  .scrollbar {
    width: 100%;
    height: calc(100vh - $base-menu-logo-height);
  }
}
</style>
