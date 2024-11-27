<template>
  <div class="container">
    <form
      @submit.prevent="addSale"
      class="formulaire form shadow p-3 bg-body rounded"
    >
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="sale" class="form-label">{{
            $t("sale.labels.saleAt")
          }}</label>
          <input
            type="date"
            class="form-control"
            v-model="sale_at"
            id="sale"
            required
            :max="maxDate"
          />
        </div>
        <div class="mb-3 flex-fill">
          <label for="email" class="form-label">{{
            $t("sale.labels.email")
          }}</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            id="email"
          />
        </div>
      </div>
      <div v-if="errors.sale_at" class="text-danger mb-3">
        {{ errors.sale_at }}
      </div>
      <div class="form-group d-flex gap-3">
        <div class="mb-3 flex-fill">
          <label for="customer" class="form-label">{{
            $t("sale.labels.customerName")
          }}</label>
          <input
            type="text"
            class="form-control"
            v-model="customer"
            id="customer"
            @input="validateCustomerName"
            required
          />
        </div>
        <div class="mb-3 flex-fill">
          <label for="phone" class="form-label">{{
            $t("sale.labels.phone")
          }}</label>
          <input
            type="text"
            class="form-control"
            v-model="phone"
            id="phone"
            @input="validatePhone"
          />
        </div>
      </div>
      <div v-if="errors.name" class="text-danger text-first">
        {{ errors.name }}
      </div>
      <div v-if="errors.phone" class="text-danger text-end">
        {{ errors.phone }}
      </div>
      <div v-for="(detail, index) in saleDetails" :key="index" class="mb-3">
        <div class="form-group d-flex gap-3">
          <div class="mb-3 flex-fill">
            <label for="product" class="form-label">{{
              $t("sale.labels.product")
            }}</label>
            <select class="form-select" v-model="detail.id_product" @change="updatePrice(index)" required>
              <option
                v-for="product in activeProducts"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }}
              </option>
            </select>
          </div>
          <div class="mb-3 flex-fill">
            <label for="price" class="form-label">{{
              $t("sale.labels.price")
            }}</label>
            <input
              type="text"
              min="0"
              class="form-control"
              v-model="detail.price"
              @input="validatePrice(index)"
            />
          </div>
          <div class="mb-3 flex-fill">
            <label for="quantity" class="form-label">{{
              $t("sale.labels.quantity")
            }}</label>
            <input
              type="number"
              min="0"
              class="form-control"
              v-model="detail.sale_quantity"
              required
            />
          </div>
          <button class="btn" @click="removeProduct(index)">
            <i
              class="fa-solid fa-trash"
              style="color: #e30d0d; font-size: 29px"
            ></i>
          </button>
        </div>
        <div v-if="errors.price" class="text-danger text-fist">
        {{ errors.price }}
      </div>
      </div>

      <button type="button" class="btn btn-am mb-3" @click="addProduct">
        {{ $t("sale.buttons.addMore") }}
      </button>

      <!-- <div v-if="errors.sale_at" class="text-danger mb-3">{{ errors.sale_at }}</div>
      <div v-if="errors.name" class="text-danger mb-3">{{ errors.name }}</div> -->

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
const activeProducts = computed(() =>
  store.products.filter((product) => product.status && product.stock>0)
);

const sale_at = ref("");
const customer = ref("");
const phone = ref("");
const email = ref("");
const errors = reactive({
  general: "",
  name: "",
  phone: "",
  sale_at: "",
  price: "",
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
  }else if(phone.value.length > 20) {
    errors.phone = "Phone cannot be most 20 chracteres long";
  } else {
    errors.phone = "";
  }
};

const validateCustomerName = () => {
  const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  if (!nameRegex.test(customer.value)) {
    errors.name = "Name must not have a number.";
  }else if (!customer.value.trim()) {
    errors.name = "Name must not have only espaces.";
  }
  else {
    errors.name = "";
  }
};
const validatePrice = (index) => {
  const price = saleDetails.value[index].price;
  const priceRegex = /^[0-9]+(\.[0-9]+)?$/;
  
  if (!priceRegex.test(price)) {
    errors.price = "Price must be a positif decimal number";
  } else {
    errors.price = "";
  }
};

const maxDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
})

const updatePrice = (index) => {
  const product = activeProducts.value.find(
    (product) => product.id === saleDetails.value[index].id_product
  );
  if (product) {
    saleDetails.value[index].price = product.sale_price;
  }
};

const addSale = async () => {

  let priceErrorFound = false;
  saleDetails.value.forEach((detail, index) => {
    const price = detail.price;
    const priceRegex = /^[0-9]+(\.[0-9]+)?$/;
    if (!priceRegex.test(price)) {
      priceErrorFound = true;
    }
  });
  if (priceErrorFound) {
    return;
  }
  validatePhone();
  validateCustomerName();
  if (errors.phone || errors.name) {
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
    // if (error.response && error.response.data && error.response.data.errors) {
    //   error.response.data.errors.forEach((err) => {
    //     // errors.general = err.msg;
    //     errors.name = err.msg;
    //     errors.sale_at = err.msg;
    //   });
    // } else {
    //   toast.error(t("sale.messages.error"));
    // }
    if (error.response && error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((err) => {
        if (err.path === "sale_at") {
          errors.sale_at = err.msg;
        } else if (err.path === "name") {
          errors.name = err.msg;
        } 
      });
    }
    
    if (error.response.data.error && error.response.data.error.includes('Not enough stock')) {
        const productId = error.response.data.error.split('product ID ')[1];
        const product = activeProducts.value.find(p => p.id === parseInt(productId));
        const productName = product ? product.name : "Inconnu";
        toast.error(t("stockInsufisant")+`${productName}`);
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
.btn-am {
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