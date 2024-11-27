<template>
  <div>
    <div class="page-background container bg-color">
    
      <div class="card shadow mb-4 clr">
    <!-- <div class="card-header py-3">
        <h2 class="m-0 font-weight-bold text-success-t bold">{{ $t("mouvement.title") }}</h2>
        <form class="d-flex ms-auto">
              <input
                type="text"
                class="form-control me-2"
                v-model="store.searchQuery"
                :placeholder="$t('movement.search')"
              />
            </form>
        <Loader v-if="isLoading"/>
    </div> -->
    <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h2 class="m-0 font-weight-bold text-success-t bold">
            {{ $t("mouvement.title") }}
          </h2>
          <Loader v-if="isLoading"/>
          <form class="d-flex ms-auto">
              <input
                type="date"
                class="form-control me-2"
                v-model="store.searchQuery"
                :placeholder="$t('movement.search')"
              />
            </form>
        </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                      <th>{{ $t("mouvement.id") }}</th>
                      <th>{{ $t("mouvement.quantity") }}</th>
                      <th>{{ $t("mouvement.product") }}</th>
                      <th>{{ $t("mouvement.provokedBy") }}</th>
                      <th>{{ $t("mouvement.date") }}</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="mouvement in store.getFilteredMovement()" :key="mouvement.id">
                    <td>{{ mouvement.id }}</td>
                    <td>{{ mouvement.quantity }}</td>
                    <td>{{ mouvement.product_name }}</td>
                    <td>{{ mouvement.user_name }}</td>
                    <td>{{ new Date(mouvement.mouvement_at).toLocaleDateString() }}</td>
                 </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
</div>
    </div>
  </div>
</template>
  
  <script setup>
import { usePosStore } from "@/stores/pos";
import { onMounted, ref } from "vue";
import Loader from "../Loader.vue";

const store = usePosStore();
const isLoading = ref(true)
onMounted(async () => {
  try {
    isLoading.value= true
    await store.loadDataFromMouvementApi();
    // await new Promise((resolve)=> setTimeout(resolve, 1000))
  } catch (error) {
    console.log(error)
  }finally{
    isLoading.value = false
  }
});
</script>
     
  <style scoped>
  .text-success-t{
    /* color: #26a49c; */
    color: #137dbb;
  }
.clr {
  margin-top: 100px;
}
.page-background {
  min-height: 90vh;
  height: fit-content;
  color: #333;
  padding: 20px;
}
.bold{
  font-weight: bold;
}
</style>
  