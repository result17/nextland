import { SavedData } from "@/shared/types";
import axios from "axios";

const host = process.env.NEXT_PUBLIC_HOST || "localhost";
const port = process.env.NEXT_PUBLIC_PORT || 3000;

const unShortenService = (shortenUrl: string) => {
  return axios.post<SavedData>("/api/unshorten", {
    shortenUrl,
  });
};

export const unShortenServiceByFetch = (shortenUrl: string): Promise<SavedData> => {
  return fetch(`http://${host}:${port}/api/unshorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shortenUrl }),
  })
  .then((response) => response.json())
};

export default unShortenService;
