<template>
    <div class="container">
      <!-- <div class="mb-4 d-flex justify-content-end">
        <button @click="changeLanguage('en')" class="btn btn-info me-2">{{ $t('buttons.english') }}</button>
        <button @click="changeLanguage('fr')" class="btn btn-info">{{ $t('buttons.french') }}</button>
      </div> -->
      <form
        @submit.prevent="addUser"
        class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
      >
      <!-- <h1>{{ `size is ${size}` }}</h1> -->
  
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
        <div class="mb-3">
          <label for="password" class="form-label">Password :</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            id="password"
            required
          />        
        </div>
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
    import { useRouter } from "vue-router";
    import { getCurrentInstance } from 'vue';
  
    const router = useRouter();
    import { ref, reactive } from "vue";
    import { usePosStore } from "@/stores/pos";
    import { useToast } from "vue-toastification";
    const toast = useToast()
    const store = usePosStore();
    const name = ref("");
    const role = ref("");
    const email = ref("");
    const password = ref("");
    const addUser = async () => {
    try {
        const newUser = {
            name: name.value,
            email: email.value, 
            password: password.value, 
            role: role.value, 
        };
        await store.addUser(newUser);
        name.value = "";
        email.value = "";
        password.value = "";
        role.value = "";
        toast.success("User has been added success")
        router.push("/listuser");
    } catch (error) {
        toast.error("faild to create a user")

      // if (error.response && error.response.status === 422) {
      //   const errors = error.response.data.errors;
        
      //   errors.forEach((err) => {
      //     alert(err.msg); 
      //   });
      // } else {
      //   alert("Une erreur inattendue est survenue.");
      // }


  
    }
  };
  const { proxy } = getCurrentInstance();
  
  const changeLanguage = (locale) => {
    proxy.$i18n.locale = locale;
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
  .text-danger {
  color: red;
}
  </style>
  