<template>
  <div>
    <div class="page-background container bg-color sale-table">
      <RouterLink
        class="list text-decoration-none text-white fw-bold"
        to="/addsale"
      >
        <button
          class="clr btn text-white mb-4 fw-bold"
          v-if="affichebtn"
          @click="maskBtn"
        >
          {{ $t("sale.addSaleButton") }}
        </button>
      </RouterLink>

      <div class="card shadow mb-4 d-flex justify-content-between ">
        <Loader v-if="isLoading"/>
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h2 class="m-0 font-weight-bold text-success-t bold">
            {{ $t("sale.title") }}
          </h2>
          <form class="d-flex ms-auto">
              <input
                type="text"
                class="form-control me-2"
                v-model="store.searchSale"
                :placeholder="$t('sale.search')"
              />
            </form>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-bordered "
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>{{ $t("sale.columns.id") }}</th>
                  <th>{{ $t("sale.columns.creationDate") }}</th>
                  <th>{{ $t("sale.columns.saleDate") }}</th>
                  <th>{{ $t("sale.columns.customerName") }}</th>
                  <th v-if="closeEmail">{{ $t("sale.columns.customerEmail") }}</th>
                  <th>{{ $t("sale.columns.customerPhone") }}</th>
                  <th>{{ $t("sale.columns.createdBy") }}</th>
                  <th class="text-center">{{ $t("sale.columns.actions") }}</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr v-for="sale in store.sales" :key="sale.id"> -->
                <tr v-for="sale in store.getFilteredSales()" :key="sale.id">
                  <td>{{ sale.id }}</td>
                  <td>{{ new Date(sale.created_at).toLocaleDateString() }}</td>
                  <td>{{ new Date(sale.sale_at).toLocaleDateString() }}</td>
                  <td>{{ sale.name }}</td>
                  <td v-if="closeEmail">{{ sale.email }}</td>
                  <td>{{ sale.phone }}</td>
                  <td>{{ sale.user_name }}</td>

                  <td class="text-center">
                    <button class="btn btn-sm" @click="openModal(sale)">
                      <i
                        class="fa-solid fa-eye"
                        style="color: #26a49c; font-size: 19px"
                      ></i>
                    </button>
                    <button class="btn btn-sm" @click="destroySale(sale.id)">
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
          <h5 class="font-wb-md mt-3">{{ $t("sale.modal.title") }}</h5>
        </div>
        <div class="modal-body">
          <table class="table table-bordered ">
            <thead>
              <tr>
                <th>{{ $t("sale.modal.product") }}</th>
                <th>{{ $t("sale.modal.price") }}</th>
                <th>{{ $t("sale.modal.quantity") }}</th>
                <th>{{ $t("sale.modal.amount") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="detail in selectedSale.sale_details" :key="detail.id">
                <td>{{ detail.product_name }}</td>
                <td>{{ detail.price }}</td>
                <td>{{ detail.sale_quantity }}</td>
                <td>{{ detail.amount }}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between">
            <div class="total-amount text-end">
            <strong>{{ $t("sale.modal.totalAmount") }}: </strong>
            {{ calculateTotalAmount(selectedSale.sale_details) }}
          </div>
          <button class="btn btn-danger text-white font-wb" @click="closeModal">
          {{ $t("sale.modal.closeButton") }}
        </button>
          </div>
         
        </div>
        
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { usePosStore } from "@/stores/pos";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import Loader from "../Loader.vue";
const { t } = useI18n();
const store = usePosStore()
const closeEmail = ref(true);
const isLoading = ref(true)
const checkScreenWidth = () => {
  closeEmail.value = window.innerWidth >= 995;
};
let affichebtn = true;
const maskBtn = () => {
  affichebtn = false;
};
const isModalVisible = ref(false);
const selectedSale = ref(null);
const openModal = (sale) => {
  selectedSale.value = sale;
  isModalVisible.value = true;
};

const closeModal = () => { 
  isModalVisible.value = false;
};
// const calculateTotalAmount = (details) => {
//   return details.reduce((total, detail) => {
//     return total + parseFloat(detail.amount);
//   }, 0);
// };
const calculateTotalAmount = (details) => {
  const totalAmount = details.reduce((total, detail) => {
    return total + parseFloat(detail.amount);
  }, 0);

  // Formatage du montant total en utilisant Intl.NumberFormat
  const formatter = new Intl.NumberFormat('fr-MU', {  // Utilisation de 'fr-MU' pour la Mauritanie
    style: 'currency',
    currency: 'MRU',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(totalAmount);
};

onMounted(async () => {
  try {
    isLoading.value= true
    await store.loadDataFromSaleApi();
    window.addEventListener('resize', checkScreenWidth);
    // await new Promise((resolve)=> setTimeout(resolve, 1000))
  } catch (error) {
    console.log(error);
  }finally{
    isLoading.value= false
  }
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenWidth);
});
const destroySale = (id) => {
  const confirmation = confirm(t("sale.deleteConfirmation"));
  if (confirmation) {
    store.destroySale(id);
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
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
}

.text-success-t {
  /* color: #26a49c; */
  color: #137dbb;
}
.font-wb-md {
  margin: auto;
}
.font-wb,
.font-wb-md,
.bold {
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


@media (max-width: 995px) {
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
  