import shortenService from "@/service/shorten";
import { SavedData } from "@/shared/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

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
  getSavedData: () => Promise<void>;
  changeUrl: (url: string) => void;
  reset: () => void;
}

const useAppStore = create<AppState>()(immer(
  (set, get) => ({
    url: "",
    status: AppStatus.ready,
    savedData: null,
    changeUrl: (url) => {
      set((state) => {
        state.url = url;
      });
    },
    getSavedData: async () => {
      const { url, status, reset } = get();
      try {
        if (status !== AppStatus.ready) throw new Error("Status is not ready");
        set((state) => {
          state.status = AppStatus.pending;
        });
        const savedData = (await shortenService(url)).data;
        set((state) => {
          state.status = AppStatus.success;
          state.savedData = savedData;
        });
        // reset
      } catch (error) {
        set((state) => {
          state.status = AppStatus.fail;
        });
        console.error(error);
      } finally {
        setTimeout(() => reset(), 2000)
      }
    },
    reset() {
      set((state) => {
        state.status = AppStatus.ready;
        state.url = "";
      });
    },
  }),
));

export default useAppStore;
