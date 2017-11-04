const WebSocket = require('ws');

const dataFn = () => JSON.stringify({ now: Date.now() });

// The `ws` library can only send some types of data,
// so this is a check to make sure I'm not doing it wrong.
// "string, Buffer, ArrayBuffer, Array, or array-like"
// todo: make better
const typeCheck = (input) => {
  if (Array.isArray(input)) { return true; }
  if (Buffer.isBuffer(input)) { return true; }
  if (typeof input === 'string') { return true; }

  return false;
};

const errHandler = (err) => {
  if (err) {
    console.log(`Err in sendData: ${err.message}`);
  }
};

const sendData = (conn, data) => {
  if (typeCheck(data)) {
    conn.send(data, errHandler);
  } else {
    throw new Error(`Cannot send ${data} over WS because its type is ${typeof data}.`);
  }
};

const sendOnInterval = (conn) => setInterval(() => {
  console.log('sending');
  sendData(conn, dataFn());
}, 2000);

const socketServer = process.env.NODE_ENV === 'test'
  ? {on: () => {}} // todo: figure out a nice mock
  : new WebSocket.Server({ port: 8080 });

const server = (socket) => {
  socket.on('connection', (ws) => {
    const pid = sendOnInterval(ws);

    ws.on('message', (message) => {
      console.log('received: %s', message);
    });

    ws.on('close', (message) => {
      console.log(`Connection closed: ${message}`);
      clearInterval(pid);
    });
  });
};

server(socketServer);

module.exports.server = server;
module.exports.typeCheck = typeCheck;
