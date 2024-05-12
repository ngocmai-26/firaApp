import Toast from 'react-native-toast-message'
import { API } from '../constants/api'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { loadTokenFromStorage } from '../services/AuthService'
import { setAllUser, setPaginationUser, setSingleUser } from '../slices/UserSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setUser } from '../slices/AuthSlice'

export const getAllUsers = createAsyncThunk(
  '/users',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/users?page=${data || 0}&size=20`, {
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
      dispatch(setAllUser(dataJson.data.content))
      dispatch(setPaginationUser(dataJson.data))
    } catch (e) {
      dispatch(setAlert({ type: TOAST_ERROR, content: 'Error' }))
    }
  },
)

export const getUserById = createAsyncThunk(
  '/users/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/users/${id}`, {
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
      dispatch(setSingleUser(dataJson.data))
    } catch (e) {
      dispatch(setAlert({ type: 'error', content: 'Error when delete account' }))
    }
  },
)

export const deleteUsers = createAsyncThunk(
  '/users/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/users/${id}`, {
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
        type: TOAST_SUCCESS,
        text1: 'Xóa chức vụ thành công',
      })
      dispatch(getAllUsers())
    } catch (e) {
      dispatch(setAlert({ type: 'error', content: 'Error when delete account' }))
    }
  },
)

export const updateUser = createAsyncThunk(
  '/users/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      console.log(data)
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/users/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      const dataJson = await resp.json()
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: dataJson?.message[0],
        })
        return rejectWithValue()
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Cập nhật tài khoản thành công',
      })
      dispatch(setUser(dataJson?.data));
      dispatch(getAllUsers())
    } catch (e) {
      console.log(e)
    }
  },
)
