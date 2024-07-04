import { addGameSession } from '../sessions/game.session.js';

const createGame = () => {
  try {
    addGameSession();
    console.log(`Game successfully created`);
  } catch (error) {
    console.error(`Error occured trying to create game: ${error}`);
  }
};

export default createGame;