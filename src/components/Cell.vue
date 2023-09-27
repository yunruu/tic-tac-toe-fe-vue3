<template>
  <button class="cell" :value="id" @click="handleClick" :aria-label="srContent">
    {{ symbol }}
  </button>
</template>

<script setup>
const props = defineProps({
  symbol: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  handleClick: {
    type: Function,
    required: true,
  },
})
</script>

<style scoped>
.cell {
  width: 130px;
  height: 130px;
  cursor: pointer;
  background-color: #dde0e3;
  color: #543d7b;
  font-weight: bold;
  font-size: 36px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell:hover,
.cell:focus {
  background-color: #968eaf;
  color: #dde0e3;
}

.cell:active {
  background-color: #543d7b;
  color: #dde0e3;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
