import getSystemStatus, { ServiceStatusReport } from './health-checkers';
import { DataStore } from './data-store';

export class StatusMonitor {
  constructor(private dataStore: DataStore, private waitTime: number) {}

  async monitor(): Promise<void> {
    while (true) {
      const now = new Date();
      const serviceStatus = await getSystemStatus();
      this.dataStore.push(now, serviceStatus);
      await this.sleep(this.waitTime);
    }
  }

  getLatest(): ServiceReportWithTimestamp {
    const latestKey = this.dataStore
      .keys()
      .sort((a, b) => Number(b) - Number(a))[0];
    const data = this.dataStore.get(latestKey);

    return {
      timestamp: Number(latestKey),
      status: data,
    };
  }

  private sleep(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}

interface ServiceReportWithTimestamp {
  timestamp: number;
  status: ServiceStatusReport;
}
