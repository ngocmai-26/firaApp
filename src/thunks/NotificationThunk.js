import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../constants/api"
import { setAllNotifications } from "../slices/NotificationSlice"
import { loadTokenFromStorage } from "../services/AuthService"
import Toast from "react-native-toast-message"
import { TOAST_ERROR } from "../constants/toast"

export const getAllNotification = createAsyncThunk(
    '/notification',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const token = await loadTokenFromStorage()
        const resp = await fetch(
          `${API.uri}/notifications/by-user`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`,
            },
          },
        )
        const dataJson = await resp.json()
        if (resp.status >= 300) {
          return rejectWithValue()
        }
        dispatch(setAllNotifications(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )

  
  export const readNotification = createAsyncThunk(
    '/account/id',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const token = await loadTokenFromStorage()
        const resp = await fetch(`${API.uri}/notifications/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        const dataJson = await resp.json()
        if (resp.status >= 300) {
          Toast.show({
            type: TOAST_ERROR,
            text1: dataJson.message[0]
          })
          return rejectWithValue()
        }
        dispatch(getAllNotification())
      } catch (e) {
        console.log(e)
      }
    },
  )