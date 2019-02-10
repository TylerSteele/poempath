const Koa = require('koa')
const app = new Koa()
require('../mongo')(app)

module.exports = ({router}) => {

  // Return a random poem
  router.get('/randomPoem', async (ctx) => {
    ctx.body = await app.poems.aggregate([{$sample: {size: 1}}])
  })
}