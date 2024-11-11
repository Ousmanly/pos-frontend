import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import ListSuppliers from '@/components/ListSuppliers.vue'
import SupplierView from '@/views/SupplierView.vue'
import AjoutSupplier from '@/components/suppliers/AjoutSupplier.vue'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Login.vue'
import ModifySuppliers from '@/components/suppliers/ModifySuppliers.vue'
import UserView from '@/views/UserView.vue'
import AddUser from '@/components/users/AddUser.vue'
import ModifyUsers from '@/components/users/ModifyUsers.vue'
import ProductView from '@/views/ProductView.vue'
import AddProduct from '@/components/products/AddProduct.vue'
import ModifyProduct from '@/components/products/ModifyProduct.vue'
import ReceptionView from '@/views/ReceptionView.vue'
import AddReception from '@/components/receptions/AddReception.vue'
import MouvementView from '@/views/MouvementView.vue'
import SaleView from '@/views/SaleView.vue'
import AddSale from '@/components/sales/AddSale.vue'
import InventoryView from '@/views/InventoryView.vue'
import AddInventory from '@/components/inventories/AddInventory.vue'
import { usePosStore } from '@/stores/pos'
import ForgotPassword from '@/components/ForgotPassword.vue'
import ResetPassword from '@/components/ResetPassword.vue'
import EditCurrentUser from '@/components/users/EditCurrent!user.vue'
import ChangePasswordVue from '@/components/ChangePassword.vue.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    //   beforeEnter: (to, from, next) => {
    //   const store = usePosStore();
    //   // Vérifiez si l'utilisateur est connecté
    //   if (to.meta.requiresAuth && !store.isAuthenticated) {
    //     next("/home"); // Autoriser l'accès à la route
    //   } else {
    //     next(); // Rediriger vers la page de connexion
    //   }
    // },
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/listsupplier',
          name: 'listsupplier',
          component: SupplierView
        },
        {
          path: '/ajoutsupplier',
          name: 'ajoutsupplier',
          component: AjoutSupplier
        },
        {
          path: "/modifie-supplier/:id",
          component: ModifySuppliers,
          props: true,
        },
        {
          path: '/listuser',
          name: 'listuser',
          component: UserView
        },
        {
          path: '/adduser',
          name: 'adduser',
          component: AddUser
        },
        {
          path: "/modifie-user/:id",
          component: ModifyUsers,
          props: true,
        },
        {
          path: '/listproduct',
          name: 'listproduct',
          component: ProductView
        },
        {
          path: '/addproduct',
          name: 'addproduct',
          component: AddProduct
        },
        {
          path: "/modifie-product/:id",
          component: ModifyProduct,
          props: true,
        },
        {
          path: '/listreception',
          name: 'listreception',
          component: ReceptionView
        },
        {
          path: '/addreception',
          name: 'addreception',
          component: AddReception
        },
        {
          path: '/mouvements',
          name: 'mouvements',
          component: MouvementView
        },
        {
          path: '/listsale',
          name: 'listsale',
          component: SaleView
        },
        {
          path: '/addsale',
          name: 'addsale',
          component: AddSale
        },
        {
          path: '/listinventories',
          name: 'listinventories',
          component: InventoryView
        },
        {
          path: '/addinventories',
          name: 'addinventories',
          component: AddInventory
        },
        {
          path: '/edituser',
          name: 'edituser',
          component: EditCurrentUser
        },
      ]
    },
    
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component:ResetPassword
    },
    {
      path: '/change-password',
      name: 'change-password',
      component:ChangePasswordVue
    },
    
  ]
})
router.beforeEach(async(to, from, next) => {
  const store = usePosStore();
  await store.initAuth();
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});
export default router
