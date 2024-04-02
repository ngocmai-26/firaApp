import { createAsyncThunk } from '@reduxjs/toolkit'
import { delaySync, loadTokenFromStorage } from '../services/AuthService'
import {
  setLoading,
  setRoomTags,
  setUserRoom,
  showMediaUploadInRoom,
} from '../slices/RoomSlice'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { API } from '../constants/api'
import { getHeaders } from '../services/ApiService'
import { FBStorageService } from '../services/firebase/StorageService'

export const getAllRoomByUser = createAsyncThunk(
  'rooms/all-by-user',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState().authReducer
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/rooms/by-member/${user?.id}`, {
        method: 'GET',
        headers: getHeaders(token),
      })
      const jsonData = await resp.json()
      if (resp.status == 200) {
        dispatch(setUserRoom(jsonData?.data))
      }
    } catch (e) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Có lỗi xảy ra khi gửi yêu cầu',
      })
    }
  },
)

export const createNewRoom = createAsyncThunk(
  '/room/create',
  async (roomData, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(setLoading(true))
      await delaySync(1)
      const token = await loadTokenFromStorage()
      const { user } = getState().authReducer
      const resp = await fetch(`${API.uri}/rooms`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(roomData),
      })
      const jsonData = await resp.json()
      dispatch(setLoading(false))
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: jsonData?.message[0],
        })
        return rejectWithValue()
      }
      // success
      dispatch(getAllRoomByUser(user?.id))
      return jsonData
    } catch (e) {
      console.log(e)
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Có lỗi xảy ra vui lòng thử lại sau',
      })
    }
  },
)

export const getRoomTags = createAsyncThunk(
  '/room/tags',
  async (roomData, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState().authReducer

      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/rooms/tags`, {
        method: 'GET',
        headers: getHeaders(token),
      })
      const jsonData = await resp.json()
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: jsonData.message[0],
        })
        rejectWithValue()
      }
      // success
      dispatch(setRoomTags(jsonData.data))
      return jsonData
    } catch (e) {
      console.log(e)

      Toast.show({
        type: TOAST_ERROR,
        text1: 'Có lỗi xảy ra vui lòng thử lại sau',
      })
    }
  },
)
export const sendMessage = createAsyncThunk(
  '/room/message/send',
  async (messageData, { dispatch, rejectWithValue, getState }) => {
    try {
      const { user } = getState().authReducer
      const token = await loadTokenFromStorage()
      //handle when it's has medias
      if (messageData.msgData.media.length > 0) {
        const queueMsg = {
          mediaLength: messageData.msgData.media.length,
          msg: messageData.msgData.content,
          sender: user.id,
          roomId: messageData.msgData.roomId,
          avatar: user.avatar,
        }
        dispatch(showMediaUploadInRoom(queueMsg))
        messageData.image.forEach((imageItem) => {
          const correspondingMedia = messageData.msgData.media.find(
            (mediaItem) => mediaItem.id === imageItem.id,
          )
          if (correspondingMedia) {
            imageItem.id = correspondingMedia.id
          }
        })

        const uploadedMedia = await FBStorageService.uploadFiles(
          messageData.image,
        )
        messageData.msgData.media = messageData.msgData.media.map(
          (m, index) => {
            return {
              ...m,
              mediaLink: uploadedMedia[index],
            }
          },
        )
      }
      // then upload image
      messageData.msgData['memberId'] = user.id
      const resp = await fetch(`${API.uri}/rooms/send`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(messageData.msgData),
      })
      const jsonData = await resp.json()
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: jsonData.message[0],
        })
        rejectWithValue()
      }

      return jsonData
    } catch (e) {
      console.log(e)
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Có lỗi xảy ra vui lòng thử lại sau',
      })
    }
  },
)

export const addNewMember = createAsyncThunk(
  'rooms',
  async (data, { dispatch, rejectWithValue }) => {
    try {
    const token = await loadTokenFromStorage()
  
    if (!token) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
      })
    }
    const resp = await fetch(`${API.uri}/rooms/add-member/${data.roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data.data),
    })
    const dataJson = await resp.json()
    if (resp.status >= 300) {
      Toast.show({
        type: TOAST_ERROR,
        text1: dataJson.message[0],
      })
      return rejectWithValue()
    }
    
    Toast.show({
      type: TOAST_SUCCESS,
      text1: 'Thêm thành công',
    })
  } catch(e) {
    console.log(e)

  }
  }
)
