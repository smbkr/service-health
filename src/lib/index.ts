import { StatusMonitor } from './status-monitor';
import getApp from './app';
import { DataStore } from './data-store';
import config from './config';

const dataStore = new DataStore();
const statusMonitor = new StatusMonitor(dataStore, config.waitTime);
const app = getApp(statusMonitor);

statusMonitor.monitor();
app.listen(config.port);

console.log(`App listening on port ${config.port}...`);
