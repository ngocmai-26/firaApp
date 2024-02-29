import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chat from '../view/chat'
import NavBar from '../layout/navbar'
import Profile from '../view/user/profile'
import Login from '../view/auth/login'
import Register from '../view/auth/register'
import ConfirmAccount from '../view/auth/confirmAccount'
import ConfirmForgotPassword from '../view/auth/confirmForgotPassword'
import CreateNewUser from '../view/auth/createNewUser'
import VerifyEmail from '../view/auth/verifyEmail'
import ForgotPassword from '../view/auth/forgotPassword'
import ManagerAccount from '../view/manager/managerAccount'
import AccountDetail from '../view/manager/managerAccount/detail'
import ManagerRoles from '../view/manager/managerRoles'
import ManagerPermissions from '../view/manager/managerPermissions'
import NotesApp from '../view/manager/managerNotes'
import Dashboard from '../view/user/dashboard'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { AUTH_KEY_NAME } from '../constants/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

const GeneralRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Đăng Nhập" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="confirm-account" component={ConfirmAccount} />
      <Stack.Screen
        name="confirm-forgot-password"
        component={ConfirmForgotPassword}
      />
      <Stack.Screen name="verify-email" component={VerifyEmail} />
      <Stack.Screen name="forgot-password" component={ForgotPassword} />
    </Stack.Navigator>
  )
}

const LoggedRoute = () => {
  const navigation = useNavigation()
  const { user, refresh, logged } = useSelector((state) => state.authReducer)

  useEffect(() => {
    if (logged) {
      if (!user) {
        navigation.navigate('create-new-user')
      }
    }
    if (user && refresh && refresh.uri) {
      navigation.navigate('home')
    }
  }, [user])


  return (
    <Stack.Navigator>
    <Stack.Screen
      name="home"
      component={NavBar}
      options={{ headerShown: false }}
    />
      <Stack.Screen name="create-new-user" component={CreateNewUser} />
      <Stack.Screen name="chat" component={Chat} />
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen name="tai-khoan" component={Profile} />
      <Stack.Screen name="quan-ly-tai-khoan" component={ManagerAccount} />
      <Stack.Screen name="accountDetail" component={AccountDetail} />
      <Stack.Screen name="quan-ly-chuc-vu" component={ManagerRoles} />
      <Stack.Screen name="quan-ly-chuc-nang" component={ManagerPermissions} />
      <Stack.Screen name="notesApp" component={NotesApp} />
      
    </Stack.Navigator>
  )
}

function Router() {
  const { logged } = useSelector((state) => state.authReducer)

 

  return (
    <NavigationContainer>
      
      {logged ? <LoggedRoute /> : <GeneralRoute />}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  )
}

export default Router
