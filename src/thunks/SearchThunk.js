import { createAsyncThunk } from '@reduxjs/toolkit'
import { TOAST_ERROR } from '../constants/toast'
// import { setSearchContact, setSearching } from "../slices/SearchSlice";
import Toast from 'react-native-toast-message'
import { API } from '../constants/api'
import { getHeaders } from '../services/ApiService'
import { delaySync, loadTokenFromStorage } from '../services/AuthService'
import { setSearchContact, setSearching } from '../slices/SearchSlice'

export const searchContactAsync = createAsyncThunk(
  '/search-contact',
  async (email, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setSearching(true))
      await delaySync(1)
      
      const token = await loadTokenFromStorage()
      const resp = await fetch(`${API.uri}/contacts/search/by-email/${email}`, {
        method: 'GET',
        headers: getHeaders(token),
      })
      if (resp.status >= 300) {
        Toast.show({
          type: TOAST_ERROR,
          text1: 'Có lỗi xảy ra khi gửi yêu cầu',
        })
        dispatch(setSearching(false))
        return rejectWithValue()
      }
      const jsonData = await resp.json()

      dispatch(setSearchContact(jsonData?.data || new Array(0)))
      dispatch(setSearching(false))
      return
    } catch (e) {
      dispatch(setSearching(false))

      Toast.show({
        type: TOAST_ERROR,
        text1: 'Có lỗi xảy ra khi gửi yêu cầu',
      })
      console.log(e)
    }
  },
)
