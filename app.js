const Koa = require('koa');
const cors = require('koa-cors');
const { koaBody } = require('koa-body');
const bodyparser = require('koa-bodyparser');
const compress = require('koa-compress');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config');
const router = require('./config/routes');
const ResponseHelper = require('./app/helpers/ResponseHelper');
const MSG = require('./app/helpers/constants');

dotenv.config();

const app = new Koa();

app.use(koaBody());
app.use(bodyparser());
app.use(compress());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

app.use(async (ctx, next) => {
  try {
    await next(); // Use async/await and the new next() syntax
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(router);

app.on('error', (err, ctx) => {
  console.log('error: ', err);
});

function listen() {
  app.listen(config.port, () => {
    console.log('%s Backend Server is running on: http://%s:%s', config.appName, config.host, config.port);
  });
}

// Connect to the database
require('./app/db/mongoose-connection');

// Start listening
listen();
