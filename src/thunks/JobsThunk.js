import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'
import { loadTokenFromStorage } from '../services/AuthService'
import { setAllJob, setPaginationJob, setSingleJob } from '../slices/JobsSlice'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'

export const getAllJob = createAsyncThunk(
  '/jobs',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/jobs?page=${data || 0}&size=20`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        const contents = dataJson?.data?.content || dataJson?.response
        dispatch(setAllJob(contents))
        dispatch(setPaginationJob(dataJson?.data))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const addNewJob = createAsyncThunk(
  'job/add',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      if (!token) {
        Toast.show({
          type: TOAST_ERROR,
          text1: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
        })
      }
      const resp = await fetch(`${API.uri}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (resp.status >= 200 && resp.status < 300) {
        Toast.show({
          type: TOAST_SUCCESS,
          text1: 'Thêm công việc thành công',
        })
        dispatch(getAllJob())
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

export const deleteJob = createAsyncThunk(
  '/jobs/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status < 200 || resp.status >= 400) {
        Toast.show({
          type: TOAST_ERROR,
          text1: resp.json()?.defaultMessage ?? 'Lỗi khi xóa công việc',
        })
        return rejectWithValue()
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Success',
      })
      dispatch(getAllJob())
    } catch (e) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Lỗi khi xóa công việc',
      })
    }
  },
)

export const getJobById = createAsyncThunk(
  '/jobs/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      let uri = `${API.uri}/jobs/${id}`

      const resp = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json()
        dispatch(setSingleJob(jsonData?.data))
      }
    } catch (e) {
      console.log(e)
    }
  },
)
