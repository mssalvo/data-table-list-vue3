<script setup lang="ts">
import Avatar from '@/component/commons/Avatar.vue';
import {DataTableList, type DataTableConf } from '@/index';
 
import { ref } from 'vue';

const searchFilter = ref('');

const tableConfig = ref<DataTableConf>({
  columns: [
    { title: 'ID', property: 'id' },
    { 
      title: 'Nome Completo', 
      property: 'name',
      // callFormatt riceve il valore del campo specificato in property e l'intera riga
      callFormatt: (value: any, row: any) => {
        return `${row.name.toUpperCase()} (${row.role})`;
      }
    },
    { 
      title: 'Data Creazione', 
      property: 'createdAt',
      callFormatt: (value: string) => {
        return new Date(value).toLocaleDateString('it-IT');
      }
    }
  ],
  isserver: false,
  viewActions: false,
  dimensionePagina: 10
});

const items = ref([
  { id: 1, name: 'Mario Rossi', role: 'Admin', createdAt: '2026-06-01T10:00:00Z' },
  { id: 2, name: 'Giuseppe Verdi', role: 'User', createdAt: '2026-06-03T15:30:00Z' }
]);

const handleView = (item: any) => console.log('Visualizza:', item);
const handleUpdate = (item: any) => console.log('Modifica:', item);
const handleDelete = (item: any) => console.log('Elimina:', item);
</script>

<template>
  <div class="container my-4">
    <h3>Scenario B: Formattazione Personalizzata di Colonne (<code>callFormatt</code>)</h3>
<p>
  Quando si desidera applicare una formattazione al volo su una colonna 
  (es. date, valute, o composizione stringhe) senza alterare i dati di origine, 
  si può definire la funzione <code>callFormatt</code> nel modello 
  <code>ColumnTable</code>.
</p>
  </div>
  <div class="container my-4">
    <!-- Input di ricerca collegato alla prop :filter -->
    <div class="form-group mb-3">
     
      <input id="search" v-model="searchFilter" type="text" class="form-control" placeholder="Cerca...">
    </div>

    <DataTableList
      :data-items="items"
      :data-table-conf="tableConfig"
      :filter="searchFilter"
      @onview="handleView"
      @onupdate="handleUpdate"
      @ondelete="handleDelete"
    />
  </div>
</template>
<style scoped></style>
