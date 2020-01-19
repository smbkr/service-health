import test = require('tape-async');
import { paymentGateway } from '../../../lib/health-checkers';

test('It returns false', async assert => {
  const actual = await paymentGateway();
  assert.equal(actual, false);
});
