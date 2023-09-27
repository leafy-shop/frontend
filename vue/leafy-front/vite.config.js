import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    base: "/pl4",
    proxy: {
      '/api':{
        // target: 'http://intproj21.sit.kmutt.ac.th',
        target: 'http://capstone23.sit.kmutt.ac.th:5000',
        changeOrigin:true,
        secure:false,
        // rewrite:  (path)=>path.replace(/^\/api/,'')
      },
    },
  },
});