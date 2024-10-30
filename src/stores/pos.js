import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from 'vue-toastification';
const toast = useToast()
export const usePosStore = defineStore("pos", {
  state: () => ({
    // recettes: [],
    // nextId: 2,
    suppliers: [],
    nextIdSup: 1,
    users: [],
    nextIdUser: 1,
    // userName: "",
    // searchQuery: "",
  }),

  actions: {

    // Dans usePosStore.js
    async login(email, password) {
      try {
        const response = await axios.post("http://localhost:3005/api/login", { email, pass_word: password });
        // const response = await axios.post("http://localhost:3005/api/login", { email, password });
        const token = response.data.token;
        localStorage.setItem("token", token); // Stocke le token pour les requêtes futures
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Configure l’en-tête par défaut
       /////
        await this.fetchUserName();
        /////
        // this.userName = response.data.user.name; 
        ////
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
      } else {
        console.warn("Aucun token trouvé dans le localStorage");
      }
    },    
    
    async fetchUserName() {
      try {
        const resp = await axios.get("http://localhost:3005/api/user");
        this.userName = resp.data.user.name || 'Utilisateur inconnu';
      } catch (error) {
        console.error("Erreur lors de la récupération du nom d'utilisateur connecté :", error.response ? error.response.data : error);
      }
    },
    

    // getFilteredRecettes() {
    //   return this.recettes.filter(recette =>
    //     recette.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    //   );
    // },
    // getCategoryName(categoryId) {
    //   const category = this.categories.find(cat => cat.id === categoryId);
    //   return category.name;
    //   // return category ? category.name : 'Aucune catégorie';
    // },

    // async loadDataFromApi() {
    //   try {
    //     const resp = await axios.get("http://localhost:3005/api/recipes");
    //     const recettes = resp.data;

    //     this.recettes = recettes.map(recette => ({
    //       id: recette.id,
    //       title: recette.title,
    //       ingredients: recette.ingredients,
    //       type: recette.type,
    //       category: this.getCategoryName(recette.category_id),
    //     }));
    //   } catch (error) {
    //     console.error('Erreur lors du chargement des recettes:', error);
    //     this.recettes = [];
    //   }
    // },    
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
      } catch (error) {
        this.users= [];
      }
    },
    async addSupplier(supplier) {
      return await axios.post("http://localhost:3005/api/suppliers", supplier );

    },
    async addUser(user) {
      return await axios.post("http://localhost:3005/api/users", user );

    },
    
    // async addRecete(recette) {
    //   return await axios.post("http://localhost:3005/api/recipes", recette);
    // },
    // async addCategory(name) {
    //   return await axios.post("http://localhost:3005/api/categories",  {name} );

    // },
    async deleteSupplier(id) {
      try {
        await axios.delete(`http://localhost:3005/api/suppliers/${id}`);
        await this.loadDataFromSuplierApi();
      } catch (error) {
        throw error
      }
    },
    async destroyUser(id) {
      try {
        await axios.delete(`http://localhost:3005/api/users/${id}`);
        await this.loadDataFromUserApi();
      } catch (error) {
        toast.error("Cannot delete this user because it's used anywhere!")
      }
    },
    // async updateCategory(updatedCategory) {
    //   try {
    //     const index = this.categories.findIndex((p) => p.id === updatedCategory.id);
    //     if (index !== -1) {
    //       await axios.put(`http://localhost:3005/api/categories/${updatedCategory.id}`, updatedCategory);
    //       await this.loadDataFromCategorieApi();
    //     }
    //   } catch (error) {
    //     throw error
    //   }
    // },
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
  },
  
  
});
