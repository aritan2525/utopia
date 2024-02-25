const { basicAuth } = require('basic-auth-middleware');

const users = { 'ponXnemuWP': 'CistemAperio347' };

module.exports = basicAuth(users, { challenge: true });
