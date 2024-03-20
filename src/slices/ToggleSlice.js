import { createSlice } from "@reduxjs/toolkit";

const initState = {
  room: {
    expandFileMedia: true,
    expandMessageContent: true,
  },
};
export const EXPAND_FILE_MEDIA = 1;
export const EXPAND_MESSAGE_CONTENT = 2;

const ToggleSlice = createSlice({
  name: "toggleService",
  initialState: initState,
  reducers: {
    setRoomToggle: (state, { payload }) => {
      switch (payload.type) {
        case EXPAND_FILE_MEDIA:
          state.room.expandFileMedia = payload.value;
          break;
        case EXPAND_MESSAGE_CONTENT:
          state.room.expandMessageContent = payload.value;
          break;
      }
    },
  },
});

export const { setRoomToggle } = ToggleSlice.actions;

export default ToggleSlice.reducer;
