import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { type SavedData } from '../service/ShortenerService'

import VercelKVShortenerService from '../service/ShortenerServiceImp'

const service = new VercelKVShortenerService(process.env.KV_REST_API_TOKEN || '', process.env.KV_REST_API_URL || '')

export enum AppStatus {
  ready,
  pending,
  success,
  fail,
}

 interface AppState {
  url: string;
  status: AppStatus;
  savedData: SavedData | null;
  getSavedData: () => Promise<void>,
  changeUrl: (url: string) => void,
 }

const useAppStore = create<AppState>()(immer(
  (set, get) => ({
    url: '',
    status: AppStatus.ready,
    savedData: null,
    changeUrl: (url) => {
      set((state) => { state.url = url })
    },
    getSavedData: async () => {
      try {
        const { url, status } = get()
        if (status !== AppStatus.ready) throw new Error('Status is not ready')
        const shortenUrl = service.generateShortenedUrl()
        set((state) => { state.status = AppStatus.pending })
        const savedData = await service.addUrlToCache(url, shortenUrl)
        set((state) => {
          state.status = AppStatus.success
          state.savedData = savedData
        })
      } catch (error) {
        set((state) => { state.status = AppStatus.fail })
        console.error(error)
      }
    }
  })
))

export default useAppStore
