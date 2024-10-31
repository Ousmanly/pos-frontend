<template>
    <div class="container">
      <!-- <div class="mb-4 d-flex justify-content-end">
        <button @click="changeLanguage('en')" class="btn btn-info me-2">{{ $t('buttons.english') }}</button>
        <button @click="changeLanguage('fr')" class="btn btn-info">{{ $t('buttons.french') }}</button>
      </div> -->
      <form @submit.prevent="addSale" class="formulaire form shadow p-3 bg-body rounded">
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="sale" class="form-label">Sale at:</label>
          <input type="date" class="form-control" v-model="sale_at" id="sale" required />
        </div>
        <div class="mb-3 flex-fill">
          <label for="product" class="form-label">Product:</label>
          <select class="form-select" v-model="selectedProduct" id="product" required>
            <option v-for="product in products" :key="product.id" :value="product.id">
              {{ product.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="customer" class="form-label">Customer Name:</label>
          <input type="text" class="form-control" v-model="customer" id="customer" required />
        </div>
        <div class="mb-3 flex-fill">
          <label for="phone" class="form-label">Phone:</label>
          <input type="text" class="form-control" v-model="phone" id="phone" />
        </div>
      </div>
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="email" class="form-label">Email:</label>
          <input type="email" class="form-control" v-model="email" id="email" />
        </div>
        <div class="mb-3 flex-fill">
          <label for="price" class="form-label">Price:</label>
          <input type="number" min="0" class="form-control" v-model="price" id="price" />
        </div>
      </div>
      <div class="form-group mb-4">
        <label for="quantity" class="form-label">Quantity:</label>
        <input type="number" min="0" class="form-control" v-model="quantity" id="quantity" required />
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-dark me-2">Add</button>
        <RouterLink to="/listsale">
          <button type="button" class="btn btn-danger">Cancel</button>
        </RouterLink>
      </div>
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
    await store.loadDataFromProductApi();
  });
;
const products = computed(() => store.products);


    const sale_at = ref("");
    const customer = ref("");
    const phone = ref("")
    const email = ref("")
    const selectedProduct = ref("");
  const price = ref();
  const quantity = ref(0);

const addSale = async () => {
  try {
    const newSale = {
      sale_at: sale_at.value,
      name: customer.value,
      phone: phone.value,
      email: email.value,
      saleDetails: [
        {
          
          id_product: selectedProduct.value,
          price: price.value,
          sale_quantity: quantity.value
        }
      ]

    }

    
    await store.addSale(newSale);
    sale_at.value = "";
    customer.value = "",
    phone.value = "",
    email.value = "",
    selectedProduct.value = "";
    price.value = "";
    quantity.value = 0;
    
    toast.success("Sale has been added successfully");
    router.push("/listsale");
  } catch (error) {
    toast.error("Failed to create a sale");
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
    /* width: 50%;
    border-radius: 10px;
    padding: 20px; */
    margin: auto;
    margin-top: 16vh;
  }
  .container {
  max-width: 600px;
  margin: auto;
}
.formulaire {
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
button.btn-dark {
  background-color: #343a40;
  border: none;
}
button.btn-dark:hover {
  background-color: #24272a;
}
  .text-danger {
  color: red;
}
  </style>
  