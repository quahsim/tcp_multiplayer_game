//central place to manage all configs (update & maintainance) -> kind of like mapping

import { PORT,HOST,CLIENT_VERSION } from "../constants/env.js";
import { PACKET_TYPE_LENGTH,TOTAL_LENGTH } from "../constants/header.js";

export const config={
    server:{
        port:PORT,
        host:HOST,
    },
    client:{
        version:CLIENT_VERSION,
    },
    packet:{
        totalLength:TOTAL_LENGTH,
        typeLength:PACKET_TYPE_LENGTH,
    }
}