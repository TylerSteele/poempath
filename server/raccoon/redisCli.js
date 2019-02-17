const Koa = require('koa')                // Node Framework
const raccoon = require('raccoon')          // Recommendation Framework
const {ObjectId} = require('mongodb')     // MongoDB Access -- casts string IDs to mongo-friendly ids
const app = new Koa()
require('../mongo')(app)

const fs=require('fs');
const data=fs.readFileSync('exportUsers.json', 'utf8');
const users=JSON.parse(data);
users.forEach(user => {
  user.likedPoems.forEach(async poem => {
    let currentPoem = await app.poems.findOne({title: poem.title})
    raccoon.liked(user._id['$oid'], currentPoem._id)
    console.log('like')
  })
  user.dislikedPoems.forEach(async poem => {
    let currentPoem = await app.poems.findOne({title: poem.title})
    raccoon.disliked(user._id['$oid'], currentPoem._id)
    console.log('dislike')
  })
})/*
bluebird.promisifyAll(redis.RedisClient.prototype);
console.log('Beginning import')
client = redis.createClient()
for (let i = 0; i < 1000; i++) {
  client.set(String(i), String(i), redis.print);
  client.get(String(i), function (error, result) {
    if (error) throw error;
    console.log('GET result ->', result)
  });
}*/