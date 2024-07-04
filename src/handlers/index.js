//retrieve & use handler functions and protobuf type names based on handlerIds

import { HANDLER_IDS } from "../constants/handlerIds.js";
import initialHandler from "./user/initial.handler.js";
import { ErrorCodes } from "../utils/error/errorCodes.js";
import CustomError from '../utils/error/customError.js';
import updateLocationHandler from "./updateLocation.handler.js";


const handlers = {
    [HANDLER_IDS.INITIAL]: {
      handler: initialHandler,
      protoType: 'initial.InitialPayload',
    },
    [HANDLER_IDS.LOCATIONUPDATE]:{
      handler: updateLocationHandler,
      protoType: 'game.LocationUpdatePayload',
    }
  };

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,`Cannot find handler: ID ${handlerId}`);
  }
  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID, `Cannot find protobuf handler:${handlerId}`);
  }
  return handlers[handlerId].protoType;
};