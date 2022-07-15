module.exports = {
  registerBefore: (app, path, func) => {
    app.filters = app.filters || [];
    app.filters.push({ type:'before', path, func });
  },
  registerAfter: (app, path, func) => {
    app.filters = app.filters || [];
    app.filters.push({ type:'after', path, func });
  },
  registerAround: (app, path, func) => {
    app.filters = app.filters || [];
    app.filters.push({ type:'around', path, func });
  }
}