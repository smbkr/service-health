const config: Config = {
  port: Number(process.env['MONITOR_PORT']),
  waitTime: Number(process.env['MONITOR_WAIT_TIME']),
};

export interface Config {
  port: number;
  waitTime: number;
}

export default config;
