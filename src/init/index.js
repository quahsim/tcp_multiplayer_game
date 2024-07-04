//initializing the server

import { loadProtos } from "./loadProtos.js";
import createGame from "./createGame.js";


const initServer = async()=>{
    try{
        await loadProtos();
        await createGame();

    }catch(error){
        console.error(error);
        process.exit(1);
    }
};

export default initServer;