import Koa, { Context } from 'koa';
import Router from '@koa/router';
import { StatusMonitor } from './status-monitor';

export default (statusMonitor: StatusMonitor): Koa => {
  const app = new Koa();
  const router = new Router();

  router.get('/', (ctx: Context) => {
    const latest = statusMonitor.getLatest();
    ctx.status = 200;
    ctx.body = latest;
  });

  router.get('/:serviceName/availability', (ctx: Context) => {
    const availability = statusMonitor.getAvailability(ctx.params.serviceName);
    ctx.status = 200;
    ctx.body = {
      availability,
    };
  });

  app.use(router.routes()).use(router.allowedMethods());
  return app;
};
