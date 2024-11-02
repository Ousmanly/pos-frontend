// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "vue-toastification/dist/index.css";
import { createI18n } from 'vue-i18n';
// import 'vue-toastification/dist/indec'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import { createI18n } from 'vue-i18n';
const app = createApp(App)

const i18n = createI18n({
  locale: 'en', 
  fallbackLocale: 'en', 
  messages: {
    en,
    fr,
    ar
  }
});

app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(Toast, {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true
  });
app.mount('#app')
