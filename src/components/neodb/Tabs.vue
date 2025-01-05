<template>
  <div class="container">
    <el-tabs :tab-position="tabPosition" style="height: 100%" class="demo-tabs">
        <el-tab-pane v-for="type, id in supported_types" :key="id" :label="type">
            <Tab :type="type"/>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script setup>
import Tab from "./Tab.vue"
import { ref } from 'vue'

const tabPosition = ref('left')

const supported_types = ['book', 'movie', 'tv', 'music', 'game']


</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column; /* 纵向排列 */
  //height: 100vh; /* 撑满整个视口高度 */
}
</style>
