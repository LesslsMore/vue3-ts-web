<template>
  <div class="layout_right">
    <el-scrollbar>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>toc</span>
          </div>
        </template>
        <p v-for="o in 5" :key="o" class="text item">{{ 'List item ' + o }}</p>
      </el-card>

      <el-card>
        <template #header>
          <div class="card-header">
            <span>Less ls More.</span>
          </div>
        </template>
        <el-avatar shape="square" :size="100" :src="squareUrl" />
        <template #footer>至繁归于至简。</template>
      </el-card>


    </el-scrollbar>
  </div>


  <!--    <div class="card-widget card-info">-->
<!--      <div class="is-center">-->
<!--        <div class="avatar-img">-->
<!--          <img src="https://avatars.githubusercontent.com/u/39825147?s=400&u=292e2d371c7ee58b695bb70d0b48217525b5b1e0&v=4" onerror="this.onerror=null;this.src='/img/friend_404.gif'" alt="avatar"></div>-->
<!--        <div class="author-info__name">LesslsMore</div>-->
<!--        <div class="author-info__description">至繁归于至简。</div>-->
<!--      </div>-->
<!--      <div class="card-info-data site-data is-center">-->
<!--        <a href="/archives/" data-pjax-state="">-->
<!--          <div class="headline">文章</div>-->
<!--          <div class="length-num">5</div>-->
<!--        </a>-->
<!--        <a href="/tags/" data-pjax-state="">-->
<!--          <div class="headline">标签</div>-->
<!--          <div class="length-num">0</div>-->
<!--        </a><a href="/categories/" data-pjax-state="">-->
<!--        <div class="headline">分类</div>-->
<!--        <div class="length-num">0</div>-->
<!--      </a></div>-->
<!--      <a id="card-info-btn" target="_blank" rel="noopener" href="https://github.com/LesslsMore"><i-->
<!--          class="fab fa-github"></i>-->
<!--        <span>Follow Me</span>-->
<!--      </a>-->

<!--    <div v-html="toc"></div> &lt;!&ndash; Display the TOC &ndash;&gt;-->
</template>

<script setup lang="ts">
import {inject} from "vue";
let squareUrl = "https://avatars.githubusercontent.com/u/39825147?s=400&u=292e2d371c7ee58b695bb70d0b48217525b5b1e0&v=4"
const toc = inject('toc'); // Inject the TOC
</script>

<style scoped lang="scss">
.layout_right {
  position: fixed;
  width: $base-menu-width;
  height: calc(100% - $base-tabbar-height);
  left: calc(100% - $base-menu-width);
  top: $base-tabbar-height;
}
</style>
