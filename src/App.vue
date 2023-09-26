<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">Tic Tac Toe - Version Accessible</header>
  <RouterView />
</template>

<style scoped>
.app-header {
  background-color: #020422;
  font-size: 16px;
  font-weight: 600;
  color: white;
  padding: 15px;
  text-align: left;
}
</style>
