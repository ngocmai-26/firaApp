import { createSlice } from "@reduxjs/toolkit";

const initState = {
  searchContact: [],
  searchContent: "",
  searching: false,
};
const SearchSlice = createSlice({
  name: "searchSlice",
  initialState: initState,
  reducers: {
    setSearchContact: (state, { payload }) => {
      state.searchContact = payload;
    },
    setSearchContent: (state, { payload }) => {
      state.searchContent = payload;
    },
    setSearching: (state, { payload }) => {
      state.searching = payload;
    },
  },
});
export const {
  setSearchContact,
  setSearchContent,
  setSearching,
} = SearchSlice.actions;
export default SearchSlice.reducer;
