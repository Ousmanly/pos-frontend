<template>
    <div class="container">
      <!-- <div class="mb-4 d-flex justify-content-end">
        <button @click="changeLanguage('en')" class="btn btn-info me-2">{{ $t('buttons.english') }}</button>
        <button @click="changeLanguage('fr')" class="btn btn-info">{{ $t('buttons.french') }}</button>
      </div> -->
      <form
        @submit.prevent="addProduct"
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
          <label for="sale" class="form-label">Sale price :</label>
          <input
            type="number"
            min="0"
            class="form-control"
            v-model="sale_price"
            id="sale"
            required
          />
        </div>
        <div class="mb-3">
          <label for="purchase" class="form-label">Pusrchase price :</label>
          <input
            type="number"
            class="form-control"
            v-model="purchase_price"
            id="purchase"
            required
          />
        </div>
        <div class="mb-3">
          <label for="seuil" class="form-label">Seuil :</label>
          <input
            type="number"
            class="form-control"
            v-model="seuil"
            id="seuil"
            required
          />
        </div>
        <div class="mb-3">
          <label for="code_bare" class="form-label">Code bare :</label>
          <input
            type="text"
            class="form-control"
            v-model="code_bare"
            id="code_bare"
            required
          />
        </div>
        <button class="clr btn text-white mt-3 mb-4 me-3"> Add</button>
        <RouterLink
          class="list text-decoration-none text-white me-5 fw-bold"
          to="/listproduct"
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
    import { ref } from "vue";
    import { usePosStore } from "@/stores/pos";
    import { useToast } from "vue-toastification";
    const toast = useToast()
    const store = usePosStore();
    const name = ref("");
    const sale_price = ref("");
    const purchase_price = ref("");
    const seuil = ref("");
    const code_bare = ref("");
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
          name.value="",
          sale_price.value="", 
          purchase_price.value="",
          seuil.value="",
          code_bare.value=""
          toast.success("Product has been added success")
          router.push("/listproduct");
    } catch (error) {
        toast.error("faild to create a Product")


  
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
  