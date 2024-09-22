<template>
  <!-- 准备一个容器用来存放音乐播放器 -->
  <canvas id=canvas></canvas>
</template>
<script setup>




// import { Application } from '@pixi/app';
// import { Ticker } from '@pixi/ticker';
// import { InteractionManager } from '@pixi/interaction';
// import { Live2DModel } from 'pixi-live2d-display';

// // 为 Live2DModel 注册 Ticker
// Live2DModel.registerTicker(Ticker);

// // 为 Application 注册 Ticker
// Application.registerPlugin(TickerPlugin);

// // 注册 InteractionManager 以支持 Live2D 模型的自动交互
// Renderer.registerPlugin('interaction', InteractionManager);

// (async function () {
//     const app = new Application({
//         view: document.getElementById('canvas'),
//     });

//     const model = await Live2DModel.from(cubism2Model);

//     app.stage.addChild(model);
// })();

import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

// 将 PIXI 暴露到 window 上，这样插件就可以通过 window.PIXI.Ticker 来自动更新模型
window.PIXI = PIXI;

import { onMounted } from 'vue'
onMounted(() => {
  const cubism2Model =
  "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json";
const cubism4Model =
  "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json";

  async function main() {
    const app = new PIXI.Application({
      view: document.getElementById("canvas"),
      autoStart: true,
      resizeTo: window
    });

    const model2 = await Live2DModel.from(cubism2Model);
    const model4 = await Live2DModel.from(cubism4Model);

    app.stage.addChild(model2);
    app.stage.addChild(model4);

    model2.scale.set(0.3);
    model4.scale.set(0.25);

    model4.x = 300;
    console.log('test')
  }
  main()

})


</script>
