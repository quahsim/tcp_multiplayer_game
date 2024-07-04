import net from 'net';
import initServer from './init/index.js';
import {config} from './config/config.js';
import { onConnection } from './events/onConnection.js';

//creates the actual server that handles new client connections
const server = net.createServer(onConnection)

//prepares everything before the server starts listening for connections
initServer().then(() => {
  server.listen(config.server.port, config.server.host, () => {
    console.log(`Server is running on ${config.server.host}:${config.server.port}`);
    console.log(server.address());
  });
})
.catch((error)=>{
    console.error(error);
    process.exit(1);
})

