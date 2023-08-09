import { SavedData } from '@/shared/types';
import { kv } from '@vercel/kv';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from "zod";
import { generateRandomStr} from '@/shared'

const Payload = z.object({
  originUrl: z.string(),
});

type ShortenPayload = z.infer<typeof Payload>;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // TODO jwt token
  if (request.method !== 'POST' && request.headers['content-type'] !== 'application/json') {
    response.status(403).end()
    return
  }
  // params vaild
  const { success } = Payload.safeParse(request.body)
  if (success) {
    const { originUrl } = request.body as ShortenPayload

    const shortenUrl = generateRandomStr()
    const now = Date.now()

    const savedData: SavedData = {
      originUrl,
      shortenUrl,
      saveTimeStamp: now,
      expireTimeStamp: now,
    }
    
    await kv.set(shortenUrl, JSON.stringify(savedData), {
      exat: savedData.expireTimeStamp
    })
    response.status(200).json(savedData)
  } else {
    response.status(400).end()
  }
}
