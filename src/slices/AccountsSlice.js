import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allAccount: [],
  searchAccount: [],
  singleAccount: {},
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
      state.errors = payload;
    },
  },
})

export const {
  setAllAccount,
  setSearchAccount,
  setSingleAccount,
  setErrors,
} = AccountsSlice.actions

export default AccountsSlice.reducer
