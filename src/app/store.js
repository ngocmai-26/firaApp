import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../slices/AuthSlice'
import RolesReducer from '../slices/RolesSlice'
import AlertReducer from '../slices/AlertSlice'
import PermissionsReducer from '../slices/PermisionsSlice'

export const store = configureStore({
  reducer: {
    alertReducer: AlertReducer,
    authReducer: AuthReducer,
    rolesReducer: RolesReducer,
    permissionsReducer: PermissionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
