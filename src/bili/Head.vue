<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <el-menu-item index="1">storage</el-menu-item>
      <el-menu-item index="2">indexed</el-menu-item>
      <el-menu-item index="3">mongo</el-menu-item>
    </el-menu>
</template>

<script setup name="Head">
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()

const activeIndex = ref('2')
const handleSelect = (key, keyPath) => {
  console.log(router)
  if (key === '1') {
    router.push({name: 'storage'})
  } else if (key === "2") {
    router.push({name: 'indexed'})
  } else if (key === "3") {
    router.push({name: 'mongo'})
  }
  console.log(key, keyPath);
}
</script>

<style scoped lang="scss">
.el-menu-demo {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  width: 100%;
}

.head-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 3;
}

.head-mid {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.head-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 3;
}
</style>