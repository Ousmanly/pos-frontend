<template>
    <div class="container">
      <!-- <div class="mb-4 d-flex justify-content-end">
        <button @click="changeLanguage('en')" class="btn btn-info me-2">{{ $t('buttons.english') }}</button>
        <button @click="changeLanguage('fr')" class="btn btn-info">{{ $t('buttons.french') }}</button>
      </div> -->
      <form
        @submit.prevent="addReception"
        class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
      >
      <!-- <h1>{{ `size is ${size}` }}</h1> -->
  
        <div class="mb-3">
          <label for="recepted" class="form-label">Recepted at :</label>
          <input
            type="date"
            class="form-control "
            v-model="recepted_at"
            id="recepted"
            required
          />
        </div>
        <div class="mb-3">
          <label for="supplier" class="form-label">Supplier Name</label>
          <select
            class="form-select"
            v-model="selectedSupplier"
            id="supplier"
            required
          >
            <option value="" disabled selected>Select a supplier</option>
            <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
              {{ supplier.name }}
            </option>
          </select>
      </div>
        <div class="mb-3">
          <label for="product" class="form-label">Product Name</label>
          <select
            class="form-select"
            v-model="selectedProduct"
            id="product"
            required
          >
              <option v-for="product in products" :key="product.id" :value="product.id">
              {{ product.name }}
            </option>
          </select>
      </div>
      <div class="mb-3">
          <label for="price" class="form-label">Price :</label>
          <input
            type="number"
            class="form-control"
            v-model="price"
            id="price"
            required
          />
        </div>
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantity :</label>
          <input
            type="number"
            class="form-control"
            v-model="quantity"
            id="quantity"
            required
          />
        </div>
        <button class="clr btn text-white mt-3 mb-4 me-3"> Add</button>
        <RouterLink
          class="list text-decoration-none text-white me-5 fw-bold"
          to="/listreception"
        >
          <button class="btn btn-danger mt-3 mb-4">Cancel</button>
        </RouterLink>
      </form>
    </div>
  </template>
  
  <script setup>
    import { useRouter } from "vue-router";
    import { computed, getCurrentInstance, onMounted } from 'vue';
  
    const router = useRouter();
    import { ref, reactive } from "vue";
    import { usePosStore } from "@/stores/pos";
    import { useToast } from "vue-toastification";


    const toast = useToast()
    const store = usePosStore();

    onMounted(async () => {
    await store.loadDataFromSuplierApi();
    await store.loadDataFromProductApi();
  });

const suppliers = computed(() => store.suppliers);
const products = computed(() => store.products);


    const recepted_at = ref("");
    const selectedSupplier = ref("");
    const selectedProduct = ref("");
  const price = ref(0);
  const quantity = ref(0);

const addReception = async () => {
  try {
    const newReception = {
      id_supplier: selectedSupplier.value,
      recepted_at: recepted_at.value,
      receptionDetails: [
        {
          id_product: selectedProduct.value,
          price: price.value,
          quantity: quantity.value
        }
      ]
    }
    await store.addReception(newReception);
    recepted_at.value = "";
    selectedSupplier.value = "";
    selectedProduct.value = "";
    price.value = 0;
    quantity.value = 0;

    toast.success("Reception has been added successfully");
    router.push("/listreception");
  } catch (error) {
    toast.error("Failed to create a reception");
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
  