<template>
    <div>
      <div class="page-background container bg-color">
        <RouterLink
          class="list text-decoration-none text-white fw-bold"
          to="/addinventories"
        >
          <button
            class="clr btn text-white mb-4 fw-bold"
            v-if="affichebtn"
            @click="maskBtn"
          >
            Make an inventory
          </button>
        </RouterLink>
      
        <div class="card shadow mb-4">
      <div class="card-header py-3">
          <h2 class="m-0 font-weight-bold text-success-t bold">Inventories</h2>
      </div>
      <div class="card-body">
          <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                      <tr>
                        <th>Id</th>
                        <th>Remarque</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th class="text-center">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr v-for="inventory in store.inventories" :key="inventory.id">
                      <td>{{ inventory.id }}</td>
                      <td>{{ inventory.remarque }}</td>
                      <td>{{ inventory.product_name }}</td>
                      <td>{{ inventory.quantity }}</td>
                      <td class="text-center">
                        <button class="btn btn-sm" @click="openModal(inventory)">
                          <i
                            class="fa-solid fa-eye"
                            style="color: #26a49c; font-size: 19px"
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
      <!-- <div v-if="isModalVisible" class="modal-overlay d-flex" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h5 class="font-wb-md mt-3">Inventory details</h5>
          </div>
          <div class="modal-body">
            
            <p>
              <strong>Product: </strong> {{ selectedInventory.product_name }}
            </p>
            <p>
              <strong>Quantity: </strong> {{ selectedInventory.quantity }}
            </p>
          </div>
          <button class="btn btn-danger text-white font-wb" @click="closeModal">
            Close
          </button>
        </div>
      </div> -->
      <div v-if="isModalVisible" class="modal-overlay d-flex align-items-center justify-content-center" @click="closeModal">
  <div class="modal-content card shadow-lg p-4 rounded" style="width: 450px;" @click.stop>
    <div class="card-header bg-dark text-white text-center rounded-top" style="height: 40px;">
      <h5 class="font-weight-bold-p text-center">Inventory details</h5>
    </div>
    <div class="card-body">
      <table class="table table-bordered table-sm">
        <tbody>
          <tr>
            <th>Product</th>
            <td>{{ selectedInventory.product_name }}</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>{{ selectedInventory.quantity }}</td>
          </tr>
          <tr>
            <th>Created By</th>
            <td>{{ selectedInventory.user_name }}</td>
          </tr>
          <tr>
            <th>Created at</th>
            <td>{{ new Date(selectedInventory.created_at).toLocaleDateString() }}</td>
          </tr>
          
        </tbody>
      </table>
    </div>
    <div class="card-footer text-right">
      <button class="btn btn-outline-secondary font-weight-bold" @click="closeModal">Close</button>
    </div>
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
  const selectedInventory = ref(null);
  const openModal = (inventory) => {
    selectedInventory.value = inventory;
    isModalVisible.value = true;
  };
  
  const closeModal = () => {
    isModalVisible.value = false;
  };
  
  onMounted(async () => {
    await store.loadDataFromInventoryApi();
  });
  </script>
       
    <style scoped>
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
  .font-wb-md{
    margin: auto;
  }
  .font-wb, .font-wb-md, .font-weight-bold-p, .bold{
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
  .text-success-t{
    color: #26a49c;
  }
  </style>
    