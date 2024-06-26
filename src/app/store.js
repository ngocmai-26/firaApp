import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../slices/AuthSlice'
import RolesReducer from '../slices/RolesSlice'
import AlertReducer from '../slices/AlertSlice'
import PermissionsReducer from '../slices/PermissionsSlice'

import SearchReducer from '../slices/SearchSlice'
import ContactSlice from '../slices/ContactSlice'
import RoomSlice from '../slices/RoomSlice'
import ToggleSlice from '../slices/ToggleSlice'
import AccountsSlice from '../slices/AccountsSlice'
import UsersSlice from '../slices/UserSlice'
import JobsSlice from '../slices/JobsSlice'
import TimeKeepsSlice from '../slices/TimeKeepsSlice'
import PlansSlice from '../slices/PlansSlice'
import KPIsSlice from '../slices/KPIsSlice'
import KPICategoriesSlice from '../slices/KPICategoriesSlice'
import NotificationSlice from '../slices/NotificationSlice'
import DashboardSlice from '../slices/DashboardSlice'

export const store = configureStore({
  reducer: {
    alertReducer: AlertReducer,
    authReducer: AuthReducer,
    rolesReducer: RolesReducer,
    permissionsReducer: PermissionsReducer,
    usersReducer: UsersSlice,

    searchReducer: SearchReducer,
    contactReducer: ContactSlice,
    roomReducer: RoomSlice,
    toggleReducer: ToggleSlice,
    accountsReducer: AccountsSlice,
    jobsReducer: JobsSlice,
    timeKeepsReducer: TimeKeepsSlice,
    plansReducer: PlansSlice,
    kpisReducer: KPIsSlice,
    kpiCategoriesReducer: KPICategoriesSlice,
    notificationReducer: NotificationSlice,
    dashboardReducer: DashboardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
