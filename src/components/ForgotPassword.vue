<template>
    <div class="forgot-password">
      <h2>Réinitialiser le mot de passe</h2>
      <form @submit.prevent="handleForgotPassword">
        <input
          type="email"
          v-model="email"
          placeholder="Entrez votre email"
          required
        />
        <button type="submit">Envoyer le lien de réinitialisation</button>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useToast } from "vue-toastification";
  
  const email = ref('');
  const message = ref('');
  const toast = useToast();
//   console.log("Valeur de l'email :", email.value);
  async function handleForgotPassword() {
    try {
      const response = await axios.post(
        'http://localhost:3005/api/request-password-reset',  
        { email: email.value }
    );
      message.value = response.data.message || "Lien de réinitialisation envoyé.";
      toast.success("Lien de réinitialisation envoyé !");
    } catch (error) {
      message.value = error.response.data.message || "Erreur lors de l'envoi.";
      toast.error("Erreur lors de l'envoi.");
    }
    console.log("Valeur de l'email :", email.value);

  }
  </script>
  
  <style scoped>
  /* Ajoute des styles pour l'affichage */
  </style>
  