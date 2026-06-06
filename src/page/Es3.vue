<script setup lang="ts">
import Avatar from '@/component/commons/Avatar.vue';
import {DataTableList, type DataTableConf } from '@/index';
 
import { ref } from 'vue';

const tableConfig = ref<DataTableConf>({
  columns: [
    { title: 'Avatar', property: 'avatar', style: 'width: 80px;' },
    { title: 'Dettagli Utente', property: 'details' },
    { title: 'Stato', property: 'status' }
  ],
  isserver: false,
  viewActions: false,
  dimensionePagina: 5
});

const items = ref([
  { id: 1, name: 'Mario Rossi', email: 'mario.rossi@example.com', status: 'Attivo', statusColor: 'bg-success' },
  { id: 2, name: 'Giuseppe Verdi', email: 'giuseppe.verdi@example.com', status: 'Sospeso', statusColor: 'bg-warning' }
]);
</script>

<template>
  <div class="container my-4">
    
<h3>Scenario C: Personalizzazione Celle con Slot (<code>#columnTd</code> &amp; Componenti Custom)</h3>
<p>
  Se si necessita di inserire markup HTML complesso (es. Badge di stato, icone, 
  o componenti esterni come <code>Avatar.vue</code>), si utilizza lo slot 
  <code>#columnTd</code>.
</p>

  </div>
  <DataTableList :data-items="items" :data-table-conf="tableConfig">
    <!-- Utilizzo dello scoped slot per le celle -->
    <template #columnTd="{ row, column }">
      
      <!-- Cella Avatar -->
      <div v-if="column.property === 'avatar'">
        <Avatar 
          :label="row.name.charAt(0) + row.name.split(' ')[1]?.charAt(0)"
          :background-dynamics="true"
        />
      </div>

      <!-- Cella Dettagli Utente -->
      <div v-else-if="column.property === 'details'">
        <strong>{{ row.name }}</strong><br>
        <small class="text-secondary">{{ row.email }}</small>
      </div>

      <!-- Cella Stato -->
      <div v-else-if="column.property === 'status'">
        <span class="badge rounded-pill text-white" :class="row.statusColor">
          {{ row.status }}
        </span>
      </div>

    </template>
  </DataTableList>
</template>
<style scoped></style>
