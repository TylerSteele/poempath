const Koa = require('koa')
const KoaRouter = require('koa-router')

router.post('/signup', async(ctx) => {
  const username = ctx.body.username
  const password = ctx.body.password
})

// Koa Router
app.use(router.routes()).use(router.allowedMethods())