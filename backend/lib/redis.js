import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

export const redis = new Redis(process.env.UPTASH_REDIS_URL);
//keyt-value store
await redis.set('foo', 'bar');
