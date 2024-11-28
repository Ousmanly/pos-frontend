<template>
  <div class="reset-password">
    <form
      @submit.prevent="handleResetPassword"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
      <!-- <div class="mb-3">
        <input
        type="password"
        v-model="oldPassword"
        placeholder="Mot de passe actuel"
        required
      />
      </div>
      <div class="mb-3">
        <input
        type="password"
        v-model="newPassword"
        placeholder="Nouveau mot de passe"
        required
      />
      </div> -->
      <div class="mb-3">
        <label for="oldPassword" class="form-label"
          >Old password :</label
        >
        <div class="input-group">
          <input type="password" class="form-control" v-model="oldPassword" id="oldPassword">
          <button class="btn btn-outline-secondary" type="button" @click="togglePassword">
            <i :class="eyeIconClass"  ></i>
          </button>
        </div>
      </div>
      <div class="mb-3">
        <label for="newPassword" class="form-label"
          >New password :</label
        >
        <div class="input-group">
          <input type="password" class="form-control" v-model="newPassword" id="newPassword">
          <button class="btn btn-outline-secondary" type="button" @click="toggleNewPassword">
            <i :class="eyeIconClass"  ></i>
          </button>
        </div>
      </div>
      <button class="clr btn text-white mt-3 mb-4 me-3">
        {{ $t("user.form.confirm") }}
      </button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/home"
      >
        <button class="btn btn-danger mt-3 mb-4">
          {{ $t("user.form.cancelButton") }}
        </button>
      </RouterLink>
    </form>
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
const eyeIconClass = ref("fas fa-eye");

const togglePassword = () => {
  const oldPasswordInput = document.getElementById('oldPassword');
  const isPassword = oldPasswordInput.type === 'password';
  oldPasswordInput.type = isPassword ? 'text' : 'password';

  // eyeIconClass.value = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
  eyeIconClass.value = isPassword ? "fas fa-eye-slash" : "fas fa-eye"; 
  console.log("Toggled password visibility:", eyeIconClass.value);
};
const toggleNewPassword = () => {
  const newPasswordInput = document.getElementById('newPassword');
  const isPassword = newPasswordInput.type === 'password';
  newPasswordInput.type = isPassword ? 'text' : 'password';

  // eyeIconClass.value = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
  eyeIconClass.value = isPassword ? "fas fa-eye-slash" : "fas fa-eye"; 
  console.log("Toggled password visibility:", eyeIconClass.value);
};

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

.clr {
  background-color: #343a40;
}
.clr:hover {
  background-color: #24272a;
}
input{
  width: 100%;
  margin: auto;
}
.formulaire {
  width: 40%;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  margin-top: 16vh;
}
textarea {
  resize: none;
}
.message {
margin-top: 1rem;
text-align: center;
color: red;
}
</style>
