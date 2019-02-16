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

  // Return Raccoon statistics in an object
  router.get('/stats', async (ctx) => {
    const mostLikedIDs = await raccoon.mostLiked()
    const mostDislikedIDs = await raccoon.mostDisliked()
    const bestRatedIDs = await raccoon.bestRated()
    const worstRatedIDs = await raccoon.worstRated()
    let mostLikedArray = await mostLikedIDs.map(async(id) => {
      return await app.poems.findOne({_id: ObjectId(id)})
    })
    let mostDislikedArray = await mostDislikedIDs.map(async (id) => {
      return await app.poems.findOne({_id: ObjectId(id)})
    })
    let bestRatedArray = await bestRatedIDs.map(async (id) => {
      return await app.poems.findOne({_id: ObjectId(id)})
    })
    let worstRatedArray = await worstRatedIDs.map(async (id) => {
      return await app.poems.findOne({_id: ObjectId(id)})
    })
    // When using async maps, you must wait for all promises to resolve
    // Only return non-null and non-empty objects
    mostLikedArray = (await Promise.all(mostLikedArray)).filter(poem => {
      return (poem != null && Object.keys(poem).length !== 0)})
    mostDislikedArray = (await Promise.all(mostDislikedArray)).filter(poem => {
      return (poem != null && Object.keys(poem).length !== 0)})
    bestRatedArray = (await Promise.all(bestRatedArray)).filter(poem => {
      return (poem != null && Object.keys(poem).length !== 0)})
    worstRatedArray = (await Promise.all(worstRatedArray)).filter(poem => {
      return (poem != null && Object.keys(poem).length !== 0)})
    let statsObject = {
      mostLiked: mostLikedArray,
      mostDisliked: mostDislikedArray,
      bestRated: bestRatedArray,
      worstRated: worstRatedArray,
    }
    ctx.body = statsObject
  })

  // Like poem - Expects the id of the user and the id of the poem
  router.post('/like', async(ctx) => {
    const { username, poemID } = ctx.request.body
    console.log('Liking poem ' + poemID + ' for username: ' + username)
    if(username){
      if(poemID){
        await raccoon.liked(username, poemID).then(async () => {
          await raccoon.recommendFor(username, SUGGESTION_RANGE).then(async (results) => {
            // If there are not any recommended poems
            if(results.length === 0){
              // Return a random one
              ctx.body = await app.poems.aggregate([{$sample: {size: 1}}])
              ctx.status = 200
            } else {
              let nextPoemIndex = getRandomInt(0, results.length - 1)
              ctx.body = await app.poems.findOne({_id: ObjectId(results[nextPoemIndex])})
              console.log('POEM RECOMMENDED!')
              ctx.status = 200
            }
          }).catch(async (error) => {
            console.log('Raccoon error: ' + error)
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
              let nextPoemIndex = getRandomInt(0, results.length - 1)
              ctx.body = await app.poems.findOne({_id: ObjectId(results[nextPoemIndex])})
              console.log('POEM RECOMMENDED!')
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

