<template>
    <div class="container">
      <form @submit.prevent="addReception" class="formulaire form shadow p-3 bg-body rounded">
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="recepted" class="form-label">Recepted at:</label>
          <input type="date" class="form-control" v-model="recepted_at" id="recepted" required />
        </div>
        <div class="mb-3 flex-fill">
          <label for="supplier" class="form-label">Supplier Name:</label>
          <select class="form-select" v-model="selectedSupplier" id="supplier" required>
            <option value="" disabled selected>Select a supplier</option>
            <option v-for="supplier in activeSuppliers" :key="supplier.id" :value="supplier.id">
              {{ supplier.name }}
            </option>
          </select>
        </div>
      </div>
      <div v-for="(detail, index) in receptionDetails" :key="index" class="mb-3">
        <div class="form-group d-flex gap-3">
          <div class="mb-3 flex-fill">
            <label for="product" class="form-label">Product Name:</label>
          <select class="form-select" v-model="detail.id_product" id="product" required>
            <option v-for="product in activeProducts" :key="product.id" :value="product.id">
              {{ product.name }}
            </option>
          </select>
          </div>
          <div class="mb-3 flex-fill">
            <label for="price" class="form-label">Price:</label>
            <input type="number" min="0" class="form-control" v-model="detail.price" id="price" required />
         </div>
          <div class="mb-3 flex-fill">
            <label for="quantity" class="form-label">Quantity:</label>
            <input type="number" min="0" class="form-control mb-4" v-model="detail.quantity" id="quantity" required />
          </div>
            <button class="btn" @click="removeProduct(index)">
              <i
                class="fa-solid fa-trash"
                style="color: #e30d0d; font-size: 29px"
              ></i>
            </button>  
        </div>
      </div>

      <button type="button" class="btn btn-am mb-3" @click="addProduct">
        {{ $t("sale.buttons.addMore") }}
      </button>

      <div v-if="errors.general" class="text-danger mb-3">{{ errors.general }}</div>
      
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-dark me-2">{{ $t("reception.button.add") }}</button>
        <RouterLink to="/listreception">
          <button type="button" class="btn btn-danger">{{ $t("reception.button.cancel") }}</button>
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
    await store.loadDataFromSuplierApi();
    await store.loadDataFromProductApi();
  });

const activeSuppliers = computed(() => store.suppliers.filter(supplier => supplier.status));
const activeProducts = computed(() => store.products.filter(product => product.status));



  const recepted_at = ref("");
  const selectedSupplier = ref("");
  const selectedProduct = ref("");
  const price = ref();
  const quantity = ref();
  const errors = reactive({
    receptionDetails:""
    });
    const receptionDetails = ref([{ id_product: "", price: null, quantity: 1 }]);

  const addProduct = () => {
    receptionDetails.value.push({ id_product: "", price: null, quantity: 1 });
  };

  const removeProduct = (index) => {
    receptionDetails.value.splice(index, 1);
  };
const addReception = async () => {
  try {
    const newReception = {
      id_supplier: selectedSupplier.value,
      recepted_at: recepted_at.value,
      receptionDetails:receptionDetails.value
    }
    await store.addReception(newReception);
    Object.keys(errors).forEach(key => errors[key] = "");

    toast.success("Reception has been added successfully");
    router.push("/listreception");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach(err => {
        if (err.path === "receptionDetails[0].quantity") {
          errors.quantity = err.msg; 
        } else {
          errors.general = err.msg;
        }
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
    max-width: 700px;
    margin: auto;
    margin-top: 16vh;
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
.btn-am  {
  background-color: #343a40;
  color: white;
}
button.btn-dark:hover {
  background-color: #24272a;
}
  .text-danger {
  color: red;
}
  </style>
  