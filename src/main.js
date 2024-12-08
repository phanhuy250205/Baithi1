import { createApp } from 'vue'
import { createPinia } from 'pinia'  // Thêm dòng này
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
const pinia = createPinia()  // Thêm dòng này

app.use(pinia)  // Thêm dòng này trước khi use router
app.use(router)

app.mount('#app')