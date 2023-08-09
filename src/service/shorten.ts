import { SavedData } from "@/shared/types";
import axios from "axios";

const shortenService = (originUrl: string) => {
  return axios.post<SavedData>('/api/shorten', {
    originUrl,
  })
}

export default shortenService
