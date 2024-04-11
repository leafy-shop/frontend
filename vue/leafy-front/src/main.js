import { createApp } from 'vue'
import './style.css'
import router from './route'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
