import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'

import App from './App.vue'
//npm install vue-router@next
import router from "@/router/router.js"
//npm install vuex@next
// import store from "@/store"

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
