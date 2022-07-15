const log4js = require('log4js');
const ssrController = require('../ssr/SSRController');
const filter = require('../express/Filter');
const expressProxy = require('../express/ExpressProxy');
const logger = log4js.getLogger('root');

const errorFilter = async (req, res, next, func) => {
  try {
    await func(req, res, next);
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      error: -1,
      msg: e.toString(),
    });
  }
}

module.exports = (port) => {
  const appProxy = expressProxy();
  const app = appProxy.app;
  filter.registerAround(appProxy.app, '/*', errorFilter);
  appProxy.use(ssrController);
  app.listen(port, () => {
    logger.info(`Server started at http://127.0.0.1:${port}`);
  });
  return app;
}