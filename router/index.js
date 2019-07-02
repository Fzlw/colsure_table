const controller = require('../controller');
module.exports = (express, app) => {
  const router = express.Router();
  const _app = {
    router,
    controller
  };
  // 通用路由注册
  require('./test')(_app);
  require('./home')(_app);

  app.use('/', router);
};