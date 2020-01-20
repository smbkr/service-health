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

  getLatest(): ServiceStatusReport {
    const latestKey = Object.keys(this.data).sort(
      (a, b) => Number(b) - Number(a),
    )[0];
    return this.data[latestKey];
  }
}
