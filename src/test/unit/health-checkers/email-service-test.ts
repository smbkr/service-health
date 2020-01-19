import test = require('tape-async');
import emailService from '../../../lib/health-checkers/email-service';

test('It returns true', async assert => {
  const actual = await emailService();
  assert.equal(actual, true);
});
