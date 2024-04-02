import { createAsyncThunk } from '@reduxjs/toolkit'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAllAccount, setPaginationAccount, setSingleAccount } from '../slices/AccountsSlice'

import Toast from 'react-native-toast-message'
import { API } from '../constants/api'
import { loadTokenFromStorage } from '../services/AuthService'

export const getAllAccount = createAsyncThunk(
  '/accounts',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      console.log('token', token)
      const resp = await fetch(`${API.uri}/accounts?page=${data || 0}&size=20`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const dataJson = await resp.json()
      console.log('dataJson', dataJson)
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson.message[0],
        })
        return rejectWithValue()
      }
      dispatch(setAllAccount(dataJson.data.content))
      dispatch(setPaginationAccount(dataJson.data))
    } catch (e) {
      console.log('e', e)
    }
  },
)

export const addNewAccount = createAsyncThunk(
  'accounts',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      if (!token) {
        Toast.show({
          type: TOAST_ERROR,
          text1: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
        })
      }
      const resp = await fetch(`${API.uri}/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      const dataJson = await resp.json()
      console.log('dataJson', dataJson)
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson.message[0],
        })
        return rejectWithValue()
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Thêm tài khoản thành công',
      })
      dispatch(getAllAccount())
    } catch (e) {
      console.log('e', e)
    }
  },
)

export const deleteAccount = createAsyncThunk(
  '/accounts/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/accounts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
        type: TOAST_ERROR,
        text1: 'Vô hiệu hóa tài khoản thành công',
      })
      dispatch(getAllAccount())
    } catch (e) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Error when delete role',
      })
    }
  },
)

export const getAccountById = createAsyncThunk(
  '/account/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/accounts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const dataJson = await resp.json()
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson.message[0],
        })
        return rejectWithValue()
      }
      dispatch(setSingleAccount(dataJson.data))
    } catch (e) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Error when delete role',
      })
    }
  },
)
