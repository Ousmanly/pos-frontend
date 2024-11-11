# pos-frontend

## Description

POS app une application web de gestion de point de vente en utilisant Vue.js 3 et la
Composition API. La gestion des états est réalisée avec Pinia, et la navigation entre les
différentes sections (Login, Dashboard, Users, Suppliers, Products, Receptions, Sales, Movement et Inventaire) est géré avec Vue Router. L'interface utilisateur
est stylé avec Bootstrap et css.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 12 ou supérieure)
- VueJS `npm create vite@latest`


## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. **Clonez le repository :**

    ```bash
        https://github.com/Ousmanly/pos-frontend.git
    ```

2. **Accédez au dossier du projet :**

    ```bash
    cd pos-frontend
    ```

3. **Installez les dépendances :**

    ```bash
    npm install
    ```

## Utilisation

Pour démarrer l'application, exécutez la commande suivante :

```bash
npm run dev
```
## Les fonctionalités

 **Authentification :** 

 - login : cette fonction permet d'utilisateur de se connecté.
   
 - logout : cette fonction permet d'utilisateur de se déconnecté.
   
 - handleForgotPassword : cette fonction permet d'envoyé un lien par email pour         réunitialisation de mot de pass à un utilisateur.
 
 - handleResetPassword : cette fonction permet de réunitialisation le mot de pass d'utilisateur.
 
**User :** 

 - loadDataFromUserApi : cette fonction permet de récuperer tout les utilisateur depuis le backend.
   
 - addUser : cette fonction permet d'ajouter un utilisateur.
 - destroyUser : cette fonction permet d'effacer un utilisateur à partir de son id.
 
 - updateUser :  cette fonction permet de modifier un utilisateur à partir de son id.
**supplier :** 

 - loadDataFromSupplierApi : cette fonction permet de récuperer tout les fournisseurs depuis le backend.
   
 - addSupplier : cette fonction permet d'ajouter un fournisseur.
 - destroySupplier : cette fonction permet d'effacer un fournisseur à partir de son id.
 
 - updateSupplier :  cette fonction permet de modifier un fournisseur à partir de son id.
**product :** 

 - loadDataFromProductApi : cette fonction permet de récuperer tout les produits depuis le backend.
   
 - addProduct : cette fonction permet d'ajouter un produit.
 - destroyProduct : cette fonction permet d'effacer un produit à partir de son id.
 - updateProduct :  cette fonction permet de modifier un produit     à partir de son id.

**reception :** 

 - loadDataFromReceptionApi : cette fonction permet de récuperer tout les réceptions depuis le backend.
   
 - addReception : cette fonction permet d'ajouter une réception.
 - destroyReception : cette fonction permet d'effacer une réception à partir de son id.

**sale :** 

 - loadDataFromSaleApi : cette fonction permet de récuperer tout les ventes depuis le backend.
   
 - addSale : cette fonction permet d'ajouter une vente.
 - destroySale : cette fonction permet d'effacer une vente à partir de son id.

**movement :** 

 - loadDataFromMouvementApi : cette fonction permet de récuperer tout les mouvement depuis le backend.

**inventaire :** 

 - loadDataFromInventoryApi : cette fonction permet de récuperer tout les inventaire depuis le backend.
   
 - addInventory : cette fonction permet d'ajouter un inventaire.

## Authors
 - **GitHub** : [Ousmane Ibrahima Ly](https://github.com/Ousmanly)

