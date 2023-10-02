import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    base: '/pl4/',
    proxy: {
      '/api':{
        // target: 'http://capstone23.sit.kmutt.ac.th',
        target: 'http://10.4.85.30:5000',
        changeOrigin:true,
        secure:false,
        // rewrite:  (path)=>path.replace(/^\/api/,'')
      },
    },
  },
  optimizeDeps: {
    exclude: ['https-proxy-agent']
  }
});