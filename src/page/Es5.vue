<script setup lang="ts">
import Avatar from '@/component/commons/Avatar.vue';
import {DataTableList, type DataTableConf } from '@/index';
 
import { ref } from 'vue';

const tableConfig = ref<DataTableConf>({
  columns: [
    { title: 'ID', property: 'id' },
    { title: 'Documento', property: 'docName' }
  ],
  isserver: false,
  viewActions: true, // Deve essere true per abilitare la colonna azioni
  dimensionePagina: 10
});

const items = ref([
  { id: 1, docName: 'Fattura_2026_01.pdf' },
  { id: 2, docName: 'Contratto_Firmato.pdf' }
]);

const scaricaDocumento = (row: any) => console.log('Download', row.docName);
const archiviaDocumento = (row: any) => console.log('Archivia', row.id);
</script>

<template>
    <div class="container my-4">
      
<h3>Scenario E: Menu Azioni Personalizzato (Dropdown Bootstrap Italia)</h3>
<p>
  Invece di mostrare i tre pulsanti standard in linea (<code>view</code>, <code>update</code>, <code>delete</code>), 
  è possibile personalizzare la colonna delle azioni inserendo un menu a comparsa (dropdown) 
  in perfetto stile Bootstrap Italia utilizzando lo slot <code>#actions</code>.
</p>

    </div>
  <DataTableList :data-items="items" :data-table-conf="tableConfig">
    <!-- Personalizzazione colonna azioni tramite slot -->
    <template #actions="{ row }">
      <div class="dropdown dropstart text-center">
        <a class="btn btn-dropdown dropdown-toggle" href="#" role="button" id="dropdownActions" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <!-- Icona a tre pallini di Bootstrap Italia -->
          <svg class="icon-expand icon icon-sm icon-secondary">
            <use href="@/assets/svg/sprites.svg#it-more-items"></use>
          </svg>
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownActions">
          <div class="link-list-wrapper">
            <ul class="link-list">
              <li>
                <a class="dropdown-item list-item" @click.prevent="scaricaDocumento(row)">
                  <span>
                    <svg class="icon icon-primary" aria-hidden="true">
                      <use href="@/assets/svg/sprites.svg#it-download"></use>
                    </svg> Scarica
                  </span>
                </a>
              </li>
              <li>
                <a class="dropdown-item list-item" @click.prevent="archiviaDocumento(row)">
                  <span>
                    <svg class="icon icon-primary" aria-hidden="true">
                      <use href="@/assets/svg/sprites.svg#it-box"></use>
                    </svg> Archivia
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </DataTableList>
</template>
<style scoped></style>
