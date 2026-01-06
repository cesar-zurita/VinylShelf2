import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import router from "./router/router.js"
import App from './App.vue'


createApp(App).use(router).use(createPinia()).mount('#app')
