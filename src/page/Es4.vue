<script setup lang="ts">
import Avatar from '@/component/commons/Avatar.vue';
import {DataTableList, type DataTableConf } from '@/index';
 
import { ref } from 'vue';

const tableConfig = ref<DataTableConf>({
  columns: [
    { title: 'ID', property: 'id' },
    { title: 'Prodotto', property: 'product' }
  ],
  isserver: false,
  viewActions: false,
  dimensionePagina: 10
});

const items = ref([
  { id: 101, product: 'Computer Laptop' },
  { id: 102, product: 'Monitor 4K' },
  { id: 103, product: 'Tastiera Meccanica' }
]);

const selectedItems = ref<any[]>([]);

// Salva gli elementi selezionati nello stato locale
const handleChecked = (checkedRows: any[]) => {
  selectedItems.value = checkedRows;
  console.log('Prodotti selezionati:', selectedItems.value);
};
</script>

<template>
  <div class="container my-4">
    
<h3>Scenario D: Selezione Multipla con Checkbox e Evento <code>@onchecked</code></h3>
<p>
  Il componente supporta la selezione di elementi tramite una colonna di checkbox 
  abilitata tramite la prop <code>:show-checkbox="true"</code>.
</p>

  </div>
  <div class="my-3">
    <DataTableList 
      :data-items="items" 
      :data-table-conf="tableConfig" 
      :show-checkbox="true"
      @onchecked="handleChecked"
    />
    
    <div class="mt-3">
      <h5>Elementi selezionati: {{ selectedItems.length }}</h5>
      <ul>
        <li v-for="item in selectedItems" :key="item.id">{{ item.product }}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped></style>
