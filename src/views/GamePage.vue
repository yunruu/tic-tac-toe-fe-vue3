<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { openDialog } from '../utils/ui'
import { boardInfo, joinGame, leaveGame, makeMove } from '../api/game'
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
const intervalId = ref(null)

const isPlayerTurn = computed(() => {
  return (
    gameSession.value.players[1] != null && gameSession.value.turn == playerPosition.value && !gameSession.value.winner
  )
})

onMounted(async () => {
  try {
    if (!route.query.player) {
      router.push({ name: 'home' })
    }
    // reset all variables from previous game session
    init()
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
    updateMsg.value = 'Waiting for opponent ...'

    intervalId.value = setInterval(async () => {
      await updateBoard()
    }, 5000)
  } catch (e) {
    await openDialog(e, 'Error')
    router.push({ name: 'home' })
  }
})

onUnmounted(() => {
  clearIntervals()
})

const playerNames = computed(() => {
  const [playerOne, playerTwo] = gameSession.value.players
  return {
    playerOne: playerOne?.username || '-',
    playerTwo: playerTwo?.username || '-',
  }
})

const updateBoard = async () => {
  try {
    const res = await boardInfo(gameSession.value.id)
    if (res) {
      gameSession.value = res.gameSession
      if (gameSession.value.winner) {
        clearIntervals()
        const winner = gameSession.value.winner
        if (winner == playerInfo.value.id) {
          updateMsg.value = 'You won! Congratulations!'
        } else if (winner == 'DRAW') {
          updateMsg.value = 'It is a draw! Play again?'
        } else {
          updateMsg.value = 'You lost! Better luck next time!'
        }
      } else {
        if (gameSession.value.players[1]) {
          updateMsg.value =
            gameSession.value.turn === playerPosition.value ? 'It is your turn!' : 'Waiting for opponent ...'
        } else {
          updateMsg.value = 'Waiting for opponent ...'
        }
      }
    }
  } catch {}
}

const onMakeMove = async (idx) => {
  try {
    const res = await makeMove(gameSession.value.id, playerInfo.value.id, idx, playerPosition.value)
    if (!res) return
    gameSession.value = res.gameSession
    updateMsg.value = gameSession.value.board.includes(0) ? 'Waiting for opponent ...' : 'Calculating results ...'
  } catch {
    openDialog('There has been an error trying to make a move, please try again later!', 'Warning')
  }
}

const handleLeaveGame = async () => {
  try {
    await leaveGame(gameSession.value.id, playerInfo.value.id)
    router.push({ name: 'home' })
  } catch {
    openDialog('There has been an error trying to leave the game, please try again later!', 'Warning')
  }
}

const clearIntervals = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
}

const init = () => {
  clearIntervals()
  gameSession.value = {
    id: '',
    players: [null, null],
    turn: 0,
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    winner: null,
  }
  playerPosition.value = 0
  playerInfo.value = {
    id: '',
    username: '',
  }
  updateMsg.value = 'Loading game ...'
  intervalId.value = null
}

const reload = () => {
  router.go()
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
      <div class="update-banner" role="region" id="gameUpdateInfo" aria-live="polite">
        {{ updateMsg }}
        <button
          v-if="gameSession.winner"
          class="ml-4 play-again-btn"
          @click="reload"
          aria-label="Click to play another round"
        >
          Play Again!
        </button>
      </div>
    </section>
    <Gameboard
      :board="gameSession.board"
      :playerInfo="playerInfo"
      :playerPosition="playerPosition"
      :isPlayerTurn="isPlayerTurn"
      @make-move="onMakeMove"
    />
    <div class="flex justify-center mt-8" aria-label="Actions for the game">
      <button class="btn" aria-label="Leave the game" @click="handleLeaveGame">Leave</button>
    </div>
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

.btn {
  width: 180px;
  font-weight: bold;
}

.play-again-btn {
  background-color: #f7c7f9;
  color: #543d7b;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

@media screen and (max-width: 450px) {
  .update-banner {
    width: 90vw;
  }
}
</style>
