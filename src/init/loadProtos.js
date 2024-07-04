//load and manage protobuf message definitions from .proto files

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';
import { packetNames } from '../protobufs/packetNames.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const protoDir = path.join(__dirname, '../protobufs');

//recursively finds all .proto files in directory and its subdirectories
const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === '.proto') {
      fileList.push(filePath);
    }
  });
  return fileList;
};

//store getAllProtoFiles/protobuf messages to protoMessages object
const protoFiles = getAllProtoFiles(protoDir);
const protoMessages = {};

export const loadProtos = async () => {
  try {
    const root = new protobuf.Root();

    await Promise.all(protoFiles.map((file) => root.load(file)));

    //1. loads all .proto files into the root namespace
    //2. iterates over the packetNames to map namespace & types to their definitions in protoMessages
    for (const [namespace, types] of Object.entries(packetNames)) { 
      protoMessages[namespace] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[namespace][type] = root.lookupType(typeName); //namespace, types => protoMessages.common.Packet
      }
    }

    console.log('Protobuf file has been loaded.');
  } catch (error) {
    console.error('Error in loading Protobuf file:', error);
  }
};
//returns a copy of the protoMessages object containing all the loaded protobuf message def
export const getProtoMessages = () => {
  // console.log('protoMessages:', protoMessages); // 디버깅을 위해 추가
  return { ...protoMessages };
};
