<template>
  <div>
    <div class="page-background container bg-color">
      <RouterLink
        class="list text-decoration-none text-white fw-bold"
        to="/addproduct"
      >
        <button
          class="clr btn text-white mb-4 fw-bold"
          v-if="affichebtn"
          @click="maskBtn"
        >
          Add product
        </button>
      </RouterLink>

      <!-- <div class="card shadow mb-4">
  <div class="card-header py-3">
    <h2 class="m-0 font-weight-bold text-success">Users</h2>
  </div> -->
  <div class="card-body">
    <div class="user-list">
      <div v-for="product in store.products" :key="product.id" class="user-card mb-3 p-3 border rounded shadow-sm">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="font-bold-prod">{{ product.name }}</h5>
            <!-- <p class="m-0"><strong>Role:</strong> {{ user.role }}</p>
            <p class="m-0"><strong>Email:</strong> {{ user.email }}</p> -->
          <!-- </div> -->
          <!-- <div class="text-center"> -->
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
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
    <!-- <div v-if="isModalVisible" class="modal-overlay d-flex" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h5 class="font-wb-md mt-3">Supplier details</h5>
        </div>
        <div class="modal-body">
          <p><strong>Name: </strong> {{ selectedUser.name }}</p>
          <p><strong>Role: </strong> {{ selectedUser.role }}</p>
          <p><strong>Email: </strong> {{ selectedUser.email }}</p>
        </div>
        <button class="btn btn-danger text-white font-wb" @click="closeModal">
          Close
        </button>
      </div>
    </div> -->
    <!-- <div v-if="isModalVisible" class="modal-overlay d-flex align-items-center justify-content-center" @click="closeModal">
      <div class="modal-content card shadow p-3" style="width: 400px;" @click.stop>
        <div class="card-header">
          <h5 class="font-weight-bold mt-2">{{ selectedProduct.name }}</h5>
        </div>
        <div class="card-body">
          <p><strong>Stock: </strong> {{ selectedProduct.stock }}</p>
          <p><strong>Sale price: </strong> {{ selectedProduct.sale_price }}</p>
          <p><strong>Purchase price: </strong> {{ selectedProduct.purchase_price }}</p>
          <p><strong>Seuil: </strong> {{ selectedProduct.seuil }}</p>
          <p><strong>Create at: </strong> {{ selectedProduct.created_at }}</p>
          <p><strong>Update at: </strong> {{ selectedProduct.updated_at }}</p>
          <p><strong>Code bare: </strong> {{ selectedProduct.code_bare }}</p>
          <p><strong>Create By: </strong> {{ selectedProduct.id_user }}</p>
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-danger text-white font-weight-bold" @click="closeModal">Close</button>
        </div>
      </div>
    </div> -->
    <div v-if="isModalVisible" class="modal-overlay d-flex align-items-center justify-content-center" @click="closeModal">
  <div class="modal-content card shadow-lg p-4 rounded" style="width: 450px;" @click.stop>
    <div class="card-header bg-dark text-white text-center rounded-top" style="height: 40px;">
      <h5 class="font-weight-bold-p text-center">{{ selectedProduct.name }}</h5>
    </div>
    <div class="card-body">
      <table class="table table-bordered table-sm">
        <tbody>
          <tr>
            <th>Stock</th>
            <td>{{ selectedProduct.stock }}</td>
          </tr>
          <tr>
            <th>Sale price</th>
            <td>{{ selectedProduct.sale_price }}</td>
          </tr>
          <tr>
            <th>Purchase price</th>
            <td>{{ selectedProduct.purchase_price }}</td>
          </tr>
          <tr>
            <th>Seuil</th>
            <td>{{ selectedProduct.seuil }}</td>
          </tr>
          <tr>
            <th>Create at</th>
            <td>{{ new Date(selectedProduct.created_at).toLocaleDateString() }}</td>
          </tr>
          <tr>
            <th>Update at</th>
            <td>{{ new Date(selectedProduct.updated_at).toLocaleDateString() }}</td>
          </tr>
          <tr>
            <th>Code bare</th>
            <td>{{ selectedProduct.code_bare }}</td>
          </tr>
          <tr>
            <th>Create By</th>
            <td>{{ selectedProduct.user_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer text-right">
      <button class="btn btn-outline-secondary font-weight-bold" @click="closeModal">Close</button>
    </div>
  </div>
</div>


</template>
  
  <script setup>
import { usePosStore } from "@/stores/pos";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const store = usePosStore();
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

//   const changeLanguage = (locale) => {
//     proxy.$i18n.locale = locale;
//   };

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
  await store.loadDataFromProductApi();
});
const destroyProduct = (id) => {
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer?");
  if (confirmation) {
    toast.success("Product has been deleted")
    store.destroyProduct(id);
  }
};

// const destroySupplier = (id) => {
//     const confirmation = confirm("Êtes-vous sûr de vouloir supprimer?");
//     if (confirmation ) {
//       toast.success("Suppression reussi")
//       store.deleteSupplier(id);
//     }
//   };
</script>
     
  <style scoped>
/* .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  padding-top: 5px;
  border-radius: 8px;
  max-width: 300px;
  position: relative;
} */
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
  /* background-color: #007bff; */
  /* color: white; */
  font-weight: bold;
}

.table {
  margin-bottom: 0; /* Enlève le margin pour un look compact */
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
  /* justify-content: center; */
  gap: 1rem;
}

.user-card {
  width: 300px; /* Limite la largeur de chaque carte */
  max-width: 100%;
  background-color: #ffffff;
}


</style>
  