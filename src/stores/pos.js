import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from 'vue-toastification';
const toast = useToast()
export const usePosStore = defineStore("pos", {
  state: () => ({
    suppliers: [],
    nextIdSup: 1,
    users: [],
    usersActif: [],
    nextIdUser: 1,
    products: [],
    productsActif: [],
    nextIdProd: 1,
    receptions: [],
    nextIdRecep: 1,
    mouvements: [],
    nextIdmvt: 1,
    sales: [],
    nextIdsale: 1,
    inventories: [],
    nextIdInvt: 1,
    isAuthenticated: false,
    userName: "",
    role: "",
    user: {},
    searchQuery: "",
    searchProduct: "",
    searchUser: "",
    searchSupplier: "",
    searchReception: "",
    searchSale: "",
  }),
  getters: {
    // Getter pour calculer le CA total
   
  },
  actions: {
    totalSalesAmount() {
      return this.sales.reduce((total, sale) => total + (sale.amount || 0), 0);
    },
    getFilteredSales() {
      return this.sales.filter(sale =>
        sale.name.toLowerCase().includes(this.searchSale.toLowerCase())
      )
      .sort((a, b) => b.id - a.id) 
    },
    // getFilteredReceptions() {
    //   return this.receptions
    //   .filter(reception =>
    //     reception.recepted_at.toLowerCase().includes(this.searchQuery.toLowerCase())
    //   );
    // },

    getFilteredReceptions() {
      return this.receptions
        .filter(reception =>
          reception.recepted_at.includes(this.searchReception.toLowerCase())
        )
        .sort((a, b) => b.id - a.id) 
    },
    
    getFilteredUsers() {
      return this.users
      .filter(user =>
        user.email.toLowerCase().includes(this.searchUser.toLowerCase())
      )
      .sort((a, b) => b.id - a.id) 
    },
    getFilteredSuppliers() {
      return this.suppliers.filter(supplier =>
        supplier.phone.toLowerCase().includes(this.searchSupplier.toLowerCase())
      )
      .sort((a, b) => b.id - a.id) 
    },
    getFilteredProduct() {
      return this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchProduct.toLowerCase())
      )
      .sort((a, b) => b.id - a.id) 
    },
    getFilteredMovement() {
      return this.mouvements.filter(mouvement =>
        mouvement.mouvement_at.includes(this.searchQuery)
      )
      .sort((a, b) => b.id - a.id) 
    },
    getFilteredInventory() {
      return this.inventories
      .sort((a, b) => b.id - a.id) 
    },
    async login(email, password) {
      try {
        const response = await axios.post("http://localhost:3005/api/login", { email, pass_word: password });
        const token = response.data.token;
        localStorage.setItem("token", token); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
        await this.fetchUserName();
        await this.fetchRole();
        return true;
      } catch (error) {
        console.error("Erreur de connexion :", error);
        return false;
      }
    },
    
    async initAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await this.fetchUserName();
        await this.fetchRole();
        this.isAuthenticated = true
      } else {
        console.warn("Aucun token trouvé dans le localStorage");
      }
    },    
    
    async fetchUserName() {
      try {
        const resp = await axios.get("http://localhost:3005/api/user");
        this.userName = resp.data.user.name || 'Utilisateur inconnu';
        this.user = resp.data.user;
      } catch (error) {
        console.error("Erreur lors de la récupération du nom d'utilisateur connecté :", error.response ? error.response.data : error);
      }
    },
    async fetchRole() {
      try {
        const resp = await axios.get("http://localhost:3005/api/user");
        this.role = resp.data.user.role;
        this.user = resp.data.user;
      } catch (error) {
        console.error("Erreur lors de la récupération du role d'utilisateur connecté :", error.response ? error.response.data : error);
      }
    },
    
    async logout() {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common['Authorization'];
      this.isAuthenticated = false;
      this.userName = "";
      toast.success("Déconnexion réussie!");
    },
  
    async updateUserStatus(userId, status) {
      try {
        await axios.put(`http://localhost:3005/api/users/${userId}/status`, { status });
      } catch (error) {
        throw error;
      }
    },  
    async updateSupplierStatus(supplierId, status) {
      try {
        await axios.put(`http://localhost:3005/api/suppliers/${supplierId}/status`, { status });
      } catch (error) {
        throw error;
      }
    },  
    async updateProductStatus(productId, status) {
      try {
        await axios.put(`http://localhost:3005/api/products/${productId}/status`, { status });
      } catch (error) {
        throw error;
      }
    },  
    async loadDataFromSuplierApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/suppliers");
        this.suppliers = resp.data;
      } catch (error) {
        this.suppliers= [];
      }
    },
    async loadDataFromUserApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/users");
        this.users = resp.data;
        this.usersActif = resp.data.filter(user => user.status === true);
      } catch (error) {
        this.users= [];
      }
    },
    async loadDataFromProductApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/products");
        this.products = resp.data;
        this.productsActif = resp.data.filter(product => product.status === true);
      } catch (error) {
        this.products= [];
      }
    },
    async loadDataFromReceptionApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/receptions");
        this.receptions = resp.data;
     
      } catch (error) {
        this.receptions= [];
      }
    },
    async loadDataFromMouvementApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/mouvements");
        this.mouvements = resp.data;
     
      } catch (error) {
        this.mouvements= [];
      }
    },
    async loadDataFromSaleApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/sales");
        this.sales = resp.data.data;
        console.log("Données des ventes : ", this.sales);
     
      } catch (error) {
        this.sales= [];
      }
    },
    async loadDataFromInventoryApi() {
      try {
        const resp = await axios.get("http://localhost:3005/api/inventories");
        this.inventories = resp.data;
     
      } catch (error) {
        this.inventories= [];
      }
    },
    async addSupplier(supplier) {
      return await axios.post("http://localhost:3005/api/suppliers", supplier );

    },
    async addUser(user) {
      return await axios.post("http://localhost:3005/api/users", user );

    },
    async addProduct(product) {
      return await axios.post("http://localhost:3005/api/products", product );

    },
    async addReception(receptions) {
      return await axios.post("http://localhost:3005/api/receptions", receptions );

    },
    async addSale(sales) {
      return await axios.post("http://localhost:3005/api/sales", sales );

    },
    async addInventory(inventories) {
      return await axios.post("http://localhost:3005/api/inventories", inventories );

    },

    async deleteSupplier(id) {
      try {
        await axios.delete(`http://localhost:3005/api/suppliers/${id}`);
        await this.loadDataFromSuplierApi();
        toast.success("Supplier has been deleted")
      } catch (error) {
        toast.error("Can't delete this supplier because it is attached somewhere")
      }
    },
    async destroyUser(id) {
      try {
        if (this.user.id === id ) {
          toast.error("You can't delete your own acount.");
          return;
        }
        await axios.delete(`http://localhost:3005/api/users/${id}`);
        await this.loadDataFromUserApi();
        toast.success("User has been deleted")
      } catch (error) {
        toast.error("Cannot delete this user because it's used anywhere!")
      }
    },
    async destroyProduct(id) {
      try {
        await axios.delete(`http://localhost:3005/api/products/${id}`);
        await this.loadDataFromProductApi();
        toast.success("Product has been deleted")
      } catch (error) {
        toast.error("Can't delete this product because it is attached somewhere")
      }
    },
    async destroyReception(id) {
      try {
        await axios.delete(`http://localhost:3005/api/receptions/${id}`);
        await this.loadDataFromReceptionApi();
        toast.success("Reception has been deleted")
      } catch (error) {
        toast.error("Can't delete this reception because it is attached somewhere")
      }
    },
    async destroySale(id) {
      try {
        await axios.delete(`http://localhost:3005/api/sales/${id}`);
        await this.loadDataFromSaleApi();
        toast.success("Sale has been deleted")
      } catch (error) {
        toast.error("Can't delete this reception because it is attached somewhere")
      }
    },

    async updateSupplier(updateSupplier) {
      try {
        const index = this.suppliers.findIndex((sup) => sup.id === updateSupplier.id);

        if (index !== -1) {
          const result = await axios.put(`http://localhost:3005/api/suppliers/${updateSupplier.id}`, updateSupplier);
          await this.loadDataFromSuplierApi();
          console.log(result);
          
        }
        
      } catch (error) {
        throw error
      }
    },
    async updateUser(updateUser) {
      try {
        const index = this.users.findIndex((user) => user.id === updateUser.id);

        if (index !== -1) {
          const result = await axios.put(`http://localhost:3005/api/users/${updateUser.id}`, updateUser);
          await this.loadDataFromUserApi();
          console.log(result);
          
        }
        
      } catch (error) {
        throw error
      }
    },
    async updateCurrentUser(name, email) {
      try {
        const response = await axios.put("http://localhost:3005/api/user/update", { name, email });

        return response.data.user;
      } catch (error) {
        console.error("Erreur lors de la mise à jour des informations :", error);
        toast.error("Erreur lors de la mise à jour des informations");
        throw error;
      }
    },
    async updateProduct(updateProduct) {
      try {
        const index = this.products.findIndex((product) => product.id === updateProduct.id);

        if (index !== -1) {
          const result = await axios.put(`http://localhost:3005/api/products/${updateProduct.id}`, updateProduct);
          await this.loadDataFromProductApi();
          console.log(result);
          
        }
        
      } catch (error) {
        throw error
      }
    },
  },
});
