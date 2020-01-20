import getSystemStatus from './health-checkers';
import { DataStore } from './data-store';

function sleep(time: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default async function getAndLogStatus(
  dataStore: DataStore,
  waitTime: number,
): Promise<void> {
  while (true) {
    const now = new Date();
    const serviceStatus = await getSystemStatus();
    dataStore.push(now, serviceStatus);
    await sleep(waitTime);
  }
}
