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
            required
          />
         </div>
    <div class="mb-3">
          <label for="update" class="form-label">Update at :</label>
          <input
            type="date"
            class="form-control"
            v-model="updated_at"
            id="update"
            required
          />
         </div>
        <div class="mb-3">
          <label for="sale" class="form-label">{{ $t("product.salePrice") }} :</label>
          <input
            type="number"
            class="form-control"
            v-model="sale_price"
            id="sale"
            required
          />
        </div>
        <div class="mb-3">
          <label for="purchase" class="form-label">{{ $t("product.purchasePrice") }}:</label>
          <input
            type="number"
            class="form-control"
            v-model="purchase_price"
            id="purchase"
            required
          />
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
import { ref, onMounted } from "vue";


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
import { getCurrentInstance } from 'vue';
import { usePosStore } from "@/stores/pos";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const toast = useToast()


onMounted(() => {
  const product = store.products.find((product) => product.id === id);
  if (product) {
    name.value = product.name;
    updated_at.value= product.updated_at
    sale_price.value = product.sale_price , 
    purchase_price.value = product.purchase_price,
    seuil.value = product.seuil,
    code_bare.value = product.code_bare
    originalName.value = product.name;
  }
});

const handleUpdateProduct = async() => {
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
    toast.error(t("product.updateFailed"))
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
