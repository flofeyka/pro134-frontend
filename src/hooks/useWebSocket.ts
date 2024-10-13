import {io} from 'socket.io-client'

export const useWebSocket = () => {
    return io('/', {
        autoConnect: true,
        path: '/api/socket.io'
    })
}