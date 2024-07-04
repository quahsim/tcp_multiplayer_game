import { removeUser } from "../sessions/user.session.js";

export const onEnd = (socket)=>() => {
    console.log('Client has been disconnected');
    removeUser(socket);
  };