<template>
  <div class="container">
    <form
      @submit.prevent="addSale"
      class="formulaire form shadow p-3 bg-body rounded"
    >
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="sale" class="form-label"
            >{{ $t("sale.labels.saleAt") }}</label
          >
          <input
            type="date"
            class="form-control"
            v-model="sale_at"
            id="sale"
            required
          />
        </div>
        <div class="mb-3 flex-fill">
          <label for="product" class="form-label"
            >{{ $t("sale.labels.product") }}</label
          >
          <select
            class="form-select"
            v-model="selectedProduct"
            id="product"
            required
          >
            <option
              v-for="product in activeProducts"
              :key="product.id"
              :value="product.id"
            >
              {{ product.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="customer" class="form-label"
            >{{ $t("sale.labels.customerName") }}</label
          >
          <input
            type="text"
            class="form-control"
            v-model="customer"
            id="customer"
            required
          />
          <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
        </div>
        <div class="mb-3 flex-fill">
          <label for="phone" class="form-label"
            >{{ $t("sale.labels.phone") }}</label
          >
          <input type="text" class="form-control" v-model="phone" id="phone" />
          <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
        </div>
      </div>
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="email" class="form-label"
            >{{ $t("sale.labels.email") }}</label
          >
          <input type="email" class="form-control" v-model="email" id="email" />
          <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
        </div>
        <div class="mb-3 flex-fill">
          <label for="price" class="form-label"
            >{{ $t("sale.labels.price") }}</label
          >
          <input
            type="number"
            min="0"
            class="form-control"
            v-model="price"
            id="price"
          />
          <div v-if="errors.price" class="text-danger">{{ errors.price }}</div>
        </div>
      </div>
      <div >
        <label for="quantity" class="form-label"
          >{{ $t("sale.labels.quantity") }}</label
        >
        <input
          type="number"
          min="0"
          class="form-control mb-4"
          v-model="quantity"
          id="quantity"
          required
        />
        <div v-if="errors.quantity" class="text-danger">
          {{ errors.quantity }}
        </div>
      </div>
      <div v-if="errors.general" class="text-danger mb-3">
        {{ errors.general }}
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-dark me-2">
          {{ $t("sale.buttons.add") }}
        </button>
        <RouterLink to="/listsale">
          <button type="button" class="btn btn-danger">
            {{ $t("sale.buttons.cancel") }}
          </button>
        </RouterLink>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { computed, getCurrentInstance, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
import { ref, reactive } from "vue";
import { usePosStore } from "@/stores/pos";
import { useToast } from "vue-toastification";

const toast = useToast();
const store = usePosStore();

onMounted(async () => {
  await store.loadDataFromProductApi();
});
const activeProducts = computed(() =>
  store.products.filter((product) => product.status)
);

const sale_at = ref("");
const customer = ref("");
const phone = ref("");
const email = ref("");
const selectedProduct = ref("");
const price = ref();
const quantity = ref(0);
const errors = reactive({
  customer: "",
  phone: "",
  email: "",
  selectedProduct: "",
  price: "",
  quantity: "",
  general: "",
});
const addSale = async () => {
  try {
    const newSale = {
      sale_at: sale_at.value,
      name: customer.value,
      phone: phone.value,
      email: email.value,
      saleDetails: [
        {
          id_product: selectedProduct.value,
          price: price.value,
          sale_quantity: quantity.value,
        },
      ],
    };

    await store.addSale(newSale);
    Object.keys(errors).forEach((key) => (errors[key] = ""));

    toast.success(t("sale.messages.success"));
    router.push("/listsale");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        // Détecte les erreurs spécifiques par `path`
        if (err.path === "receptionDetails[0].sale_quantity") {
          errors.quantity = err.msg; // Affiche le message d'erreur pour le champ `quantity`
        } else {
          errors.general = err.msg; // Capture les autres erreurs
        }
      });
    } else {
      toast.error($t("sale.messages.error"));
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
  /* width: 50%;
  border-radius: 10px;
  padding: 20px; */
  margin: auto;
  margin-top: 16vh;
}
.container {
  max-width: 600px;
  margin: auto;
}
.formulaire {
  padding: 20px;
  border-radius: 10px;
}
.form-group {
  display: flex;
  gap: 1rem;
}
.form-label {
  font-weight: bold;
}
button.btn-dark {
  background-color: #343a40;
  border: none;
}
button.btn-dark:hover {
  background-color: #24272a;
}
.text-danger {
  color: red;
}
</style>
