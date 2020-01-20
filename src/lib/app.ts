import Koa, { Context } from 'koa';
import { DataStore } from './data-store';

export default (dataStore: DataStore): Koa => {
  const app = new Koa();

  app.use((ctx: Context) => {
    const latest = dataStore.getLatest();
    ctx.status = 200;
    ctx.body = latest;
  });

  return app;
};
