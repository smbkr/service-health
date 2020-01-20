import test = require('tape-async');
import supertest from 'supertest';
import { DataStore } from '../../lib/data-store';
import { ServiceStatusReport } from '../../lib/health-checkers';
import getApp from '../../lib/app';
import { StatusMonitor } from '../../lib/status-monitor';
import { dateToUnix } from '../../lib/util';

test('It returns the latest from the data store', async assert => {
  const dataStore = new DataStore();
  const report = ({ foo: 'bar' } as any) as ServiceStatusReport;
  const now = new Date();
  dataStore.push(now, report);
  const statusMonitor = new StatusMonitor(dataStore, 1000);
  const app = getApp(statusMonitor);
  const request = supertest(app.callback());

  const response = await request.get('/').expect(200);
  const expectedBody = {
    timestamp: dateToUnix(now),
    status: report,
  };
  assert.deepEqual(response.body, expectedBody);
});
