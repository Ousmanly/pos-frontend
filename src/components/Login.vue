<template>
    <div class="login-container d-flex justify-content-center align-items-center vh-100">
      <div class="login-card card shadow p-4">
        <div class="d-flex justify-content-center mb-2">
        <img class="mb-5" src="../assets/logo2.png" alt="logo" width="115" height="103" />
      </div>
        <!-- <h3 class="mb-4 text-center">Login</h3> -->
        
        <form @submit.prevent="handleLogin">
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
            <input v-model="email" type="email" class="form-control" placeholder="Email" required />
          </div>
          
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="fas fa-lock"></i></span>
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              class="form-control" 
              placeholder="Password" 
              required 
            />
          </div>
  
          <div class="d-flex justify-content-between mb-3">
          <small @click="togglePasswordVisibility" style="cursor: pointer; color: blue;">
            {{ showPassword ? "Hide password" : "Show password" }}
          </small>
          <router-link to="/forgot-password" class="text-primary">
            Forget password ?
          </router-link>
        </div>
  
          <button type="submit" class="btn w-100 btn-conn mt-3">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { usePosStore } from "@/stores/pos";
  import { useToast } from 'vue-toastification';
  const toast = useToast()
    const store = usePosStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const handleLogin = async () => {
    const success = await store.login(email.value, password.value);
    if (success) {
        toast.success("connexion reussi")
        router.push("/home");
    } else {
        toast.error("connexion failed")
    }
    };
  const showPassword = ref(false);
  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  

  </script>
  
  <style scoped>
  .login-container {
    background-color: #f8f9fa;
    min-height: 100vh;
  }
  .btn-conn{
    background: linear-gradient(45deg, #242d32, #137dbb);
    color: white;
    font-weight: bold;
  }
  .login-card {
    width: 100%;
    max-width: 400px;
  }
  
  .alert {
    transition: opacity 0.3s ease-in-out;
  }
  </style>
