
import { API } from '../constants/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import Toast from 'react-native-toast-message'
import { loadTokenFromStorage } from '../services/AuthService'
import { setAllPermissions, setPaginationPer, setSinglePermission } from '../slices/PermissionsSlice'

export const getAllPermissions = createAsyncThunk(
  'permissions',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/permissions?page=${data || 0}&size=20`, {
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
          text1: dataJson?.message[0],
        })
        return rejectWithValue()
      }
      dispatch(setAllPermissions(dataJson.data.content))
      dispatch(setPaginationPer(dataJson.data))
    } catch (e) {
      console.log("e", e)
    }
  },
)

export const getPerById = createAsyncThunk(
  'permissions/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/permissions/${id}`, {
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
          text1: dataJson?.message[0],
        })
        return rejectWithValue()
      }
      dispatch(setSinglePermission(dataJson.data))
    } catch (e) {
      // dispatch(setAuthFetching(true));
      console.log("e", e)
    }
  },
)

export const deletePermissions = createAsyncThunk(
  'deletePermission',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/permissions/${id}`, {
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
          text1: dataJson?.message[0],
        })
        return rejectWithValue()
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Xóa thành công',
      })
      dispatch(getAllPermissions())
    } catch (e) {
      console.log("e", e)
    }
  },
)



export const addNewPermission = createAsyncThunk(
  'add-permission',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      if (!token) {
        Toast.show({
          type: TOAST_ERROR,
          text1: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
        })
      }
      const resp = await fetch(`${API.uri}/permissions`, {
        method: 'POST',
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
          text1: dataJson.message[0],
        })
        return rejectWithValue()
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: dataJson.message[0],
      })
      dispatch(getAllPermissions())
    } catch (e) {
      console.log("e", e)
    }
  },
)
