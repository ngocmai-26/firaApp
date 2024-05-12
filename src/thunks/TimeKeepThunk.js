import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'
import { loadTokenFromStorage } from '../services/AuthService'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAllTimeKeep, setPaginationTimeKeep } from '../slices/TimeKeepsSlice'

export const getAllTimeKeep = createAsyncThunk(
  '/time-keeper',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(
        `${API.uri}/time-keeper?page=${data || 0}&size=20`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        const contents = dataJson?.data?.content || dataJson?.response
        dispatch(setAllTimeKeep(contents))
        dispatch(setPaginationTimeKeep(dataJson?.data))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const CheckIn = createAsyncThunk(
  '/checkIn',
  async (data, { dispatch, rejectWithValue }) => {
    const token = await loadTokenFromStorage()
    if (!token) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
      })
    }
    const resp = await fetch(
      `${API.uri}/time-keeper/checkin/${data.userId}?shift=${data.shift}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      },
    )
    if (resp.status >= 200 && resp.status < 300) {
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Checkin thành công',
      })
      dispatch(getAllTimeKeep())
    } else {
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Hãy kiểm tra lại dữ liệu',
      })
    }
  },
)
export const CheckOut = createAsyncThunk(
  '/checkIn',
  async (data, { dispatch, rejectWithValue }) => {
    const token = await loadTokenFromStorage()
    if (!token) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
      })
    }
    const resp = await fetch(
      `${API.uri}/time-keeper/checkout/${data.userId}?shift=${data.shift}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      },
    )
    if (resp.status >= 200 && resp.status < 300) {
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Check out thành công',
      })
      dispatch(getAllTimeKeep())
    } else {
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Hãy kiểm tra lại dữ liệu',
      })
    }
  },
)

export const getUserTimeKeep = createAsyncThunk(
  '/time-keeper/by-user',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      console.log("contentssssss")
      const resp = await fetch(`${API.uri}/time-keeper/by-user/${data.id}?page=${data.data || 0}&size=20`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        const contents = dataJson?.data || dataJson?.response
        dispatch(setAllTimeKeep(contents))
        dispatch(setPaginationTimeKeep(dataJson?.data))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const getUserManagerTimeKeep = createAsyncThunk(
  '/time-keeper/by-user',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/time-keeper/by-user-manager/${data.id}?page=${data.data || 0}&size=20`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        const contents = dataJson?.data || dataJson?.response
        dispatch(setAllTimeKeep(contents))
        dispatch(setPaginationTimeKeep(dataJson?.data))
      }
    } catch (e) {
      console.log(e)
    }
  },
)
