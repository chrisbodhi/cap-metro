const fs = require('fs');
const path = require('path');

// ** Code for communicating to client ** //
const filePath = path.join(__dirname, '/../tmp/positions.json');

const errHandler = (err) => {
  if (err) {
    console.log(`Err in sendData: ${err.message}`);
  }
};

const filterData = (data, route) => data
  .filter(e => e.vehicle.trip.route_id === route)
  .map(({ vehicle }) => vehicle);

const routesObject = (data, routes) => routes.reduce((acc, route) => {
  acc[route] = filterData(data, route);
  return acc;
}, {});

// Fitler data sent to client if params object has a `route` or `routes` property
const sendData = (conn, params) => {
  fs.readFile(filePath, (err, buff) => {
    if (err) { throw err; }

    const data = buff.toString();

    if (params.route || params.routes) {
      const allPositions = JSON.parse(data).entity;
      const positions = params.routes
        ? routesObject(allPositions, params.routes.split(','))
        : routesObject(allPositions, [params.route]);
      const positionString = JSON.stringify(positions);
      console.log('>>> Sending filtered data.');
      conn.send(positionString, errHandler);
    } else {
      console.log('>>> Sending all data.');
      conn.send(data, errHandler);
    }
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
