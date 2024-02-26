import { createSlice } from "@reduxjs/toolkit";

const initState = {
  msg: {},
};
const AlertSlice = createSlice({
  name: "alert",
  initialState: initState,
  reducers: {
    setAlert: (state, { payload }) => {
      state.msg = payload;
    },
  },
});

export const { setAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
