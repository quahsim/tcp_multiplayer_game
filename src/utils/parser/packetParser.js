//deserializing serialized protobuf message & extract specific fields from message (data)
//ensures that received data is correctly structured, properly decoded(deserialized) and contains all info before further processing

import { getProtoMessages } from '../../init/loadProtos.js';
import { getProtoTypeNameByHandlerId } from '../../handlers/index.js';
import { config } from '../../config/config.js';
import CustomError from '../error/customError.js';
import { ErrorCodes } from '../error/errorCodes.js';

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();

  const Packet = protoMessages.common.Packet;
  let packet;
  try {
    //decoding or deserializing the serialized data from client
    //store decoded message in variable packet
    packet = Packet.decode(data);
  } catch (error) {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, 'Error occuring while decoding packet.');
  }
  //extract the following fields from the decoded 'packet'
  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.clientVersion;

  // checking client version
  if (clientVersion !== config.client.version) {
    throw new CustomError(ErrorCodes.CLIENT_VERSION_MISMATCH, 'Client version does not match');
  }

  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, `Unknown handler ID : ${handlerId}`);
  }

  const [namespace, typeName] = protoTypeName.split('.');
  const PayloadType = protoMessages[namespace][typeName];
  let payload;

  try {
    //decoding payload once more! payload was encoded first and then the packet was encoded!
    payload = PayloadType.decode(packet.payload);
  } catch (error) {
    console.error('Error in decoding packet', error);
  }

  const errorMessage = PayloadType.verify(payload);
  if (errorMessage) {
    throw new CustomError(
      ErrorCodes.PACKET_STRUCTURE_MISMATCH,
      `Packet structure does not match: ${errorMessage}`,
    );
  }

  // checking for missing fields
  const expectedFields = Object.keys(PayloadType.fields); //lists all expected fiels in the payload
  const actualFields = Object.keys(payload); //lists all the payload int he decoded payload
  const missingFields = expectedFields.filter((field) => !actualFields.includes(field)); //lists missing fields
  if (missingFields.length > 0) {
    throw new CustomError(
      ErrorCodes.MISSING_FIELDS,
      `Required fields are missing :${missingFields.join(', ')}`,
    );
  }

  return { handlerId, userId, payload };
};
