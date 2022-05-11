const { createClient } = require('redis');

const client = createClient({
  url: 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

const redisConnect = async ()=>{
  await client.connect();
  console.log('Redis Connected!');
}

redisConnect();

module.exports = client;