<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header text-white">Tic Tac Toe - Version Accessible</header>
  <RouterView />
</template>

<style scoped>
.app-header {
  font-size: 16px;
  font-weight: 600;
  padding: 15px;
  text-align: left;
}
</style>
