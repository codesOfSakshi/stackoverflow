import { createClient } from 'redis';

const client = createClient({
  url: 'redis://alice:foobared@awesome.redis.server:6380'
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');
const value = await client.get('key');