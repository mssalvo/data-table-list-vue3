<script setup lang="ts">
import Avatar from '@/component/commons/Avatar.vue';
import {DataTableList, type DataTableConf } from '@/index';
 
import { ref } from 'vue';

const searchFilter = ref('');

const tableConfig = ref<DataTableConf>({
  columns: [
    { title: 'ID', property: 'id', order: true },
    { title: 'Nome', property: 'name', order: true },
    { title: 'Email', property: 'email', order: true }
  ],
  isserver: false,
  paginator: true,
  paginatorPosition: { top: true, bottom: true, class: 'right' },
  viewActions: true,
  actionsRow: { view: true, update: true, delete: true },
  dimensionePagina: 5,
  messageNotRecords: 'Nessun utente trovato.'
});

const items = ref([
  { id: 1, name: 'Mario Rossi', email: 'mario.rossi@example.com' },
  { id: 2, name: 'Giuseppe Verdi', email: 'giuseppe.verdi@example.com' },
  { id: 3, name: 'Luca Bianchi', email: 'luca.bianchi@example.com' },
  { id: 4, name: 'Anna Neri', email: 'anna.neri@example.com' },
  { id: 5, name: 'Sofia Gialli', email: 'sofia.gialli@example.com' },
  { id: 6, name: 'Elena Rosa', email: 'elena.rosa@example.com' }
]);

const handleView = (item: any) => console.log('Visualizza:', item);
const handleUpdate = (item: any) => console.log('Modifica:', item);
const handleDelete = (item: any) => console.log('Elimina:', item);
</script>

<template>
  <div class="container my-4">
    
<h3>Scenario A: Tabella Semplice Client-Side con Paginazione e Ordinamento</h3>
<p>
  In questo scenario, i dati sono interamente caricati in memoria. 
  Il componente gestisce la paginazione, la ricerca globale e l'ordinamento 
  in modo autonomo.
</p>

  </div>
    
  <div class="container my-4">
    <!-- Input di ricerca collegato alla prop :filter -->
    <div class="form-group mb-3">
      <label for="search">Cerca Utente</label>
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
