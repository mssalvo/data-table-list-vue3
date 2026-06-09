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
    paginatorPosition:{top:true,bottom:false,class:'right'},
    actionsRow: {
        view: true,
        update: true,
        delete: true,
    },
    viewActions: true,
    dimensionePagina: 4
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

const onview=(item:any)=>{
  console.log('View item:', item);
}
// No logic needed for this faithful reproduction
</script>

<template>
  <div class="mb-4">
      
<h3>DataTableList Vue3</h3>
<h4>Inserire un menu personalizzato grazie agli slot personalizzati in modo semplice!</h4>

<DataTableList :data-items="dataItems" :data-table-conf="dataTablConf"  @onchecked="onChecked" :show-checkbox="true">
      <template #actions="item">
  <div  class="dropdown dropstart text-center">
  <a class="btn btn-dropdown dropdown-toggle" href="#" role="button" id="dropdownMenuDropleft" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <svg class="icon-expand icon icon-sm icon-secondary"><use href="@/assets/svg/sprites.svg#it-more-items"></use></svg>
     
  </a>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuDropleft">
    <div class="link-list-wrapper">
      <ul class="link-list">
        <li style="cursor: pointer;"><a class="dropdown-item list-item" @click.prevent="onview(item.row)">
         <span><svg class="icon  icon-primary icon.primary.hover" aria-hidden="true"><use href="@/assets/svg/sprites.svg#it-password-visible"></use></svg> {{ 'Dettaglio' }} </span>
         
        </a></li>
        <li   style="cursor: pointer;"><a class="dropdown-item list-item" @click.prevent="onview(item.row)">
        <span><svg class="icon icon-sm icon-primary icon.primary.hover" aria-hidden="true"><use href="@/assets/svg/sprites.svg#it-user"></use></svg>  {{ 'User' }}</span>
        </a></li>
          <li   style="cursor: pointer;"><a class="dropdown-item list-item" @click.prevent="onview(item.row)">
        <span><svg class="icon icon-sm icon-primary icon.primary.hover" aria-hidden="true"><use href="@/assets/svg/sprites.svg#it-box"></use></svg>  {{'Archivia'}}</span>
        </a></li>
      </ul>
    </div>
  </div>
</div>
      </template>
    </DataTableList>


<pre><code class="language-html">
&lt;template #actions="item"&gt;

  &lt;div class="dropdown dropstart text-center"&gt;

    &lt;a 
      class="btn btn-dropdown dropdown-toggle" 
      href="#" 
      role="button" 
      id="dropdownMenuDropleft" 
      data-bs-toggle="dropdown" 
      aria-haspopup="true" 
      aria-expanded="false"
    &gt;
      &lt;svg class="icon-expand icon icon-sm icon-secondary"&gt;
        &lt;use href="@/assets/svg/sprites.svg#it-more-items"&gt;&lt;/use&gt;
      &lt;/svg&gt;
    &lt;/a&gt;

    &lt;div class="dropdown-menu" aria-labelledby="dropdownMenuDropleft"&gt;

      &lt;div class="link-list-wrapper"&gt;
        &lt;ul class="link-list"&gt;

          &lt;li style="cursor: pointer;"&gt;
            &lt;a 
              class="dropdown-item list-item" 
              @click.prevent="onview(item.row)"
            &gt;
              &lt;span&gt;
                &lt;svg class="icon icon-primary"&gt;
                  &lt;use href="@/assets/svg/sprites.svg#it-password-visible"&gt;&lt;/use&gt;
                &lt;/svg&gt;
                { { 'Dettaglio' } }
              &lt;/span&gt;
            &lt;/a&gt;
          &lt;/li&gt;

          &lt;!-- altri link personalizzati --&gt;
          &lt;li&gt;altro link ecc...&lt;/li&gt;
          &lt;li&gt;altro link ecc...&lt;/li&gt;

        &lt;/ul&gt;
      &lt;/div&gt;

    &lt;/div&gt;

  &lt;/div&gt;

&lt;/template&gt;
</code></pre>
 
    </div>

     


</template>
<style scoped>
 
</style>
