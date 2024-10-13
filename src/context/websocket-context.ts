import {Context, createContext} from "react";
import {Socket} from "socket.io-client";

export const WebsocketContext: Context<Socket> = createContext(null)