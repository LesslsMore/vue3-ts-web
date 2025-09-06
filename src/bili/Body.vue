<template>

  <div class="layout_main">
    <el-scrollbar>
      <el-card>


        <RouterView></RouterView>

        <template #footer>
          <div class="copyright">©2020 - 2025 By Less ls More.</div>
        </template>
      </el-card>
    </el-scrollbar>



<!--    <Foot></Foot>-->
  </div>

</template>

<script setup lang="ts">
import {RouterView} from "vue-router";
</script>

<style scoped lang="scss">
.layout_main {
  //border-left: 1px lightgray solid;
  //border-right: 1px lightgray solid;
  //padding: 20px 40px;

  position: absolute;
  width: 100%;
  // width: calc(100% - $base-menu-width * 2);
  height: calc(100% - $base-tabbar-height);

  // left: $base-menu-width;
  // right: $base-menu-width;
  top: $base-tabbar-height;

  //overflow: auto;
  //
  //background-color: white;
}
.el-card {
  //position: absolute;
  //height: 100%
}
.copyright {
  position: relative;
  //bottom: 0;
  //width: 100%;
  //height: $base-tabbar-height;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
