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

  </div>
</template>

<script setup name="App">
import Head from "@/layout/Head.vue"
import Left from "@/layout/Left.vue"
import Body from "@/layout/Body.vue";
import Right from "@/layout/Right.vue";
import Foot from "@/layout/Foot.vue"
</script>

<style scoped lang="scss">
//.layout_container {
//  width: 100%;
//  height: 100vh;
//}
</style>
