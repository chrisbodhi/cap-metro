const http = require('http');
const path = require('path');

const express = require('express');

const WebSocket = require('ws');

const app = express();

app.get('/example', (req, res) => {
  console.log('>>> Serving the example page.');
  res.sendFile(path.join(__dirname, '/../public/example.html'));
});

app.get('/', (req, res) => {
  console.log('>>> Serving index page.');
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

exports.server = server;
exports.wss = wss;
