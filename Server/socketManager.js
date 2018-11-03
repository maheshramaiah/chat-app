const userService = require('./service/user');
const chatService = require('./service/chat');
const config = require('./config/config');

function emitUsersList(io, users) {
    const usersList = users.map((user) => {
        user.active = !!user.socketId;

        return user;
    });
    io.emit('USERS_LIST', usersList);
}

function updateSocketId(io, email, socketId) {
    const query = { email };
    const values = { $set: { socketId } }

    return userService.update(query, values)
        .then(() => console.log(`Updated socket id for user - ${email} - ${socketId}`))
        .then(() => userService.getAll())
        .then(users => emitUsersList(io, users))
        .catch(err => console.log(err));
}

function receiveAndEmitPrivateMessage(io, data) {
    const { socketId } = data;

    if (socketId) {
        const socketConn = io.sockets.sockets[socketId];

        if (socketConn) {
            if (config.saveChat) {
                chatService.saveChat(data)
                    .then(() => {
                        socketConn.emit('EMIT_PRIVATE_MESSAGE', data);
                    })
                    .catch(() => {
                        console.log('Error saving chat');
                    });
            }
            else {
                socketConn.emit('EMIT_PRIVATE_MESSAGE', data);
            }
        }
    }
}

function socketManager(io, socket) {
    const userId = socket.request._query.userId;

    //update socket id in users table
    userId && updateSocketId(io, userId, socket.id);

    socket.on('PRIVATE_MESSAGE', data => receiveAndEmitPrivateMessage(io, data));

    //on socket disconnect
    socket.on('disconnect', () => updateSocketId(io, userId, null));
}

module.exports = socketManager;