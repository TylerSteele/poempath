const Koa = require('koa')
const json = require('koa-json')
const KoaRouter = require('koa-router')
const app = new Koa()
const Cors = require('@koa/cors')

const router = new KoaRouter()
require('./mongo')(app)

// Use the JSON middleware
app.use(json())

app.use(Cors())


// response
/*app.use(async ctx => {
  ctx.body = {msg: 'Hello world, love Tyler'}
})*/

router.get('/', async function (ctx) {
  let name = ctx.request.query.name || "World"
  let poem = await app.poems.findOne()
  let {author} = poem
  ctx.body = {message: `Hello ${author}`}
})

router.get('/poems', async(ctx) => {
  ctx.body = await app.poems.find().toArray()
})

router.get('/poemByAuthor', async(ctx) => {
  console.log(ctx.query.author)
  ctx.body = await app.poems.findOne({author: ctx.query.author})
})

router.get('/randomPoem', async(ctx) => {
  // Mongo call for one random poem. Note: If sample size increases, there is no guarantee that all returned poems will be unique
  ctx.body = await app.poems.aggregate([{ $sample: {size: 1}}])
})

// Router middleware
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)