import { createSlice } from "@reduxjs/toolkit";

const initState = {
  notifications: [],
};
const NotificationSlice = createSlice({
  name: "notificationSlice",
  initialState: initState,
  reducers: {
    setAllNotifications: (state, { payload }) => {
      state.notifications = payload
    },
  },
});
export const { setAllNotifications } = NotificationSlice.actions;
export default NotificationSlice.reducer;
