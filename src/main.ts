import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-italia/dist/css/bootstrap-italia.min.css'
import 'bootstrap-italia'

const app = createApp(App)

app.use(router)

app.mount('#app')

