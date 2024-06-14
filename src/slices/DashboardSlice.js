import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allDashboard: {},
}
const DashboardsSlice = createSlice({
  name: 'roles',
  initialState: initState,
  reducers: {
    setAllDashboard: (state, { payload }) => {
      state.allDashboard = payload
    },
  },
})

export const {
  setAllDashboard,
} = DashboardsSlice.actions

export default DashboardsSlice.reducer
