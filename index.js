const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://striimipalvelu.norwayeast.cloudapp.azure.com',
    // origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(socket.id, ' connected');

  socket.on('disconnect', () => {
    console.log(socket.id, ' disconnected');
  });

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log('User ', socket.id, ' joined the room ', data);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
    console.log(data);
  });
});

server.listen(3001, () => {
  console.log('Server is running!');
});
