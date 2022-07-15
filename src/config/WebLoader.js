const log4js = require('log4js');
const express = require('express');
const SSRController = require('../ssr/SSRController');
const logger = log4js.getLogger('root');

const proxy = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      error: -1,
      msg: e.toString(),
    });
  }
}

module.exports = (port) => {
  const app = express();
  app.all('/*', proxy(SSRController.ssr));
  app.listen(port, () => {
    logger.info(`Server started at http://127.0.0.1:${port}`);
  });
  return app;
}