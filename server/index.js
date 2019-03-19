const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const BodyParser = require('koa-bodyparser')
const KoaRouter = require('koa-router')
const app = new Koa()
const Cors = require('@koa/cors')

// Console logger for all API calls
app.use(logger())

// Error handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

// Body Parser for POSTs
app.use(BodyParser())

// JSON print/parser
app.use(json())

// Access Control
app.use(Cors())

// Initialize the router and require external routes
const router = new KoaRouter()
require('./routes/users')({router})
require('./routes/poems')({router})

// Koa Router should use all routes on the router object
app.use(router.routes()).use(router.allowedMethods())

// In the event of an error emission, log the details
app.on('error', (err, ctx) => {
  console.log(err.message)
  console.log(ctx)
})

app.listen(3000)