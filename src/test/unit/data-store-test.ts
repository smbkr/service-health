import test = require('tape-async');
import { DataStore } from '../../lib/data-store';
import { ServiceStatusReport } from '../../lib/health-checkers';

test('It uses the unix timestamp as key', async assert => {
  const dataStore = new DataStore();
  const timestamp = new Date('2001-09-09T01:46:41+00:00');
  const report = ({ foo: 'bar' } as any) as ServiceStatusReport;
  dataStore.push(timestamp, report);
  assert.deepEqual(Object.keys(dataStore.data), ['1000000001']);
});
