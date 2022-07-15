const express = require('express');

const all = app => (path, func) => {
  return app.all(path, funcProxy(app, func))
}

const get = app => (path, func) => {
  return app.get(path, funcProxy(app, func))
}

const post = app => (path, func) => {
  return app.post(path, funcProxy(app, func))
}

const use = app => (subApp) => {
  subApp.filters = subApp.filters || [];
  if (app.filters) {
    app.filters.forEach(o=>subApp.filters.push(o));
  }
  return app.use(subApp);
}

const funcProxy = (app, func) => {
  return (req, res, next) => {
    let filters = app.filters || [];
    filters = filters.filter(o=>new RegExp(o.path).test(req.path));
    if (!filters || filters.length < 1) {
      return func(req, res, next);
    }
    filters.filter(o => o.type === 'before').forEach(o => o.func(req, res, next));
    const around = filters.filter(o => o.type === 'around');
    const firstFunc = around.length > 0 ? around[0].func : func;
    for (let i = 1; i < around; i++) {
      firstFunc = around[i].func(req, res, next, firstFunc);
    }
    firstFunc(req, res, next, func);
    filters.filter(o => o.type === 'after').forEach(o => o.func(req, res, next));
  }
}

module.exports = () => {
  const app = express();
  return {
    all: all(app),
    get: get(app),
    post: post(app),
    use: use(app),
    app,
  }
}