import { createSlice } from "@reduxjs/toolkit";

const initState = {
  allPermission: [],
  searchPermission: [],
  singlePermission: {},
  listPermission: [],
};
const PermissionsSlice = createSlice({
  name: "permissions",
  initialState: initState,
  reducers: {
    setAllPermissions: (state, { payload }) => {
      state.allPermission = payload;
    },
    setSearchPermissions: (state, { payload }) => {
      state.searchPermission = payload;
    },
    setSinglePermission: (state, { payload }) => {
      state.singlePermission = payload;
    },
    setListPermission: (state, {payload}) => {
      state.listPermission = payload
    },
  },
});

export const { setAllPermissions, setSearchPermissions, setSinglePermission, setListPermission } = PermissionsSlice.actions;

export default PermissionsSlice.reducer;
