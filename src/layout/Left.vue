<template>
  <div class="layout_left">
    <el-scrollbar>
      <el-card body-style="padding: 0px">
        <div v-if="projStore.proj.length > 0">
          <ProjTree></ProjTree>
        </div>
        <div v-else>
<!--          <ZfileTree></ZfileTree>-->
          <GitTree></GitTree>
        </div>
      </el-card>
    </el-scrollbar>
  </div>
</template>
<script setup>
import useProjStore from '@/stores/proj';
import ProjTree from "@/layout/ProjTree.vue";
import ZfileTree from "@/layout/ZfileTree.vue";
import GitTree from "@/layout/GitTree.vue";

let projStore = useProjStore();

</script>

<style scoped lang="scss">
.layout_left {
  position: fixed;
  width: $base-menu-width;
  height: calc(100% - $base-tabbar-height);
  top: $base-tabbar-height;
}
</style>
