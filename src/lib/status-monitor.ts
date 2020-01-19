import getSystemStatus, { ServiceStatusReport } from './health-checkers';

function sleep(time: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default async function getAndLogStatus(
  dataStore,
  waitTime: number,
  loopCondition = (): boolean => true,
): Promise<void> {
  function logStatusReport(timestamp: Date, report: ServiceStatusReport): void {
    const key = Math.floor(Number(timestamp) / 1000);
    dataStore[key] = report;
  }

  while (loopCondition()) {
    const now = new Date();
    const serviceStatus = await getSystemStatus();
    logStatusReport(now, serviceStatus);
    await sleep(waitTime);
  }
}
