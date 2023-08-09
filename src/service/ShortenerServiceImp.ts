import ShortenerService, { SavedData } from "./ShortenerService";
import { v4 as uuidv4 } from "uuid";
import { createClient, type VercelKV } from "@vercel/kv";

class VercelKVShortenerService implements ShortenerService {
  static weekInSecond: number = 60 * 60 * 24 * 7;
  kv: VercelKV | undefined = undefined

  constructor(url: string, token: string) {
    console.log(url, token)
    this.kv = createClient({
      url,
      token,
    })
  }

  addUrlToCache = async (
    originUrl: string,
    shortenUrl: string,
  ): Promise<SavedData> => {
    if (this.kv === undefined) throw new Error('No kv client!')
    if (originUrl.length === 0 || shortenUrl.length === 0) {
      throw new Error("url can not be empty!");
    }
    const now = Date.now();
    const saveData: SavedData = {
      originUrl,
      shortenUrl,
      saveTimeStamp: now,
      expireTimeStamp: now + VercelKVShortenerService.weekInSecond * 1000,
    };
    // same key maybe problem
    await this.kv.set(originUrl, JSON.stringify(saveData), {
      exat: VercelKVShortenerService.weekInSecond,
    });
    return saveData;
  };

  generateShortenedUrl = () => {
    let res = "";
    while (res.length < 8) {
      const pieces = uuidv4();
      for (const piece of pieces.slice(4)) {
        if (piece === "-") continue;
        res += piece;
        if (res.length >= 8) return res;
      }
    }
    return res;
  };
}

export default VercelKVShortenerService;
