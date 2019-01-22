const bcrypt = require('bcrypt')
const Koa = require('koa')
const app = new Koa()
require('../mongo')(app)
module.exports = ({router}) => {

  // Create a new user given username and password
  router.post('/signUp', async (ctx) => {
    // Check to see if an existing user exists with that username
    let existingUser = await app.users.findOne({username: ctx.request.body.username})
    // If so, return message and 409 status
    if(existingUser){
      ctx.body = 'Username already exists'
      ctx.status = 409
    }
    // Otherwise, proceed with insert
    else {
      // Use bcrypt to encrypt the password and store it with the new user
      app.users.insertOne({
        username: ctx.request.body.username,
        password: await bcrypt.hash(ctx.request.body.password, 10)
      })
      console.log(`Username: ${ctx.request.body.username} added`)
      ctx.body = `User Added ${ctx.request.body.username}`
    }
  })

  // Return a random user
  router.get('/randomUser', async (ctx) => {
    ctx.body = await app.users.aggregate([{$sample: {size: 1}}])
  })

  // Return all users
  router.get('/allUsers', async (ctx) => {
    ctx.body = await app.users.find()
  })
}