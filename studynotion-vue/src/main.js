import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'

// Import styles
import './assets/styles/main.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

// Setup Pinia store
const pinia = createPinia()
app.use(pinia)

// Setup router
app.use(router)

// Setup toast notifications
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true
})

app.mount('#app')