<script setup lang="ts">
import Avatar from '@/component/commons/Avatar.vue';
import {DataTableList, type DataTableConf } from '@/index';
 
import { ref } from 'vue';

const searchFilter = ref('');

const tableConfig = ref<DataTableConf>({
  columns: [
    { title: 'ID', property: 'id' },
    { title: 'Nome', property: 'name' }
  ],
  isserver: false,
  viewActions: false,
  viewDownload: true, // Mostra l'icona per il download in alto a destra
  dimensionePagina: 10
});

const items = ref([
  { id: 1, name: 'Mario Rossi' },
  { id: 2, name: 'Giuseppe Verdi' },
  { id: 3, name: 'Luca Bianchi' }
]);

// Funzione di esportazione CSV client-side al click sul download
const handleDownload = (filteredData: any[]) => {
  const csvHeaders = 'ID,Nome\n';
  const csvRows = filteredData.map(item => `${item.id},"${item.name}"`).join('\n');
  const csvContent = 'data:text/csv;charset=utf-8,' + csvHeaders + csvRows;
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'esportazione_tabella.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<template>
   <div class="container my-4">
    
<h3>Scenario G: Esportazione e Download dei Dati Filtrati</h3>
<p>Il componente offre la possibilità di abilitare un pulsante per il download dei dati.</p>

<ul>
  <li>
    Impostare <code>viewDownload: true</code> nella configurazione 
    <code>DataTableConf</code>.
  </li>
  <li>
    Ascoltare l'evento <code>@ondownload</code>, che riceve la lista dei record 
    attualmente filtrati dalla ricerca globale (<code>filterComputer</code>).
  </li>
</ul>
 
   </div>
  <div class="container my-4">
    <div class="form-group mb-3">
      <input v-model="searchFilter" type="text" class="form-control" placeholder="Cerca...">
    </div>
    
    <DataTableList
      :data-items="items"
      :data-table-conf="tableConfig"
      :filter="searchFilter"
      @ondownload="handleDownload"
    />
  </div>
</template>
<style scoped></style>
