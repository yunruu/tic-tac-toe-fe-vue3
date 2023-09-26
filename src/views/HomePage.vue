<script setup></script>

<template>
  <div class="start-container max-w-xl rounded overflow-hidden shadow-lg m-auto p-4 text-center text-white">
    <h1 class="text-7xl font-bold mt-16 mb-12">Tic-Tac-Toe</h1>
    <section class="font-semibold text-xl mb-10">
      This is a classic tic-tac-toe game with a twist! It's designed to be inclusive and accessible to screen reader
      users.
      <p class="font-light text-sm italic mt-2 text-gray-300">Well at least I hope it stands up to its claim...</p>
    </section>
    <section>
      <h3 class="text-xl mb-10">
        <strong>To get started</strong>, enter a name, or leave it blank to join anonymously. Then,
        <strong>click the start button</strong> to join a game!
      </h3>
      <input type="text" class="px-4 py-2 mr-5 rounded-xl text-lg text-black font-bold" placeholder="Anonymous" />
      <button
        class="bg-purple-500 hover:bg-purple-700 active:bg-purple-800 text-white text-lg font-bold py-2 px-5 rounded-xl"
        onClick="{handleClick}"
      >
        Start Game
      </button>
    </section>
  </div>
</template>

<style scoped></style>
