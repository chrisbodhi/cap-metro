const express = require('express');
const http = require('http');
const url = require('url');

const WebSocket = require('ws');

const { callEvery, sendData } = require('./helpers');
const { request } = require('./requester');

const app = express();

app.use((req, res) => {
  res.send('<h2>instructions for using this thing</h2>');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  const paramsObject = url.parse(req.url, true).query;

  console.log({ paramsObject });

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

server.listen(8080, () => {
  console.log('listening on', server.address().port);
});

exports.server = server;
