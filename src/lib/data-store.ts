import { ServiceStatusReport } from './health-checkers';

export class DataStore {
  public data: {};

  constructor() {
    this.data = {};
  }

  push(timestamp: Date, statusReport: ServiceStatusReport): void {
    const key = Math.floor(Number(timestamp) / 1000);
    this.data[key] = statusReport;
  }
}
