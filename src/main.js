import './assets/main.css'
import '@/assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router.js'


const app = createApp(App)

app
.use(Router)
.mount('#app')
