<template>
  <div class="container mt-5">
    <form
      @submit.prevent="handleUpdateUser"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
    <div class="mb-3">
          <label for="name" class="form-label">Name :</label>
          <input
            type="text"
            class="form-control"
            v-model="name"
            id="name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email :</label>
          <input
            type="text"
            class="form-control"
            v-model="email"
            id="email"
            required
          />        
        </div>
        <!-- <div class="mb-3">
          <label for="password" class="form-label">Password :</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            id="password"
            required
          />        
        </div> -->
        <div class="mb-3">
        <label for="type" class="form-label">Role :</label>
        <select class="input form-select" v-model="role" id="role" required>

          <option value="" disabled selected>slect role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="CAISSIER">CAISSIER</option>
        </select>
      </div>
        <button class="clr btn text-white mt-3 mb-4 me-3"> Add</button>
        <RouterLink
          class="list text-decoration-none text-white me-5 fw-bold"
          to="/listuser"
        >
          <button class="btn btn-danger mt-3 mb-4">Cancel</button>
        </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";


const store = usePosStore();
const router = useRouter();
const route = useRoute();

const name = ref("");
const email = ref("");
const role = ref("");
const originalName = ref("");
const id = Number(route.params.id);
import { getCurrentInstance } from 'vue';
import { usePosStore } from "@/stores/pos";

import { useToast } from "vue-toastification";
const toast = useToast()
const { proxy } = getCurrentInstance();

const changeLanguage = (locale) => {
  proxy.$i18n.locale = locale;
};

onMounted(() => {
  const user = store.users.find((user) => user.id === id);
  if (user) {
    name.value = user.name;
    email.value = user.email;
    role.value = user.role;
    originalName.value = user.name;
  }
});

const handleUpdateUser = async() => {
  try{
    
  const updatedUser = {
    id,
    name: name.value,
    originalName: originalName.value,
    email: email.value,
    role: role.value,
  };
  await store.updateUser(updatedUser);
  toast.success("User has been updated")
  router.push("/listuser");
  }catch (error) {
    toast.error("Failed to update user")
  if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;
      
      errors.forEach((err) => {
        alert(err.msg); 
      });
    } else {
      alert("Une erreur inattendue est survenue."+error.message);
    }
  }
};

</script>

<style scoped>
.clr {
  background-color: #343a40;
}
.clr:hover {
  background-color: #24272a;
}
.formulaire {
  width: 50%;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  margin-top: 16vh;
}
textarea {
  resize: none;
}
</style>
