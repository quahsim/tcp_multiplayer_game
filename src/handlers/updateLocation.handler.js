import { getGameSession,getFirstGameSession } from '../sessions/game.session.js';
import { getUserById } from '../sessions/user.session.js';
import { handleError } from '../utils/error/errorHandler.js';
import CustomError from '../utils/error/customError.js';
import { ErrorCodes } from '../utils/error/errorCodes.js';
import { createLocationPacket } from '../utils/game.notificiation.js';

const updateLocationHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;
    const gameSession = getGameSession();

    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, 'Cannot find game session');
    }

    const user = getUserById(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, 'Cannot find user');
    }
    //update current user's position
    user.updatePosition(x, y);
    //retrieve all users from the first game session
    const users = getFirstGameSession().users;
    //remove the current user from the list of all users
    const filterMyUser = users.filter((user)=>user.id !==userId);
    //generate a packet containing the locations of all other users
    const packet = createLocationPacket(filterMyUser);

  
    socket.write(packet);
  } catch (error) {
    handleError(socket, error);
  }
};

export default updateLocationHandler;
