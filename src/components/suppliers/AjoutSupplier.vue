<template>
  <div class="container">
    <form
      @submit.prevent="addSupplier"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
      <div class="mb-3">
        <label for="name" class="form-label">{{ $t("supplier.form.name") }} :</label>
        <input
          type="text"
          class="form-control"
          v-model="name"
          id="name"
          required
        />
        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">{{ $t("supplier.form.phone") }}  :</label>
        <input
          type="text"
          class="form-control"
          v-model="phone"
          id="phone"
          required
        />
        <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
      </div>
      <button class="clr btn text-white mt-3 mb-4 me-3">{{ $t("supplier.form.add") }} </button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/listsupplier"
      >
        <button class="btn btn-danger mt-3 mb-4">{{ $t("supplier.form.cancel") }} </button>
      </RouterLink>
    </form>
  </div>
</template>
  
  <script setup>
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";

const router = useRouter();
import { ref, reactive } from "vue";
import { usePosStore } from "@/stores/pos";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const toast = useToast();
const store = usePosStore();
const name = ref("");
const phone = ref("");
const errors = reactive({
  name: "",
  phone: "",
});
const addSupplier = async () => {
  try {
    const newSupplier = {
      name: name.value, 
      phone: phone.value,
    };
    await store.addSupplier(newSupplier);
    Object.keys(errors).forEach((key) => (errors[key] = ""));
    toast.success(t("supplier.form.successMessage"));
    router.push("/listsupplier");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach(err => {
        errors[err.path] = err.msg; 
      });
    } else {
      toast.error(t("supplier.form.unexpectedError"));
    }
  }
};
const { proxy } = getCurrentInstance();

const changeLanguage = (locale) => {
  proxy.$i18n.locale = locale;
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
  