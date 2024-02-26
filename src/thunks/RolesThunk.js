import { API } from '../constants/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAllRole, setSingleRole } from '../slices/RolesSlice'

import Toast from 'react-native-toast-message'
import { loadTokenFromStorage } from '../services/AuthService'

export const getAllRole = createAsyncThunk(
  '/roles',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      console.log('token', token)
      const resp = await fetch(`${API.uri}/roles`, {
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
    } catch (e) {
      // dispatch(setAuthFetching(true));
      Toast.show({
        type: 'error',
        text1: e,
      })
    }
  },
)

export const getRoleById = createAsyncThunk(
  '/roles/id',
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('auth_token')
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
  },
)

export const deleteRoles = createAsyncThunk(
  'deleteRole',
  async (id, { dispatch, rejectWithValue }) => {
    console.log('resp')
    try {
      const token = localStorage.getItem('auth_token')
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
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Error when delete role',
      })
    }
  },
)

// export const updatePermission = createAsyncThunk(
//   'permission',
//   async (data, { dispatch, rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('auth_token')
//       const resp = await fetch(
//         `${API.uri}/roles/give_permission_for_role/${data.id}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(data),
//         },
//       )
//       if (resp.status >= 200 && resp.status < 300) {
//         Toast.show({
//           type: TOAST_SUCCESS,
//           text1: 'Update product success',
//         })

//         dispatch(setListPermission(resp))
//         return rejectWithValue()
//       } else {
//         Toast.show({
//           type: TOAST_ERROR,
//           text1:  resp.json()?.defaultMessage ?? 'Update product error ',
//         })
//       }
//     } catch (e) {
//       console.log(e)
//     }
//   },
// )

export const addNewRole = createAsyncThunk(
  'add-roles',
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('auth_token')
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
  },
)

export const updateRole = createAsyncThunk(
  'update-role',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
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
