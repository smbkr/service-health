import getSystemStatus from './health-checkers';
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

  private sleep(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
