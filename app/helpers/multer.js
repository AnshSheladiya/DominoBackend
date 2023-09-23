// multer.js

const multer = require('multer');
const koaMulter = require('koa-multer');

const storage = koaMulter.memoryStorage(); // Use koaMulter.memoryStorage() for in-memory storage
const parser = koaMulter({ storage });

module.exports = parser;
