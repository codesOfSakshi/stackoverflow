const { createClient } = require('redis');

const client = createClient({
  url: 'redis://stackoverflow-lb-1188096937.us-west-1.elb.amazonaws.com:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

const redisConnect = async ()=>{
  await client.connect();
  console.log('Redis Connected!');
}

redisConnect();

module.exports = client;