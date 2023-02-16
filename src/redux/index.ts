import { create } from 'dva-core'
import models from '@/models'
import dvaLoading from 'dva-loading'

const createApp = (options) => {
  const app = create(options);
  models.forEach(item => {
    // 注册所有model
    app.model(item.default)
  });
  app.use(dvaLoading());
  app.start();
  return app
}

const dva = createApp({});
export default dva._store