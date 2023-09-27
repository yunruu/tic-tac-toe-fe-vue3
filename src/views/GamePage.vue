<script setup>
import { computed, ref, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { openDialog } from '../utils/ui'
import { joinGame, makeMove } from '../api/game'
import Gameboard from '../components/Gameboard.vue'
import Tag from '../components/Tag.vue'

const route = useRoute()
const router = useRouter()

const gameSession = ref({
  id: '',
  players: [null, null],
  turn: 0,
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  winner: null,
})

const playerPosition = ref(0)

const playerInfo = ref({
  id: '',
  username: '',
})

const updateMsg = ref('Loading game ...')

onMounted(async () => {
  try {
    if (!route.query.player) {
      router.push({ name: 'home' })
    }
    playerInfo.value = JSON.parse(decodeURIComponent(route.query.player))
    if (!playerInfo) {
      throw new Error('Player information not found, please try to join a game again.')
    }
    // there is player info in the query, so we can join a game
    const res = await joinGame(playerInfo.value.id)
    if (!res) {
      throw new Error('There has been an error trying to join a game, please try again later!')
    }
    gameSession.value = res.gameSession
    playerPosition.value = gameSession.value?.players[0]?.pid === playerInfo.value.id ? 1 : 2

    updateMsg.value = gameSession.value.turn === playerPosition.value ? 'It is your turn!' : 'Waiting for opponent ...'

    console.log('value', playerPosition.value)
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

const onMakeMove = async (idx) => {
  try {
    const res = await makeMove(gameSession.value.id, playerInfo.value.id, idx, playerPosition.value)
    if (!res) return
    gameSession.value = res.gameSession
  } catch {
    openDialog('There has been an error trying to make a move, please try again later!', 'Warning', 'error')
  }
}
</script>

<template>
  <header>
    <h1 class="text-5xl font-bold mb-4 text-white text-center">Tic-Tac-Toe</h1>
  </header>
  <main>
    <section class="text-center text-xl" aria-label="Game session information">
      <span class="text-slate-200 mr-3">
        <Tag type="info" tag="PLAYER ONE" />
        <strong class="ml-2">{{ playerNames.playerOne }}</strong>
      </span>
      <span class="text-slate-200 mr-3 ml-4">
        <Tag type="info" tag="PLAYER TWO" />
        <strong class="ml-2">{{ playerNames.playerTwo }}</strong>
      </span>
      <div class="update-banner">
        {{ updateMsg }}
      </div>
    </section>
    <Gameboard
      :board="gameSession.board"
      :playerInfo="playerInfo"
      :playerPosition="playerPosition"
      @make-move="onMakeMove"
    />
  </main>
</template>

<style scoped>
.update-banner {
  background-color: transparent;
  margin: auto;
  margin-bottom: 14px;
  margin-top: 14px;
  padding: 16px 5px;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: bold;
  width: fit-content;
  color: #f7c7f9;
}

.buttons {
  width: 180px;
  font-weight: bold;
}

@media screen and (max-width: 450px) {
  .update-banner {
    width: 90vw;
  }
}
</style>
