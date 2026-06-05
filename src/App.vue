<script setup lang="ts">
import MasterTemplate from './component/MasterTemplate.vue'
</script>

<template>
  <MasterTemplate>
    <router-view />
  </MasterTemplate>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #f7f9fb;
  color: #191c1e;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>



