import { config } from '../config/config.js';
import { PACKET_TYPE, TOTAL_LENGTH } from '../constants/header.js';
import { packetParser } from '../utils/parser/packetParser.js';
import { handleError } from '../utils/error/errorHandler.js';
import { getHandlerById } from '../handlers/index.js';

export const onData = (socket) => async (data) => {
  //adds new incoming data to the existing socket.buffer
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  //loop checks if the current socket.buffer length is at least totalHeaderLength
  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    //check if the entire packet is available
    //we only want the data not the header -> that's why we use slice!
    if (socket.buffer.length >= length) {
      const packet = socket.buffer.slice(totalHeaderLength, length);
      socket.buffer = socket.buffer.slice(length);

      try {
        switch (packetType) {
          case PACKET_TYPE.PING:
            break;
          case PACKET_TYPE.NORMAL:
            //deserializing at packetParser.js
            const { handlerId, payload, userId } = packetParser(packet);

            const handler = getHandlerById(handlerId);
            await handler({
              socket,
              userId,
              payload,
            });

            console.log('handlerId:', handlerId);
            console.log('userId:', userId);
            console.log('payload:', payload);
        }
      } catch (error) {
        handleError(socket, error);
      }
    } else {
      //packet hasn't arrived yet
      break;
    }
  }
  console.log(data);
};
