<template>
  <div class="container">
    <form @submit.prevent="addSale" class="formulaire form shadow p-3 bg-body rounded">
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="sale" class="form-label">{{ $t("sale.labels.saleAt") }}</label>
          <input type="date" class="form-control" v-model="sale_at" id="sale" required />
        </div>
        <div class="mb-3 flex-fill">
          <label for="email" class="form-label">{{ $t("sale.labels.email") }}</label>
          <input type="email" class="form-control" v-model="email" id="email" />
        </div>
      </div>
      
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="customer" class="form-label">{{ $t("sale.labels.customerName") }}</label>
          <input type="text" class="form-control" v-model="customer" id="customer" required />
        </div>
        <div class="mb-3 flex-fill">
          <label for="phone" class="form-label">{{ $t("sale.labels.phone") }}</label>
          <input type="text" class="form-control" v-model="phone" id="phone" @input="validatePhone"/>
        </div>        
      </div>
      <div v-if="errors.phone" class="text-danger text-end">{{ errors.phone }}</div>
      <div v-for="(detail, index) in saleDetails" :key="index" class="mb-3">
        <div class="form-group d-flex gap-3">
          <div class="mb-3 flex-fill">
            <label for="product" class="form-label">{{ $t("sale.labels.product") }}</label>
            <select class="form-select" v-model="detail.id_product" required>
              <option v-for="product in activeProducts" :key="product.id" :value="product.id">
                {{ product.name }}
              </option>
            </select>
          </div>
          <div class="mb-3 flex-fill">
            <label for="price" class="form-label">{{ $t("sale.labels.price") }}</label>
            <input type="number" min="0" class="form-control" v-model="detail.price" />
          </div>
          <div class="mb-3 flex-fill">
            <label for="quantity" class="form-label">{{ $t("sale.labels.quantity") }}</label>
            <input type="number" min="0" class="form-control" v-model="detail.sale_quantity" required />
          </div>
            <button class="btn" @click="removeProduct(index)">
              <i
                class="fa-solid fa-trash"
                style="color: #e30d0d; font-size: 29px"
              ></i>
            </button>  
        </div>
      </div>

      <button type="button" class="btn btn-am mb-3" @click="addProduct">
        {{ $t("sale.buttons.addMore") }}
      </button>

      <div v-if="errors.general" class="text-danger mb-3">{{ errors.general }}</div>
      
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-dark me-2">{{ $t("sale.buttons.add") }}</button>
        <RouterLink to="/listsale">
          <button type="button" class="btn btn-danger">{{ $t("sale.buttons.cancel") }}</button>
        </RouterLink>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { usePosStore } from "@/stores/pos";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const store = usePosStore();

onMounted(async () => {
  await store.loadDataFromProductApi();
});
const activeProducts = computed(() => store.products.filter((product) => product.status));

const sale_at = ref("");
const customer = ref("");
const phone = ref("");
const email = ref("");
const errors = reactive({ 
  general: "" ,
  name: "",
  phone: "",
});
const saleDetails = ref([{ id_product: "", price: null, sale_quantity: 1 }]);

const addProduct = () => {
  saleDetails.value.push({ id_product: "", price: null, sale_quantity: 1 });
};

const removeProduct = (index) => {
  saleDetails.value.splice(index, 1);
};
const validatePhone = () => {
  const phoneRegex = /^[0-9\s]*$/; 
  if (!phoneRegex.test(phone.value)) {
    errors.phone = "Phone must be a number ";
  } else {
    errors.phone = "";
  }
};

const addSale = async () => {
  validatePhone();
  
  if (errors.phone) {
    return; 
  }
  try {
    const newSale = {
      sale_at: sale_at.value,
      name: customer.value,
      phone: phone.value,
      email: email.value,
      saleDetails: saleDetails.value,
    };

    await store.addSale(newSale);
    toast.success(t("sale.messages.success"));
    router.push("/listsale");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        errors.general = err.msg;
      });
    } else {
      toast.error(t("sale.messages.error"));
    }
  }
};
</script>
<style scoped>
.clr {
  background-color: #343a40;
}
.btn-am  {
  color: white;
  background-color: #343a40;
}
.clr:hover {
  background-color: #24272a;
}
.formulaire {
  margin: auto;
  margin-top: 16vh;
}
.container {
  max-width: 700px;
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