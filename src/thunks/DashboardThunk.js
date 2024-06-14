import { createAsyncThunk } from "@reduxjs/toolkit"
import { loadTokenFromStorage } from "../services/AuthService"
import { API } from "../constants/api"
import { setAllDashboard } from "../slices/DashboardSlice"


export const getAllDashboard = createAsyncThunk(
    '/dashboard',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const token = await loadTokenFromStorage()
        const resp = await fetch(
          `${API.uri}/dashboard`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        const dataJson = await resp.json()
        if (resp.status >= 300) {
          return rejectWithValue()
        }
        dispatch(setAllDashboard(dataJson.data))
      } catch (e) {
        console.log('Error')
      }
    },
  )