import { createSlice } from "@reduxjs/toolkit";

const initState = {
  timeKeeps: [],
  allTimeKeep: [],
  singleTimKeep: {},
  listTimeKeep: [],
  paginationTimeKeep: {},
};
const TimeKeepsSlice = createSlice({
  name: "TimeKeep",
  initialState: initState,
  reducers: {
    setTimeKeeps: (state, {payload}) => {
      state.timeKeeps = payload;
    },
    setAllTimeKeep: (state, { payload }) => {
      state.allTimeKeep = payload;
    },
    setSingleTimKeep: (state, { payload }) => {
      state.singleTimKeep = payload;
    },
    setListTimeKeep: (state, {payload}) => {
      state.listTimeKeep = payload
    },
    setPaginationTimeKeep: (state, { payload }) => {
      state.paginationTimeKeep = payload
    },

  },
});

export const { setTimeKeeps, setAllTimeKeep,setSingleTimKeep, setListTimeKeep, setPaginationTimeKeep } = TimeKeepsSlice.actions;

export default TimeKeepsSlice.reducer;