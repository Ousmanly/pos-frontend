<template>
  <div class="container">
    <div class="container mt-home">
      <div class="row justify-content-center">
        <div class="col-md-3 me-3">
          <div class="card text-dark mb-3 text-center shadow product-card">
            <div class="card-body">
              <h3 class="card-title">{{ totalProduct }}</h3>
              <p class="card-text">{{ $t("totalProduct") }}</p>
            </div>
          </div>
        </div>

        <div class="col-md-3 me-3">
          <div class="card text-dark mb-3 text-center shadow sale-card">
            <div class="card-body">
              <h3 class="card-title">{{ totalSale }}</h3>
              <p class="card-text">{{ $t("totalSale") }}</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card text-dark mb-3 text-center shadow user-card">
            <div class="card-body">
              <h3 class="card-title">{{ totalUsers }}</h3>
              <p class="card-text">{{ $t("totalUser") }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePosStore } from '@/stores/pos';
import { computed, onMounted } from 'vue';
const store = usePosStore();

const totalProduct = computed(() => store.products.length);
const totalSale = computed(() => store.sales.length);
const totalUsers = computed(() => store.users.length);

onMounted(() => {
  store.loadDataFromProductApi();
  store.loadDataFromSaleApi();
  store.loadDataFromUserApi();
});
</script>

<style scoped>
.mt-home {
  margin-top: 100px;
}

.card {
  border-radius: 8px;
  transition: transform 0.2s;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80px 80px;
  background-blend-mode: multiply;
  /* height: 200px; */
}

.card:hover {
  transform: scale(1.05);
}

.card-title {
  font-size: 2.5rem;
  font-weight: bold;
}

.card-text {
  font-size: 1.2rem;
}

.product-card {
  background-color: rgba(47, 178, 150, 0.1); 
  border: 2px solid rgba(47, 178, 150, 1);
  background-image: url('../assets/packaging.png');
}
.product-card h3 {
  color: black;
  /* margin-top: 30px; */
}
.product-card p {
  color: black;
  font-weight: bold;
  margin-top:45px;
  font-size: 25px;
}

.sale-card {
  background-color: rgba(15, 90, 95, 0.1); 
  border: 3px solid rgba(15, 90, 95, 1);
  background-image: url('../assets/revenue.png'); 
}
.sale-card h3 {
  color: black;
  /* margin-top: 30px; */
}
.sale-card p {
  color: black;
  font-weight: bold;
  margin-top:45px;
  font-size: 25px;
}

.user-card {
  background-color: rgba(59, 217, 169, 0.1); 
  border: 3px solid rgba(59, 217, 169, 1); 
  background-image: url('../assets/employee.png'); 
  padding-top: 0px;
}
.user-card h3 {
  color: black;
  /* margin-top: 30px; */
}
.user-card p {
  color: black;
  font-weight: bold;
  margin-top:45px;
  font-size: 25px;
}
/* .container {
  background-image: url('@/assets/pos5.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
} */

.icon {
  font-size: 2rem;
  margin-top: 10px;
  display: block;
  color: #333;
}
</style>
