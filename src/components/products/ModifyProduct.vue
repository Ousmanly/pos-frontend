<template>
  <div class="container mt-5">
    <form
      @submit.prevent="handleUpdateProduct"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
    <div class="mb-3">
          <label for="name" class="form-label">{{ $t("product.name") }} :</label>
          <input
            type="text"
            class="form-control"
            v-model="name"
            id="name"
            @input="validateProductName"
            required
          />
         </div>
         <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
    <div class="mb-3">
          <label for="update" class="form-label">{{ $t("product.updatedAt") }}:</label>
          <input
            type="date"
            class="form-control"
            v-model="updated_at"
            id="update"
            :min="maxDate" 
            :max="maxDate" 
            required
          />
          <div v-if="errors.updated_at" class="text-danger mb-3">{{ errors.updated_at }}</div>
         </div>
        <div class="mb-3">
          <label for="sale" class="form-label">{{ $t("product.salePrice") }} :</label>
          <input
            type="text"
            class="form-control"
            v-model="sale_price"
            id="sale"
            @input="validateSalePrice"
            required
          />
          <div v-if="errors.sale_price" class="text-danger text-first">
            {{ errors.sale_price }}
          </div>
        </div>
        <div class="mb-3">
          <label for="purchase" class="form-label">{{ $t("product.purchasePrice") }}:</label>
          <input
            type="text"
            class="form-control"
            v-model="purchase_price"
            id="purchase"
            @input="validatePurchasePrice"
            required
          />
          <div v-if="errors.purchase_price" class="text-danger text-first">
            {{ errors.purchase_price }}
          </div>
        </div>
        <div class="mb-3">
          <label for="seuil" class="form-label">{{ $t("product.seuil") }} :</label>
          <input
            type="number"
            class="form-control"
            v-model="seuil"
            id="seuil"
            required
          />
        </div>
        <div class="mb-3">
          <label for="code_bare" class="form-label">{{ $t("product.barcode") }} :</label>
          <input
            type="text"
            class="form-control"
            v-model="code_bare"
            id="code_bare"
            required
          />
        </div>
        <div v-if="errors.code_bare" class="text-danger text-first">
            {{ errors.code_bare }}
          </div>
        <button class="clr btn text-white mt-3 mb-4 me-3"> {{ $t("product.confirm") }}</button>
        <RouterLink
          class="list text-decoration-none text-white me-5 fw-bold"
          to="/listproduct"
        >
          <button class="btn btn-danger mt-3 mb-4">{{ $t("product.cancel") }}</button>
        </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed, reactive } from "vue";


const store = usePosStore();
const router = useRouter();
const route = useRoute();

const updated_at = ref("");
const name = ref("");
const sale_price = ref("");
const purchase_price = ref("");
const seuil = ref("");
const code_bare = ref("");
const originalName = ref("");
const id = Number(route.params.id);

const errors = reactive({
  name: "",
  updated_at: "",
  sale_price: "",
  purchase_price: "",
  code_bare: "",
});
import { getCurrentInstance } from 'vue';
import { usePosStore } from "@/stores/pos";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const toast = useToast()
const maxDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});
onMounted(() => {
  const product = store.products.find((product) => product.id === id);
  if (product) {
    name.value = product.name,
    updated_at.value = product.updated_at 
      ? new Date(product.updated_at).toISOString().split("T")[0] 
      : "";
    sale_price.value = product.sale_price , 
    purchase_price.value = product.purchase_price,
    seuil.value = product.seuil,
    code_bare.value = product.code_bare,
    originalName.value = product.name
  }
});
const validateSalePrice = () => {
  const salePriceRegex = /^[0-9]+(\.[0-9]+)?$/;  
  if (!salePriceRegex.test(sale_price.value)) {
    errors.sale_price = "Price must be a positive decimal number";  
  } else {
    errors.sale_price = ""; 
  }
};

const validatePurchasePrice = () => {
  const purchasePriceRegex = /^[0-9]+(\.[0-9]+)?$/;  
  if (!purchasePriceRegex.test(purchase_price.value)) {
    errors.purchase_price = "Price must be a positive decimal number";  
  } else {
    errors.purchase_price = ""; 
  }
};

const validateProductName = () => {
  const nameRegex =  /^(?!^\d+$)(?!^\s+$)(?!^\s)[A-Za-zÀ-ÿ0-9\s]+$/;
  if (!nameRegex.test(name.value)) {
    errors.name = "Name must not have only numbers or espaces and cannot start with an espace.";
  }
  else {
    errors.name = "";
  }
};

const handleUpdateProduct = async() => {
  if (errors.sale_price || errors.purchase_price || errors.code_bare) {
    // toast.error("Price is invalide");
    return;  
  }
  
  validateProductName()
  if (errors.name) {
    return;  
  }
  try{
    
  const updatedProduct = {
    id,
    name: name.value,
    originalName: originalName.value,
    updated_at: updated_at.value,
    sale_price: sale_price.value, 
    purchase_price: purchase_price.value,
    seuil: seuil.value,
    code_bare: code_bare.value
  };
  await store.updateProduct(updatedProduct);
      toast.success(t("product.productUpdated"))
      router.push("/listproduct");
  }catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        if (err.path == "name") {
          errors.name = err.msg;
        }else if (err.path == "updated_at") {
          errors.updated_at = err.msg;
        }else{
          errors[err.path] = err.msg;
        }
      });
    } else {
      toast.error(t("product.updateFailed"))
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
