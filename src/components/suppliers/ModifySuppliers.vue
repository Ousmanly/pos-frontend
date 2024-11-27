<template>
  <div class="container mt-5">
    <form
      @submit.prevent="handleUpdateSupplier"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
    <div class="mb-3">
          <label for="name" class="form-label">{{ $t("supplier.form.name") }} :</label>
          <input
            type="text"
            class="form-control"
            v-model="name"
            id="name"
            @input="validateCustomerName"
            required
          />
          <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">{{ $t("supplier.form.phone") }} :</label>
          <input
            type="text"
            class="form-control"
            v-model="phone"
            id="phone"
            @input="validatePhone"
            required
          />
        </div>
        <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
        <button class="clr btn text-white mt-3 mb-4 me-3"> {{ $t("supplier.form.confirm") }}</button>
        <RouterLink
          class="list text-decoration-none text-white me-5 fw-bold"
          to="/listsupplier"
        >
          <button class="btn btn-danger mt-3 mb-4">{{ $t("supplier.form.cancel") }}</button>
        </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const toast = useToast()
const store = usePosStore();
const router = useRouter();
const route = useRoute();

const name = ref("");
const phone = ref("");
const originalName = ref("");
const id = Number(route.params.id);
const errors = reactive({
  name: "",
  phone: "",
});
import { usePosStore } from "@/stores/pos";

onMounted(async() => {
  await store.loadDataFromSuplierApi();
  const supplier = store.suppliers.find((supplier) => supplier.id === id);
  if (supplier) {
    name.value = supplier.name;
    phone.value = supplier.phone;
    originalName.value = supplier.name;
  }
});
const validatePhone = () => {
  const phoneRegex = /^[0-9\s]*$/; 
  if (!phoneRegex.test(phone.value)) {
    errors.phone = "Phone must be a number ";
  } else if(phone.value.length > 20) {
    errors.phone = "Phone cannot be most 20 chractere long";
  } else{
    errors.phone = "";
  }
};

const validateCustomerName = () => {
  const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  if (!nameRegex.test(name.value)) {
    errors.name = "Name must not have a number.";
  }else if (!name.value.trim()) {
    errors.name = "Name must not have only espaces.";
  }
  else {
    errors.name = "";
  }
};

const handleUpdateSupplier = async() => {
  validatePhone();
  validateCustomerName()
  if (errors.phone || errors.name) {
    return; 
  }
  try{
    
  const updatedSupplier = {
    id,
    name: name.value,
    originalName: originalName.value,
    phone: phone.value,
  };
  await store.updateSupplier(updatedSupplier);
  Object.keys(errors).forEach((key) => (errors[key] = ""));
  toast.success(t("supplier.form.supplierUpdated"));
  router.push("/listsupplier");
  }catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach(err => {
        errors[err.path] = err.msg; 
      });
    } else {
      toast.error(t("supplier.form.unexpectedError"));
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
.text-danger {
  color: red;
}
</style>
