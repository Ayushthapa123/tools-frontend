import { create } from "zustand";

const useTableStore = create()((set) => ({
  pageIndex: 0,
  pageSize: 10,
  totalRows: 0,
  state: null,
  globalQuery: "",
  setGlobalQuery: (globalQuery) => set({ globalQuery }),

  setPageIndex: (pageIndex) => set({ pageIndex }),
  setPageSize: (pageSize) => set({ pageSize }),
  setTotalRows: (totalRows) => set({ totalRows }),
  setState: (state) => set({ state }),
  resetPageIndex: () => set({ pageIndex: 0, pageSize: 10 }),
}));

export default useTableStore;
