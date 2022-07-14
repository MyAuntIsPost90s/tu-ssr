const express = require('express');
const SSRController = require('../ssr/SSRController');

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    error: -1,
    msg: err.toString(),
  })
}

module.exports = (port) => {
  const app = express();
  app.use(errorHandler);
  app.all('/*', SSRController.ssr);
  app.listen(port, () => {
    console.log(`running at http://127.0.0.1:${properties.server.port}`);
  });
  return app;
}

