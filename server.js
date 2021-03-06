const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('chat message', "a user has connected!");
    socket.on('disconnect', (reason) => {
        console.log("user disconnected: " + reason);
        io.emit('chat message', "a user has disconnected!");
    })
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});