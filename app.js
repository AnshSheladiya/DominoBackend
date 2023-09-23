const Koa = require('koa');
const cors = require('koa-cors');
const { koaBody } = require('koa-body');
const bodyparser = require('koa-bodyparser');
const compress = require('koa-compress');
const serve = require('koa-static');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config');
const router = require('./config/routes');
const ResponseHelper = require('./app/helpers/ResponseHelper');
const MSG = require('./app/helpers/constants');
const send = require('koa-send'); // Import koa-send

global.ResponseHelper = ResponseHelper;
global.MSG = MSG;

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
    await next();
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(router);

// Serve static files for production
if (config.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname,  'client', 'build');

  app.use(serve(staticPath));

  // For all other routes, serve the index.html
  app.use(async (ctx) => {
    await send(ctx, 'index.html', { root: staticPath });
  });
} 

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
