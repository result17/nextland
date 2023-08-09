import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const res = await kv.get('google.com')
  return response.status(200).json(res)
  // const user = await kv.hgetall('user:me');
  // return response.status(200).json(user);
}