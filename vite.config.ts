import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { resolve } from 'path'
import { VitePWA } from 'vite-plugin-pwa'


// https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   rollupOptions: {
  //     external: ['APlayer','APlayer/dist/APlayer.min.css']
  //   }
  // },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        rank: resolve(__dirname, 'page/rank/index.html'),
        bili: resolve(__dirname, 'page/bili/index.html'),
      },
      // output: {
      //   manualChunks: {
      //     // 将大型库单独打包
      //     pdf: ['pdfjs-dist', 'vue-pdf-embed'],
      //   }
      // }
    },
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'Less ls More.',
        short_name: 'lesslsmore',
        description: 'Less ls More.',
        theme_color: '#ffffff',
      },

      workbox: {
        // 将限制提高到 5MB（5 * 1024 * 1024 bytes）
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  //scss全局变量一个配置
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
  define: {
    __SOURCE_REPOSITORIES__: JSON.stringify(require('./scripts/const').repos),
    __MODEL_URL__: require('./script/model.json'),
  },
  server: {
    // port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
 },
})
