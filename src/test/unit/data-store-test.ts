import test = require('tape-async');
import { DataStore } from '../../lib/data-store';
import { ServiceStatusReport } from '../../lib/health-checkers';

test('It uses the unix timestamp as key', async assert => {
  const dataStore = new DataStore();
  const timestamp = new Date('2001-09-09T01:46:41+00:00');
  const report = ({ foo: 'bar' } as any) as ServiceStatusReport;
  dataStore.push(timestamp, report);
  console.log(Object.keys(dataStore.data));
  assert.deepEqual(Object.keys(dataStore.data), ['1000000001']);
});

test('Getting the latest report', async assert => {
  const dataStore = new DataStore();
  const oldReport = ({ foo: 'bar' } as any) as ServiceStatusReport;
  const newReport = ({ foo: 'bar' } as any) as ServiceStatusReport;
  dataStore.push(new Date('2010-01-01 00:00'), oldReport);
  dataStore.push(new Date('2020-01-01 00:00'), newReport);

  const actual = dataStore.getLatest();

  assert.deepEqual(actual, newReport);
});
