<template>
  <div>
    <div class="page-background container bg-color">
      <RouterLink
        class="list text-decoration-none text-white fw-bold"
        to="/ajoutsupplier"
      >
        <button
          class="clr btn text-white mb-4 fw-bold"
          v-if="affichebtn"
          @click="maskBtn"
        >
          Add supplier
        </button>
      </RouterLink>
    
      <div class="card shadow mb-4">
    <div class="card-header py-3">
        <h2 class="m-0 font-weight-bold text-success-t bold">Suppliers</h2>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>User</th>
                      <th>Status</th>
                      <th class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="supplier in store.suppliers" :key="supplier.id">
                    <td>{{ supplier.id }}</td>
                    <td>{{ supplier.name }}</td>
                    <td>{{ supplier.phone }}</td>
                    <td>{{ supplier.user_name }}</td>
                    <td class="text-center">
                    <input
                      type="checkbox"
                      :checked="supplier.status"
                      @change="toggleStatus(supplier)"
                    />
                  </td>
                    <td class="text-center">
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
                    </td>
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
  await store.loadDataFromSuplierApi();
});
  const destroySupplier = (id) => {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer?");
    if (confirmation ) {
      toast.success("Suppression reussi")
      store.deleteSupplier(id);
    }
  };
  const toggleStatus = async (supplier) => {
  try {
    supplier.status = !supplier.status;
    await store.updateSupplierStatus(supplier.id, supplier.status); // Met à jour dans la base de données
    // toast.success(`Status updated to ${user.status ? "Active" : "Inactive"}`);
  } catch (error) {
    // toast.error("Failed to update status");
    console.error(error);
  }
};
</script>
     
  <style scoped>
.modal-overlay {
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
}
.font-wb-md{
  margin: auto;
}
.font-wb, .font-wb-md, .bold{
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
.text-success-t{
    color: #26a49c;
  }
.page-background {
  min-height: 90vh;
  height: fit-content;
  color: #333;
  padding: 20px;
}
</style>
  