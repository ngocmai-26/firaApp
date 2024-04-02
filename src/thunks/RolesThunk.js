import { API } from '../constants/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAllRole, setListPermission, setPaginationRole, setSingleRole } from '../slices/RolesSlice'

import Toast from 'react-native-toast-message'
import { loadTokenFromStorage } from '../services/AuthService'

export const getAllRole = createAsyncThunk(
  '/roles',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/roles?page=${data || 0}&size=20`, {
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
      dispatch(setAllRole(dataJson.data.content))
      dispatch(setPaginationRole(dataJson.data))
    } catch (e) {
      console.log("e", e)
    }
  },
)

export const getRoleById = createAsyncThunk(
  '/roles/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/roles/${id}`, {
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
      dispatch(setSingleRole(dataJson.data))
    } catch (e) {
      console.log("e", e)
    }
  },
)

export const deleteRoles = createAsyncThunk(
  'deleteRole',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/roles/${id}`, {
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
      dispatch(getAllRole())
    } catch (e) {
      console.log("e", e)
    }
  },
)

export const updatePermission = createAsyncThunk(
  '/add-perm/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/roles/add-perm/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.list),
      })
      if (resp.status >= 200 && resp.status < 300) {

        Toast.show({
          type: TOAST_SUCCESS,
          text1: 'Update permission success',
        })

        dispatch(setListPermission(resp))
        return rejectWithValue()
      } else {
        Toast.show({
          type: TOAST_ERROR,
          text1: resp.json()?.defaultMessage ?? 'Update permission error',
        })
      }
      dispatch(getAllRole())
    } catch (e) {
      console.log(e)
    }
  },
)


export const removePermission = createAsyncThunk(
  '/remove-perm/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/roles/remove-perm/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.list),
      })
      if (resp.status >= 200 && resp.status < 300) {
        Toast.show({
          type: TOAST_SUCCESS,
          text1: 'Xóa thành công',
        })
        dispatch(setListPermission(resp))
        return rejectWithValue()
      }
      dispatch(getAllRole())
    } catch (e) {
      console.log(e)
    }
  },
)

export const addNewRole = createAsyncThunk(
  'add-roles',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      if (!token) {
        Toast.show({
          type: TOAST_ERROR,
          text1: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
        })
      }
      const resp = await fetch(`${API.uri}/roles`, {
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
      dispatch(getAllRole())
    } catch (e) {
      console.log("e", e)
    }
  },
)

export const updateRole = createAsyncThunk(
  'update-role',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/roles/${data.id}`, {
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
          text1: dataJson.message[0],
        })
        return rejectWithValue()
      }

      Toast.show({
        type: TOAST_SUCCESS,
        text1: dataJson.message[0],
      })
      dispatch(getAllRole())
    } catch (e) {
      console.log(e)
    }
  },
)
