const express = require('express');
const timeout = require('connect-timeout');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// HOST 指目标地址
// PORT 服务端口
const HOST = "https://api.bilibili.com";
const PORT = "9000";

// 超时时间
const TIME_OUT = 30000;

// 设置端口
app.set('port', PORT);

// 设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
    if (!req.timedout) next();
});


// 反向代理（这里把需要进行反代的路径配置到这里即可）
// eg:将/api/test 代理到 ${HOST}/api/test
app.use(createProxyMiddleware({ target: HOST, changeOrigin: true }));

// 监听端口
app.listen(app.get('port'), () => {
    console.log(`server running @${app.get('port')}`);
});