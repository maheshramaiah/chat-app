const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const api = require('./controller/controller');
const {port} = require('./config/config.js');
const dbConnect = require('./dataAccess/connection');
const middleware = require('./middleware/middleware.js');
const socketManager = require('./socketManager');

dbConnect.connect().then(() => {
	console.log('Connected to DB');
}).catch((e) => {
	console.log(e);
	console.log('Error connecting to DB');
});

middleware(app);

app.use('/api', api);

io.on('connection', (socket) => socketManager(io, socket));

http.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
