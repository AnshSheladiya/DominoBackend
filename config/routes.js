// routes.js
const Router = require('koa-router')
const router = new Router()

router.use('/api/categories', require('../app/routes/categoryRoutes'))

module.exports = router.routes()