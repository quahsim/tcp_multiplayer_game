import { createResponse } from '../response/createResponse.js';
import { ErrorCodes } from './errorCodes.js';

export const handleError = (socket, error) => {
  let responseCode;
  let message;
  console.log(error);
  if (error.code) {
    responseCode = error.code;
    message = error.message;
    console.error(`Error Code: ${error.code}, Message: ${error.message}`);
  } else {
    responseCode = ErrorCodes.SOCKET_ERROR;
    message = error.message;
    console.error(`Error: ${error.message}`);
  }

  const errorResponse = createResponse(-1, responseCode, { message }, null);
  socket.write(errorResponse);
};