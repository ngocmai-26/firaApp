import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allKPICategories: [],
  searchKPICategories: [],
  singleKPICategories: {},
  paginationKPICategories: {},
  listKPICategories: [],
}
const KPICategoriesSlice = createSlice({
  name: 'KPICategories',
  initialState: initState,
  reducers: {
    setAllKPICategories: (state, { payload }) => {
      state.allKPICategories = payload
    },
    setSearchKPICategories: (state, { payload }) => {
      state.searchKPICategories = payload
    },
    setSingleKPICategories: (state, { payload }) => {
      state.singleKPICategories = payload
    },
    setPaginationKPICategories: (state, { payload }) => {
      state.paginationKPICategories = payload
    },
    setListKPICategories: (state, {payload}) => {
      state.listKPICategories = payload
    },
  },
})

export const { setAllKPICategories, setSearchKPICategories, setSingleKPICategories, setPaginationKPICategories, setListKPICategories } = KPICategoriesSlice.actions

export default KPICategoriesSlice.reducer
