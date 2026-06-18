# 📊 DataTableList

![Vue](https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js)
![npm downloads](https://img.shields.io/npm/dm/data-table-list.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-✔-3178c6?logo=typescript)
![Version](https://img.shields.io/badge/version-1.0.3-blue) ![License](https://img.shields.io/badge/license-MIT-green)

✨ Flessibile e completamente personalizzabile per la gestione di tabelle dati.

---

  ## 🌐 Live Demo

👉 [[vue-universal-pagination-demo](https://data-table-list-demo-ntcine78q-mssalvos-projects.vercel.app)]

---
 

## 🚀 Features

- 🔍 **Filtro globale**
- 📄 **Paginazione** client & server
- ⬆️⬇️ **Ordinamento colonne**
- ✅ **Selezione multipla righe**
- ⚙️ **Azioni CRUD (View / Update / Delete)**
- 📥 **Download dati filtrati**
- 🎨 **Altamente customizzabile tramite slot**
- 🔄 **Supporto modalità server-side**

---
 


# Guida all'Utilizzo e all'Implementazione di `DataTableList`

`DataTableList` è un componente riutilizzabile sviluppato in **Vue 3** (con TypeScript e Composition API). Offre una tabella dati flessibile con supporto nativo per paginazione, ordinamento, filtraggio, azioni di riga, esportazione dati, e selezione multipla tramite checkbox.

---

[![downloads](https://img.shields.io/github/stars/badges/shields)](https://github.com/mssalvo/data-table-list-vue3)   

[npm repo](https://www.npmjs.com/package/data-table-list)  
 
 

---

## 📦 Setup

```sh
npm install data-table-list@latest
```

---

## 🎬 Demo

![Preview](https://raw.githubusercontent.com/mssalvo/data-table-list-vue3/refs/heads/main/src/docs/datalist1.png)

---

![Preview](https://raw.githubusercontent.com/mssalvo/data-table-list-vue3/refs/heads/main/src/docs/datalist2.png)

---

![Preview](https://raw.githubusercontent.com/mssalvo/data-table-list-vue3/refs/heads/main/src/docs/datalist3.png)


---


## ☕ Offrimi un caffè

Se questo progetto ti è utile nel tuo lavoro, considera di supportarlo con un caffè ☕  

👉 [[paypal.me/msalvonet](https://paypal.me/msalvonet)]

👉 [[buymeacoffee.com/mssalvo](https://buymeacoffee.com/mssalvo)]


Ogni supporto aiuta a mantenere e migliorare il progetto 🚀
``



---

## usage


```ts
import { DataTableList, Avatar } from 'data-table-list';
import type { DataTableConf } from 'data-table-list';
import 'data-table-list/dist/data-table-list.css'; // This imports the new stable CSS

```
 

---

## 1. Strutture Dati e Interfacce (Modelli)

Il componente utilizza le seguenti interfacce TypeScript definite in [Models.ts](file://data-table-list/src/model/Models.ts):

```ts
export interface DataTableConf {
    columns: ColumnTable[];              // Configurazione delle colonne
    actionsRow?: ActionRow;              // Azioni di default abilitate per riga
    viewActions: boolean;                // Se mostrare o meno la colonna delle azioni
    viewDownload?: boolean;              // Se visualizzare il pulsante per il download/esportazione
    paginator?: boolean;                 // Abilita la paginazione
    paginatorPosition?: PaginatorPosition; // Posizione e allineamento del paginatore
    isserver?: boolean;                  // Se la paginazione e il filtraggio sono gestiti lato server
    serverPaging?: ServerPaging;         // Metadati per la paginazione server-side
    dimensionePagina: number;            // Numero di righe per pagina
    messageNotRecords?: string;          // Messaggio mostrato se la tabella è vuota
}

export interface ColumnTable {
    title: string;                       // Intestazione della colonna
    property: string;                    // Nome della chiave nell'oggetto riga
    style?: string;               // Stile CSS inline da applicare alla cella (es: "width: 150px")
    callFormatt?: Function;       // Funzione custom per formattare il valore della cella
    hidden?: boolean;                    // Nasconde la colonna se impostato a true
    order?: boolean;                     // Abilita l'ordinamento client-side per questa colonna
}

export interface ActionRow {
    view: boolean;                       // Mostra l'icona Visualizza (it-password-visible)
    update: boolean;                     // Mostra l'icona Modifica (it-pencil)
    delete: boolean;                     // Mostra l'icona Elimina (it-delete)
}

export interface PaginatorPosition {
    top: boolean;                        // Mostra il paginatore sopra la tabella
    bottom: boolean;                     // Mostra il paginatore sotto la tabella
    class: 'center' | 'left' | 'right'; // Allineamento del paginatore ('left', 'center', 'right')
}

export interface ServerPaging {
    serverTotaleElementi: number;        // Numero totale di elementi sul server
    serverTotalePagine: number;          // Numero totale di pagine sul server
}
```

---

## 2. API del Componente (Props ed Emits)

### Props (Proprietà)

| Nome Prop | Tipo | Obbligatorio | Descrizione |
| :--- | :--- | :--- | :--- |
| `dataTableConf` | `DataTableConf` | **Sì** | Configurazione della struttura e del comportamento della tabella. |
| `dataItems` | `any[]` | **Sì** | Array di dati (righe) da visualizzare. Se `isserver` è `false`, contiene tutti i record. Se `isserver` è `true`, contiene solo i record della pagina corrente. |
| `filter` | `string` | No | Stringa di ricerca globale. Se specificata e `isserver` è `false`, la tabella esegue un filtro client-side su tutte le colonne visibili. |
| `showCheckbox` | `boolean` | No | Se impostato a `true`, aggiunge una prima colonna con checkbox per la selezione multipla delle righe. |

### Emits (Eventi)

| Nome Evento | Parametri | Descrizione |
| :--- | :--- | :--- |
| `@onview` | `(obj: object)` | Emesso al click sul pulsante "Visualizza" della riga (default action). Riceve l'oggetto riga. |
| `@onupdate` | `(obj: object)` | Emesso al click sul pulsante "Modifica" della riga (default action). Riceve l'oggetto riga. |
| `@ondelete` | `(obj: object)` | Emesso al click sul pulsante "Elimina" della riga (default action). Riceve l'oggetto riga. |
| `@onavanti` | `(current: number, size: number)` | Emesso quando si va alla pagina successiva **solo se** `isserver` è `true`. `current` è l'indice di pagina (0-indexed), `size` è la dimensione della pagina. |
| `@onindietro` | `(current: number, size: number)` | Emesso quando si va alla pagina precedente **solo se** `isserver` è `true`. `current` è l'indice di pagina (0-indexed), `size` è la dimensione della pagina. |
| `@ondownload` | `(call: any[])` | Emesso al click sul pulsante di download. Riceve la lista corrente dei dati filtrati. |
| `@onchecked` | `(obj: any[])` | Emesso ogni volta che cambia la selezione delle righe tramite checkbox. Riceve l'array delle righe attualmente selezionate. |

---

## 3. Slot di Personalizzazione

`DataTableList` offre diversi slot con scoped-slots per personalizzare profondamente il markup:

*   **`#columnTd`**: Permette di personalizzare il rendering del contenuto di ogni cella. Riceve `{ row, column }` come parametri dello slot.
*   **`#iconTd`**: Consente di posizionare un'icona o un elemento decorativo a fianco del valore della cella. Riceve `{ row, column }`.
*   **`#actions`**: Sostituisce i pulsanti di default (Visualizza, Modifica, Elimina) con pulsanti personalizzati o menu dropdown. Riceve `{ row }`.
*   **`#checkbox`**: Sostituisce il checkbox di default delle righe. Riceve `{ row }`.
*   **`#download`**: Personalizza l'aspetto del pulsante di download. Riceve l'evento `{ ondownload: { oncall: Function } }`.
*   **`#iconView`**: Consente di sostituire l'icona menu view.
*   **`#iconUpdate`**: Consente di sostituire l'icona menu update.
*   **`#iconDelete`**: Consente di sostituire l'icona menu delete.
*   **`#iconAvantiBottom`**: Consente di sostituire l'icona navigatore avanti con posizione bottom.
*   **`#iconIndietroBottom`**: Consente di sostituire l'icona navigatore indietro con posizione bottom.
*   **`#iconAvantiTop`**: Consente di sostituire l'icona navigatore avanti con posizione top.
*   **`#iconIndietroTop`**: Consente di sostituire l'icona navigatore indietro con posizione top.

---

## 4. Scenari d'Uso ed Esempi di Implementazione

### Scenario A: Tabella Semplice Client-Side con Paginazione e Ordinamento
In questo scenario, i dati sono interamente caricati in memoria. Il componente gestisce la paginazione, la ricerca globale e l'ordinamento in modo autonomo.

```html
<script setup lang="ts">
import { ref } from 'vue';
import { DataTableList, Avatar } from 'data-table-list';
import type { DataTableConf } from 'data-table-list';
import 'data-table-list/dist/data-table-list.css'; 

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
```

---

### Scenario B: Formattazione Personalizzata di Colonne (`callFormatt`)
Quando si desidera applicare una formattazione al volo su una colonna (es. date, valute, o composizione stringhe) senza alterare i dati di origine, si può definire la funzione `callFormatt` nel modello `ColumnTable`.

```ts
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
```

---

### Scenario C: Personalizzazione Celle con Slot (`#columnTd` & Componenti Custom)
Se si necessita di inserire markup HTML complesso (es. Badge di stato, icone, o componenti esterni come `Avatar.vue`), si utilizza lo slot `#columnTd`.

```html
<script setup lang="ts">
import { ref } from 'vue';
import { DataTableList, Avatar } from 'data-table-list';
import type { DataTableConf } from 'data-table-list';
import 'data-table-list/dist/data-table-list.css'; 

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
```

---

### Scenario D: Selezione Multipla con Checkbox e Evento `@onchecked`
Il componente supporta la selezione di elementi tramite una colonna di checkbox abilitata tramite la prop `:show-checkbox="true"`.

```html
<script setup lang="ts">
import { ref } from 'vue';
import { DataTableList, Avatar } from 'data-table-list';
import type { DataTableConf } from 'data-table-list';
import 'data-table-list/dist/data-table-list.css'; 

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
```

---

### Scenario E: Menu Azioni Personalizzato (Dropdown Bootstrap Italia)
Invece di mostrare i tre pulsanti standard in linea (view, update, delete), è possibile personalizzare la colonna delle azioni inserendo un menu a comparsa (dropdown) in perfetto stile Bootstrap Italia utilizzando lo slot `#actions`.

```html
<script setup lang="ts">
import { ref } from 'vue';
import { DataTableList, Avatar } from 'data-table-list';
import type { DataTableConf } from 'data-table-list';
import 'data-table-list/dist/data-table-list.css';

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
```

---

### Scenario F: Paginazione Server-Side (`isserver: true`)
Se la sorgente dati ha molti elementi, la paginazione deve avvenire sul server.
*   `isserver` deve essere impostato a `true`.
*   È necessario compilare `serverPaging` con i totali di elementi e pagine forniti dalle API.
*   Bisogna ascoltare gli eventi `@onavanti` e `@onindietro` per richiedere la pagina corretta al server e aggiornare l'array `dataItems`.

```html
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DataTableList, Avatar } from 'data-table-list';
import type { DataTableConf } from 'data-table-list';
import 'data-table-list/dist/data-table-list.css';

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
```

---

### Scenario G: Esportazione e Download dei Dati Filtrati
Il componente offre la possibilità di abilitare un pulsante per il download dei dati.
*   Impostare `viewDownload: true` nella configurazione `DataTableConf`.
*   Ascoltare l'evento `@ondownload`, che riceve la lista dei record attualmente filtrati dalla ricerca globale (`filterComputer`).

```html
<script setup lang="ts">
import { ref } from 'vue';
import { DataTableList, Avatar } from 'data-table-list';
import type { DataTableConf } from 'data-table-list';
import 'data-table-list/dist/data-table-list.css';

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
```

---

## 5. Dettagli Implementativi Importanti

1.  **Identificativi Checkbox (`checkId`)**: Quando viene attivata la funzionalità checkbox (`showCheckbox = true`), il componente genera temporaneamente la chiave `checkId` all'interno dei record dell'array `dataItems` per identificare univocamente le righe selezionate. L'array restituito dall'evento `@onchecked` conterrà questi campi aggiuntivi.
2.  **Reset dell'Ordinamento al cambio pagina**: Ad ogni navigazione di pagina (avanti o indietro) o reset del filtro di ricerca, viene richiamata la funzione `resetClassOrder()` che rimuove la classe CSS `.icon-primaryOrder` dall'header della colonna ordinata, indicando che la nuova pagina mostra i dati nel loro stato originario.

---
   
## 🧑‍💻 Autore

**MSalvo**  
🔗 https://github.com/mssalvo  

---

## 📄 Licenza

Distribuito sotto licenza MIT.  
Vedi file LICENSE per dettagli.
