const propertiesLoader = require('./config/PropertiesLoader');
const loggerLoader = require('./config/LoggerLoader');
const browserLoader = require('./config/BrowserLoader');
const webLoader = require('./config/WebLoader');

const main = async () => {
  loggerLoader();
  const properties = propertiesLoader();
  const browser = await browserLoader();
  const app = webLoader(properties.server.port, properties.ssr['base-url']);
  global.properties = properties;
  global.browser = browser;
  global.app = app;
}

main();