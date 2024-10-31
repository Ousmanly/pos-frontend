<template>
    <div class="app-container">
      <nav :class="['sidebar', { 'collapsed': isCollapsed }]" class="bg-sidbar text-black p-3">
        <h4 class="text-center d-flex align-items-center ms-2">
          <i class="fas fa-user me-2 user-icon"></i>
        <span v-if="!isCollapsed">{{ store.userName || 'Admin' }}</span>
        <button @click="toggleSidebar" class="btn btn-link text-black">
          <i :class="isCollapsed ? 'fas fa-angle-right' : 'fas fa-angle-left'"></i>
        </button>
      </h4>
        <ul class="nav flex-column mt-4">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link text-black">
              <i class="fas fa-tachometer-alt me-2"></i>
              <span v-if="!isCollapsed">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/listuser" class="nav-link text-black">
              <i class="fas fa-users me-2"></i>
              <span v-if="!isCollapsed">Users</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/listsupplier" class="nav-link text-black">
              <i class="fas fa-truck me-2"></i>
              <span v-if="!isCollapsed">Suppliers</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/listproduct" class="nav-link text-black">
              <i class="fas fa-box me-2"></i>
              <span v-if="!isCollapsed">Products</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/listreception" class="nav-link text-black">
              <i class="fas fa-archive me-2"></i>
              <span v-if="!isCollapsed">Receptions</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sales" class="nav-link text-black">
              <i class="fas fa-shopping-cart me-2"></i>
              <span v-if="!isCollapsed">Sales</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/movements" class="nav-link text-black">
              <i class="fas fa-exchange-alt me-2"></i>
              <span v-if="!isCollapsed">Movements</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/inventories" class="nav-link text-black">
              <i class="fas fa-th-list me-2"></i>
              <span v-if="!isCollapsed">Inventories</span>
            </router-link>
          </li>
        </ul>
      </nav>
  
      <!-- Contenu principal à droite -->
      <div class="main-content">
        <header>
          <nav class="navbar navbar-expand-lg navbar-bg fixed-top">
            <div class="container-fluid">
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
                  <li class="nav-item ms-5 text-white">
                    <img src="../assets/logo.png" alt="logo" width="90px" height="40px">
                  </li>
                </ul>
                <div class="d-flex text-white me-5">
                  <h4 class="text-center d-flex align-items-center">
                  <i class="fas fa-user me-2 user-icon"></i>
                    <span>{{ store.userName || 'Admin' }}</span>
                  </h4>
                </div>
              </div>
            </div>
          </nav>
         </header>
        
          <RouterView />
          
      </div>
    </div>
  </template>
  
  <script setup>
import { usePosStore } from '@/stores/pos';
import { onMounted, ref } from 'vue';
  const store = usePosStore()
  const isCollapsed = ref(false);
  
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  onMounted(async () => {
  await store.initAuth();  // Initialisez l'authentification et récupérez userName
  console.log("Nom d'utilisateur après initAuth:", store.userName);
});
  </script>
  
  <style scoped>
  .navbar-bg{
    background-color: #242d32;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.3);
    border-bottom-left-radius: 9%;
    border-bottom-right-radius: 9%;

  }
  .bg-sidbar{
    box-shadow: 5px 0 5px -5px rgba(0, 0, 0, 0.3);

  }
  .user-icon {
    font-size: 24px;
  }
  .app-container {
    display: flex;
    min-height: 100vh;
  }
  
  .sidebar {
    width: 200px;
    height: 100vh;
    position: fixed;
    top: 54px;
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
    margin-left: 200px;
    margin-top: -16px;
    padding: 1rem;
    background-color: #f8f9fa;
    transition: margin-left 0.3s;
  }
  
  .sidebar.collapsed + .main-content {
    margin-left: 63px;
  }
  </style>
  