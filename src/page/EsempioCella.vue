<script setup lang="ts">
import Avatar from '@/component/commons/Avatar.vue';
import {DataTableList, type DataTableConf } from '@/index';
 
import { ref } from 'vue';

const dataTablConf = ref<DataTableConf>({
  columns: [
    { title: 'ID', 
    property: 'id', 
    order: false
    
  },
    { title: 'Name', 
    property: 'name', 
    callFormatt: (value: any, row: any) => {
      return row.name + '   -   ' + row.email;
    },
    order: true 
  },
    { title: 'Email',
     property: 'email', 
     hidden: true,
     order: true 
    }
  ],
  isserver: false,
  paginator: true,
  paginatorPosition: { top: false, bottom: true, class: 'center' },
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

const onview = (item: any) => {
  console.log('View item:', item);
}
// No logic needed for this faithful reproduction
</script>

<template>
       <div class="mb-4">
        <h2>DataTableList Vue3</h2>
        <span style="font-weight: bold;" class="text-secondary">Possibilita di manipolare ogni singola cella utilizzando slot personalizzati in modo semplice!</span>
         <code class="d-block mt-2">&lt;template #columnTd="item" &gt;</code>
         <code class="d-block mt-2">
        &lt;div v-if="item.column.property=='name'"&gt;&#123;&#123; item.row.name &#125;&#125; &lt;br&gt; 
        &lt;small class="text-secondary">&#123;&#123; item.row.email &#125;&#125;&gt;/small&gt;
      &lt;/div&gt;<br>
      &lt;div style="display: flex;align-items: center;width: 100%;" v-if="item.column.property=='id'"&gt;<br>
      &lt;div style="width: 20%; height: 40px;margin-right: 10px;"&gt;<br>
      &lt;Avatar  :label="item.row.name.charAt(0).toUpperCase() + item.row.email.charAt(1).toUpperCase()"
        :background-dynamics="true" class="me-2">&lt;/Avatar&gt;<br>
      &lt;/div><br>
       
      &lt;div style="width: 80%; height: 100%;background-color: brown;text-align: center" v-if="item.column.property=='id'" &gt;
        &lt;span style="color: #fff!important;text-decoration: underline;text-align: center;width: 100%;" class="text-secondary"&gt;&#123;&#123; item.row.id&#125;&#125;&lt;/span&gt;
      &lt;/div&gt;
      &lt;/div&gt;<br>
    &lt;/template&gt;
         </code>
        
    </div>

  <DataTableList :data-items="dataItems" :data-table-conf="dataTablConf" @onchecked="onChecked" :show-checkbox="true">
    
    

    <template #columnTd="item" >
       <div v-if="item.column.property=='name'" style="padding-left: 20px;;">
        {{ item.row.name }} <br> 
        <small class="text-secondary">{{ item.row.email }}</small>
      </div>
      <div style="display: flex;align-items: center;width: 100%;" v-if="item.column.property=='id'">
      <div style="width: 28%; height: 40px;margin-right: 10px;">
      <Avatar  :label="item.row.name.charAt(0).toUpperCase() + item.row.email.charAt(1).toUpperCase()"
        :background-dynamics="true" class="me-2"></Avatar>
      </div>
       
      <div style="width: 70%; height: 100%;background-color: brown;text-align: center" v-if="item.column.property=='id'" >
        <span style="color: #fff!important;text-decoration: underline;text-align: center;width: 100%;" class="text-secondary">{{ item.row.id}}</span>
      </div>
      </div>
    </template>

    <template #actions="item">
      <div class="dropdown dropstart text-center"><!--dark-->
        <a class="btn btn-dropdown dropdown-toggle" href="#" role="button" id="dropdownMenuDropleft"
          data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <svg class="icon-expand icon icon-sm icon-secondary">
            <use href="@/assets/svg/sprites.svg#it-more-items"></use>
          </svg>

        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuDropleft"><!--dark-->
          <div class="link-list-wrapper">
            <ul class="link-list">
              <li style="cursor: pointer;"><a class="dropdown-item list-item" @click.prevent="onview(item.row)">
                  <span><svg class="icon  icon-primary icon.primary.hover" aria-hidden="true">
                      <use href="@/assets/svg/sprites.svg#it-password-visible"></use>
                    </svg> {{ 'Dettaglio' }} </span>

                </a></li>
              <li style="cursor: pointer;"><a class="dropdown-item list-item" @click.prevent="onview(item.row)">
                  <span><svg class="icon icon-sm icon-primary icon.primary.hover" aria-hidden="true">
                      <use href="@/assets/svg/sprites.svg#it-user"></use>
                    </svg> {{ 'User' }}</span>
                </a></li>
              <li style="cursor: pointer;"><a class="dropdown-item list-item" @click.prevent="onview(item.row)">
                  <span><svg class="icon icon-sm icon-primary icon.primary.hover" aria-hidden="true">
                      <use href="@/assets/svg/sprites.svg#it-box"></use>
                    </svg> {{ 'Archivia' }}</span>
                </a></li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </DataTableList>


</template>
<style scoped></style>
