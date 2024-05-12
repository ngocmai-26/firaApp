import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import Toast from 'react-native-toast-message'
import {
  setAllPlan,
  setPaginationPlan,
  setSinglePlan,
} from '../slices/PlansSlice'
import { loadTokenFromStorage } from '../services/AuthService'

export const getAllPlan = createAsyncThunk(
  '/plans',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/plans?page=${data || 0}&size=20`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        const contents = dataJson?.data?.content || dataJson?.response
        dispatch(setAllPlan(contents))
        dispatch(setPaginationPlan(dataJson?.data))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const addNewPlan = createAsyncThunk(
  'plans/add',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      if (!token) {
        Toast.show({
          type: TOAST_ERROR,
          text1: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
        })
      }
      const resp = await fetch(`${API.uri}/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      console.log(data)
      if (resp.status >= 200 && resp.status < 300) {
        Toast.show({
          type: TOAST_SUCCESS,
          text1: 'Thêm kế hoạch thành công',
        })
        dispatch(getAllPlan())
      } else {
        Toast.show({
          type: TOAST_ERROR,
          text1: 'Hãy kiểm tra lại dữ liệu',
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const deletePlan = createAsyncThunk(
  '/plans/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      console.log("id", id)
      const resp = await fetch(`${API.uri}/plans/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status < 200 || resp.status >= 400) {
        Toast.show({
          type: TOAST_ERROR,
          text1: resp.json()?.defaultMessage ?? 'Lỗi khi xóa kế hoạch',
        })
        return rejectWithValue()
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Success',
      })
      dispatch(getAllPlan())
    } catch (e) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Lỗi khi xóa kế hoạch',
      })
    }
  },
)

export const updateStatus = createAsyncThunk(
  '/plans/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      console.log("data", data)
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/plans/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.data),
      })
      if (resp.status >= 200 && resp.status < 300) {
        Toast.show({
          type: TOAST_SUCCESS,
          text1: 'Update plan success',
        })
        dispatch(getAllPlan())
      } else {
        Toast.show({
          type: TOAST_ERROR,
          text1: resp?.defaultMessage ?? 'Update plan error ',
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const getPlanById = createAsyncThunk(
  '/plans',
  async (data, { dispatch, rejectWithValue }) => {
    try {
       console.log("data", data)
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/plans/${data}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        const contents = dataJson?.data || dataJson?.response
        dispatch(setSinglePlan(contents))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const updatePlan = createAsyncThunk(
  '/plans/id',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/plans/${data.id}`, {
        method: 'PUT',
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
          text1: resp?.defaultMessage ?? 'Update plan error ',
        })
        return rejectWithValue()
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Cập nhật kế hoạch thành công',
      })
      dispatch(getAllPlan())
    } catch (e) {
      console.log(e)
    }
  },
)
  
