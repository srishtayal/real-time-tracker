const express = require('express');
const app = express();

const http = require('http');

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

io.on('connection', (socket) => {
    socket.on('sendLocation', (data) => {
        io.emit('receiveLocation', {id: socket.id, ...data});
    });
    console.log('New WebSocket connection');

    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id);
    });
});

app.get('/', (req, res) => {
    res.render("index");
});

server.listen(3000 || process.env.PORT, () => {
    console.log('Server is up on port 3000');
}
);