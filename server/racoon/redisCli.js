const redis = require('redis'),
  bluebird = require('bluebird');

const fs=require('fs');
const data=fs.readFileSync('words.json', 'utf8');
const words=JSON.parse(data);

bluebird.promisifyAll(redis.RedisClient.prototype);
console.log('Beginning import')
client = redis.createClient()
for (let i = 0; i < 1000; i++) {
  client.set(String(i), String(i), redis.print);
  client.get(String(i), function (error, result) {
    if (error) throw error;
    console.log('GET result ->', result)
  });
}

