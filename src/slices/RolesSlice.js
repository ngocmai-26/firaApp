import { createSlice } from "@reduxjs/toolkit";

const initState = {
  allRole: [],
  searchRole: [],
  singleRole: {}
};
const RolesSlice = createSlice({
  name: "roles",
  initialState: initState,
  reducers: {
    setAllRole: (state, { payload }) => {
      state.allRole = payload;
    },
    setSearchRole: (state, { payload }) => {
      state.searchRole = payload;
    },
    setSingleRole: (state, { payload }) => {
      state.singleRole = payload;
    },
  },
});

export const { setAllRole, setSearchRole, setSingleRole } = RolesSlice.actions;

export default RolesSlice.reducer;
