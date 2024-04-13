import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const initState = {
  logged: false,
  authToken: '',
  user: {},
  account: {},
  refresh: null,
  actionStatusCode: 0,
  isFetching: false,
  errors: {},
  errorsRegister: {},
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('email')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.log('get', e)
  }
}
const remove = async () => {
  try {
    await AsyncStorage.removeItem('email')
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('auth')
    const jsonValue = await AsyncStorage.getItem('email')
    useDispatch(setLogged(false))
    return jsonValue
  } catch (e) {
    console.log('Error when removing..')
  }
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setErrorsRegister: (state, { payload }) => {
      state.errorsRegister = payload
    },
    setAccount: (state, { payload }) => {
      state.account = payload
    },
    setLogged: (state, { payload }) => {
      state.logged = payload
    },
    setUser: (state, { payload }) => {
      state.user = payload
    },
    setActionStatus: (state, { payload }) => {
      state.actionStatusCode = payload
    },
    setRefresh: (state, { payload }) => {
      state.refresh = { fresh: !state.refresh, uri: payload }
    },
    setAuthFetching: (state, { payload }) => {
      state.isFetching = payload
    },
    setEmailAuth: (state, { payload }) => {
      state.email = payload
    },
    loadUser: (state) => {
      getData().then((data) => {
        if (data) {
          state.authToken = data
          state.logged = true
        } else {
          state = initState
        }
      })
    },
    logout: (state) => {
      remove()
      state.logged = false
      state = initState
    },
  },
})

export const {
  setLogged,
  loadUser,
  logout,
  setRefresh,
  setActionStatus,
  setUser,
  setEmailAuth,
  setErrors,
  setAuthFetching,
  setErrorsRegister,
  setAccount
} = AuthSlice.actions

export default AuthSlice.reducer
