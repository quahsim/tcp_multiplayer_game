import { userSessions } from './sessions.js';
import User from '../class/models/user.class.js';

export const addUser = (socket, uuid, playerId) => {
  const user = new User(uuid, socket, playerId);
  userSessions.push(user);
  return user;
};

export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSessions.splice(index, 1)[0];
  }
};

export const getUserById = (id) => {
  return userSessions.find((user) => user.id === id);
};