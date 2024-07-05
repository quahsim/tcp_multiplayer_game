import { removeUser } from "../sessions/user.session.js";
import { getFirstGameSession } from "../sessions/game.session.js";

export const onEnd = (socket)=>() => {
    console.log('Client has been disconnected');

    //remove user from gameFirstSession
    const gameSession = getFirstGameSession();
    gameSession.removeUser(socket);
    //remove user from userSession
    removeUser(socket);

  };