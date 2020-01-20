const config: Config = {
  port: Number(process.env['MONITOR_PORT']) || 9090,
  waitTime: Number(process.env['MONITOR_WAIT_TIME']) || 30000,
};

export interface Config {
  port: number;
  waitTime: number;
}

export default config;
