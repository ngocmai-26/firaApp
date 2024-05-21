import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allKPI: [],
  searchKPI: [],
  singleKPI: {},
  paginationKPI: {},
  listKPI: [],
  listKPIHistory: [],
}
const KPIsSlice = createSlice({
  name: 'KPIs',
  initialState: initState,
  reducers: {
    setAllKPI: (state, { payload }) => {
      state.allKPI = payload
    },
    setSearchKPI: (state, { payload }) => {
      state.searchKPI = payload
    },
    setSingleKPI: (state, { payload }) => {
      state.singleKPI = payload
    },
    setPaginationKPI: (state, { payload }) => {
      state.paginationKPI = payload
    },
    setListKPI: (state, {payload}) => {
      state.listKPI = payload
    },
    setListKPIHistory: (state, {payload}) => {
      state.listKPIHistory = payload
    },
  },
})

export const { setAllKPI, setSearchKPI, setSingleKPI, setPaginationKPI, setListKPI, setListKPIHistory } = KPIsSlice.actions

export default KPIsSlice.reducer
