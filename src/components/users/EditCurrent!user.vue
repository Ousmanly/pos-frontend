<template>
    <div>
      <form
      @submit.prevent="submitUpdate"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
      <div class="mb-3">
        <label for="name" class="form-label"
          >{{ $t("user.form.name") }} :</label
        >
        <input
          type="text"
          class="form-control"
          v-model="updatedName"
          id="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label"
          >{{ $t("user.form.email") }} :</label
        >
        <input
          type="text"
          class="form-control"
          v-model="updatedEmail"
          id="email"
          required
        />
      </div>
      <button class="clr btn text-white mt-3 mb-4 me-3">
        {{ $t("user.form.confirm") }}
      </button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/home"
      >
        <button class="btn btn-danger mt-3 mb-4">
          {{ $t("user.form.cancelButton") }}
        </button>
      </RouterLink>
    </form>
    </div>
  </template>
  
  <script setup>
  import { usePosStore } from "@/stores/pos";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
  
  const userStore = usePosStore();
  
  const updatedName = ref(userStore.userName);
  const updatedEmail = ref(userStore.user.email);

  const submitUpdate = async () => {
    await userStore.updateCurrentUser(updatedName.value, updatedEmail.value);
    router.push("/home");
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
  