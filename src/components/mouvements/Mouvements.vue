<template>
  <div>
    <div class="page-background container bg-color">
    
      <div class="card shadow mb-4 clr">
    <div class="card-header py-3">
        <h2 class="m-0 font-weight-bold text-success">Mouvements</h2>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                      <th>Id</th>
                      <th>quantity</th>
                      <th>Product</th>
                      <th>Provoked By</th>
                      <th>Date of mouvement</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="mouvement in store.mouvements" :key="mouvement.id">
                    <td>{{ mouvement.id }}</td>
                    <td>{{ mouvement.quantity }}</td>
                    <td>{{ mouvement.product_name }}</td>
                    <td>{{ mouvement.user_name }}</td>
                    <td>{{ new Date(mouvement.mouvement_at).toLocaleDateString() }}</td>
                    <!-- <td class="text-center">
                      <button class="btn btn-sm" @click="openModal(supplier)">
                        <i
                          class="fa-solid fa-eye"
                          style="color: #26a49c; font-size: 19px"
                        ></i>
                      </button>
                      <RouterLink :to="{ path: `/modifie-supplier/${supplier.id}` }">
                      <button class="btn btn-sm">
                        <i
                          class="fa-solid fa-pen-to-square"
                          style="color: #ffb200; font-size: 19px"
                        ></i>
                      </button>
                      </RouterLink>
                      <button
                        class="btn btn-sm"
                        @click="destroySupplier(supplier.id)"
                      >
                        <i
                          class="fa-solid fa-trash"
                          style="color: #e30d0d; font-size: 19px"
                        ></i>
                      </button>
                    </td> -->
                 </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
</div>
    </div>
    <div v-if="isModalVisible" class="modal-overlay d-flex" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h5 class="font-wb-md mt-3">Supplier details</h5>
        </div>
        <div class="modal-body">
          
          <p>
            <strong>Name: </strong> {{ selectedSupplier.name }}
          </p>
          <p>
            <strong>Phone: </strong> {{ selectedSupplier.phone }}
          </p>
        </div>
        <button class="btn btn-danger text-white font-wb" @click="closeModal">
          Close
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { usePosStore } from "@/stores/pos";
import { onMounted, ref } from "vue";
import { useToast } from 'vue-toastification';
const toast = useToast()
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
const selectedSupplier = ref(null);
const openModal = (supplier) => {
  selectedSupplier.value = supplier;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(async () => {
  await store.loadDataFromMouvementApi();
});
  const destroySupplier = (id) => {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer?");
    if (confirmation ) {
      toast.success("Suppression reussi")
      store.deleteSupplier(id);
    }
  };
</script>
     
  <style scoped>

.clr {
  margin-top: 100px;
}
.page-background {
  min-height: 90vh;
  height: fit-content;
  color: #333;
  padding: 20px;
}
</style>
  