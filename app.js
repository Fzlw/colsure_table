const express = require('express');
const router = require('./router');
const middlewares = require('./middleware');
const app = express();


// 路由配置
router(express, app);

// catch 404 handle
app.use(middlewares._404());
// error handler
app.use(middlewares._err());

module.exports = app;