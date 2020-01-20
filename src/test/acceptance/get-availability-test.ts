import test = require('tape-async');
import supertest from 'supertest';
import { DataStore } from '../../lib/data-store';
import { ServiceStatusReport } from '../../lib/health-checkers';
import getApp from '../../lib/app';
import { StatusMonitor } from '../../lib/status-monitor';

test('It returns the availability', async assert => {
  const dataStore = new DataStore();
  const up = ({ foo: true } as any) as ServiceStatusReport;
  const down = ({ foo: false } as any) as ServiceStatusReport;
  dataStore.push(new Date('2020-01-01'), up);
  dataStore.push(new Date('2020-01-02'), down);
  dataStore.push(new Date('2020-01-03'), down);
  const statusMonitor = new StatusMonitor(dataStore, 1000);
  const app = getApp(statusMonitor);
  const request = supertest(app.callback());

  const response = await request.get('/foo/availability').expect(200);
  const actual = response.body.availability.toFixed(2);
  const expected = '0.33';
  assert.equal(actual, expected);
});
