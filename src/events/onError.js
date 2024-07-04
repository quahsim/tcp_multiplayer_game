import { handleError } from "../utils/error/errorHandler.js";

export const onError= (socket)=> (error) => {
    console.error('Socket error:', error);
    handleError(socket, new CustomError(500, `Socket Error: ${error.message}`));
    removeUser(socket);
  };