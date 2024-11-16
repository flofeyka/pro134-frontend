import {createRoot} from 'react-dom/client'
import {App} from "@comp/App";
import {BrowserRouter} from "react-router-dom";
import {StrictMode} from "react";
import {useWebSocket} from "@src/hooks/useWebSocket";
import {WebsocketContext} from './context/websocket-context';
import "@assets/css/index.css";
const rootElement = document.getElementById('root')
if (!rootElement) {
    console.log('root is not found')
}

const root = createRoot(rootElement)
const socket = useWebSocket()

socket.on('connection', () => {
    console.log(socket.connected)
})

root.render(
    <StrictMode>
        <WebsocketContext.Provider value={socket}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </WebsocketContext.Provider>
    </StrictMode>
)