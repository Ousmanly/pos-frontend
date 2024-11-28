<template>
  <div class="container">
    <form
      @submit.prevent="addProduct"
      class="formulaire form shadow p-3 bg-body rounded"
    >
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="name" class="form-label">{{ $t("product.name") }} :</label>
          <input
            type="text"
            class="form-control"
            v-model="name"
            id="name"
            @input="validateProductName"
            required
          />
          <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
        </div>
        <div class="mb-3 flex-fill">
          <label for="sale" class="form-label">{{ $t("product.salePrice") }} :</label>
          <input
            type="text"
            min="0"
            class="form-control"
            v-model="sale_price"
            id="sale"
            @input="validateSalePrice"
            required
          />
          <div v-if="errors.sale_price" class="text-danger text-end">
            {{ errors.sale_price }}
          </div>
        </div>
      </div>

      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="purchase" class="form-label">{{ $t("product.purchasePrice") }} :</label>
          <input
            type="text"
            class="form-control"
            v-model="purchase_price"
            id="purchase"
            @input="validatePurchasePrice"
            required
          />
        </div>
        <div class="mb-3 flex-fill">
          <label for="seuil" class="form-label">{{ $t("product.seuil") }} :</label>
          <input
            type="number"
            class="form-control"
            v-model="seuil"
            id="seuil"
            required
          />
        </div>
      </div>
                        
      <div v-if="errors.purchase_price" class="text-danger text-first">
        {{ errors.purchase_price }}
      </div>
      <div class="mb-4">
        <label for="code_bare" class="form-label">{{ $t("product.barcode") }} :</label>
        <input
          type="text"
          class="form-control"
          v-model="code_bare"
          id="code_bare"
          required
        />
        <div v-if="errors.code_bare" class="text-danger">
          {{ errors.code_bare }}
        </div>
      </div>
<!-- 
      <div v-if="errors.general" class="text-danger mb-3">
        {{ errors.general }}
      </div> -->

      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-dark me-2">{{ $t("product.add") }}</button>
        <RouterLink to="/listproduct">
          <button type="button" class="btn btn-danger">{{ $t("product.cancel") }}</button>
        </RouterLink>
      </div>
    </form>
  </div>
</template>
  
  <script setup>
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";

const router = useRouter();
import { ref, reactive } from "vue";
import { usePosStore } from "@/stores/pos";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const toast = useToast();
const store = usePosStore();
const name = ref("");
const sale_price = ref("");
const purchase_price = ref("");
const seuil = ref("");
const code_bare = ref("");
const errors = reactive({
  name: "",
  code_bare: "",
  sale_price: "",
  purchase_price: "",
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

const addProduct = async () => {

  if (errors.sale_price || errors.purchase_price) {
    // toast.error("Price is invalide");
    return;  
  }
  
validateProductName()
 if (errors.name) {
    return;
  }
  try {
    const newProduct = {
      name: name.value,
      sale_price: sale_price.value,
      purchase_price: purchase_price.value,
      seuil: seuil.value,
      code_bare: code_bare.value,
    };
    await store.addProduct(newProduct);
    Object.keys(errors).forEach((key) => (errors[key] = ""));
    toast.success(t("product.productAdded"));
    router.push("/listproduct");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        errors[err.path] = err.msg;
      });
    } else {
      toast.error(t("product.addError"));
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
  