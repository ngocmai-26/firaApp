import { createSlice } from "@reduxjs/toolkit";

const initState = {
  contactRequest: [],
  allContact: [],
  addContactLoadingId: [],
  addContactRequest: [],
};
const ContactSlice = createSlice({
  name: "contactSlice",
  initialState: initState,
  reducers: {
    setContactRequest: (state, { payload }) => {
      state.contactRequest = payload;
    },
    setAllContact: (state, { payload }) => {
      state.allContact = payload;
    },
    setContactLoadingId: (state, { payload }) => {
      state.addContactLoadingId = payload;
    },
    setAddContactRequest: (state, { payload }) => {
      state.addContactRequest = payload;
    },
  },
});
export const {
  setContactRequest,
  setAllContact,
  setContactLoadingId,
  setAddContactRequest,
} = ContactSlice.actions;
export default ContactSlice.reducer;
