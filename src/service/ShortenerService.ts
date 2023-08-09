// Singleton
interface ShortenerService {
  generateShortenedUrl: () => String;
  addUrlToCache: (originUrl: string, shortUrl: string) => Promise<SavedData>;
}

export interface SavedData {
  originUrl: string;
  shortenUrl: String;
  saveTimeStamp: number;
  expireTimeStamp: number;
}

export default ShortenerService
