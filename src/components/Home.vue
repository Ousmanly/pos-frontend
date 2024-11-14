<template>
  <div class="container">
    <div class="container mt-home">
      <div class="row justify-content-center">
        <div class="col-md-3 me-3" v-if="trying == 'ADMIN'">
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

        <div class="col-md-3" v-if="trying == 'ADMIN'">
          <div class="card text-dark mb-3 text-center shadow user-card">
            <div class="card-body">
              <h3 class="card-title">{{ totalUsers }}</h3>
              <p class="card-text">{{ $t("totalUser") }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row justify-content-center mt-5">
        <div class="col-md-8">
          <canvas id="totalsChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePosStore } from '@/stores/pos';
import { computed, onMounted, ref } from 'vue';
import { Chart,registerables} from 'chart.js';
import { useI18n } from "vue-i18n";

const { t } = useI18n();
Chart.register(...registerables);
const store = usePosStore();
const trying = store.role
const totalProduct = computed(() => store.products.length);
const totalSale = computed(() => store.sales.length);
const totalUsers = computed(() => store.users.length);

const chartRef = ref(null);
let chartInstance = null;
const productMonthlyData = ref(Array(12).fill(0));
const saleMonthlyData = ref(Array(12).fill(0)); 
const userMonthlyData = ref(Array(12).fill(0)); 
const createChart = () => {
  const ctx = document.getElementById('totalsChart').getContext('2d');
  chartInstance  = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        t('months.Jan'),
        t('months.Feb'),
        t('months.Mar'),
        t('months.Apr'),
        t('months.May'),
        t('months.Jun'),
        t('months.Jul'),
        t('months.Aug'),
        t('months.Sep'),
        t('months.Oct'),
        t('months.Nov'),
        t('months.Dec'),
      ],
      datasets: [
        {
          label: t('home.product'),
          data: productMonthlyData.value, 
          borderColor: "rgba(47, 178, 150, 1)",
          backgroundColor: "rgba(0, 123, 255, 0.1)",
          fill: true,
        },
        {
          label: t('home.sale'),
          data: saleMonthlyData.value, 
          borderColor: "rgba(15, 90, 95, 1)",
          backgroundColor: "rgba(40, 167, 69, 0.1)",
          fill: true,
        },
        {
          label: t('home.users'),
          data: userMonthlyData.value, 
          borderColor: "rgba(15, 90, 95, 1);",
          backgroundColor: "rgba(40, 167, 69, 0.1)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};


function updateMonthlyData() {
  const currentMonth = new Date().getMonth(); 

  productMonthlyData.value[currentMonth] = totalProduct.value;
  saleMonthlyData.value[currentMonth] = totalSale.value;
  userMonthlyData.value[currentMonth] = totalUsers.value;

  if (chartInstance) {
    chartInstance.update();
  }
}
onMounted(() => {
  store.loadDataFromProductApi();
  store.loadDataFromSaleApi();
  store.loadDataFromUserApi();

  createChart();
  updateMonthlyData();
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
}
.user-card p {
  color: black;
  font-weight: bold;
  margin-top:45px;
  font-size: 25px;
}

.icon {
  font-size: 2rem;
  margin-top: 10px;
  display: block;
  color: #333;
}
</style>
