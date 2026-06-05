<script lang="ts" setup>
/**
 * @component DataTableList
 * @description DataTable personalizzato per la visualizzazione dei dati.
 * @author Salvatore Mariniello <salvo.mariniello@gmail.com>
 * @version 1.0.0
 * 
 */

import type { ColumnTable, DataTableConf } from '@/model/Models';
import { computed, onMounted, ref, watch } from 'vue';
 


 const dataFilter=ref<any[]>([]);

 const itemsChecked=ref<any[]>([]);

 const dataSearchFilter=ref<any[]>([]);

 const props=defineProps<{
    filter?:string;
    dataTableConf:DataTableConf;
    dataItems:any[];
    showCheckbox?:boolean;
    
 }>();

 const emit=defineEmits<({
    onview:[obj:object]
    onupdate:[obj:object]
    ondelete:[obj:object]
    onavanti:[current:number,size:number]
    onindietro:[current:number,size:number]
    ondownload:[call:any[]]
    onchecked:[obj:any[]]
 })>();
 
const currentPage=ref<number>(0);
const viewItemPage=ref<number>(props.dataTableConf.dimensionePagina);  

 
 const filterComputer=computed(()=>{
        if(!props.dataTableConf.isserver){
        if(props.filter){
      currentPage.value=0;  
    dataSearchFilter.value=props.dataItems.filter((o)=>{
        let isFilter=false;
        props.dataTableConf.columns.forEach(e=>{
            if(String(o[e.property]).toUpperCase().indexOf(String(props.filter).toUpperCase())!=-1){
                isFilter= true
            }
        })
        return isFilter;
    
    }) 
    currentPage.value=0;    
    dataFilter.value=dataSearchFilter.value.slice(0,viewItemPage.value);        
    }
    else{
    currentPage.value=0;    
    dataFilter.value=props.dataItems.slice(0,viewItemPage.value);
    }
    }else{
       dataFilter.value=props.dataItems; 
    }
    return dataFilter;
 })
 
const currentPageComputed=computed(()=>{
     
    if(currentPage.value<0)
    currentPage.value=0;
    if(!props.dataTableConf.isserver){
    if(props.filter){
    if(((currentPage.value *viewItemPage.value)> dataSearchFilter.value.length))
      currentPage.value=currentPage.value-1;
    }else{
    if(((currentPage.value *viewItemPage.value)> props.dataItems.length))
    currentPage.value=currentPage.value-1;
    }
    }else{
      if(props.dataTableConf.serverPaging&& (currentPage.value >= props.dataTableConf.serverPaging.serverTotalePagine))  
      currentPage.value=currentPage.value-1;
    }
    return currentPage;

})

const totalPageComputed=computed(()=>{
   if(!props.dataTableConf.isserver){
    if(props.filter)
    return Math.ceil(( dataSearchFilter.value.length / viewItemPage.value))
    else
    if(props.dataItems.length)
    return Math.ceil(( props.dataItems.length / viewItemPage.value))
   }else{
    return props.dataTableConf.serverPaging?.serverTotalePagine;
   }
})

const download=()=>{
     
    emit("ondownload",filterComputer.value.value);

}
 
 
function sortASC(property:string,evt:any){  
 resetClassOrder();
   
 evt.target.classList.add("icon-primaryOrder");

filterComputer.value.value.sort((a, b) => {
  const propertyA = a[property];  
  const propertyB = b[property];  
  
  if (propertyA < propertyB) {
    return -1;
  }
  if (propertyA > propertyB) {
    return 1;
  }

 
  return 0;
});


}

function sortDES(property:string,evt:any){  
resetClassOrder();
    
 evt.target.classList.add("icon-primaryOrder");

filterComputer.value.value.sort((a, b) => {
  const propertyA = a[property];  
  const propertyB = b[property];  
  
  if (propertyA > propertyB) {
    return -1;
  }
  if (propertyA < propertyB) {
    return 1;
  }


  return 0;
});


}



const resetClassOrder=()=>{
    Array.from(document.getElementsByClassName("icon-primaryOrder")).forEach(el=>{
        el.classList.remove("icon-primaryOrder")
    })
}

watch(currentPage,async ()=>{
    if(!props.dataTableConf.isserver){ 
    if(currentPage.value>0){
    if(props.filter)   
   dataFilter.value=dataSearchFilter.value.slice((viewItemPage.value*currentPage.value),((viewItemPage.value*currentPage.value)+viewItemPage.value)) 
     else
    dataFilter.value=props.dataItems.slice((viewItemPage.value*currentPage.value),((viewItemPage.value*currentPage.value)+viewItemPage.value))  
  
    }
    else{
    currentPage.value=0; 
  if(props.filter) 
  dataFilter.value=dataSearchFilter.value.slice(0,viewItemPage.value);
  else
 dataFilter.value=props.dataItems.slice(0,viewItemPage.value);
    }
}else{
    dataFilter.value=props.dataItems;
}
}
)

watch(props.dataTableConf,async ()=>{
       return totalPageComputed
}
)

watch(props.dataItems,async ()=>{
   if(props.dataItems.length && props.showCheckbox)
    props.dataItems.forEach((obj,index)=>{
    obj['checkId']=index;
  })
}
)
 

const avanti=()=>{
     currentPage.value=currentPage.value+1 
     if(props.dataTableConf.isserver){ 
         if(props.dataTableConf.serverPaging&& (currentPage.value >= props.dataTableConf.serverPaging.serverTotalePagine)) 
            currentPage.value=currentPage.value-1
            emit("onavanti",currentPage.value,viewItemPage.value)
     }
    if(isOrder) resetClassOrder();
    if(props.showCheckbox) clearChecked();
}

const indietro=()=>{
   if(isOrder) resetClassOrder();
    if(currentPage.value>0){ 
    currentPage.value=currentPage.value-1 
    if(props.showCheckbox) clearChecked();
    }
     if(props.dataTableConf.isserver)
     emit("onindietro",currentPage.value,viewItemPage.value)
}

 
const columsVisible=ref<ColumnTable[]>([]);
const isOrder=ref<boolean>(false);

onMounted(()=>{
  columsVisible.value=props.dataTableConf.columns.filter(c=>!c.hidden)
  if(props.showCheckbox)
  props.dataItems.forEach((obj,index)=>{
    obj['checkId']=index;
    
  })

props.dataTableConf.columns.forEach(col=>{
    if(col.order)isOrder.value=true;
})
  console.log(props.dataItems);
  emit('onchecked',itemsChecked.value) 
})

watch(props.dataItems,async ()=>{
   if(props.dataItems.length && props.showCheckbox)
    props.dataItems.forEach((obj,index)=>{
     if(obj['checked']){
     itemsChecked.value.push(obj);  
    console.log("obj:checked:",obj);
     emit('onchecked',itemsChecked.value)
    }
  })
}
)

const toggleChecked=(row: any)=>{
    if(itemsChecked.value.length){
 let indexAss=itemsChecked.value.findIndex((el)=>el.checkId==row.checkId)
       if(indexAss!=-1){
       itemsChecked.value.splice(indexAss,1)
       }else{
itemsChecked.value.push(row);
       }
    }else{
    itemsChecked.value.push(row);    
    }
       console.log(itemsChecked.value)
    emit('onchecked',itemsChecked.value)   
}


const clearChecked=()=>{
    itemsChecked.value=[];
  Array.from(document.querySelectorAll('.dtlchek')).forEach((el:any)=>{
        el.checked=false;
    })
    emit('onchecked',itemsChecked.value) 
}

</script>
<template>
<div v-if="props.dataTableConf.viewDownload" class="col-md-12 right-box">
   <slot :ondownload="{oncall:download}" name="download">
    
   <button  type="button" class="btn btn p-0 shadow-none" @click="download" title="Download" >
            <span>     
            <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 16l4-5h-3V4h-2v7H8l4 5zm-7 2v2h14v-2H5z"/>
            </svg>
            </span>  
     </button>
  </slot>
  </div>    
<section v-if="props.dataTableConf.paginator">    
<div v-if="props.dataItems.length && (currentPageComputed.value>=1 || filterComputer.value.length>=viewItemPage) && (props.dataItems.length>props.dataTableConf.dimensionePagina) || props.dataItems.length && props.dataTableConf.isserver && props.dataTableConf.serverPaging&& (props.dataTableConf.serverPaging.serverTotaleElementi>props.dataTableConf.dimensionePagina)" class="row ">

<div v-if="props.dataTableConf.paginator && props.dataTableConf.paginatorPosition?.top===true" :class="props.dataTableConf.paginatorPosition.class+' col-md-12 mb-3'" >
  
  <button class="btn btn-outline-default navBtn" type="button" @click="indietro">
  <slolt name="iconIndietroTop">
    <span> 
<svg class="iconNav" viewBox="0 0 24 24">
  <path d="M15 18l-6-6 6-6"/>
</svg>
</span>
    </slolt>
  </button> 
  <button class="btn btn-default navBtn" type="button">{{ currentPageComputed.value+1 }} / {{ totalPageComputed }}</button>
  <button class="btn btn-outline-default navBtn " type="button" @click="avanti">
  <slolt name="iconAvantiTop">
    <span>
    <svg class="iconNav" viewBox="0 0 24 24">
    <path d="M9 6l6 6-6 6"/>
    </svg>
</span>
    </slolt>
  </button>
 
</div>
</div>
 
</section>
    <div :class="props.dataTableConf.paginator?'row tablerow':'row'">

    <div class="col">
    <table class="table table-hover">
        <thead>
            <tr>
                <th v-if="showCheckbox" class="checkbox-header"></th>
                <th class="headerTitle" v-for="(value) in columsVisible">
                   <div class="header-container">
                     <span class="header-text">{{ value.title }}</span>
                     <div v-if="value.order" class="sort-arrows">
                       <span class="sort-arrow-up" @click="sortASC(value.property,$event)">     
                        <svg class="iconOrder" viewBox="0 0 24 24">
                        <path d="M7 14l5-5 5 5H7z"/>
                        </svg>
                       </span>
                       <span class="sort-arrow-down" @click="sortDES(value.property,$event)">
                        <svg class="iconOrder" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5H7z"/>
                        </svg>
                    </span>
                     </div>
                   </div>
                </th>
                <th v-if="props.dataTableConf.viewActions" class="headerTitle action-header"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(page, index) in filterComputer.value"
                :key="index"
            >
                <td v-if="showCheckbox">
                   <slot :row="page"  name="checkbox">
                   <div class="form-check">
                     <input class="dtlchek" @change="toggleChecked(page)"  :id="'chek'+index" :checked="page['checked']" type="checkbox" data-focus-mouse="false">
                     <label style="color: aliceblue;" :for="'chek'+index">&nbsp;&nbsp;</label>
                     </div>
                   </slot>

                </td>
                <td v-for="(value) in columsVisible" :style="value.style">
                   <slot :row="page" :column="value" name="iconTd"></slot>
                   <slot :row="page" :column="value" name="columnTd">
                    {{value.callFormatt?value.callFormatt(page[value.property],page):page[value.property]}}
                    </slot>
                </td>
                   <td v-if="props.dataTableConf.viewActions">
                    <div class="btn-group box-action" role="group" aria-label="Actions">
                    <slot :row="page" name="actions"> 
        
                    <button v-if="props.dataTableConf.actionsRow?.view" type="button" class="btn btn p-0 shadow-none" @click="emit('onview',page)">
                    <slot name="iconView">
                        <span>        
                        <svg class="iconView" viewBox="0 0 24 24">
                        <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                        </svg>
                     </span>
                     </slot>
                    </button>
                    <button v-if="props.dataTableConf.actionsRow?.update" type="button" class="btn btn p-0 shadow-none" @click="emit('onupdate',page)">
                     <slot name="iconUpdate">
                     <span>           
                    <svg class="iconUpdate" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L20.81 6.94l-3.75-3.75L3 17.25z"/>
                    </svg>
                    </span>
                    </slot>
                    </button>
                    <button v-if="props.dataTableConf.actionsRow?.delete" type="button" class="btn btn p-0 shadow-none" @click="emit('ondelete',page)">
                     <slot name="iconDelete">
                        <span> 
                    <svg class="iconDelete" viewBox="0 0 24 24">
                    <path d="M6 7h12M9 7v12m6-12v12M10 3h4l1 1h5v2H4V4h5l1-1z"/>
                    </svg>
                     </span>
                     </slot>
                    </button>
                    </slot>
                 
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="col-md-12 center" v-if="!props.dataItems.length">
      <span>
    <svg class="icon" viewBox="0 0 24 24">
    <path d="M12 2L2 22h20L12 2zm0 14h-1v-6h2v6zm0 4h-1v-2h2v2z"/>
    </svg>  {{dataTableConf.messageNotRecords}} </span>
    </div>
    </div>
    </div>

<section>    
<div v-if="props.dataItems.length && (currentPageComputed.value>=1 || filterComputer.value.length>=viewItemPage) && (props.dataItems.length>props.dataTableConf.dimensionePagina) || props.dataItems.length && props.dataTableConf.isserver && props.dataTableConf.serverPaging&& props.dataTableConf.serverPaging.serverTotaleElementi>props.dataTableConf.dimensionePagina" class="row mb-5">
 
<div v-if="props.dataTableConf.paginator && props.dataTableConf.paginatorPosition?.bottom===true" :class="props.dataTableConf.paginatorPosition.class+' col-md-12'">
  
  <button class="btn btn-outline-default navBtn" type="button" @click="indietro">
  <slolt name="iconIndietroBottom">
    <span>
<svg class="iconNav" viewBox="0 0 24 24">
  <path d="M15 18l-6-6 6-6"/>
</svg>
</span>
</slolt>
  </button> 
  <button class="btn btn-default navBtn" type="button">{{ currentPageComputed.value+1 }} / {{ totalPageComputed }}</button>
  <button class="btn btn-outline-default navBtn " type="button" @click="avanti">
  <slolt name="iconAvantiBottom">
    <span>
<svg class="iconNav" viewBox="0 0 24 24">
  <path d="M9 6l6 6-6 6"/>
</svg>
</span>
</slolt>
  </button>

</div>
</div>
 
</section>
</template>

<style scoped>
section{
    float: right; 
    display: contents;
    box-sizing: border-box;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    width: 100%;
    box-sizing: border-box;
}

.col {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    box-sizing: border-box;
}

.col-md-12 {
    flex: 0 0 100%;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    box-sizing: border-box;
}

.mb-3 {
    margin-bottom: 1rem !important;
}

.mb-5 {
    margin-bottom: 3rem !important;
}
 
.shadow-none{
    box-shadow: none !important;
    border: none !important;
}

.iconNav{
    width: 30px;
    height: 30px;
    fill: #06c !important;
}
.iconNav:hover{
    width: 30px;
    height: 30px;
    fill: rgb(33, 55, 77) !important;
}

.iconView{
    width: 22px;
    height: 22px;
    border: none;
     fill: #06c !important;
} 
.iconUpdate{
    width: 22px;
    height: 22px;
    border: none;
     fill: #06c !important;
}
.iconDelete{
    color: #dc3545;
    width: 20px;
    height: 24px;
    background: #e3e2e2;
    border-radius: 35px 35px 10px 10px;
}
.iconOrder {
    width: 22px;
    height: 22px;
    vertical-align: bottom;
    fill: #a1a1a1;
}
.icon-primaryOrder{
    fill: #06c !important;
}
.tablerow{
    margin-top: 0px;
    
}
.navBtn{
    clip-path: fill-box;
}

.mr10{margin-right: 15px;}
 
.center{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;
    align-self: center;
    justify-content: center;
}
.left{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;
    align-self: center;
    justify-content: flex-start;
}
.right{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;
    align-self: center;
    justify-content: flex-end;
}
.right-box{
    display: flex;
    margin-right: unset;
    justify-content: flex-end;
    padding-right: 60px;
    padding-bottom: 40px;
}
.box-action{
    display: inline-flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-end;
    float: right;
}
.box-action button {
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
}
.box-action button:hover {
    opacity: 0.8;
}

.table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
    vertical-align: middle;
    border-color: #dee2e6;
    border-collapse: collapse;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    box-sizing: border-box;
}
.table th, .table td {
    padding: 0.75rem 0.30rem;
    vertical-align: middle;
    border-bottom: 1px solid #dee2e6;
    text-align: left;
    box-sizing: border-box;
}
.table-hover tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.04);
}
.table thead th {
    border-bottom: 2px solid #dee2e6;
    background-color: #f8f9fa;
    vertical-align: bottom;
}

.checkbox-header {
    width: 40px;
}
.action-header {
    width: 120px;
}

.headerTitle {
    font-size: small;
    font-weight: 600;
    color: #0066cc;
    letter-spacing: 0.05em;
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 24px;
    width: 100%;
}
.header-text {
    font-size: small;
    font-weight: 600;
    color: #0066cc;
}
.sort-arrows {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 8px;
    height: 32px;
}
.sort-arrow-up, .sort-arrow-down {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 16px;
}
.sort-arrow-down {
    margin-top: -4px;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
    box-sizing: border-box;
}

.btn-outline-default {
    border: 1px solid #0066cc;
    color: #0066cc;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 4px 8px;
}
/*
.btn-outline-default:hover {
    background-color: #0066cc;
    color: #ffffff;
}
.btn-outline-default:hover .iconNav {
    fill: #ffffff !important;
}*/

.btn-default {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    color: #495057;
    font-weight: 600;
    padding: 4px 12px;
    pointer-events: none;
}

.navBtn {
    margin: 0 4px;
    height: 38px;
    min-width: 38px;
}

.btn-group {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
}

.form-check {
    display: block;
    min-height: 1.5rem;
    padding-left: 1.5em;
    margin-bottom: 0.125rem;
    position: relative;
    box-sizing: border-box;
}
.dtlchek {
    position: absolute;
    margin-top: 0.3rem;
    margin-left: -1.5rem;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    box-sizing: border-box;
}

.icon,
.iconNav,
.iconView,
.iconUpdate,
.iconDelete,
.iconOrder {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}

.iconNav { color: #06c; width: 30px; height: 30px; }
.iconView, .iconUpdate { color: #06c; width: 22px; height: 22px; }
.iconDelete { color: #dc3545; width: 22px; height: 22px; }
.iconOrder { color: #a1a1a1; }
.icon-primaryOrder { color: #06c !important; }

</style>