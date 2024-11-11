<template>
  <div class="reset-password">
    <form @submit.prevent="handleResetPassword">
      <input
        type="password"
        v-model="oldPassword"
        placeholder="Ancien mot de passe"
        required
      />
      <input
        type="password"
        v-model="newPassword"
        placeholder="Nouveau mot de passe"
        required
      />
      <button type="submit">Confirmer</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from "vue-toastification";

const newPassword = ref('');
const oldPassword = ref('');
const message = ref('');

import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const toast = useToast();

async function handleResetPassword() {
  try {
    await axios.put("http://localhost:3005/api/user/change-password", {
      currentPassword: oldPassword.value,
      newPassword: newPassword.value
    });

    toast.success("Mot de passe changé avec succès !");
    
    oldPassword.value = '';
    newPassword.value = '';
    
    proxy.$router.push('/home');
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Erreur lors de la modification du mot de passe.";
    toast.error(errorMessage);
  }
}
</script>


<style scoped>
  .reset-password {
color: #fff; 
padding: 2rem;
border-radius: 10px;
width: 100%;
max-width: 400px;
margin: 70px auto;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


form {
display: flex;
flex-direction: column;
}

input[type="password"] {
padding: 10px;
margin-bottom: 1rem;
border: 2px solid #26a49c;
border-radius: 5px;
font-size: 1rem;
color: #242d32;
background-color: #fff;
outline: none;
}

input[type="password"]::placeholder {
color: #aaa;
}

input[type="password"]:focus {
border-color: #26a49c;
box-shadow: 0 0 5px rgba(38, 164, 156, 0.5);
}

button {
background-color: #26a49c;
color: #fff;
padding: 10px;
border: none;
font-weight: bold;
border-radius: 5px;
font-size: 1rem;
cursor: pointer;
transition: background-color 0.3s ease;
}

button:hover {
background-color: #1e8e85;
}

.message {
margin-top: 1rem;
text-align: center;
color: red;
}
</style>
