import { getProtoMessages } from '../init/loadProtos.js';
import { PACKET_TYPE } from '../constants/header.js';
import { config } from '../config/config.js';


const makeNotification = (message, type) => {
  //creates a buffer to hold total length of the packet & write packet length into the buffer
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(message.length + config.packet.totalLength+config.packet.typeLength); 

  // creates a buffer to hold the type of the packet & writes the packet type into the buffer
  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(type);

  // combines packetLength and packetType to 1 buffer
  return Buffer.concat([packetLength, packetType, message]);
};

export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages();
  const Location = protoMessages.game.LocationUpdate;

  const payload = { users };
  const message = Location.create(payload);
  const locationPacket = Location.encode(message).finish();

  // const LocationUpdate = getProtoMessages().game.LocationUpdate;
  // const decodedPacket = LocationUpdate.decode(locationPacket);
  // console.log('THIS IS DECODED', decodedPacket)

  return makeNotification(locationPacket, PACKET_TYPE.LOCATION);
};