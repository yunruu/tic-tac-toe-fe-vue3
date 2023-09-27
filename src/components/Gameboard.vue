<template>
  <div id="game-board" class="mt-3">
    <div id="row-one" class="cell-row">
      <Cell v-for="grid in rowOne" :symbol="symbol(board[grid])" :id="grid" :handleClick="handleClick" />
    </div>
    <div id="row-two" class="cell-row">
      <Cell v-for="grid in rowTwo" :symbol="symbol(board[grid])" :id="grid" :handleClick="handleClick" />
    </div>
    <div id="row-three" class="cell-row">
      <Cell v-for="grid in rowThree" :symbol="symbol(board[grid])" :id="grid" :handleClick="handleClick" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Cell from './Cell.vue'

const props = defineProps({
  board: {
    type: Array,
    required: true,
  },
  playerInfo: {
    type: Object,
    required: true,
  },
  playerPosition: {
    type: Number,
    required: true,
  },
})

const rowOne = computed(() => {
  return props.board.slice(0, 3)
})

const rowTwo = computed(() => {
  return props.board.slice(3, 6)
})

const rowThree = computed(() => {
  return props.board.slice(6, 9)
})

const handleClick = () => {
  console.log('clicked')
}

const symbol = (value) => {
  return value === 0 ? '' : playerPosition === value ? 'O' : 'X'
}
</script>

<style scoped>
.cell-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
