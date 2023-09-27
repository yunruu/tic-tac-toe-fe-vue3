<script setup>
import { computed, ref, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { openDialog } from '../utils/ui'
import { joinGame } from '../api/game'
import Gameboard from '../components/Gameboard.vue'

const route = useRoute()
const router = useRouter()

const gameSession = ref({
  id: '',
  players: [null, null],
  turn: 0,
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  winner: null,
})

const playerInfo = ref({
  id: '',
  username: '',
})

const playerPosition = ref(0)

onMounted(async () => {
  try {
    if (!route.query.player) {
      router.push({ name: 'home' })
    }
    playerInfo.value = JSON.parse(decodeURIComponent(route.query.player))
    console.log(playerInfo.value.id)
    if (!playerInfo) {
      throw new Error('Player information not found, please try to join a game again.')
    }
    // there is player info in the query, so we can join a game
    const res = await joinGame(playerInfo.value.id)
    if (!res) {
      throw new Error('There has been an error trying to join a game, please try again later!')
    }
    gameSession.value = res.gameSession
    console.log(gameSession.value)
    playerPosition.value = res.gameSession.players.findIndex((player) => player.id === playerInfo.value.id) + 1
  } catch (e) {
    await openDialog(e, 'Error', 'error')
    router.push({ name: 'home' })
  }
})

const playerNames = computed(() => {
  const [playerOne, playerTwo] = gameSession.value.players
  return {
    playerOne: playerOne?.username || '-',
    playerTwo: playerTwo?.username || '-',
  }
})
</script>

<template>
  <header>
    <h1 class="text-7xl font-bold mt-10 mb-8 text-white text-center">Tic-Tac-Toe</h1>
  </header>
  <main>
    <section class="text-center text-xl" aria-label="Game session information">
      <p class="text-gray-400 font-semibold mb-3">Session ID: {{ gameSession.id || '-' }}</p>
      <span class="text-white mr-4">Player 1: {{ playerNames.playerOne }}</span>
      <span class="text-white mr-4">Player 2: {{ playerNames.playerTwo }}</span>
    </section>
    <Gameboard :board="gameSession.board" :playerInfo="playerInfo" :playerPosition="playerPosition" />
  </main>
</template>
