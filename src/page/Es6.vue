<script setup lang="ts">
import Avatar from '@/component/commons/Avatar.vue';
import {DataTableList, type DataTableConf } from '@/index';
 
import { onMounted, ref } from 'vue';

// Stato locale per i dati e il caricamento
const items = ref<any[]>([]);
const loading = ref(false);

const tableConfig = ref<DataTableConf>({
  columns: [
    { title: 'ID', property: 'id' },
    { title: 'Descrizione', property: 'description' }
  ],
  isserver: true, // Indica che paginazione e ricerca avvengono sul server
  paginator: true,
  paginatorPosition: { top: false, bottom: true, class: 'center' },
  viewActions: false,
  dimensionePagina: 10,
  serverPaging: {
    serverTotaleElementi: 0, // Inizializzato a 0, popolato in seguito
    serverTotalePagine: 0
  }
});

// Funzione simulata per caricare i dati dalle API
const fetchApiData = async (page: number, size: number) => {
  loading.value = true;
  try {
    // Es. const res = await axios.get(`/api/items?page=${page}&size=${size}`);
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    const mockTotalElements = 50; 
    const mockTotalPages = Math.ceil(mockTotalElements / size);
    
    // Creazione dati simulati per la pagina corrente (es. pagina 0 -> ID 1-10)
    const rows = [];
    const start = page * size;
    for (let i = 0; i < size; i++) {
      const id = start + i + 1;
      if (id <= mockTotalElements) {
        rows.push({ id, description: `Elemento server ${id}` });
      }
    }
    
    items.value = rows;
    
    // Aggiornamento dei metadati di paginazione server-side
    tableConfig.value.serverPaging = {
      serverTotaleElementi: mockTotalElements,
      serverTotalePagine: mockTotalPages
    };
  } finally {
    loading.value = false;
  }
};

// Gestione del cambio pagina in avanti
const handleAvanti = async (currentPage: number, size: number) => {
  await fetchApiData(currentPage, size);
};

// Gestione del cambio pagina all'indietro
const handleIndietro = async (currentPage: number, size: number) => {
  await fetchApiData(currentPage, size);
};

onMounted(async () => {
  // Caricamento iniziale
  await fetchApiData(0, tableConfig.value.dimensionePagina);
});
</script>

<template>
     <div class="container my-4">

<h3>Scenario F: Paginazione Server-Side (<code>isserver: true</code>)</h3>
<p>Se la sorgente dati ha molti elementi, la paginazione deve avvenire sul server.</p>

<ul>
  <li>
    <code>isserver</code> deve essere impostato a <code>true</code>.
  </li>
  <li>
    È necessario compilare <code>serverPaging</code> con i totali di elementi e pagine forniti dalle API.
  </li>
  <li>
    Bisogna ascoltare gli eventi <code>@onavanti</code> e <code>@onindietro</code> per richiedere la pagina corretta al server e aggiornare l'array <code>dataItems</code>.
  </li>
</ul>

   </div>
  <div class="container my-4">
    <h3>Paginazione Server-Side</h3>
    <div v-if="loading" class="alert alert-info">Caricamento...</div>
    
    <DataTableList
      :data-items="items"
      :data-table-conf="tableConfig"
      @onavanti="handleAvanti"
      @onindietro="handleIndietro"
    />
  </div>
</template>
<style scoped></style>
