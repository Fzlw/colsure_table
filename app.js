const express = require('express');
const router = require('./router');
const middlewares = require('./middleware');
const logger = require('morgan');
const app = express();

// logger
app.use(logger('dev'));

// 路由配置
router(express, app);

// catch 404 handle
app.use(middlewares._404());
// error handler
app.use(middlewares._err());

module.exports = app;