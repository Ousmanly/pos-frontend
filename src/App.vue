<template>
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
  