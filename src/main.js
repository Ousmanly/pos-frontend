// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "vue-toastification/dist/index.css";
// import 'vue-toastification/dist/indec'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n';
// import axios from 'axios';

import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
// import { createI18n } from 'vue-i18n';
import fr from './locale/fr.json'
import en from './locale/en.json'
import ar from './locale/ar.json'
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


// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3005/api/', // Remplacez par l'URL de votre API
// });

// Intercepteur Axios pour gérer le renouvellement du token
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Vérifiez si l'erreur est due à un token expiré (exemple : 401 Unauthorized)
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Marquez la requête comme réessayée
//       const store = usePosStore(); // Accédez au store
//       await store.refreshToken(); // Renouvelle le token
//       return axiosInstance(originalRequest); // Réessayez la requête originale avec le nouveau token
//     }

//     return Promise.reject(error);
//   }
// );

// Ajoutez l'instance Axios aux propriétés globales de Vue
// app.config.globalProperties.$http = axiosInstance;

app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(Toast, {
    position: "top-right",
    timeout: 1000,
    closeOnClick: true
  });
app.mount('#app')
