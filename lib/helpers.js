const fs = require('fs');
const path = require('path');

// ** Code for communicating to client ** //
const filePath = path.join(__dirname, '/../tmp/positions.json');

const errHandler = (err) => {
  if (err) {
    console.log(`Err in sendData: ${err.message}`);
  }
};

const sendData = (conn) => {
  fs.readFile(filePath, (err, buff) => {
    if (err) { throw err; }

    const data = buff.toString();
    console.log('Sending.');
    conn.send(data, errHandler);
  });
};

/**
 * Wrapper for setInterval
 * @param {function} fn Function to be called
 * @param {number} ms How often to call function
 * @param {any} args Any number of arguments that will be passed to `fn`
 */
const callEvery = (fn, ms, ...args) => setInterval(() => fn(...args), ms);

exports.callEvery = callEvery;
exports.sendData = sendData;
