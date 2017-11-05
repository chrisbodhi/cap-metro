const express = require('express');
const http = require('http');
const url = require('url');

const WebSocket = require('ws');

const { callEvery, sendData } = require('./helpers');
const { request } = require('./requester');

const app = express();

app.use((req, res) => {
  res.send('<h2>instructions for using this thing</h2><ul><li>route: a single number</li><li>routes: comma-separated numbers</li></ul><div>Array of objects like <pre>{latitude: 30.2317276, longitude: -97.73331, bearing: 30, odometer: 0, speed: 6.7056}</pre></div>');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  const paramsObject = url.parse(req.url, true).query;

  console.log({ paramsObject });

  const reqPid = callEvery(request, 4000, 'positions.json');
  const wsPid = callEvery(sendData, 5000, ws, paramsObject);

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
  });

  ws.on('close', (message) => {
    console.log(`Connection closed: ${message}`);
    clearInterval(reqPid);
    clearInterval(wsPid);
  });
});

server.listen(8080, () => {
  console.log(`Listening on ${server.address().port}`);
});

exports.server = server;
