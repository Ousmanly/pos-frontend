// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "vue-toastification/dist/index.css";
// import 'vue-toastification/dist/indec'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
    position: "top-right",
    timeout: 1000,
    closeOnClick: true
  });
app.mount('#app')
