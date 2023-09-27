# Tic-Tac-to-the-Toe
This is a a classic game of Tic-Tac-Toe with a unique twist – it's designed to be inclusive and accessible to screen reader users!

# Steps to Start
**Alternative One: Netlify**
1. Go to [Tic-Tac-to-the-Toe](https://tic-tac-to-the-toe.netlify.app/#/) to run the game UI.
2. Follow the steps in the [backend server repository](https://github.com/yunruu/tic-tac-toe-be) to start your own backend server.
   
   > Note that this is a pre-release, Netlify-hosted version, so the backend server is fixed as `localhost:3001`. This means that the `HOST_PORT` value must be `3001`, and you sadly can only play with yourself on incognito...
3. Enjoy! (Maybe some solo Tic-Tac-Toe will help heal your soul).

**Alternative Two: npm**
1. Clone this repository.
2. Go to your terminal and change the current directory to the one your clone is in.
     `cd /path/to/cloned/directory`
4. Run `npm i`
5. Create a .env file and add the following: `VITE_BASE_API=http://localhost:3001`. The port number (i.e. 3000) can be changed accordingly if needed.
6. Follow the steps in the [backend server repository](https://github.com/yunruu/tic-tac-toe-be) to start your own backend server.
   
   > Note that the port in `VITE_BASE_API` (if using localhost) and `HOST_PORT` should be the same number for the game to run.
   > Also note that you can change the `VITE_BASE_API` to any URI that is hosting the backend server, so you can play multiplayer!
7. Enjoy!

## Tech Stack
- VueJS 3
- Vite
- TailWindCSS
