const Koa = require('koa');
const app = require('../../app'); // Provide the correct relative path to your main app.js

module.exports.handler = serverless(app);
