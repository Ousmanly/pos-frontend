<template>
  <div>
    <div class="page-background container bg-color">
      <RouterLink
        class="list text-decoration-none text-white fw-bold"
        to="/addreception"
      >
        <button
          class="clr btn text-white mb-4 fw-bold"
          v-if="affichebtn"
          @click="maskBtn"
        >
        {{ $t("reception.addReception") }}
        </button>
      </RouterLink>
    
      <div class="card shadow mb-4">
    <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h2 class="m-0 font-weight-bold text-success-t bold">
            {{ $t("reception.receptions") }}
          </h2>
          <Loader v-if="isLoading"/>
          <form class="ms-auto">
              <p class="text-success-t bold">{{ $t("reception.search") }}</p>
              <input
                type="date"
                class="form-control me-2"
                v-model="store.searchQuery"
              />
            </form>
        </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                      <th>{{ $t("reception.id") }}</th>
                      <th>{{ $t("reception.createdAt") }}</th>
                      <th>{{ $t("reception.receptedAt") }}</th>
                      <th>{{ $t("reception.supplierName") }}</th>
                      <th>{{ $t("reception.supplierPhone") }}</th>
                      <th>{{ $t("reception.createdBy") }}</th>
                      <th class="text-center">{{ $t("reception.actions") }}</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="reception in store.getFilteredReceptions()" :key="reception.id">
                    <td>{{ reception.id }}</td>
                    <td>{{ new Date(reception.created_at).toLocaleDateString() }}</td>
                    <td>{{new Date(reception.recepted_at).toLocaleDateString() }}</td>
                    <td>{{ reception.supplier_name }}</td>
                    <td>{{ reception.supplier_phone }}</td>
                    <td>{{ reception.user_name }}</td>

                    <td class="text-center">
                      <button class="btn btn-sm" @click="openModal(reception)">
                        <i
                          class="fa-solid fa-eye"
                          style="color: #26a49c; font-size: 19px"
                        ></i>
                      </button>
                      <button
                        class="btn btn-sm"
                        @click="destroyReception(reception.id)"
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
          <h5 class="font-wb-md mt-3">{{ $t("reception.detailsReception") }}</h5>
        </div>
        <div class="modal-body">
          <table class="table table-bordered ">
            <thead>
              <tr>
                <th>{{ $t("reception.product") }}</th>
                <th>{{ $t("reception.price") }}</th>
                <th>{{ $t("reception.quantity") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="detail in selectedReception.reception_details" :key="detail.id">
                <td>{{ detail.product_name }}</td>
                <td>{{ detail.price }}</td>
                <td>{{ detail.quantity }}</td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-danger text-white font-wb" @click="closeModal">
            {{ $t("reception.close") }}
        </button>
         
        </div>
        
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { usePosStore } from "@/stores/pos";
import { onMounted, ref } from "vue";
import { useToast } from 'vue-toastification';
import { useI18n } from "vue-i18n";
import Loader from "../Loader.vue";
const isLoading = ref(true)

const { t } = useI18n();
const toast = useToast()
const store = usePosStore();
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
let affichebtn = true;
const maskBtn = () => {
  affichebtn = false;
};
const isModalVisible = ref(false);
const selectedReception = ref(null);
const openModal = (reception) => {
  selectedReception.value = reception;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(async () => {
  try {
    isLoading.value= true
    await store.loadDataFromReceptionApi();
    await new Promise((resolve)=> setTimeout(resolve, 1000))
  } catch (error) {
    console.log(error);
  }finally{
    isLoading.value= false
  }
});
  const destroyReception = (id) => {
    const confirmation = confirm(t("reception.confirmDelete"));
    if (confirmation ) {
      store.destroyReception(id);
    }
  };
</script>
     
  <style scoped>
    .text-success-t{
    color: #26a49c;
  }

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
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
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
.page-background {
  min-height: 90vh;
  height: fit-content;
  color: #333;
  padding: 20px;
}
@media (max-width: 820px) {
  th, td{
    font-size: 13px;
  }
}
@media (max-width: 770px) {
  th, td{
    font-size: 10px;
  }
}
</style>
  