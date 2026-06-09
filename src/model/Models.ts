
export interface DataTableConf{
    columns:ColumnTable[];
    actionsRow?:ActionRow;
    viewActions:boolean;
    viewDownload?:boolean;
    paginator?:boolean;
    paginatorPosition?:PaginatorPosition;
    isserver?:boolean;
    serverPaging?:ServerPaging;
    dimensionePagina:number;
    messageNotRecords?:string;
 
     
}
export interface DataItems<T = any>{
  rows:T[]
}
export interface ServerPaging{
    serverTotaleElementi:number;
    serverTotalePagine:number;
}
export interface PaginatorPosition{
    top:boolean;
    bottom:boolean;
    class: 'center' | 'left' | 'right';
}
 
export interface ColumnTable{
    title:string;
    property:string;
    style?:string;
    callFormatt?:Function;
    hidden?:boolean;
    order?:boolean;
}
export interface ActionRow{
    view:boolean;
    update:boolean;
    delete:boolean;
    
}
 
 
 
  