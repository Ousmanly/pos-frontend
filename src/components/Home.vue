<template>
  <div class="container">
    <div class="container mt-home">
      <div class="row">
        <div class="col-md-3">
          <div class="card text-dark bg-primary-light mb-3 text-center shadow">
            <div class="card-body">
              <h3 class="card-title">0</h3>
              <p class="card-text">Total Products</p>
              <!-- Icône de panier pour les produits -->
              <i class="bi bi-cart3 icon"></i>
              <a href="#" class="text-dark">More info <i class="bi bi-arrow-right-circle"></i></a>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card text-dark bg-success-light mb-3 text-center shadow">
            <div class="card-body">
              <h3 class="card-title">0</h3>
              <p class="card-text">Total Paid Orders</p>
              <!-- Icône de reçu pour les commandes payées -->
              <i class="bi bi-receipt icon"></i>
              <a href="#" class="text-dark">More info <i class="bi bi-arrow-right-circle"></i></a>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card text-dark bg-warning-light mb-3 text-center shadow">
            <div class="card-body">
              <h3 class="card-title">1</h3>
              <p class="card-text">Total Users</p>
              <!-- Icône d'utilisateur pour le nombre d'utilisateurs -->
              <i class="bi bi-people icon"></i>
              <a href="#" class="text-dark">More info <i class="bi bi-arrow-right-circle"></i></a>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card text-dark bg-danger-light mb-3 text-center shadow">
            <div class="card-body">
              <h3 class="card-title">0</h3>
              <p class="card-text">Total Stores</p>
              <!-- Icône de bâtiment pour les magasins -->
              <i class="bi bi-shop icon"></i>
              <a href="#" class="text-dark">More info <i class="bi bi-arrow-right-circle"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Ajout d'une marge en haut */
.mt-home {
  margin-top: 100px;
}

/* Styles pour les cartes */
.card {
  border-radius: 8px;
  transition: transform 0.2s;
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

/* Style des icônes */
.icon {
  font-size: 2rem;
  margin-top: 10px;
  display: block;
  color: #333;
}

/* Couleurs personnalisées avec opacité */
.bg-primary-light {
  background-color: rgba(0, 123, 255, 0.6); /* Bleu avec opacité de 60% */
}

.bg-success-light {
  background-color: rgba(40, 167, 69, 0.6); /* Vert avec opacité de 60% */
}

.bg-warning-light {
  background-color: rgba(255, 193, 7, 0.6); /* Jaune avec opacité de 60% */
}

.bg-danger-light {
  background-color: rgba(220, 53, 69, 0.6); /* Rouge avec opacité de 60% */
}

/* Style pour les liens en texte sombre */
a.text-dark {
  color: #333;
}

a.text-dark:hover {
  color: #000;
}
</style>
