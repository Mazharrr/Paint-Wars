# PaintWars

<img width="1274" alt="screen shot 2017-02-20 at 8 49 51 pm" src="https://cloud.githubusercontent.com/assets/10522165/23147628/7457393a-f7ae-11e6-810b-6d78e2b62872.png">

PaintWars is a fast-paced yet accessible game that hobbyists and newcomers can casually enjoy in their spare time. As a modern spinoff of the classic arcade game Bomberman, we've added new mechanics to make PaintWars distinct and one to call our own.

# Player Controls

- To move: W,A,S,D Keys or Arrow Keys.
- To drop a paintbomb: Space Button.

# Running PaintWars

To run game:
  - npm install
  - npm run build-watch
  - then in another terminal tab: npm start

Or, feel free to play the game on heroku:
https://paint-wars.herokuapp.com

# Gameplay

![ezgif com-video-to-gif](https://cloud.githubusercontent.com/assets/10522165/25067008/730e0a6a-2204-11e7-80ec-2f2408e020a5.gif)


Initially, all players have a limit of placing one bomb at a time. Using these bombs, players can detonate and break nearby crates, painting tiles with their respective color and gaining points equivalent to the number of tiles painted. 

With each crate break, there is a random chance of revealing a consumable power-up that enhances the player's abilities or bomb power. For example, the bomb powerup increases the number of bombs that can be placed at any given time: 

![ezgif com-video-to-gif 2](https://cloud.githubusercontent.com/assets/10522165/25067037/aa4cec8e-2205-11e7-867a-a7a63f6d5451.gif)

Players vie to attack each other in order to:

- Steal points and tiles from other players
- Remove all powerups from rivals
- Gain the opportunity to pick up the re-distributed consumable powerups

![ezgif com-video-to-gif 4](https://cloud.githubusercontent.com/assets/10522165/25067079/a7add906-2206-11e7-8a6a-cb8dc1c1b027.gif)

# State Management and Data Flow

With every action taking place based on a player's keystrokes, each action is emitted through a websocket to a serverside store that keeps track of the entire game state:

![ezgif com-video-to-gif 6](https://cloud.githubusercontent.com/assets/10522165/25067104/9d1e8e76-2207-11e7-9f0f-48a3259b1f8a.gif)

The new changes in game state are then sent back to each individual client. The changes are managed through a secondary redux store that is unique to each individual player on the client side. These game state changes then trigger the re-renders for both the Phaser gaming engine we used, and also for the React components such as the scoreboard: 

![ezgif com-video-to-gif 7](https://cloud.githubusercontent.com/assets/10522165/25067115/e6435e60-2207-11e7-8ad9-f602ed0ef3d8.gif)

This project was a great opportunity for us to leverage our understanding and implementation of [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/) while also exploring some libraries we hadn’t used before.

Enjoy!

Best,
Andres, James, and Mazhar

DISCLAIMER: the assets used in this game are not ours and belong to Nintendo. We have no intent to use this for commercial purposes, and these sprites were used as part of a school project. This project was made strictly as a learning exercise for programming. 
