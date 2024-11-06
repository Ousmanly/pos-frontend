<template>
  <div class="container">
    <!-- <div class="container mt-home">
      <div class="row justify-content-center">
        <div class="col-md-3 me-3">
          <div class="card text-dark mb-3 text-center shadow product-card">
            <div class="card-body">
              <h3 class="card-title">0</h3>
              <p class="card-text">Total Products</p>
            </div>
          </div>
        </div>

        <div class="col-md-3 me-3">
          <div class="card text-dark mb-3 text-center shadow sale-card">
            <div class="card-body">
              <h3 class="card-title">0</h3>
              <p class="card-text">Total Sale</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card text-dark mb-3 text-center shadow user-card">
            <div class="card-body">
              <h3 class="card-title">1</h3>
              <p class="card-text">Total Users</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
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
  background-image: url('../assets/products.png');
}
.product-card h3 {
  color: white;
  margin-top: 30px;
}
.product-card p {
  color: black;
  font-weight: bold;
  margin-top:15px;
  font-size: 25px;
}

.sale-card {
  background-color: rgba(15, 90, 95, 0.1); 
  border: 3px solid rgba(15, 90, 95, 1);
  background-image: url('../assets/online-shopping.png'); 
}
.sale-card h3 {
  color: white;
  margin-top: 30px;
}
.sale-card p {
  color: black;
  font-weight: bold;
  margin-top:15px;
  font-size: 25px;
}

.user-card {
  background-color: rgba(59, 217, 169, 0.1); 
  border: 3px solid rgba(59, 217, 169, 1); 
  background-image: url('path/to/user-icon.png'); 
}
.user-card h3 {
  color: #3BD9A9;
}
.container {
  background-image: url('@/assets/pos5.jpg'); /* Ensure correct path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh; /* Ensures the container takes up the full screen height */
}

.icon {
  font-size: 2rem;
  margin-top: 10px;
  display: block;
  color: #333;
}
</style>
