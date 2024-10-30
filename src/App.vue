<template>
    <!-- <div class="app-container"> -->
      <!-- <nav :class="['sidebar', { 'collapsed': isCollapsed }]" class="bg-dark text-white p-3">
        <h2 class="text-center d-flex align-items-center">
          <span v-if="!isCollapsed">Admin</span>
          <button @click="toggleSidebar" class="btn btn-link text-white ms-2">
            <i :class="isCollapsed ? 'fas fa-angle-right' : 'fas fa-angle-left'"></i>
          </button>
        </h2>
        <ul class="nav flex-column mt-4">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link text-white">
              <i class="fas fa-tachometer-alt me-2"></i>
              <span v-if="!isCollapsed">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/users" class="nav-link text-white">
              <i class="fas fa-users me-2"></i>
              <span v-if="!isCollapsed">Users</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/listsupplier" class="nav-link text-white">
              <i class="fas fa-truck me-2"></i>
              <span v-if="!isCollapsed">Suppliers</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link text-white">
              <i class="fas fa-box me-2"></i>
              <span v-if="!isCollapsed">Products</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/receptions" class="nav-link text-white">
              <i class="fas fa-archive me-2"></i>
              <span v-if="!isCollapsed">Receptions</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sales" class="nav-link text-white">
              <i class="fas fa-shopping-cart me-2"></i>
              <span v-if="!isCollapsed">Sales</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/movements" class="nav-link text-white">
              <i class="fas fa-exchange-alt me-2"></i>
              <span v-if="!isCollapsed">Movements</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/inventories" class="nav-link text-white">
              <i class="fas fa-th-list me-2"></i>
              <span v-if="!isCollapsed">Inventories</span>
            </router-link>
          </li>
        </ul>
      </nav> -->
  
      <!-- Contenu principal à droite -->
      <!-- <div class="main-content">
        <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark ">
        <div class="container-fluid">
          <RouterLink to="/" class="navbar-brand text-white">Logo</RouterLink>
          <button 
            class="navbar-toggler text-white" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink to="/" class="nav-link text-white">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/about" class="nav-link text-white">About</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/services" class="nav-link text-white">Services</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/contact" class="nav-link text-white">Contact</RouterLink>
              </li>
            </ul>
            <div class="d-flex">
              <button class="btn btn-outline-primary me-2">Login</button>
              <button class="btn btn-primary">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>
    </header>

        <RouterView />
      </div> -->
      
    <!-- </div> -->
     <div> 
      <RouterView />
     </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const isCollapsed = ref(false);
  
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  import { usePosStore } from "@/stores/pos";

  const store = usePosStore();

  onMounted(() => {
    store.initAuth(); // Initialise le token pour toutes les requêtes axios
  });
  </script>
  
  <style scoped>
  .app-container {
    display: flex;
    min-height: 100vh;
  }
  
  .sidebar {
    width: 250px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transition: width 0.3s;
  }
  
  .sidebar.collapsed {
    width: 80px;
  }
  
  .sidebar.collapsed .nav-link span {
    display: none;
  }
  
  .nav-link i {
    margin-right: 8px;
  }
  
  .main-content {
    flex: 1;
    margin-left: 234px;
    margin-top: -16px;
    padding: 1rem;
    background-color: #f8f9fa;
    transition: margin-left 0.3s;
  }
  
  .sidebar.collapsed + .main-content {
    margin-left: 63px;
  }
  </style>
  