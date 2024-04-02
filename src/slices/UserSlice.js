import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allUser: [],
  searchUser: [],
  singleUser: {},
  paginationUser: {},
}
const UsersSlice = createSlice({
  name: 'users',
  initialState: initState,
  reducers: {
    setAllUser: (state, { payload }) => {
      state.allUser = payload
    },
    setSearchUser: (state, { payload }) => {
      state.searchUser = payload
    },
    setSingleUser: (state, { payload }) => {
      state.singleUser = payload
    },
    setPaginationUser: (state, { payload }) => {
      state.paginationUser = payload
    },
  },
})

export const { setAllUser, setSearchUser, setSingleUser, setPaginationUser } = UsersSlice.actions

export default UsersSlice.reducer