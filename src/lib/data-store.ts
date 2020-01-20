import { ServiceStatusReport } from './health-checkers';
import { dateToUnix } from './util';

export class DataStore {
  public data: {};

  constructor() {
    this.data = {};
  }

  push(timestamp: Date, statusReport: ServiceStatusReport): void {
    const key = dateToUnix(timestamp);
    this.data[key] = statusReport;
  }

  keys(): string[] {
    return Object.keys(this.data);
  }

  get(key: string): ServiceStatusReport {
    return this.data[key];
  }
}
