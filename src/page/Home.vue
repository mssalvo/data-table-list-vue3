<script setup lang="ts">
import DataTableList from '@/component/commons/DataTableList.vue';
import type { DataTableConf } from '@/model/Models';
import { ref } from 'vue';

const dataTablConf = ref<DataTableConf>({
    columns: [
        { title: 'ID', property: 'id', order: true },
        { title: 'Name', property: 'name', order: true },
        { title: 'Email', property: 'email', order: true }
    ],
    isserver: false,
    paginator: true,
    paginatorPosition:{top:true,bottom:true,class:'right'},
    actionsRow: {
        view: false,
        update: true,
        delete: false,
    },
    viewActions: true,
    dimensionePagina: 10
});


const dataTablConf2 = ref<DataTableConf>({
    columns: [
        { title: 'ID', property: 'id', order: true },
        { title: 'Name', property: 'name', order: true },
        { title: 'Email', property: 'email', order: true }
    ],
    isserver: false,
    paginator: true,
    paginatorPosition:{top:true,bottom:false,class:'center'},
    actionsRow: {
        view: true,
        update: true,
        delete: false,
    },
    viewActions: true,
    dimensionePagina: 10
});

const dataTablConf3 = ref<DataTableConf>({
    columns: [
        { title: 'ID', property: 'id', order: true },
        { title: 'Name', property: 'name', order: true },
        { title: 'Email', property: 'email', order: true }
    ],
    isserver: false,
    paginator: true,
    paginatorPosition:{top:true,bottom:false,class:'left'},
    actionsRow: {
        view: true,
        update: true,
        delete: true,
    },
    viewActions: true,
    dimensionePagina: 10
});

const dataTablConf4 = ref<DataTableConf>({
    columns: [
        { title: 'ID', property: 'id', order: true },
        { title: 'Name', property: 'name', order: true },
        { title: 'Email', property: 'email', order: true }
    ],
    isserver: false,
    paginator: true,
    paginatorPosition:{top:false,bottom:true,class:'center'},
    actionsRow: {
        view: true,
        update: true,
        delete: true,
    },
    viewActions: true,
    dimensionePagina: 10
});

const dataItems = ref([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 4, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 5, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 6, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 7, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 8, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 9, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 10, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 11, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 12, name: 'Alice Johnson', email: 'alice.johnson@example.com' }
]);

const onChecked = (checkedItems: any[]) => {
    console.log('Checked items:', checkedItems);
};
// No logic needed for this faithful reproduction
</script>

<template>
   

    <div class="mb-4">
<h3>DataTableList Vue3 es. a</h3>
<h4>Con checkbox e azioni di visualizzazione e doppio paginatore</h4>
<p>
  Configurazione con checkbox attivi, azioni personalizzate e paginatore sia in alto che in basso allineato a sinistra.
</p>

<ul>
  <li>
    Azioni riga:
    <code>actionsRow: { view: false, update: true, delete: false }</code>
  </li>
  <li>
    Visualizzazione azioni:
    <code>viewActions: true</code>
  </li>
  <li>
    Posizione paginatore:
    <code>paginatorPosition: { top: true, bottom: true, class: 'right' }</code>
  </li>
  <li>
    Checkbox e evento:
    <code>@onchecked="onChecked" :show-checkbox="true"</code>
  </li>
</ul>

    </div>
    <DataTableList :data-items="dataItems" :data-table-conf="dataTablConf"  @onchecked="onChecked" :show-checkbox="true"></DataTableList>
    <div class="mb-4">
        <h3>DataTableList Vue3 es. b</h3>
        <h4>Con azioni di visualizzazione e paginator in alto al centro</h4>
     <code class="d-block mt-2">actionsRow: &#123;view: true, update: true, delete: false&#125;</code>
         <code class="d-block mt-2">viewActions: true</code>
        <code class="d-block mt-2">paginatorPosition: &#123;top: true, bottom: false, class: 'center'&#125;</code>
    </div>
    
    <DataTableList :data-items="dataItems" :data-table-conf="dataTablConf2" ></DataTableList>
        
         <div class="mb-4">
        <h3>DataTableList Vue3 es. c</h3>
        <h4>Con paginator in alto a sinistra e tutte le azioni</h4>
        <code class="d-block mt-2">actionsRow: &#123;view: true, update: true, delete: true&#125;</code>
         <code class="d-block mt-2">viewActions: true</code>
        <code class="d-block mt-2">paginatorPosition: &#123;top: true, bottom: false, class: 'left'&#125;</code>
    </div>
     <DataTableList :data-items="dataItems" :data-table-conf="dataTablConf3" ></DataTableList>

         <div class="mb-4">
        <h3>DataTableList Vue3 es. d</h3>
        <h4>Con paginator in basso al centro e tutte le azioni</h4>
         <code class="d-block mt-2">paginatorPosition: &#123;top: false, bottom: true, class: 'center'&#125;</code>
    </div>
     <DataTableList :data-items="dataItems" :data-table-conf="dataTablConf4" ></DataTableList>

</template>
<style scoped></style>
