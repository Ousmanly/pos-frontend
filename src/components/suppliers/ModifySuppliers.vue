<template>
  <div class="container mt-5">
    <form
      @submit.prevent="handleUpdateSupplier"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
    <div class="mb-3">
          <label for="name" class="form-label">name :</label>
          <input
            type="text"
            class="form-control"
            v-model="name"
            id="name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">phone :</label>
          <input
            type="text"
            class="form-control"
            v-model="phone"
            id="phone"
            required
          />
        </div>
        <button class="clr btn text-white mt-3 mb-4 me-3"> Confirm</button>
        <RouterLink
          class="list text-decoration-none text-white me-5 fw-bold"
          to="/listsupplier"
        >
          <button class="btn btn-danger mt-3 mb-4">Cancel</button>
        </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";


const store = usePosStore();
const router = useRouter();
const route = useRoute();

const name = ref("");
const phone = ref("");
const originalName = ref("");
const id = Number(route.params.id);
import { getCurrentInstance } from 'vue';
import { usePosStore } from "@/stores/pos";


const { proxy } = getCurrentInstance();

const changeLanguage = (locale) => {
  proxy.$i18n.locale = locale;
};

onMounted(() => {
  const supplier = store.suppliers.find((supplier) => supplier.id === id);
  if (supplier) {
    name.value = supplier.name;
    phone.value = supplier.phone;
    originalName.value = supplier.name;
  }
});

const handleUpdateSupplier = async() => {
  try{
    
  const updatedSupplier = {
    id,
    name: name.value,
    originalName: originalName.value,
    phone: phone.value,
  };
  await store.updateSupplier(updatedSupplier);
  
  router.push("/listsupplier");
  }catch (error) {
  if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;
      
      errors.forEach((err) => {
        alert(err.msg); 
      });
    } else {
      alert("Une erreur inattendue est survenue.");
    }
  }
};

</script>

<style scoped>
.clr {
  background-color: #343a40;
}
.clr:hover {
  background-color: #24272a;
}
.formulaire {
  width: 50%;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  margin-top: 16vh;
}
textarea {
  resize: none;
}
</style>
