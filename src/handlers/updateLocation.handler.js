import { getGameSession } from '../sessions/game.session.js';
import { getUserById } from '../sessions/user.session.js';
import { handleError } from '../utils/error/errorHandler.js';
import CustomError from '../utils/error/customError.js';
import { ErrorCodes } from '../utils/error/errorCodes.js';

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
    user.updatePosition(x, y);
    const packet = gameSession.getAllLocation();

    socket.write(packet);
  } catch (error) {
    handleError(socket, error);
  }
};

export default updateLocationHandler;
