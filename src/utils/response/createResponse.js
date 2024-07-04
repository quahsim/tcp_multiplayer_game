//constructs a response packet properly formatted for transmission to a client

import { getProtoMessages } from '../../init/loadProtos.js';
import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';

export const createResponse = (handlerId, responseCode, data = null) => {
  //load protobuf messages
  const protoMessages = getProtoMessages();
  const Response = protoMessages.response.Response;

  const responsePayload = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(JSON.stringify(data)) : null,
  };

  //encodes the responsePayload into a buffer
  const buffer = Response.encode(responsePayload).finish();

  //create packet buffer length
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(buffer.length + config.packet.typeLength, 0); 

  //create packet type buffer
  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(PACKET_TYPE.NORMAL, 0);

  // concat and return the full packet
  return Buffer.concat([packetLength, packetType, buffer]);
};
