import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const Payload = z.object({
  shortenUrl: z.string(),
});

type UnShortenPayload = z.infer<typeof Payload>;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // TODO jwt token
  if (
    request.method !== "POST" &&
    request.headers["content-type"] !== "application/json"
  ) {
    response.status(403).end();
    return;
  }
  const { success } = Payload.safeParse(request.body);
  if (success) {
    const { shortenUrl } = request.body as UnShortenPayload
    try {
      const savedData = await kv.get(shortenUrl)
      response.status(200).json(savedData)
    } catch (error) {
      console.error(error);
      response.status(400).end();
    }
  } else {
    response.status(400).end();
  }
}
