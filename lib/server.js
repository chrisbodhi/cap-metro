const WebSocket = require('ws');

const { callEvery, sendData } = require('./helpers');
const { request } = require('./requester');

const socketServer = process.env.NODE_ENV === 'test'
  ? {on: () => {}} // todo: figure out a nice mock
  : new WebSocket.Server({ port: 8080 });

const server = (socket) => {
  socket.on('connection', (ws) => {
    const reqPid = callEvery(request, 4000, 'positions.json');
    const wsPid = callEvery(sendData, 5000, ws);

    ws.on('message', (message) => {
      console.log('received: %s', message);
    });

    ws.on('close', (message) => {
      console.log(`Connection closed: ${message}`);
      clearInterval(reqPid);
      clearInterval(wsPid);
    });
  });
};

server(socketServer);

exports.server = server;
