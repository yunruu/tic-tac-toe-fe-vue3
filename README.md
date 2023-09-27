# Tic-Tac-to-the-Toe
This is a a classic game of Tic-Tac-Toe with a unique twist – it's designed to be inclusive and accessible to screen reader users!

# Steps to Start

**Alternative One: npm**
1. Clone this repository.
2. Go to your terminal and change the current directory to the one your clone is in.
     `cd /path/to/cloned/directory`
4. Run `npm i`
5. Create a .env file and add the following: `VITE_BASE_API=http://localhost:3001`. The port number (i.e. 3000) can be changed accordingly if needed.
6. Run `npm run dev` to load your game UI.
7. Follow the steps in the [backend server repository](https://github.com/yunruu/tic-tac-toe-be) to start your own backend server.
   
   > Note that the port in `VITE_BASE_API` (if using localhost) and `HOST_PORT` should be the same number for the game to run.
8. To play in multiplayer, simply change the `VITE_BASE_API` (in step 5) to any URI that is hosting the backend server in the same network. Play together with your friends in the same network through this `npm` alternative!
9. Enjoy!

**Alternative Two: Netlify**
1. Go to [Tic-Tac-to-the-Toe](https://tic-tac-to-the-toe.netlify.app/#/) to run the game UI.
2. Follow the steps in the [backend server repository](https://github.com/yunruu/tic-tac-toe-be) to start your own backend server.
   > Since this is a pre-release, Netlify-hosted version, the backend API is fixed as `localhost:3001`. This means that the `HOST_PORT` value must be `3001`.
3. Now create another tab or use another browser to open [Tic-Tac-to-the-Toe](https://tic-tac-to-the-toe.netlify.app/#/). Now you have two instances of the game! You can create as many tabs or browsers and repeat as you like. Limit: you can only play with yourself since this is a pre-release, Netlify-hosted site.
4. Enjoy! (Maybe some solo Tic-Tac-Toe will help heal your soul).


## Tech Stack
- VueJS 3
- Vite
- TailwindCSS
