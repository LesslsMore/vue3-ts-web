<template>
    <el-button @click="get_items">items</el-button>
    <div id="animation-container"></div>
</template>

<script setup>

import { ref } from "vue"
import anime from 'animejs/lib/anime.es.js';

const supported_types = ['book', 'movie', 'tv', 'music', 'game']
let items = ref([])

function get_items() {
  let val = localStorage.getItem(supported_types[0])

  if (val != null) {
    items.value = JSON.parse(val)
    console.log(items.value.complete)


    const container = document.getElementById('animation-container');

    items.value.complete.forEach((item, index) => {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      // bar.style.width = `${item.rank * 10}px`;
      bar.textContent = `${item.title}. ${item.rating}`;
      container.appendChild(bar);

      anime({
        targets: bar,
        width: '100%',
        easing: 'easeOutQuad',
        duration: 1000 + index * 500
      });
    });
  }
}

</script>
