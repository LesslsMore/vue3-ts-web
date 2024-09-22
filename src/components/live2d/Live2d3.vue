<template>
  <el-select v-model="model" placeholder="选择模型" filterable default-first-option size="large" style="width: 240px">
    <el-option v-for="item, idx in servers" :key="idx" :label="item" :value="item"/>
  </el-select>
  <el-button type="primary" @click="showModel()">显示模型</el-button>
  <canvas id=canvas></canvas>
</template>

<script setup>
import {ref} from "vue";
import * as PIXI from "pixi.js";
import {Live2DModel} from "pixi-live2d-display";
// console.log(__MODEL_URL__)
let servers = ref(__MODEL_URL__)
let model = ref(__MODEL_URL__[0])

function showModel() {
  console.log(model.value)
  live2d(model.value)
}

async function live2d(cubism4Model) {
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    resizeTo: window
  });

  // const model2 = await Live2DModel.from(cubism2Model);
  const model4 = await Live2DModel.from(cubism4Model);

  // app.stage.addChild(model2);
  app.stage.addChild(model4);

  // model2.scale.set(0.3);
  model4.scale.set(0.1);

  // model4.x = 300;
  console.log('test')
}
</script>


