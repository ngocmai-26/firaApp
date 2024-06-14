import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../constants/api"
import Toast from "react-native-toast-message"
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast"
import { setAllKPI, setListKPIHistory, setPaginationKPI, setSingleKPI } from "../slices/KPIsSlice"
import { loadTokenFromStorage } from "../services/AuthService"


export const getAllKPI = createAsyncThunk(
  '/kpis',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/kpis?page=${data || 0}&size=20`, {
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
      dispatch(setAllKPI(dataJson.data.content))
      dispatch(setPaginationKPI(dataJson.data))
    } catch (e) {
      console.log(e)
    }
  },
)

export const deleteKPI = createAsyncThunk(
  '/KPIs/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/kpis/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status < 200 || resp.status >= 400) {
        Toast.show({
            type: TOAST_ERROR,
            text1: resp.json()?.defaultMessage ?? 'Lỗi khi xóa kpi',
          })
        return rejectWithValue()
      }
      Toast.show({
        type: TOAST_SUCCESS,
        text1: 'Xóa thành công',
      })
      dispatch(getAllKPI())
    } catch (e) {
      console.log(e)
    }
  },
)

export const addNewKpi = createAsyncThunk(
  'kpis/add',
  async (data, { dispatch, rejectWithValue }) => {
    try {
        const token = await loadTokenFromStorage()
        console.log("data", data)
        if (!token) {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
          })
        }
        const resp = await fetch(`${API.uri}/kpis`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })
        console.log("data", data)
        if (resp.status >= 200 && resp.status < 300) {
         Toast.show({
            type: TOAST_SUCCESS,
            text1: 'Đánh giá KPI thành công',
          })
          dispatch(getAllKPI())
        } else {
          Toast.show({
            type: TOAST_ERROR,
            text1: 'Hãy kiểm tra lại dữ liệu'
          })
        }
    } catch(e) {
        console.log(e)
    }
    
  },
)

export const getKpisById = createAsyncThunk(
  '/KpiCategories/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      let uri = `${API.uri}/kpis/${id}`

      const resp = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json()
        dispatch(setSingleKPI(jsonData?.data))
      } 
    } catch (e) {
      console.log(e)
    }
  },
)

export const getKpiVerifyById = createAsyncThunk(
  '/KpiVerify/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage()
      let uri = `${API.uri}/kpi/verify/${id}`

      const resp = await fetch(uri, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json()
        dispatch(getAllKPI())
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const updateKPI = createAsyncThunk(
    '/kpis/id',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const token = await loadTokenFromStorage()
        const resp = await fetch(`${API.uri}/kpis/${data.id}`, {
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
            text1: dataJson.message[0]
          })
          return rejectWithValue()
        }
  
        dispatch(getAllKPI())
      } catch (e) {
        console.log(e)
      }
    },
  )

  export const updateKPIDetail = createAsyncThunk(
    '/kpis/id',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const token = await loadTokenFromStorage()
        const resp = await fetch(`${API.uri}/kpis/update-detail/${data.id}`, {
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
            text1: dataJson.message[0]
          })
          return rejectWithValue()
        }
        Toast.show({
          type: TOAST_SUCCESS,
          text1: "Thành công" 
        })
        dispatch(getAllKPI())
      } catch (e) {
        console.log(e)
      }
    },
)
  export const GetKPIHistory = createAsyncThunk(
    '/kpi-histories/by-user-in-month/id',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const token = await loadTokenFromStorage()
        const resp = await fetch(`${API.uri}/kpi-histories/by-user-in-month/${id}`, {
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
            text1: dataJson.message[0]
          })
          return rejectWithValue()
        }
        dispatch(setListKPIHistory(dataJson.data.body.data.content))
      } catch (e) {
        console.log(e)
      }
    },
)


