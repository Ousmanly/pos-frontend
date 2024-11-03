<template>
  <div class="container">
    <form
      @submit.prevent="addInventory"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
      <div class="mb-3">
        <label for="recepted" class="form-label">{{ $t("inventory.form.remark") }}:</label>
        <input
          type="text"
          class="form-control"
          v-model="remarque"
          id="recepted"
          required
        />
        <div v-if="errors.remarque" class="text-danger">
          {{ errors.remarque }}
        </div>
      </div>
      <div class="mb-3">
        <label for="product" class="form-label">{{ $t("inventory.form.product") }}:</label>
        <select
          class="form-select"
          v-model="selectedProduct"
          id="product"
          required
        >
          <option
            v-for="product in activeProducts"
            :key="product.id"
            :value="product.id"
          >
            {{ product.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="quantity" class="form-label">{{ $t("inventory.form.quantity") }}:</label>
        <input
          type="number"
          min="0"
          class="form-control"
          v-model="quantity"
          id="quantity"
          required
        />
        <div v-if="errors.quantity" class="text-danger">
          {{ errors.quantity }}
        </div>
      </div>
      <button type="submit" class="btn btn-dark me-2">{{ $t("inventory.form.add_button") }}</button>
      <RouterLink to="/listinventories">
        <button type="button" class="btn btn-danger">{{ $t("inventory.form.cancel_button") }}</button>
      </RouterLink>
    </form>
  </div>
</template>
  
  <script setup>
import { useRouter } from "vue-router";
import { computed, getCurrentInstance, onMounted } from "vue";

const router = useRouter();
import { ref, reactive } from "vue";
import { usePosStore } from "@/stores/pos";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const toast = useToast();
const store = usePosStore();

onMounted(async () => {
  await store.loadDataFromProductApi();
});

const activeProducts = computed(() =>
  store.products.filter((product) => product.status)
);

const remarque = ref("");
const selectedProduct = ref("");
const quantity = ref(0);
const errors = reactive({
  remarque: "",
});
const addInventory = async () => {
  try {
    const newInventory = {
      remarque: remarque.value,
      id_product: selectedProduct.value,
      quantity: quantity.value,
    };
    await store.addInventory(newInventory);
    Object.keys(errors).forEach((key) => (errors[key] = ""));

    toast.success(t("inventory.form.success_message"));
    router.push("/listinventories");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        errors[err.path] = err.msg;
      });
    } else {
      toast.error(t("inventory.form.error_message"));
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
  