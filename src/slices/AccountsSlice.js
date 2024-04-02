import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allAccount: [],
  searchAccount: [],
  singleAccount: {},
  paginationAccount: {},
  errors: {},
}
const AccountsSlice = createSlice({
  name: 'roles',
  initialState: initState,
  reducers: {
    setAllAccount: (state, { payload }) => {
      state.allAccount = payload
    },
    setSearchAccount: (state, { payload }) => {
      state.searchAccount = payload
    },
    setSingleAccount: (state, { payload }) => {
      state.singleAccount = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationAccount: (state, { payload }) => {
      state.paginationAccount = payload
    },
  },
})

export const {
  setAllAccount,
  setSearchAccount,
  setSingleAccount,
  setErrors,
  setPaginationAccount,
} = AccountsSlice.actions

export default AccountsSlice.reducer
