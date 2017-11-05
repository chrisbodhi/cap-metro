const url = require('url');

const { callEvery, sendData } = require('./lib/helpers.js');
const { request } = require('./lib/requester.js');
const { server, wss } = require('./lib/server.js');

// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

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

server.listen(PORT, () => {
  console.log(`Listening on ${server.address().port}`);
});
