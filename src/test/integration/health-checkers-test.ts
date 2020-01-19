import test = require('tape-async');
import checkSystemStatus from '../../lib/health-checkers';

test('It checks status for all the systems', async assert => {
  const actual = await checkSystemStatus();
  assert.equal(Object.keys(actual), [
    'emailService',
    'microserviceController',
    'paymentGateway',
    'transactionMonitor',
  ]);
  assert.equal(typeof actual.emailService, 'boolean');
  assert.equal(typeof actual.microserviceController, 'boolean');
  assert.equal(typeof actual.paymentGateway, 'boolean');
  assert.equal(typeof actual.transactionMonitor, 'boolean');
});
