const bcrypt = require('bcrypt')
const Koa = require('koa')
const app = new Koa()
const request = require('request')
const {ObjectId} = require('mongodb')
require('../mongo')(app)
module.exports = ({router}) => {

  // Create a new user given username and password
  router.post('/signUp', async (ctx) => {
    // Check to see if the request lacks a recaptcha token
    if (!ctx.request.body.recaptchaToken) {
      ctx.body = {message: 'recaptchaTokenRequired'}
      ctx.status = 422
    }
    // Check to see if username or password are blank
    else if (ctx.request.body.username === '') {
      if (ctx.request.body.password === '') {
        ctx.body = {message: 'userNamePasswordBlank'}
        ctx.status = 422
      } else {
        ctx.body = {message: 'usernameBlank'}
        ctx.status = 422
      }
    } else if (ctx.request.body.password === '') {
      ctx.body = {message: 'passwordBlank'}
      ctx.status = 422
    } else {
      const verifyCaptchaOptions = await {
        uri: 'https://www.google.com/recaptcha/api/siteverify',
        json: true,
        form: {
          secret: process.env.CAPTCHA_SECRET,
          response: ctx.request.body.recaptchaToken
        }
      }
      const captchaVerified = await request.post(verifyCaptchaOptions, function (err, response, body) {
          if (err) {
            ctx.status = 500
            ctx.body = {message: 'captchaError'}
            return false
          } else if (!body.success) {
            ctx.status = 500
            ctx.body = {message: 'captchaFailed'}
            return false
          }
          return true
        }
      )
      if (captchaVerified) {
        // Check to see if a user exists with given username
        let existingUser = await app.users.findOne({username: ctx.request.body.username})
        // If so, return message and 409 status
        if (existingUser) {
          ctx.body = {message: 'usernameTaken'}
          ctx.status = 409
        } else {
          // Use bcrypt to encrypt the password and store it with the new user
          app.users.insertOne({
            username: ctx.request.body.username,
            password: await bcrypt.hash(ctx.request.body.password, 10),
            likedPoems: [],
            dislikedPoems: [],
            poetryQueue: []
          })
          ctx.body = {message: 'userAdded'}
        }
      }
    }
    console.log(ctx.body)
  })

  // Validate user
  router.post('/validate', async (ctx) => {
    // Check to see if the request lacks a recaptcha token
    if (!ctx.request.body.recaptchaToken) {
      ctx.body = {message: 'recaptchaTokenRequired'}
      ctx.status = 422
    }
    // Check to see if username or password are blank
    else if (ctx.request.body.username === '') {
      if (ctx.request.body.password === '') {
        ctx.body = {message: 'userNamePasswordBlank'}
        ctx.status = 422
      } else {
        ctx.body = {message: 'usernameBlank'}
        ctx.status = 422
      }
    } else if (ctx.request.body.password === '') {
      ctx.body = {message: 'passwordBlank'}
      ctx.status = 422
    } else {
      const verifyCaptchaOptions = await {
        uri: 'https://www.google.com/recaptcha/api/siteverify',
        json: true,
        form: {
          secret: process.env.CAPTCHA_SECRET,
          response: ctx.request.body.recaptchaToken
        }
      }
      const captchaVerified = await request.post(verifyCaptchaOptions, function (err, response, body) {
          if (err) {
            ctx.status = 500
            ctx.body = {message: 'captchaError'}
            return false
          } else if (!body.success) {
            ctx.status = 500
            ctx.body = {message: 'captchaFailed'}
            return false
          }
          return true
        }
      )
      if (captchaVerified) {
        // Check to see if a user exists with given username
        let existingUser = await app.users.findOne({username: ctx.request.body.username})
        // If not, return message and 404 status
        if (!existingUser) {
          ctx.body = {message: 'userNotFound'}
          ctx.status = 404
        } else {
          // Use bcrypt to encrypt incoming password and compare to stored one
          let passwordsMatch = await bcrypt.compare(ctx.request.body.password, existingUser.password)
          if (passwordsMatch) {
            ctx.body = {message: 'accessGranted'}
          } else {
            ctx.body = {message: 'incorrectPassword'}
            ctx.status = 422
          }
        }
      }
    }
    console.log(ctx.body)
  })

  // Update user
  router.put('/update', async (ctx) => {
    // Create a copy of the sent object
    let updatedUser = JSON.parse(JSON.stringify(ctx.request.body))
    // Delete the id and the password (if it exists)
    delete updatedUser._id
    delete updatedUser.password
    let updateResponse = await app.users.updateOne(
      {_id: ObjectId(ctx.request.body._id)},
      {$set: updatedUser})
    console.log(updateResponse.result)
    // Find the newly updated user and return that
    updatedUser = await app.users.findOne({_id: ObjectId(ctx.request.body._id)})
    delete updatedUser.password
    console.log(updatedUser)
    if (updatedUser) {
      ctx.body = updatedUser
      ctx.status = 200
    } else {
      ctx.body = {message: 'userNotFound'}
      ctx.stats = 404
    }
  })

  // Delete user
  router.delete('/:userID', async (ctx) => {
    let userToDelete = await app.users.findOne({_id: ObjectId(ctx.params.userID)})
    if (!userToDelete) {
      ctx.body = {message: 'userNotFound'}
      ctx.status = 404
    } else {
      app.users.deleteOne({_id: ObjectId(ctx.params.userID)})
      console.log(`Username: ${ userToDelete.username } deleted`)
      ctx.body = `Successfully deleted user ${ userToDelete.username }`
    }
  })

  // This should be more secure (beyond the scope of the project)
  router.get('/users', async (ctx) => {
    let user = await app.users.findOne({username: ctx.query.username})
    if (user) {
      delete user.password
      ctx.body = user
      ctx.status = 200
    } else {
      ctx.body = {status: 'User not found'}
      ctx.status = 404
    }
    console.log(ctx.body)
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