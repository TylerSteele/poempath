const MongoClient = require('mongodb').MongoClient
const MONGO_URL = 'mongodb://localhost:27017'


module.exports = function (app) {
  MongoClient.connect(MONGO_URL, (err, client) => {
    // Client returned
    app.poems = client.db('test').collection('poems')
    console.log('connection established')
  })
}