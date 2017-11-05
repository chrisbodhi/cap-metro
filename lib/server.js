const express = require('express');
const http = require('http');
const url = require('url');

const WebSocket = require('ws');

const app = express();

app.use((req, res) => {
  res.send('<h2>instructions for using this thing</h2>');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  const paramsObject = url.parse(req.url, true).query;

  console.log({ paramsObject });

  ws.on('message', (msg) => {
    console.log('received:', msg);
  });

  ws.send(JSON.stringify({ one: 'something' }));
});

server.listen(8080, () => {
  console.log('listening on', server.address().port);
});

// const { callEvery, sendData } = require('./helpers');
// const { request } = require('./requester');

// const socketServer = process.env.NODE_ENV === 'test'
//   ? {on: () => {}} // todo: figure out a nice mock
//   : new WebSocket.Server({ port: 8080 });

// const server = (socket) => {
//   socket.on('connection', (ws) => {
//     const reqPid = callEvery(request, 4000, 'positions.json');
//     const wsPid = callEvery(sendData, 5000, ws);

//     ws.on('message', (message) => {
//       console.log('received: %s', message);
//     });

//     ws.on('close', (message) => {
//       console.log(`Connection closed: ${message}`);
//       clearInterval(reqPid);
//       clearInterval(wsPid);
//     });
//   });
// };

// server(socketServer);

exports.server = server;
