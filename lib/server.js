const express = require('express');
const http = require('http');

const WebSocket = require('ws');

const app = express();

app.use((req, res) => {
  res.send('<h2>instructions for using this thing</h2><ul><li>route: a single number</li><li>routes: comma-separated numbers</li></ul><div>Array of objects like <pre>{latitude: 30.2317276, longitude: -97.73331, bearing: 30, odometer: 0, speed: 6.7056}</pre></div>');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

exports.server = server;
exports.wss = wss;
