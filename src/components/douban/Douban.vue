<template>
    <div class="app-container">
        <!-- <MybatisList/> -->
        <IndexeddbList/>
    </div>

  <br/>
  <RouterLink to="/douban/tabs">tabs</RouterLink>&nbsp;&nbsp;
  <RouterView></RouterView>
</template>

<script setup>
// import MybatisList from '@/components/bili/MybatisList.vue'
import IndexeddbList from '@/components/douban/IndexeddbList.vue'
</script>