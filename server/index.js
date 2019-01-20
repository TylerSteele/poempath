const Koa = require('koa')
const json = require('koa-json')
const KoaRouter = require('koa-router')
const app = new Koa()
const Cors = require('@koa/cors')

const router = new KoaRouter()
require('./mongo')(app)

// JSON print/parser
app.use(json())

// Access Control
app.use(Cors())

// Koa Router
app.use(router.routes()).use(router.allowedMethods())

// Return the first poem by a given author
router.get('/poemByAuthor', async(ctx) => {
  ctx.body = await app.poems.findOne({author: ctx.query.author})
})

// Return a random poem
router.get('/randomPoem', async(ctx) => {
  ctx.body = await app.poems.aggregate([{ $sample: {size: 1}}])
})

app.listen(3000)