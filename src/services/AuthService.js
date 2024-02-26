import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_KEY_NAME, AUTH_KEY_NAME } from '../constants/api'

export const getValueByKey = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    console.log('Error when removing..')
  }
}

export const loadTokenFromStorage = () => getValueByKey(API_KEY_NAME)
export const removeTokenFromStorage = () => removeWithKey(API_KEY_NAME)
export const loadAuthInfoFromStorage = () => getValueByKey(AUTH_KEY_NAME)
export const removeAuthInfoFromStorage = () => removeWithKey(AUTH_KEY_NAME)
export const setToken = (token) => setValueWithKey(API_KEY_NAME, token)
export const setAuthInfo = (info) => setValueWithKey(AUTH_KEY_NAME, info)

export const setValueWithKey = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val)
  } catch (e) {
    console.log('Error when removing..')
  }
}
export const removeWithKey = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log('Error when removing..')
  }
}

// export const dataToBase64 = (data) => {
//   return btoa(JSON.stringify(data));
// };
// export const base64ToData = (base64Str) => {
//   return JSON.parse(atob(base64Str))
// }
export const delaySync = async (seconds) => {
  await new Promise((res) => setTimeout(() => res(), seconds * 1000))
}
