const test = require('ava');

const { server } = require('../lib/server');

test.skip('Server is a function', (t) => {
  t.is(typeof server, 'function');
});
