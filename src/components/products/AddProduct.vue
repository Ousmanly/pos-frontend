<template>
    <div class="container">
      <!-- <div class="mb-4 d-flex justify-content-end">
        <button @click="changeLanguage('en')" class="btn btn-info me-2">{{ $t('buttons.english') }}</button>
        <button @click="changeLanguage('fr')" class="btn btn-info">{{ $t('buttons.french') }}</button>
      </div> -->
      <form @submit.prevent="addProduct" class="formulaire form shadow p-3 bg-body rounded">
    <div class="form-group d-flex gap-3">
      <div class="mb-3 flex-fill">
        <label for="name" class="form-label">Name :</label>
        <input type="text" class="form-control" v-model="name" id="name" required />
        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      </div>
      <div class="mb-3 flex-fill">
        <label for="sale" class="form-label">Sale price :</label>
        <input type="number" min="0" class="form-control" v-model="sale_price" id="sale" required />
      </div>
    </div>

    <div class="form-group d-flex gap-3">
      <div class="mb-3 flex-fill">
        <label for="purchase" class="form-label">Purchase price :</label>
        <input type="number" class="form-control" v-model="purchase_price" id="purchase" required />
      </div>
      <div class="mb-3 flex-fill">
        <label for="seuil" class="form-label">Seuil :</label>
        <input type="number" class="form-control" v-model="seuil" id="seuil" required />
      </div>
    </div>

    <div class="mb-4">
      <label for="code_bare" class="form-label">Code bar :</label>
      <input type="text" class="form-control" v-model="code_bare" id="code_bare" required />
      <div v-if="errors.code_bare" class="text-danger">{{ errors.code_bare }}</div>
    </div>

    <div v-if="errors.general" class="text-danger mb-3">{{ errors.general }}</div>

    <div class="d-flex justify-content-between">
      <button type="submit" class="btn btn-dark me-2">Add</button>
      <RouterLink to="/listproduct">
        <button type="button" class="btn btn-danger">Cancel</button>
      </RouterLink>
    </div>
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
    const sale_price = ref("");
    const purchase_price = ref("");
    const seuil = ref("");
    const code_bare = ref("");
    const errors = reactive({
      name: "",
      code_bare: "",
    });
    const addProduct = async () => {
    try {
        const newProduct = {
            name: name.value,
            sale_price: sale_price.value, 
            purchase_price: purchase_price.value,
            seuil: seuil.value,
            code_bare: code_bare.value
        };
        await store.addProduct(newProduct);
        Object.keys(errors).forEach(key => errors[key] = "");
          toast.success("Product has been added success")
          router.push("/listproduct");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors ) {
    error.response.data.errors.forEach(err => {
      errors[err.path] = err.msg; 
    });
  } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  
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
  margin: auto;
  margin-top: 16vh;
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
}
.form-group {
  display: flex;
  gap: 1rem;
}
.form-label {
  font-weight: bold;
}
  .text-danger {
  color: red;
}
  </style>
  