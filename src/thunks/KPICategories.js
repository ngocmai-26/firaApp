import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../constants/api"
import Toast from "react-native-toast-message"
import { TOAST_ERROR, TOAST_SUCCESS } from "../constants/toast"
import { setAllKPICategories, setPaginationKPICategories, setSingleKPICategories } from "../slices/KPICategoriesSlice"

export const getAllKPICategories = createAsyncThunk(
    '/kpisCategories',
    async (data, { dispatch, rejectWithValue }) => {
      try {
        const token = await loadTokenFromStorage()
        const resp = await fetch(`${API.uri}/kpi-categories?page=${data || 0}&size=20`, {
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
        dispatch(setAllKPICategories(dataJson.data.content))
        dispatch(setPaginationKPICategories(dataJson.data))
      } catch (e) {
        console.log(e)
      }
    },
  )

  
export const addNewKpiCategories = createAsyncThunk(
    'kpisCategories/add',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const token = await loadTokenFromStorage()
            if (!token) {
              Toast.show({
                type: TOAST_ERROR,
                text1:'Phiên đăng nhập đã hết hạn vui lòng thử lại'
              })
            }
            const resp = await fetch(`${API.uri}/kpi-categories`, {
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
                text1:'Thêm thành công'
              })
              dispatch(getAllKPICategories())
            } else {
               
              Toast.show({
                type: TOAST_ERROR,
                text1: 'Hãy kiểm tra lại dữ liệu'
              })
            }
        }catch(e) {
            console.log(e)
        }
      
    },
  )

  
export const deleteKPICategories = createAsyncThunk(
    '/KPICategories/id',
    async (id, { dispatch, rejectWithValue }) => {
      try {
        const token = await loadTokenFromStorage()
        const resp = await fetch(`${API.uri}/kpi-categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        if (resp.status < 200 || resp.status >= 400) {
          
          Toast.show({
            type: TOAST_ERROR,
            text1:resp.json()?.defaultMessage ?? 'Lỗi khi xóa kpi'
          })
          return rejectWithValue()
        }
        Toast.show({
          type: TOAST_SUCCESS,
          text1:'Xóa thành công'
        })
        dispatch(getAllKPICategories())
      } catch (e) {
        Toast.show({
          type: TOAST_ERROR,
          text1:'Lỗi khi xóa kpi'
        })
      }
    },
  )

  export const updateKPICategories = createAsyncThunk(
      '/kpiCategories/id',
      async (data, { dispatch, rejectWithValue }) => {
        try {
          const token = await loadTokenFromStorage()
          const resp = await fetch(`${API.uri}/kpi-categories/${data.id}`, {
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
    
          dispatch(getAllKPICategories())
        } catch (e) {
          console.log(e)
        }
      },
    )

    export const getKpiCategoriesById = createAsyncThunk(
        '/KpiCategories/id',
        async (id, { dispatch, rejectWithValue }) => {
          try {
            const token = await loadTokenFromStorage()
            let uri = `${API.uri}/kpi-categories/${id}`
      
            const resp = await fetch(uri, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })
            if (resp.status >= 200 && resp.status < 300) {
              const jsonData = await resp.json()
              dispatch(setSingleKPICategories(jsonData?.data))
            }
          } catch (e) {
            console.log(e)
          }
        },
      )
      
  
  