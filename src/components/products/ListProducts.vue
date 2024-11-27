<template>
  <div>
    <div class="page-background container bg-color">
      <div class="card-header py-3 align-items-center">
        <RouterLink
        class="list text-decoration-none text-white fw-bold"
        to="/addproduct"
      >
        <button
          class="clr btn text-white mb-4 fw-bold"
          v-if="affichebtn"
          @click="maskBtn"
        >
        {{ $t("product.addProduct") }}
        </button>
      </RouterLink>
          <form class="d-flex ms-auto">
              <input
                type="text"
                class="form-control me-2"
                v-model="store.searchProduct"
                :placeholder="$t('product.search')"
              />
            </form>
        </div>
        <Loader v-if="isLoading"/>
  <div class="card-body">
    <div class="user-list">
      <div v-for="product in store.getFilteredProduct()" :key="product.id" class="user-card mb-3 p-3 border rounded shadow-sm">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="font-bold-prod">{{ product.name }}</h5>
            <button class="btn btn-sm" @click="openModal(product)">
              <i class="fa-solid fa-eye" style="color: #26a49c; font-size: 19px"></i>
            </button>
            <RouterLink :to="{ path: `/modifie-product/${product.id}` }">
              <button class="btn btn-sm">
                <i class="fa-solid fa-pen-to-square" style="color: #ffb200; font-size: 19px"></i>
              </button>
            </RouterLink>
            <button class="btn btn-sm" @click="destroyProduct(product.id)">
              <i class="fa-solid fa-trash" style="color: #e30d0d; font-size: 19px"></i>
            </button>
            <input
              type="checkbox"
              :checked="product.status"
              @change="toggleStatus(product)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
    <div v-if="isModalVisible" class="modal-overlay d-flex align-items-center justify-content-center" @click="closeModal">
  <div class="modal-content card shadow-lg p-4 rounded" style="width: 450px;" @click.stop>
    <div class="card-header bg-dark text-white text-center rounded-top" style="height: 40px;">
      <h5 class="font-weight-bold-p text-center">{{ selectedProduct.name }}</h5>
    </div>
    <div class="card-body">
      <table class="table table-bordered table-sm">
        <tbody>
          <tr>
            <th>{{ $t("product.stock") }}</th>
            <td>{{ selectedProduct.stock }}</td>
          </tr>
          <tr>
            <th>{{ $t("product.salePrice") }}</th>
            <td>{{ formatPrice(selectedProduct.sale_price) }}</td>
          </tr>
          <tr>
            <th>{{ $t("product.purchasePrice") }}</th>
            <td>{{ formatPrice(selectedProduct.purchase_price) }}</td>
          </tr>
          <tr>
            <th>{{ $t("product.seuil") }}</th>
            <td>{{ selectedProduct.seuil }}</td>
          </tr>
          <tr>
            <th>{{ $t("product.createdAt") }}</th>
            <td>{{ new Date(selectedProduct.created_at).toLocaleDateString() }}</td>
          </tr>
          <tr>
            <th>{{ $t("product.updatedAt") }}</th>
            <td>{{ new Date(selectedProduct.updated_at).toLocaleDateString() }}</td>
          </tr>
          <tr>
            <th>{{ $t("product.barcode") }}</th>
            <td>{{ selectedProduct.code_bare }}</td>
          </tr>
          <tr>
            <th>{{ $t("product.createdBy") }}</th>
            <td>{{ selectedProduct.user_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer text-right">
      <button class="btn btn-outline-secondary font-weight-bold" @click="closeModal">{{ $t("product.close") }}</button>
    </div>
  </div>

</div>

</template>
  
  <script setup>
import { usePosStore } from "@/stores/pos";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import Loader from "../Loader.vue";
const isLoading = ref(true)

const { t } = useI18n();
const toast = useToast();
const store = usePosStore();
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

let affichebtn = true;
const maskBtn = () => {
  affichebtn = false;
};
const isModalVisible = ref(false);
const selectedProduct = ref(null);
const openModal = (product) => {
  selectedProduct.value = product;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(async () => {
  try {
    isLoading.value= true
    await store.loadDataFromProductApi();
    // await new Promise((resolve)=> setTimeout(resolve, 1000))
  } catch (error) {
    console.log(error);
  }finally{
    isLoading.value= false
  }
});
const destroyProduct = (id) => {
  const confirmation = confirm(t("product.deleteConfirmation"));
  if (confirmation) {
    store.destroyProduct(id);
  }
};

const toggleStatus = async (product) => {
  try {
    product.status = !product.status;
    await store.updateProductStatus(product.id, product.status);
  } catch (error) {
    // toast.error("Failed to update status");
    console.error(error);
  }
};

const formatPrice = (price) => {
  if (price !== null && price !== undefined) {
    return parseFloat(price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return "0.00"; 
};
</script>
     
  <style scoped>

.d-flex input{
  width: fit-content;
}
.font-bold-prod{
  font-weight: bold;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  animation: fadeIn 0.3s ease-out;
}

.font-weight-bold-p {
  font-weight: bold;
}

.table {
  margin-bottom: 0; 
}

.table th, .table td {
  padding: 8px;
}

.card-footer {
  padding-top: 10px;
  border-top: 1px solid #e9ecef;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.font-wb-md {
  margin: auto;
}
.font-wb,
.font-wb-md {
  font-weight: bold;
}

.modal-body {
  padding: 20px;
}
.clr {
  margin-top: 80px;
  background-color: #242d32;
}
.clr:hover {
  background-color: #24272a;
}
.page-background {
  min-height: 90vh;
  height: fit-content;
  color: #333;
  padding: 20px;
}


.user-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.user-card {
  width: 300px;
  max-width: 100%;
  background-color: #ffffff;
}


</style>
  