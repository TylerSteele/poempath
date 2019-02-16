const Koa = require('koa')                // Node Framework
const raccoon = require('raccoon')          // Recommendation Framework
const {ObjectId} = require('mongodb')     // MongoDB Access -- casts string IDs to mongo-friendly ids

const app = new Koa()
require('../mongo')(app)

// Number of top suggestions that the next poem is drawn from
// Higher number means less accurate and more intensive
// Lower number means more accurate and less variety
const SUGGESTION_RANGE = 8

// Random number generator for grabbing the next poem
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = ({router}) => {

  // Return a random poem
  router.get('/randomPoem', async (ctx) => {
    ctx.body = await app.poems.aggregate([{$sample: {size: 1}}])
  })

  // Like poem - Expects the id of the user and the id of the poem
  router.post('/like', async(ctx) => {
    const { username, poemID } = ctx.request.body
    console.log('Liking poem ' + poemID + ' for username: ' + username)
    if(username){
      if(poemID){
        await raccoon.liked(username, poemID).then(async () => {
          await raccoon.recommendFor(username, SUGGESTION_RANGE).then(async (results) => {
            console.log(results)
            // If there are not any recommended poems
            if(results.length === 0){
              // Return a random one
              ctx.body = await app.poems.aggregate([{$sample: {size: 1}}])
              ctx.status = 200
            } else {
              let nextPoemIndex = getRandomInt(0, results.length)
              console.log(nextPoemIndex)
              ctx.body = await app.poems.findOne({_id: ObjectId(results[nextPoemIndex])})
              ctx.status = 200
            }
          }).catch((error) => {
            console.log('Raccoon error: ' + error)
            ctx.body = error
            ctx.status = 500
          })
        })
        //ctx.body = {message: 'likeFailed'}
        //ctx.status = 500
      } else {
        ctx.body = {message: 'poemIDRequired'}
        ctx.status = 422
      }
    } else {
      ctx.body = {message: 'usernameRequired'}
      ctx.status = 422
    }
    console.log('complete')
  })


  // Dislike poem - Expects the id of the user and the id of the poem
  router.post('/dislike', async(ctx) => {
    const { username, poemID } = ctx.request.body
    console.log('Disliking poem ' + poemID + ' for username: ' + username)
    if(username){
      if(poemID){
        await raccoon.disliked(username, poemID).then(async () => {
          await raccoon.recommendFor(username, SUGGESTION_RANGE).then(async (results) => {
            // If there are not any recommended poems
            if(results.length === 0){
              // Return a random one
              ctx.body = await app.poems.aggregate([{$sample: {size: 1}}])
              ctx.status = 200
            } else {
              let nextPoemIndex = getRandomInt(0, results.length)
              console.log(nextPoemIndex)
              ctx.body = await app.poems.findOne({_id: ObjectId(results[nextPoemIndex])})
              ctx.status = 200
            }
          }).catch(async (error) => {
            console.log('Raccoon ' + error)
            // If there is an error, gracefully degrade to random poem
            ctx.body = await app.poems.aggregate([{$sample: {size: 1}}])
            ctx.status = 500
          })
        })
      } else {
        ctx.body = {message: 'poemIDRequired'}
        ctx.status = 422
      }
    } else {
      ctx.body = {message: 'usernameRequired'}
      ctx.status = 422
    }
  })
}

