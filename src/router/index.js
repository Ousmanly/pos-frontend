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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
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
      ]
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/listsupplier',
    //   name: 'listsupplier',
    //   component: SupplierView
    // },
    // {
    //   path: '/ajoutsupplier',
    //   name: 'ajoutsupplier',
    //   component: AjoutSupplier
    // },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: Dashboard
    // },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
