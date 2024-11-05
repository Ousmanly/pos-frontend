<template>
    <div class="reset-password">
      <h2>Définir un nouveau mot de passe</h2>
      <form @submit.prevent="handleResetPassword">
        <input
          type="password"
          v-model="newPassword"
          placeholder="Nouveau mot de passe"
          required
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirmez le mot de passe"
          required
        />
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  import { useToast } from "vue-toastification";
  
  const newPassword = ref('');
  const confirmPassword = ref('');
  const message = ref('');
  const route = useRoute();
  const router = useRouter();
  const toast = useToast();
  
  async function handleResetPassword() {
    if (newPassword.value !== confirmPassword.value) {
      message.value = "Les mots de passe ne correspondent pas.";
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      const token = route.query.token;
      const response = await axios.post('http://localhost:3005/api/reset-password', {
        token,
        newPassword: newPassword.value,
      });
      message.value = response.data.message || "Mot de passe réinitialisé avec succès.";
      toast.success("Mot de passe réinitialisé avec succès !");
      router.push("/");
    } catch (error) {
      message.value = error.response.data.message || "Erreur de réinitialisation.";
      toast.error("Erreur de réinitialisation.");
    }
  }
  </script>
  
  <style scoped>
  /* Ajoute des styles pour l'affichage */
  </style>
  