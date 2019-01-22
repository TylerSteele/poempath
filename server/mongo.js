const { MongoClient } = require('mongodb')
const MONGO_URL = 'mongodb://localhost:27017'


module.exports = function (app) {
  MongoClient.connect(MONGO_URL, {useNewUrlParser: true}, (err, client) => {
    // Client returned
    app.poems = client.db('test').collection('poems')
    app.users = client.db('test').collection('users')
    console.log('---> Connection established.')
  })
}