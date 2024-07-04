import { gameSession } from './sessions.js'
import Game from '../class/models/game.class.js'


export const addGameSession = () => {
  const session = new Game();
  gameSession.push(session);
  console.log(gameSession);
  return session;
};

export const removeGameSession = (id) => {
  const index = gameSession.findIndex((session) => session.id === id);
  if (index !== -1) {
    return gameSession.splice(index, 1)[0];
  }
};

export const getGameSession = (id) => {
  return gameSession.find((session) => session.id === id);
};

export const getAllGameSessions = () => {
  return gameSession;
};
