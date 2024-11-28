<template>
  <div class="app-container">
    <nav
      :class="['sidebar', { collapsed: isCollapsed }]"
      class="bg-sidbar text-black p-3"
    >
      <h4 class="text-center d-flex align-items-center ms-2">
        <img
          v-if="!isCollapsed"
          src="../assets/logo.png"
          alt="logo"
          width="110px"
          height="109px"
        />
        <button @click="toggleSidebar" class="btn btn-link text-white">
          <i
            :class="isCollapsed ? 'fas fa-angle-right' : 'fas fa-angle-left'"
          ></i>
        </button>
      </h4>
      <ul class="nav flex-column mt-4" >
        <li class="nav-item" :title="$t('sidebar.dashboard')">
          <router-link to="/home" class="nav-link text-white " active-class="active-route">
            <i class="fas fa-tachometer-alt me-2"></i>
            <span v-if="!isCollapsed">{{ $t("sidebar.dashboard") }} </span>
          </router-link>
        </li>
        <li class="nav-item" v-if="trying == 'ADMIN'" :title="$t('user.users')">
          <router-link to="/listuser" class="nav-link text-white" active-class="active-route">
            <i class="fas fa-users me-2"></i>
            <span v-if="!isCollapsed">{{ $t("sidebar.users") }}</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="trying == 'ADMIN'" :title="$t('supplier.page.title')">
          <router-link to="/listsupplier" class="nav-link text-white" active-class="active-route">
            <i class="fas fa-truck me-2"></i>
            <span v-if="!isCollapsed">{{ $t("sidebar.suppliers") }}</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="trying == 'ADMIN'" :title="$t('product.title')">
          <router-link to="/listproduct" class="nav-link text-white" active-class="active-route">
            <i class="fas fa-box me-2"></i>
            <span v-if="!isCollapsed">{{ $t("sidebar.products") }}</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="trying == 'ADMIN'" :title="$t('reception.receptions')">
          <router-link to="/listreception" class="nav-link text-white" active-class="active-route">
            <i class="fas fa-archive me-2"></i>
            <span v-if="!isCollapsed">{{ $t("sidebar.receptions") }}</span>
          </router-link>
        </li>
        <li class="nav-item" :title="$t('sale.title')">
          <router-link to="/listsale" class="nav-link text-white" active-class="active-route">
            <i class="fas fa-shopping-cart me-2"></i>
            <span v-if="!isCollapsed">{{ $t("sidebar.sales") }}</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="trying == 'ADMIN'" :title="$t('mouvement.title')">
          <router-link to="/mouvements" class="nav-link text-white" active-class="active-route">
            <i class="fas fa-exchange-alt me-2"></i>
            <span v-if="!isCollapsed">{{ $t("sidebar.movements") }}</span>
          </router-link>
        </li>
        <li class="nav-item" v-if="trying == 'ADMIN'" :title="$t('inventory.title')">
          <router-link to="/listinventories" class="nav-link text-white" active-class="active-route">
            <i class="fas fa-th-list me-2"></i>
            <span v-if="!isCollapsed">{{ $t("sidebar.inventories") }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

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
              <span class="fas fa-bars"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>
              <div class="d-flex text-white me-5">
                <h4 class="text-center d-flex align-items-center me-3">
                  <div class="dropdown">
                    <i
                      class="fas fa-user me-2 user-icon dropdown-toggle"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style="cursor: pointer"
                    ></i>
                    <ul class="dropdown-menu" aria-labelledby="userDropdown">
                      <li>
                        <a @click="goToProfile" class="dropdown-item" ><i class="fas fa-user-edit me-2"></i>
                          {{ $t("sidebar.profile") }}</a>
                      </li>
                      <li>
                        <a @click="goToChangePassword" class="dropdown-item" ><i class="fas fa-key me-2"></i>{{ $t("sidebar.password") }}</a>
                      </li>
                      <li>
                        <a @click="handleLogoClick" class="dropdown-item" ><i class="fas fa-sign-out-alt me-2"></i>
                          {{ $t("sidebar.logout") }}</a>
                      </li>
                    </ul>
                  </div>
                  <span class="fw-bold ">{{ store.userName || "" }}</span>
                </h4>
                <select
                  name="lang"
                  id="lang"
                  @change="changeLanguage($event.target.value)"
                  class="language-select"
                >
                  <option value="en">{{ $t("language.en") }}</option>
                  <option value="fr">{{ $t("language.fr") }}</option>
                  <option value="ar">{{ $t("language.ar") }}</option>
                </select>
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
import { usePosStore } from "@/stores/pos";
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { proxy } = getCurrentInstance();
// const affiche = ref(false)
const changeLanguage = (locale) => {
  proxy.$i18n.locale = locale;
};
const store = usePosStore();
const isCollapsed = ref(false);
const trying = store.role

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
}; 
const handleLogoClick = async() => {
  // const confirmation = confirm("Are you sure want to logout");
  const confirmation = confirm(t("sidebar.confirmation"));
  if (confirmation) {
  await store.logout();
  proxy.$router.push('/');
  }
};

onMounted(async () => {
  await store.initAuth();
  console.log("Nom d'utilisateur après initAuth:", store.userName);
});

const goToProfile = () => {
  proxy.$router.push('/edituser');
};
const goToChangePassword = () => {
  proxy.$router.push('/change-password');
};
</script>
  
  <style scoped>
.navbar-bg {
  /* background-color: #242d32; */
  /* height: 60px; */
  /* background-color: #3b5998; */
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #137dbb;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.3);
}
.nav-link.active-route {
  background-color: #137dbb;
  color: white !important;
  border-radius: 4px;
}

.bg-sidbar {
  box-shadow: 5px 0 5px -5px rgba(0, 0, 0, 0.3);
  background-color: #2c3940;
}
.text-success-t {
  color: #26a49c;
}
.user-icon {
  font-size: 24px;
}
.navbar-toggler-icon {
  background-color: white;  
}
.app-container {
  display: flex;
  min-height: 100vh;
}
.decon{
  cursor: pointer;
}
.sidebar {
  width: 210px;
  height: 100vh;
  position: fixed;
  top: 53px;
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
.language-select {
  /* color: #26a49c; */
  color: #137dbb;
  /* border-color: #26a49c; */
  border-color: #137dbb;
  border-radius: 8px;
  padding-left: 5px;
}

.language-select option {
  /* color: #26a49c; */
  color: #137dbb;
}

.language-select:focus {
  outline: none;
  /* border-color: #26a49c; */
  border-color: #137dbb;
  /* box-shadow: 0 0 5px #26a49c; */
  box-shadow: 0 0 5px #137dbb;
}

.user-icon {
  font-size: 24px;
  cursor: pointer;
}
.dropdown-item{
  cursor: pointer;
}
.dropdown-menu{
  top:40px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: #f8f9fa;
}
.dropdown-menu:hover li{
  background-color: #ffffff;
}
</style>
  