import test = require('tape-async');
import supertest from 'supertest';
import { DataStore } from '../../lib/data-store';
import { ServiceStatusReport } from '../../lib/health-checkers';
import getApp from '../../lib/app';

test('It returns the latest from the data store', async assert => {
  const dataStore = new DataStore();
  const report = ({ foo: 'bar' } as any) as ServiceStatusReport;
  dataStore.push(new Date(), report);
  const app = getApp(dataStore);
  const request = supertest(app.callback());

  const response = await request.get('/').expect(200);
  assert.deepEqual(response.body, { foo: 'bar' });
});
