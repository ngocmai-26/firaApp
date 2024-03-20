import { createSlice } from "@reduxjs/toolkit";

const initState = {
  userRoom: [],
  roomTags: [],
  isLoading: false,
};
const RoomSlice = createSlice({
  name: "room",
  initialState: initState,
  reducers: {
    setUserRoom: (state, { payload }) => {
      state.userRoom = payload;
    },
    setRoomTags: (state, { payload }) => {
      state.roomTags = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    pushMessageToRoom: (state, { payload }) => {
      const tem = [...state.userRoom];
      for (let room of tem) {
        if (payload.room.id == room.id) {
          room.allMessages.content.unshift(payload);
          room.lastMessage = payload;
          const uniqueMap = {};
          const uniqueArray = room.allMessages.content.filter((item) => {
            if (!uniqueMap[item.id] && !item?.queue) {
              uniqueMap[item.id] = true;
              return true;
            }
            return false;
          });
          room.allMessages.content = uniqueArray;
        }
      }
      state.userRoom = tem;
    },
    showMediaUploadInRoom: (state, { payload }) => {
      const mediaLength = payload.mediaLength;
      const msg = payload.msg;
      const queueMessage = {
        content: msg,
        sentAt: new Date(),
        media: new Array(mediaLength).fill(-1),
        sender: { id: payload.sender },
        room: { id: payload.roomId },
        messageTypeInRoom: 1,
        queue: true,
        avatar: payload.avatar,
      };

      const tem = [...state.userRoom];
      for (let room of tem) {
        if (payload.roomId == room.id) {
          room.allMessages.content.unshift(queueMessage);
          room.lastMessage = queueMessage;
          const uniqueMap = {};
          const uniqueArray = room.allMessages.content.filter((item) => {
            if (!uniqueMap[item.id]) {
              uniqueMap[item.id] = true;
              return true;
            }
            return false;
          });
          room.allMessages.content = uniqueArray;
        }
      }
      state.userRoom = tem;
    },
  },
});

export const {
  setUserRoom,
  setRoomTags,
  setLoading,
  pushMessageToRoom,
  showMediaUploadInRoom,
} = RoomSlice.actions;

export default RoomSlice.reducer;
