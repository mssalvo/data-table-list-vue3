<script lang="ts" setup>
 /**
 * @component Avatar
 * @author Salvatore Mariniello <salvo.mariniello@gmail.com>
 * @version 1.0.0
 * 
 */
import { computed } from 'vue';

const props=defineProps<{
    label:string
    class?:string | 'size-xs' | 'size-sm' | 'size-lg' | 'size-xl' | 'size-xxl'
    backgroundDynamics?:boolean
    background?:string
    color?:string
}>();


const colors = [
  '#f4cccc', // rosa pallido
  '#d9ead3', // verde chiaro
  '#ffe599', // giallo tenue
  '#cfe2f3', // azzurro chiaro
  '#f9cb9c', // pesca
  '#d5a6bd', // lavanda chiaro
  '#9fc5e8', // azzurro pastello
  '#b6d7a8', // verde pastello
  '#ffe6cc', // pesca chiaro
  '#f6c1a6', // rosa pesca
  '#e6ccff', // lavanda molto chiaro
  '#ffd9b3', // pesca soft
  '#c2f0f7', // turchese chiaro
  '#ffebd7', // pesca soft
  '#d0e0e3', // azzurro pallido
  '#f7d9c4', // beige rosato
  '#e0f7e9', // verde pastello chiaro
  '#f2f9f9', // grigio chiaro
  '#fde2e2', // rosa pallido
  '#f2f2f2'  // grigio molto chiaro
];

const styleComputed=computed(()=>{
    let styles=[];
    if (props.background){
         styles.push('background-color:');
         styles.push(props.background);
         styles.push('!important;');
    }
    if(props.backgroundDynamics){
        styles=[];
         styles.push('background-color:');
         styles.push(getCharColor(props.label));
         styles.push('!important;');
    
    }if (props.color){
         styles.push('color:');
         styles.push(props.color);
         styles.push('!important;');
    }
   
    return styles.join('');
})

function getCharColor(char:string) {
 
    if(char && char.length>1){
    const code1 = char.charCodeAt(0);
    const code2 = char.charCodeAt(1);
  
    const combinedCode = ((code1 - 65) * 26) + (code2 - 65);
     
    const colorIndex = combinedCode % colors.length;
    
    return colors[colorIndex>=0 && colorIndex<colors.length?colorIndex:0]; 
    } 
    
    else return '#d0fbc8';
}
</script>
<template>
    <div :style="styleComputed"  :class="props.class?('avatar size-lg '+props.class):'avatar size-lg'" >{{ props.label }}</div>
</template>

<style scoped>
.avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: 600;
    color: #333;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    user-select: none;
    background-color: #e9ecef;
    box-sizing: border-box;
}

.size-xs {
    width: 24px;
    height: 24px;
    font-size: 0.65rem;
}

.size-sm {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
}

.size-lg {
    width: 48px;
    height: 48px;
    font-size: 1.1rem;
}

.size-xl {
    width: 64px;
    height: 64px;
    font-size: 1.5rem;
}

.size-xxl {
    width: 96px;
    height: 96px;
    font-size: 2.2rem;
}
</style>