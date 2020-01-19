import test = require('tape-async');
import nock = require('nock');
import microserviceController, {
  url,
} from '../../../lib/health-checkers/microservice-controller';

test('It returns true when the service responds with 200', async assert => {
  nock(url)
    .post(() => true)
    .reply(200);
  const actual = await microserviceController();
  assert.equal(actual, true);
  nock.cleanAll();
});

test('It returns false when the service responds with 500', async assert => {
  nock(url)
    .post(() => true)
    .reply(500);
  const actual = await microserviceController();
  assert.equal(actual, false);
  nock.cleanAll();
});
