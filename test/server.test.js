const test = require('ava');

const { server, typeCheck } = require('../lib/server');

test('Server is a function', (t) => {
  t.is(typeof server, 'function');
});

test('typeCheck', (t) => {
  t.true(typeCheck(''));
  t.true(typeCheck('{}'));
  t.true(typeCheck([]));
  t.true(typeCheck(Buffer.from('')));

  t.false(typeCheck({}));
});
