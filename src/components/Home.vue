<template>
  <div class="container">
    <div class="container mt-home">
      <div class="row justify-content-center g-0">
        <div class="col-md-3 custom-col " v-if="trying == 'ADMIN'">
          <div class="card1 card text-dark mb-3 text-center shadow product-card">
            <div class="card-body">
              <h3 class="card-title">{{ totalProduct }}</h3>
              <p class="card-text">{{ $t("totalProduct") }}</p>
            </div>
          </div>
        </div>

        <div class="col-md-3 custom-col ">
          <div class="card1 card text-dark mb-3 text-center shadow sale-card">
            <div class="card-body">
              <h3 class="card-title">{{ totalSale }}</h3>
              <p class="card-text">{{ $t("totalSale") }}</p>
            </div>
          </div>
        </div>

        <div class="col-md-3 custom-col " v-if="trying == 'ADMIN'">
          <div class="card1 card text-dark mb-3 text-center shadow user-card">
            <div class="card-body">
              <h3 class="card-title">{{ totalUsers }}</h3>
              <p class="card-text">{{ $t("totalUser") }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 custom-col" v-if="trying == 'ADMIN'">
          <div class="card1 card text-dark mb-3 text-center shadow cp-card">
            <div class="card-body">
              <h3 class="card-title">{{ cp.length }}</h3>
              <p class="card-text">{{ $t("product.criticalP") }}</p>
            </div>
          </div>
        </div>
        
        
      </div>
      
      <div class="row justify-content-center mt-4 graph">
        <div class="col-md-3 custom-col  mt-5 me-5" v-if="trying == 'ADMIN'">
          <div class="card1 card text-dark mb-3 text-center shadow ca-card">
            <div class="card-body">
              <h3 class="card-title">{{ chiffreAffaires }}</h3>
              <p class="card-text">{{ $t("product.ca") }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-8 chart">
          <canvas id="totalsChart"></canvas>
        </div>
      </div>
      

      <div class="card shadow mt-5 table-width" v-if="trying == 'ADMIN'">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h2 class="m-0 font-weight-bold text-success-t bold">
            {{ $t("product.criticalP") }}
          </h2>
        </div>
        <div class="card-body ">
          <div class="table-responsive table-width">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
            <thead>
                    <tr>
                      <th>{{ $t("product.id") }}</th>
                      <th>{{ $t("product.name") }}</th>
                      <th>{{ $t("product.stock") }}</th>
                      <th>{{ $t("product.seuil") }}</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="product in criticalProduct" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.stock }}</td>
                    <td>{{ product.seuil }}</td>
                 </tr>
                </tbody>
            </table>
          </div>
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
const totalProduct = computed(() => store.productsActif.length);
const totalSale = computed(() => store.sales.length);
const totalUsers = computed(() => store.usersActif.length);

const chartRef = ref(null);
let chartInstance = null;
const productMonthlyData = ref(Array(12).fill(0));
const saleMonthlyData = ref(Array(12).fill(0)); 
const userMonthlyData = ref(Array(12).fill(0)); 
let cp = ref([]);
const criticalProduct = computed(() =>
 cp.value = store.products.filter((product) => product.stock <= product.seuil),
);

const chiffreAffaires = computed(() => {
  const total = store.sales.reduce((total, sale) => {
    return (
      total +
      sale.sale_details.reduce((subtotal, detail) => {
        const price = parseFloat(detail.price); 
        const quantity = detail.sale_quantity;
        return subtotal + price * quantity;
      }, 0)
    );
  }, 0);

  const formatter = new Intl.NumberFormat('fr-MU', {  
    style: 'currency',
    currency: 'MRU',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(total);
});


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
          label: t('home.sale'),
          data: saleMonthlyData.value, 
          borderColor: "green",
          backgroundColor: "rgba(15, 90, 95, 0.1)",

          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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

.container{
  max-width: 1120px;;
}
.col-md-8 {
  max-width: 500px;  
  height: 250px;     
}

.chart{
  margin-left: 40px;
  /* width: 700px; */
}

.graph{
  width: 100%;
  margin: auto;
}
.bold{
  font-size: bold;
}
.card1 {
  border-radius: 8px;
  transition: transform 0.2s;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80px 80px;
  background-blend-mode: multiply;
  max-width: 170px;
}

.card1:hover {
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
  background-color: rgba(19, 125, 187, 0.07); 
border: 2px solid rgba(19, 125, 187, 0.35);

  background-image: url('../assets/packaging.png');
}
.product-card h3 {
  color: black;
  font-size: 25px;
}
.product-card p {
  color: black;
  font-weight: bold;
  margin-top:85px;
  font-size: 18px;
}

.sale-card {
  background-color: rgba(15, 90, 95, 0.07); 
  border: 3px solid rgba(15, 90, 95, 0.35);
  background-image: url('../assets/revenue.png'); 
}
.sale-card h3 {
  color: black;
  font-size: 25px;
}
.sale-card p {
  color: black;
  font-weight: bold;
  margin-top:85px;
  font-size: 18px;
}

.ca-card {
  background-color: rgba(59, 217, 169, 0.01); 
  border: 3px solid rgba(59, 217, 169, 0.35);
  background-image: url('../assets/ca.png'); 
  padding-top: 0px;
  max-width: 500px;
}
.ca-card h3 {
  color: green;
  font-size: 25px;
}
.ca-card p {
  color: green;
  font-weight: bold;
  margin-top:65px;
  font-size: 18px;
}

.cp-card {
  background-color: rgba(255, 0, 0, 0.02); 
  border: 3px solid rgba(255, 0, 0, 0.35);  

  background-image: url('../assets/alert.png'); 
  padding-top: 0px;
}
.cp-card h3 {
  font-size: 25px;  
  color: red;

}
.cp-card p {
  color: red;
  font-weight: bold;
  margin-top:85px;
  font-size: 18px;
}


.user-card {
  background-color: rgba(19, 125, 187, 0.07); 
  border: 3px solid rgba(19, 125, 187, 0.35);

  background-image: url('../assets/employee.png'); 
  padding-top: 0px;
}
.user-card h3 {
  color: black;
  font-size: 25px;
}
.user-card p {
  color: black;
  font-weight: bold;
  margin-top:85px;
  font-size: 18px;
}

.icon {
  font-size: 2rem;
  margin-top: 10px;
  display: block;
  color: #333;
}

.table-width{
  max-width: 800px;
  margin: auto;
  color: red;
}
th, td{
  color: red;
}
</style>
