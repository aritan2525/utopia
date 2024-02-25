const { createMiddleware } = require('@vercel/edge');

const basicAuth = createMiddleware({
  auth: {
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD,
  },
});

module.exports = basicAuth((req, res) => {
  res.end('Welcome!');
});
