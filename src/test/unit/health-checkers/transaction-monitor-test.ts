import test = require('tape-async');
import nock = require('nock');
import transactionMonitor, {
  url,
} from '../../../lib/health-checkers/transaction-monitor';

test('It returns true when the service responds with 200', async assert => {
  nock(url)
    .get(() => true)
    .reply(200);
  const actual = await transactionMonitor();
  assert.equal(actual, true);
  nock.cleanAll();
});

test('It returns false when the service fails to respond', async assert => {
  nock(url)
    .get(() => true)
    .socketDelay(1500)
    // Reply with 200 even though we are testing a failed connection, because
    // we want to test that the checker will respond with `false` if the
    // request takes longer than 1000 ms.
    .reply(200);
  const actual = await transactionMonitor();
  assert.equal(actual, false);
  nock.cleanAll();
});
