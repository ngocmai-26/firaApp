import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allPermission: [],
  searchPermission: [],
  singlePermission: {},
  listPermission: [],
  paginationPer: {},
}
const PermissionsSlice = createSlice({
  name: 'permissions',
  initialState: initState,
  reducers: {
    setAllPermissions: (state, { payload }) => {
      state.allPermission = payload
    },
    setSearchPermissions: (state, { payload }) => {
      state.searchPermission = payload
    },
    setSinglePermission: (state, { payload }) => {
      state.singlePermission = payload
    },
    setListPermission: (state, { payload }) => {
      state.listPermission = payload
    },
    setPaginationPer: (state, { payload }) => {
      state.paginationPer = payload
    },
  },
})

export const {
  setAllPermissions,
  setSearchPermissions,
  setSinglePermission,
  setListPermission,
  setPaginationPer
} = PermissionsSlice.actions

export default PermissionsSlice.reducer
