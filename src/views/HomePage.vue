<script setup>
import { ref } from 'vue'
import { createPlayer } from '../api/player'
import { openDialog } from '../utils/ui'
import { useRouter } from 'vue-router'

const name = ref('')
const router = useRouter()

const handleClick = async () => {
  try {
    const _name = name.value || 'Anonymous'
    const res = await createPlayer(_name)
    if (!res) {
      openDialog('There has been an error trying to join game, please try again later!', 'Warning', 'error')
      return
    }
    const encodedPlayerInfo = encodeURIComponent(JSON.stringify(res.player))
    router.push({
      name: 'game',
      query: {
        player: encodedPlayerInfo,
      },
    })
  } catch (e) {
    openDialog(e, 'Warning')
  }
}
</script>

<template>
  <header>
    <h1 class="title-txt text-7xl font-bold mt-10 mb-10 text-white text-center">Tic-Tac-Toe</h1>
  </header>
  <div class="start-container w-1/2 rounded m-auto p-10 text-center text-grey-slate-800 bg-white">
    <section class="font-semibold text-xl mb-8">
      <h2 class="text-2xl mb-6">Hello and welcome!</h2>
      This is a classic tic-tac-toe game with a twist. It's designed to be inclusive and accessible to screen reader
      users.
      <p class="font-light text-sm italic mt-2 text-gray-600">Well, at least I hope it stands up to its claim.</p>
    </section>
    <section>
      <h3 class="text-xl mb-6">
        <strong>To get started</strong>, enter a name, or leave it blank to join anonymously. Then,
        <strong>click the start button</strong> to join a game!
      </h3>
      <span class="name-form flex justify-center align-middle mb-2">
        <input
          type="text"
          class="px-4 py-2 mr-5 rounded-xl text-lg text-black font-bold bg-slate-200"
          placeholder="Anonymous"
          v-model="name"
          aria-label="Enter your name, or leave it blank to join anonymously"
          @keyup.enter="handleClick"
        />
        <button
          class="bg-purple-500 hover:bg-purple-700 active:bg-purple-800 text-white text-lg font-bold py-2 px-5 rounded-xl"
          @click="handleClick"
          aria-label="Join a new game"
        >
          Start Game
        </button>
      </span>
    </section>
  </div>
</template>

<style scoped>
@media screen and (max-width: 900px) {
  .start-container {
    width: 75vw;
  }
}
@media screen and (max-width: 580px) {
  .name-form {
    flex-direction: column;
    align-items: center;
  }
  input {
    margin-right: 0px;
    margin-bottom: 15px;
    width: 100%;
  }
  button {
    width: 50%;
    min-width: fit-content;
  }
}
@media screen and (max-width: 450px) {
  .start-container {
    width: 90vw;
  }
  .title-txt {
    font-size: 60px;
  }
}
</style>
