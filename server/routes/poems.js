const Koa = require('koa')
const app = new Koa()
require('../mongo')(app)

module.exports = ({router}) => {
  // Return the first poem by a given author
  router.get('/poemByAuthor', async (ctx) => {
    ctx.body = await app.poems.findOne({author: ctx.query.author})
  })

  // Return a random poem
  router.get('/randomPoem', async (ctx) => {
    ctx.body = await app.poems.aggregate([{$sample: {size: 1}}])
  })
}