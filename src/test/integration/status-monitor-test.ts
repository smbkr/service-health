import test = require('tape-async');
import { StatusMonitor } from '../../lib/status-monitor';
import { DataStore } from '../../lib/data-store';
import { ServiceStatusReport } from '../../lib/health-checkers';
import { dateToUnix } from '../../lib/util';

test('Getting the latest report', async assert => {
  const dataStore = new DataStore();
  const oldReport = ({ foo: 'bar' } as any) as ServiceStatusReport;
  const oldTimestamp = new Date('2010-01-01 00:00');
  const newReport = ({ foo: 'bar' } as any) as ServiceStatusReport;
  const newTimestamp = new Date('2020-01-01 00:00');
  dataStore.push(oldTimestamp, oldReport);
  dataStore.push(newTimestamp, newReport);
  const statusMonitor = new StatusMonitor(dataStore, 100);

  const actual = statusMonitor.getLatest();
  const expected = {
    timestamp: dateToUnix(newTimestamp),
    status: newReport,
  };

  assert.deepEqual(actual, expected);
});

test('Getting availability', async assert => {
  const dataStore = new DataStore();
  const oldReport = ({ foo: true, bar: false } as any) as ServiceStatusReport;
  const newReport = ({ foo: true, bar: true } as any) as ServiceStatusReport;
  dataStore.push(new Date('2020-01-01'), oldReport);
  dataStore.push(new Date('2020-01-02'), newReport);
  const statusMonitor = new StatusMonitor(dataStore, 100);

  const fooAvailability = statusMonitor.getAvailability('foo');
  const barAvailability = statusMonitor.getAvailability('bar');

  assert.equal(fooAvailability, 1);
  assert.equal(barAvailability, 0.5);
});
