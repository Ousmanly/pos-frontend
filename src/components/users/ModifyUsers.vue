<template>
  <div class="container mt-5">
    <form
      @submit.prevent="handleUpdateUser"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
      <div class="mb-3">
        <label for="name" class="form-label"
          >{{ $t("user.form.name") }} :</label
        >
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
        <label for="email" class="form-label"
          >{{ $t("user.form.email") }} :</label
        >
        <input
          type="text"
          class="form-control"
          v-model="email"
          id="email"
          required
        />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>
      <div class="mb-3">
        <label for="type" class="form-label"
          >{{ $t("user.form.role") }} :</label
        >
        <select class="input form-select" v-model="role" id="role" required>
          <option value="" disabled selected>
            {{ $t("user.form.selectRole") }}
          </option>
          <option value="ADMIN">ADMIN</option>
          <option value="CAISSIER">CAISSIER</option>
        </select>
      </div>
      <button class="clr btn text-white mt-3 mb-4 me-3">
        {{ $t("user.form.addButton") }}
      </button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/listuser"
      >
        <button class="btn btn-danger mt-3 mb-4">
          {{ $t("user.form.cancelButton") }}
        </button>
      </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive } from "vue";

const store = usePosStore();
const router = useRouter();
const route = useRoute();

const name = ref("");
const email = ref("");
const role = ref("");
const originalName = ref("");
const id = Number(route.params.id);
const errors = reactive({
  name: "",
  email: "",
});

// import { getCurrentInstance } from 'vue';
import { usePosStore } from "@/stores/pos";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const toast = useToast();

onMounted(async() => {
  await store.loadDataFromUserApi();
  const user = store.users.find((user) => user.id === id);
  if (user) {
    name.value = user.name;
    email.value = user.email;
    role.value = user.role;
    originalName.value = user.name;
  }
});

const handleUpdateUser = async () => {
  try {
    const updatedUser = {
      id,
      name: name.value,
      originalName: originalName.value,
      email: email.value,
      role: role.value,
    };
    await store.updateUser(updatedUser);
    Object.keys(errors).forEach((key) => (errors[key] = ""));
    toast.success(t("user.form.userUpdated"));
    router.push("/listuser");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        errors[err.path] = err.msg;
      });
    } else {
      toast.error(t("user.form.unexpectedError"));
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
