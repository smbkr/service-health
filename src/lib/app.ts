import Koa, { Context } from 'koa';
import { StatusMonitor } from './status-monitor';

export default (statusMonitor: StatusMonitor): Koa => {
  const app = new Koa();

  app.use((ctx: Context) => {
    const latest = statusMonitor.getLatest();
    ctx.status = 200;
    ctx.body = latest;
  });

  return app;
};
