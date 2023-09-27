<template>
  <div id="game-board" class="gameboard mt-3">
    <div id="row-one" class="cell-row">
      <Cell
        v-for="grid in rowOne"
        :symbol="grid.symbol"
        :id="grid.idx"
        :handleClick="handleClick"
        :isPlayerTurn="isPlayerTurn"
      />
    </div>
    <div id="row-two" class="cell-row">
      <Cell
        v-for="grid in rowTwo"
        :symbol="grid.symbol"
        :id="grid.idx"
        :handleClick="handleClick"
        :isPlayerTurn="isPlayerTurn"
      />
    </div>
    <div id="row-three" class="cell-row">
      <Cell
        v-for="grid in rowThree"
        :symbol="grid.symbol"
        :id="grid.idx"
        :handleClick="handleClick"
        :isPlayerTurn="isPlayerTurn"
      />
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
  isPlayerTurn: {
    type: Boolean,
    required: true,
  },
})

const rowOne = computed(() => {
  const board = props.board.slice(0, 3)
  for (let i = 0; i < 3; i++) {
    board[i] = {
      idx: i,
      value: board[i],
      symbol: symbol(board[i]),
    }
  }
  return board
})

const rowTwo = computed(() => {
  const board = props.board.slice(3, 6)
  for (let i = 0; i < 3; i++) {
    board[i] = {
      idx: i + 3,
      value: board[i],
      symbol: symbol(board[i]),
    }
  }
  return board
})

const rowThree = computed(() => {
  const board = props.board.slice(6, 9)
  for (let i = 0; i < 3; i++) {
    board[i] = {
      idx: i + 6,
      value: board[i],
      symbol: symbol(board[i]),
    }
  }
  return board
})

const emit = defineEmits(['makeMove'])

const handleClick = (idx) => {
  emit('makeMove', idx)
}

const symbol = (value) => {
  return value === 0 ? '' : props.playerPosition === value ? 'O' : 'X'
}
</script>

<style scoped>
.cell-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 450px) {
  .gameboard {
    padding: 8px;
  }
}
</style>
