import { createSlice } from "@reduxjs/toolkit";

const initState = {
  plan: [],
  allPlan: [],
  singlePlan: {},
  manager: {
    plans: [],
    planUpdate: {},
  },
  listPlan: [],
  actionStatusCode: 0,
  searchPlan: [],
  paginationPlan: {},
};
const PlanSlice = createSlice({
  name: "plan",
  initialState: initState,
  reducers: {
    setPlan: (state, {payload}) => {
      state.plan = payload;
    },
    setAllPlan: (state, { payload }) => {
      state.allPlan = payload;
    },
    setSinglePlan: (state, { payload }) => {
      state.singlePlan = payload;
    },
    setPlanUpdate: (state, { payload }) => {
      state.manager.planUpdate = payload;
    },
    setActionStatus: (state, { payload }) => {
      state.actionStatusCode = payload
    },
    setSearchPlan: (state, { payload }) => {
      state.searchPlan = payload
    },
    setPaginationPlan: (state, { payload }) => {
      state.paginationPlan = payload
    },
    
  },
});

export const { setPlan, setAllPlan,setSinglePlan, setPlanUpdate, setActionStatus,setSearchPlan, setPaginationPlan } = PlanSlice.actions;

export default PlanSlice.reducer;