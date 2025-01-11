<template>

  <div class="app">
    <!--        <el-scrollbar>-->
    <!--        </el-scrollbar>-->
    <div class="layout_container">
      <Head></Head>
      <Left></Left>
      <Body></Body>
      <Right></Right>
<!--      <Foot></Foot>-->
    </div>

    <!-- 准备一个容器用来存放音乐播放器 -->
    <div id="aplayer"></div>
  </div>

<!--  <div class="common-layout">-->
<!--    <el-container>-->
<!--      <el-header>Header-->
<!--      </el-header>-->
<!--      -->
<!--      <el-container>-->
<!--        <el-aside width="200px">Aside</el-aside>-->
<!--        -->
<!--        <el-container>-->
<!--          <el-main>Main</el-main>-->
<!--          <el-footer>Footer</el-footer>-->
<!--        </el-container>-->
<!--        -->
<!--      </el-container>-->
<!--    </el-container>-->
<!--  </div>-->
</template>

<script setup name="App">
import Head from "@/layout/Head.vue"
import Left from "@/layout/Left.vue"
import Body from "@/layout/Body.vue";
import Right from "@/layout/Right.vue";
import Foot from "@/layout/Foot.vue"
</script>

<style scoped lang="scss">
</style>
