const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/app', {
    target: 'https://www.i-steed.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/app": "/app"
    }
  }))
}