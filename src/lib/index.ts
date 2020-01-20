import monitorSystemStatus from './status-monitor';
import getApp from './app';
import { DataStore } from './data-store';
import config from './config';

const dataStore = new DataStore();
const app = getApp(dataStore);

monitorSystemStatus(dataStore, config.waitTime);
app.listen(config.port);
