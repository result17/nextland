import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

enum AppStatus {
  pending,
  success,
  fail,
}

 interface AppState {
  url: string;
  // status: AppStatus;
  // changeStatus: () => Promise<void>,
  changeUrl: (url: string) => void,
 }

const useAppStore = create<AppState>()(immer(
  (set) => ({
    url: 'the last kiss',
    changeUrl: (url) => {
      set((state) => { state.url = url })
    }
  })
))

export default useAppStore
