import io from 'socket.io-client';
import Storage from '../../utils/storage.js';

class SocketManager {
    constructor(conf) {
        this.socket = io(window.location.host, { query: `userId=${Storage.get('userInfo').email}` });
        this.bindEvents(conf);
    }

    bindEvents(config) {
        const socket = this.socket;
        const { receiveUsersList, receivePrivateMessage } = config;

        socket.on('connect', () => {
            console.log('Connected');
        })

        socket.on('USERS_LIST', users => receiveUsersList(users));

        socket.on('EMIT_PRIVATE_MESSAGE', data => receivePrivateMessage(data))
    }

    sendPrivateMessage(obj) {
        const socket = this.socket;

        socket.emit('PRIVATE_MESSAGE', obj);
    }
}

export default SocketManager;