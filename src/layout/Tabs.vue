<template>
    <!-- <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
        <el-radio-button value="top">top</el-radio-button>
        <el-radio-button value="right">right</el-radio-button>
        <el-radio-button value="bottom">bottom</el-radio-button>
        <el-radio-button value="left">left</el-radio-button>
    </el-radio-group> -->

    <el-tabs :tab-position="tabPosition" style="height: 100%" class="demo-tabs">
        <el-tab-pane label="Bili"><List/></el-tab-pane>
        <el-tab-pane label="Music"><Music/></el-tab-pane>
        <el-tab-pane label="Meting"><Meting/></el-tab-pane>
    </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

// import Search from '@/components/bili/Search.vue'
import List from '@/components/bili/mybatis-plus/list.vue'
import Music from '@/components/localmusic/Music.vue'
import Meting from '@/components/meting/Meting.vue'

const tabPosition = ref('left')
</script>
<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
}
</style>