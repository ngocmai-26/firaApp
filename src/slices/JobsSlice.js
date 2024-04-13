import { createSlice } from '@reduxjs/toolkit'

const initState = {
  jobs: [],
  allJob: [],
  singleJob: {},
  listJob: [],
  paginationJob: {},
}
const JobsSlice = createSlice({
  name: 'job',
  initialState: initState,
  reducers: {
    setJobs: (state, { payload }) => {
      state.jobs = payload
    },
    setAllJob: (state, { payload }) => {
      state.allJob = payload
    },
    setSingleJob: (state, { payload }) => {
      state.singleJob = payload
    },
    setListJob: (state, { payload }) => {
      state.listJob = payload
    },
    setPaginationJob: (state, { payload }) => {
      state.paginationJob = payload
    },
  },
})

export const {
  setJobs,
  setAllJob,
  setSingleJob,
  setListJob,
  setPaginationJob,
} = JobsSlice.actions

export default JobsSlice.reducer
