//handle initial connection or first request from clients

import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { addUser } from "../../sessions/user.session.js";
import { handleError } from "../../utils/error/errorHandler.js";
import { createResponse } from "../../utils/response/createResponse.js";
import { getFirstGameSession } from "../../sessions/game.session.js";

const initialHandler = async({socket,userId,payload})=>{
    try{
        const{deviceId,playerId}=payload;
    
    //this addUser is from user Session
    const user = addUser(socket,deviceId,playerId)
    const game = getFirstGameSession();
    //this addUser is from Game Class
    game.addUser(user)
    

    // const initialResponse = createResponse(
    //     HANDLER_IDS.INITIAL,
    //     RESPONSE_SUCCESS_CODE,
    //     {userId:deviceId},
    //     deviceId
    // )
    
    //response is sent back to client confirming that their initial connections has been successful
    // socket.write(initialResponse);

    }catch(error){
        handleError(socket,error);
    }
};

export default initialHandler;