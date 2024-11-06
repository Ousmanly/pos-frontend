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
          {{ $t("sale.title") }}
        </button>
      </RouterLink>

      <div class="card shadow mb-4 d-flex justify-content-between ">
        <div class="card-header py-3">
          <h2 class="m-0 font-weight-bold text-success-t bold">
            {{ $t("sale.title") }}
          </h2>
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
                <tr v-for="sale in store.sales" :key="sale.id">
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

    <!-- <div class="sale-card">
      <RouterLink
        class="list text-decoration-none text-white fw-bold"
        to="/addsale"
      >
        <button
          class="clr btn text-white mb-4 fw-bold"
          v-if="affichebtn"
          @click="maskBtn"
        >
          {{ $t("sale.title") }}
        </button>
      </RouterLink>
      <div  v-for="sale in store.sales" :key="sale.id">
        <div class="card sale-card-content">
                <div class="card-body">
                  <p><strong>{{ $t("sale.columns.id") }}: </strong>{{ sale.id }}</p>
                  <p><strong>{{ $t("sale.columns.creationDate") }}: </strong>{{ new Date(sale.created_at).toLocaleDateString() }}</p>
                  <p><strong>{{ $t("sale.columns.saleDate") }}: </strong>{{ new Date(sale.sale_at).toLocaleDateString() }}</p>
                  <p><strong>{{ $t("sale.columns.customerName") }}: </strong>{{ sale.name }}</p>
                  <p><strong>{{ $t("sale.columns.customerEmail") }}: </strong>{{ sale.email }}</p>
                  <p><strong>{{ $t("sale.columns.customerPhone") }}: </strong>{{ sale.phone }}</p>
                  <p><strong>{{ $t("sale.columns.createdBy") }}: </strong>{{ sale.user_name }}</p>
                  <div class="card-actions">
                    <button class="btn btn-sm" @click="openModal(sale)">
                      <i class="fa-solid fa-eye" style="color: #26a49c; font-size: 19px"></i>
                    </button>
                    <button class="btn btn-sm" @click="destroySale(sale.id)">
                      <i class="fa-solid fa-trash" style="color: #e30d0d; font-size: 19px"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
      </div> -->
              

    <!-- <div v-if="isModalVisible" class="modal-overlay d-flex" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h5 class="font-wb-md mt-3">{{ $t("sale.modal.title") }}</h5>
        </div>
        <div class="modal-body">
          <div v-for="detail in selectedSale.sale_details" :key="detail">
            <p>
              <strong>{{ $t("sale.modal.product") }}: </strong>
              {{ detail.product_name }}
            </p>
            <p>
              <strong>{{ $t("sale.modal.price") }}: </strong> {{ detail.price }}
            </p>
            <p>
              <strong>{{ $t("sale.modal.quantity") }}: </strong>
              {{ detail.sale_quantity }}
            </p>
            <p>
              <strong>{{ $t("sale.modal.amount") }}: </strong>
              {{ detail.amount }}
            </p>
          </div>
        </div>
        <button class="btn btn-danger text-white font-wb" @click="closeModal">
          {{ $t("sale.modal.closeButton") }}
        </button>
      </div>
    </div> -->
     <!-- Modal for Sale details (Invoice style) -->
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
            {{ calculateTotalAmount(selectedSale.sale_details) }} MRU 
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

const { t } = useI18n();
const store = usePosStore()
const closeEmail = ref(true);

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
const calculateTotalAmount = (details) => {
  return details.reduce((total, detail) => {
    return total + parseInt(detail.amount);
  }, 0);
};
onMounted(async () => {
  await store.loadDataFromSaleApi();
  window.addEventListener('resize', checkScreenWidth);
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
  color: #26a49c;
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


/* .sale-card {
  display: none;
} */

/* .sale-card-content {
  margin: auto;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  width: fit-content;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
} */

/* Responsive Styles for screens smaller than 700px */
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
  